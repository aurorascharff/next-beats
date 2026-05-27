/**
 * Audio scheduling controller.
 *
 * Manages the bar-by-bar scheduling loop, progress tracking,
 * crossfade between tracks, and cleanup. Used by PlayerProvider.
 */

import { getAudioContext, killAudio, scheduleBar } from './music-engine';
import type { ScheduledNodes } from './music-engine';

const FADE_OUT_MS = 2000;
const BPM_APPROX = 120;
const SEC_PER_BAR = (60 / BPM_APPROX) * 4;

export type AudioRefs = {
  bars: ScheduledNodes[];
  scheduler: ReturnType<typeof setTimeout> | null;
  progress: number | null;
  volume: number;
  gen: number;
};

export function createAudioRefs(): AudioRefs {
  return { bars: [], scheduler: null, progress: null, volume: 75, gen: 0 };
}

/** Stop all audio. If immediate, closes the AudioContext entirely. */
export function stopAll(refs: AudioRefs, immediate: boolean) {
  if (refs.scheduler) {
    clearTimeout(refs.scheduler);
    refs.scheduler = null;
  }
  if (immediate) {
    killAudio();
    refs.bars = [];
  } else {
    for (const bar of refs.bars) bar.stopAll(false);
    refs.bars = [];
  }
  if (refs.progress) {
    cancelAnimationFrame(refs.progress);
    refs.progress = null;
  }
}

/** Cancel scheduler and progress without touching audio nodes. */
export function cancelTimers(refs: AudioRefs) {
  if (refs.scheduler) {
    clearTimeout(refs.scheduler);
    refs.scheduler = null;
  }
  if (refs.progress) {
    cancelAnimationFrame(refs.progress);
    refs.progress = null;
  }
}

type ScheduleOptions = {
  trackId: string;
  genre: string;
  duration: number;
  refs: AudioRefs;
  onProgress: (pct: number) => void;
  onEnd: () => void;
  /** If true, don't kill the context first (crossfade from previous track) */
  crossfade?: boolean;
};

/**
 * Start scheduling audio for a track. Handles the bar loop, progress
 * tracking, and end-of-track crossfade.
 */
export function scheduleTrack({
  trackId,
  genre,
  duration,
  refs,
  onProgress,
  onEnd,
  crossfade = false,
}: ScheduleOptions) {
  if (!crossfade) {
    stopAll(refs, true);
  }

  const gen = ++refs.gen;
  const ctx = getAudioContext();
  let barIndex = 0;
  let nextBarTime = ctx.currentTime + 0.05;

  function scheduleAhead() {
    if (refs.gen !== gen) return;
    while (nextBarTime < ctx.currentTime + SEC_PER_BAR * 2) {
      const nodes = scheduleBar(trackId, genre, barIndex, nextBarTime, refs.volume);
      refs.bars.push(nodes);
      barIndex++;
      nextBarTime += SEC_PER_BAR;
      while (refs.bars.length > 3) refs.bars.shift();
    }
    refs.scheduler = setTimeout(scheduleAhead, SEC_PER_BAR * 0.5 * 1000);
  }

  scheduleAhead();

  const startTime = Date.now();
  const durationMs = duration * 1000;
  let fadeStarted = false;

  function tick() {
    if (refs.gen !== gen) return;
    const elapsed = Date.now() - startTime;
    const pct = Math.min((elapsed / durationMs) * 100, 100);
    onProgress(pct);

    if (!fadeStarted && elapsed >= durationMs - FADE_OUT_MS) {
      fadeStarted = true;
      for (const bar of refs.bars) {
        try {
          bar.masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + FADE_OUT_MS / 1000);
        } catch {}
      }
    }

    if (pct < 100) {
      refs.progress = requestAnimationFrame(tick);
    } else {
      cancelTimers(refs);
      const oldBars = [...refs.bars];
      refs.bars = [];
      setTimeout(() => {
        for (const bar of oldBars) bar.stopAll(true);
      }, 500);
      onEnd();
    }
  }

  refs.progress = requestAnimationFrame(tick);
}

/** Resume scheduling from a given progress point. */
export function resumeTrack(
  trackId: string,
  genre: string,
  duration: number,
  currentProgress: number,
  refs: AudioRefs,
  onProgress: (pct: number) => void,
  onEnd: () => void,
) {
  const gen = ++refs.gen;
  const ctx = getAudioContext();
  let barIndex = Math.floor((currentProgress / 100) * (duration / SEC_PER_BAR));
  let nextBarTime = ctx.currentTime + 0.05;

  function scheduleAhead() {
    if (refs.gen !== gen) return;
    while (nextBarTime < ctx.currentTime + SEC_PER_BAR * 2) {
      const nodes = scheduleBar(trackId, genre, barIndex, nextBarTime, refs.volume);
      refs.bars.push(nodes);
      barIndex++;
      nextBarTime += SEC_PER_BAR;
      while (refs.bars.length > 3) refs.bars.shift();
    }
    refs.scheduler = setTimeout(scheduleAhead, SEC_PER_BAR * 0.5 * 1000);
  }

  scheduleAhead();

  const startTime = Date.now() - (currentProgress / 100) * duration * 1000;
  const durationMs = duration * 1000;

  function tick() {
    if (refs.gen !== gen) return;
    const elapsed = Date.now() - startTime;
    const pct = Math.min((elapsed / durationMs) * 100, 100);
    onProgress(pct);
    if (pct < 100) {
      refs.progress = requestAnimationFrame(tick);
    } else {
      stopAll(refs, false);
      onEnd();
    }
  }

  refs.progress = requestAnimationFrame(tick);
}
