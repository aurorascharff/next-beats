'use client';

import { Pause, Play, SkipBack, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react';
import { ViewTransition } from 'react';
import { AlbumArt } from '@/components/ui/album-art';
import { formatDuration } from '@/lib/utils';
import { usePlayer } from '@/providers/player-provider';

export function NowPlayingBar() {
  const { track, isPlaying, progress, volume, togglePlayPause, next, previous, setVolume } = usePlayer();

  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;
  const elapsed = track ? Math.floor((progress / 100) * track.duration) : 0;
  const total = track?.duration ?? 0;

  return (
    <>
      {track ? (
        <div
          style={{ viewTransitionName: 'player-bar' }}
          className="shrink-0 px-2 pb-2 sm:hidden"
          data-client="NowPlayingBar"
        >
          <div className="bg-card dark:bg-card-dark rounded-xl px-4 py-3 shadow-lg">
            <div className="flex items-center gap-3">
              <AlbumArt coverColor={track.coverColor} size="sm" className="!h-12 !w-12 !rounded-md shadow-md" />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-semibold text-black dark:text-white">{track.title}</span>
                <span className="text-muted truncate text-xs">{track.artist}</span>
              </div>
              <div className="flex items-center gap-2">
                <SkipButton direction="back" onClick={previous} />
                <button
                  type="button"
                  onClick={togglePlayPause}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" fill="currentColor" />
                  ) : (
                    <Play className="h-5 w-5 translate-x-[1px]" fill="currentColor" />
                  )}
                </button>
                <SkipButton direction="forward" onClick={next} />
              </div>
            </div>
            <div className="bg-divider dark:bg-divider-dark mt-3 h-1 w-full overflow-hidden rounded-full">
              <div className="bg-accent h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      ) : null}

      <div
        style={{ viewTransitionName: 'player-bar-desktop' }}
        className="border-divider dark:border-divider-dark hidden shrink-0 border-t bg-white px-4 py-2 sm:block dark:bg-[#181818]"
        data-client="NowPlayingBar"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <ViewTransition name="now-playing-art" default="none">
              <AlbumArt
                coverColor={track?.coverColor ?? 'from-gray-400 to-gray-600'}
                size="sm"
                className="!h-14 !w-14 !rounded-sm"
              />
            </ViewTransition>
            <ViewTransition key={track?.id ?? 'empty'} enter="fade-in" exit="fade-out" default="none">
              <div className="hidden min-w-0 flex-col lg:flex">
                <span className="truncate text-sm font-medium text-black dark:text-white">
                  {track?.title ?? 'No track playing'}
                </span>
                <span className="text-muted truncate text-xs">
                  {track ? `${track.artist} · ${track.album}` : 'Select a track to play'}
                </span>
              </div>
            </ViewTransition>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-5">
              <SkipButton direction="back" onClick={previous} disabled={!track} />
              <button
                type="button"
                onClick={togglePlayPause}
                disabled={!track}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105 disabled:opacity-40 dark:bg-white dark:text-black"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" fill="currentColor" />
                ) : (
                  <Play className="h-4 w-4 translate-x-[1px]" fill="currentColor" />
                )}
              </button>
              <SkipButton direction="forward" onClick={next} disabled={!track} />
            </div>
            <div className="flex w-full max-w-md items-center gap-2">
              <span className="text-muted w-8 text-right text-[10px]">{formatDuration(elapsed)}</span>
              <SliderBar value={progress} onChange={() => {}} label="Seek" disabled />
              <span className="text-muted w-8 text-[10px]">{formatDuration(total)}</span>
            </div>
          </div>
          <div className="hidden items-center justify-end gap-1.5 lg:flex">
            <button
              type="button"
              onClick={() => setVolume(volume === 0 ? 75 : 0)}
              className="text-muted transition-colors hover:text-black dark:hover:text-white"
              aria-label={volume === 0 ? 'Unmute' : 'Mute'}
            >
              <VolumeIcon className="h-3.5 w-3.5" />
            </button>
            <SliderBar value={volume} onChange={setVolume} className="w-20" label="Volume" />
          </div>
        </div>
      </div>
    </>
  );
}

function SliderBar({
  value,
  onChange,
  className,
  label,
  disabled,
}: {
  value: number;
  onChange: (v: number) => void;
  className?: string;
  label: string;
  disabled?: boolean;
}) {
  return (
    <div className={`group/slider relative flex flex-1 items-center ${className ?? ''}`}>
      <div className="bg-divider dark:bg-divider-dark relative h-0.5 w-full rounded-full transition-all group-hover/slider:h-1">
        <div
          className="group-hover/slider:bg-accent absolute top-0 left-0 h-full rounded-full bg-black/60 dark:bg-white/60"
          style={{ width: `${value}%` }}
        />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        disabled={disabled}
        aria-label={label}
        className={`absolute inset-0 m-0 h-full w-full appearance-none border-0 bg-transparent p-0 opacity-0 ${disabled ? 'pointer-events-none' : 'cursor-pointer'}`}
      />
    </div>
  );
}

function SkipButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'back' | 'forward';
  onClick: () => void;
  disabled?: boolean;
}) {
  const Icon = direction === 'back' ? SkipBack : SkipForward;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="text-muted p-1 transition-colors hover:text-black disabled:opacity-40 dark:hover:text-white"
      aria-label={direction === 'back' ? 'Previous' : 'Next'}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
