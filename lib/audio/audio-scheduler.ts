/**
 * Audio scheduling controller.
 *
 * Manages the bar-by-bar scheduling loop, progress tracking,
 * crossfade between tracks, and cleanup. Used by PlayerProvider.
 */

import { getAudioContext, scheduleBar } from './music-engine';
import type { ScheduledNodes } from './music-engine';

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

/** Stop all audio. Disconnects nodes and clears state. */
export function stopAll(refs: AudioRefs) {
  if (refs.scheduler) {
    clearTimeout(refs.scheduler);
    refs.scheduler = null;
  }
  for (const bar of refs.bars) bar.stopAll(true);
  refs.bars = [];
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
};

/**
 * Start scheduling audio for a track. Handles the bar loop, progress
 * tracking, and end-of-track cleanup.
 */
export function scheduleTrack({ trackId, genre, duration, refs, onProgress, onEnd }: ScheduleOptions) {
  const gen = ++refs.gen;
  stopAll(refs);
  const ctx = getAudioContext();
  let barIndex = 0;
  let nextBarTime = ctx.currentTime + 0.15;

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

  function tick() {
    if (refs.gen !== gen) return;
    const elapsed = Date.now() - startTime;
    const pct = Math.min((elapsed / durationMs) * 100, 100);
    onProgress(pct);

    if (pct < 100) {
      refs.progress = requestAnimationFrame(tick);
    } else {
      cancelTimers(refs);
      stopAll(refs);
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
      stopAll(refs);
      onEnd();
    }
  }

  refs.progress = requestAnimationFrame(tick);
}
