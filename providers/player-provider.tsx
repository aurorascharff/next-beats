'use client';

import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { getAudioContext, resumeAudio, scheduleBar, suspendAudio } from '@/lib/audio/music-engine';
import type { ScheduledNodes } from '@/lib/audio/music-engine';
import type { Track } from '@/types/track';

type PlayerState = {
  track: Track | null;
  queue: Track[];
  queueIndex: number;
  isPlaying: boolean;
  progress: number;
  volume: number;
};

type PlayerAction =
  | { type: 'PLAY'; track: Track; queue: Track[]; index: number }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'SET_PROGRESS'; progress: number }
  | { type: 'SET_VOLUME'; volume: number }
  | { type: 'ENDED' };

const initialState: PlayerState = {
  track: null,
  queue: [],
  queueIndex: -1,
  isPlaying: false,
  progress: 0,
  volume: 75,
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'PLAY':
      return {
        ...state,
        track: action.track,
        queue: action.queue,
        queueIndex: action.index,
        isPlaying: true,
        progress: 0,
      };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'RESUME':
      return { ...state, isPlaying: true };
    case 'SET_PROGRESS':
      return { ...state, progress: action.progress };
    case 'SET_VOLUME':
      return { ...state, volume: action.volume };
    case 'ENDED':
      return { ...state, isPlaying: false, progress: 0 };
  }
}

type PlayerContextValue = PlayerState & {
  play: (track: Track, queue?: Track[]) => void;
  pause: () => void;
  resume: () => void;
  togglePlayPause: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (v: number) => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const { track, queue, queueIndex, isPlaying, progress, volume } = state;
  const queueIndexRef = useRef(-1);

  useEffect(() => {
    queueIndexRef.current = queueIndex;
  }, [queueIndex]);

  const barsRef = useRef<ScheduledNodes[]>([]);
  const schedulerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<number | null>(null);
  const volumeRef = useRef(75);

  useEffect(() => {
    volumeRef.current = volume;
    // Update gain on active bars
    for (const bar of barsRef.current) {
      const ctx = getAudioContext();
      bar.masterGain.gain.exponentialRampToValueAtTime(Math.max((volume / 100) * 0.15, 0.0001), ctx.currentTime + 0.1);
    }
  }, [volume]);

  function stopAudio(immediate = false) {
    if (schedulerRef.current) {
      clearTimeout(schedulerRef.current);
      schedulerRef.current = null;
    }
    for (const bar of barsRef.current) {
      bar.stopAll(immediate);
    }
    barsRef.current = [];
    if (progressRef.current) {
      cancelAnimationFrame(progressRef.current);
      progressRef.current = null;
    }
  }

  function startAudio(t: Track, onEnd: () => void) {
    stopAudio(true);
    const ctx = getAudioContext();
    const bpm = 120; // approximate — the genre config will override per bar
    const secPerBar = (60 / bpm) * 4; // 4 beats per bar
    let barIndex = 0;
    let nextBarTime = ctx.currentTime + 0.05; // small delay for setup

    function scheduleAhead() {
      // Schedule 2 bars ahead
      while (nextBarTime < ctx.currentTime + secPerBar * 2) {
        const nodes = scheduleBar(t.id, t.genre, barIndex, nextBarTime, volumeRef.current);
        barsRef.current.push(nodes);
        barIndex++;
        nextBarTime += secPerBar;

        // Clean up old bars (keep last 3)
        while (barsRef.current.length > 3) {
          barsRef.current.shift();
        }
      }
      schedulerRef.current = setTimeout(scheduleAhead, secPerBar * 0.5 * 1000);
    }

    scheduleAhead();

    // Progress tracking
    const startTime = Date.now();
    const duration = t.duration * 1000;
    function tick() {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      dispatch({ type: 'SET_PROGRESS', progress: pct });
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(tick);
      } else {
        stopAudio();
        onEnd();
      }
    }
    progressRef.current = requestAnimationFrame(tick);
  }

  function playAtIndex(idx: number, q: Track[]) {
    const t = q[idx];
    dispatch({ type: 'PLAY', track: t, queue: q, index: idx });
    startAudio(t, () => {
      const currentIdx = queueIndexRef.current;
      if (currentIdx >= 0 && currentIdx < q.length - 1) {
        playAtIndex(currentIdx + 1, q);
      } else {
        dispatch({ type: 'ENDED' });
      }
    });
  }

  function play(t: Track, q?: Track[]) {
    const fullQueue = q ?? [t];
    const idx = fullQueue.findIndex(x => x.id === t.id);
    playAtIndex(idx >= 0 ? idx : 0, fullQueue);
  }

  function pause() {
    dispatch({ type: 'PAUSE' });
    suspendAudio();
    if (schedulerRef.current) {
      clearTimeout(schedulerRef.current);
      schedulerRef.current = null;
    }
    if (progressRef.current) {
      cancelAnimationFrame(progressRef.current);
      progressRef.current = null;
    }
  }

  function resume() {
    dispatch({ type: 'RESUME' });
    resumeAudio();
    if (track) {
      const duration = track.duration * 1000;
      const startTime = Date.now() - (progress / 100) * duration;

      // Re-start the bar scheduler
      const ctx = getAudioContext();
      const secPerBar = (60 / 120) * 4;
      let barIndex = Math.floor((progress / 100) * (track.duration / secPerBar));
      let nextBarTime = ctx.currentTime + 0.05;

      function scheduleAhead() {
        while (nextBarTime < ctx.currentTime + secPerBar * 2) {
          const nodes = scheduleBar(track!.id, track!.genre, barIndex, nextBarTime, volumeRef.current);
          barsRef.current.push(nodes);
          barIndex++;
          nextBarTime += secPerBar;
          while (barsRef.current.length > 3) {
            barsRef.current.shift();
          }
        }
        schedulerRef.current = setTimeout(scheduleAhead, secPerBar * 0.5 * 1000);
      }
      scheduleAhead();

      function tick() {
        const elapsed = Date.now() - startTime;
        const pct = Math.min((elapsed / duration) * 100, 100);
        dispatch({ type: 'SET_PROGRESS', progress: pct });
        if (pct < 100) {
          progressRef.current = requestAnimationFrame(tick);
        } else {
          stopAudio();
          dispatch({ type: 'ENDED' });
        }
      }
      progressRef.current = requestAnimationFrame(tick);
    }
  }

  function togglePlayPause() {
    if (isPlaying) pause();
    else if (track) resume();
  }

  function next() {
    if (!track || queue.length === 0) return;
    const currentIdx = queueIndexRef.current;
    const nextIdx = currentIdx < queue.length - 1 ? currentIdx + 1 : 0;
    playAtIndex(nextIdx, queue);
  }

  function previous() {
    if (!track || queue.length === 0) return;
    const currentIdx = queueIndexRef.current;
    const prevIdx = currentIdx > 0 ? currentIdx - 1 : queue.length - 1;
    playAtIndex(prevIdx, queue);
  }

  function setVolume(v: number) {
    dispatch({ type: 'SET_VOLUME', volume: v });
  }

  return (
    <PlayerContext.Provider
      value={{
        track,
        queue,
        queueIndex,
        isPlaying,
        progress,
        volume,
        play,
        pause,
        resume,
        togglePlayPause,
        next,
        previous,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}
