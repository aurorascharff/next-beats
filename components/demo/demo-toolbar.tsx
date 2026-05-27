'use client';

import { Eye, EyeOff, Zap, ZapOff } from 'lucide-react';
import { useCallback, useEffect, useOptimistic, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

function BoundaryOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  const updateBoxes = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const elements = document.querySelectorAll('[data-client]');
    const existingBoxes = overlay.children;
    let boxIndex = 0;

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      let box = existingBoxes[boxIndex] as HTMLDivElement | undefined;
      if (!box) {
        box = document.createElement('div');
        box.style.cssText =
          'position:fixed;border:2px solid oklch(0.72 0.2 320);border-radius:6px;pointer-events:none;';
        const label = document.createElement('span');
        label.style.cssText =
          'position:absolute;top:-1px;left:8px;transform:translateY(-100%);background:oklch(0.72 0.2 320);color:white;font-size:10px;font-weight:600;line-height:1;padding:2px 6px;border-radius:4px 4px 0 0;white-space:nowrap;font-family:var(--font-mono);';
        box.appendChild(label);
        overlay.appendChild(box);
      }

      box.style.top = `${rect.top}px`;
      box.style.left = `${rect.left}px`;
      box.style.width = `${rect.width}px`;
      box.style.height = `${rect.height}px`;
      (box.firstChild as HTMLSpanElement).textContent = el.getAttribute('data-client') || 'Client';
      boxIndex++;
    });

    while (overlay.children.length > boxIndex) {
      overlay.removeChild(overlay.lastChild!);
    }
  }, []);

  const scheduleUpdate = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(updateBoxes);
  }, [updateBoxes]);

  useEffect(() => {
    updateBoxes();

    const scrollContainer = document.querySelector('main');
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(document.body);

    scrollContainer?.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
      scrollContainer?.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [updateBoxes, scheduleUpdate]);

  return createPortal(
    <div ref={overlayRef} className="demo-toggles pointer-events-none fixed inset-0 z-[9998]" />,
    document.body,
  );
}

export function DemoToolbar({
  prefetchEnabled,
  togglePrefetchAction,
}: {
  prefetchEnabled: boolean;
  togglePrefetchAction: (enable: boolean) => Promise<void>;
}) {
  const [boundariesOn, setBoundariesOn] = useState(false);
  const [optimisticPrefetch, setOptimisticPrefetch] = useOptimistic(prefetchEnabled);
  const prefetchPending = optimisticPrefetch !== prefetchEnabled;

  useEffect(() => {
    document.documentElement.classList.toggle('show-client-boundaries', boundariesOn);
    return () => {
      document.documentElement.classList.remove('show-client-boundaries');
    };
  }, [boundariesOn]);

  return (
    <>
      <div
        style={{ viewTransitionName: 'demo-toolbar' }}
        className={cn(
          'flex items-center overflow-hidden rounded-full border text-xs font-medium shadow-lg backdrop-blur-md transition-colors',
          'border-divider dark:border-divider-dark bg-white/80 dark:bg-black/80',
        )}
      >
        <form
          action={async () => {
            setOptimisticPrefetch(!optimisticPrefetch);
            await togglePrefetchAction(!optimisticPrefetch);
            window.location.reload();
          }}
        >
          <button
            type="submit"
            disabled={prefetchPending}
            aria-label={prefetchPending ? 'Updating…' : optimisticPrefetch ? 'Prefetch on' : 'Prefetch off'}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 transition-colors',
              optimisticPrefetch ? 'text-accent' : 'text-gray',
              prefetchPending && 'cursor-not-allowed opacity-70',
            )}
          >
            {prefetchPending ? (
              <Spinner className="size-3.5" />
            ) : optimisticPrefetch ? (
              <Zap className="size-3.5" />
            ) : (
              <ZapOff className="size-3.5" />
            )}
            <span className="hidden sm:inline">Prefetch</span>
          </button>
        </form>

        <div className="bg-divider dark:bg-divider-dark h-5 w-px" />

        <button
          type="button"
          onClick={() => setBoundariesOn(v => !v)}
          aria-label={boundariesOn ? 'Boundaries on' : 'Boundaries off'}
          aria-pressed={boundariesOn}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 transition-colors',
            boundariesOn ? 'text-fuchsia-400' : 'text-gray',
          )}
        >
          {boundariesOn ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
          <span className="hidden sm:inline">Boundaries</span>
        </button>
      </div>

      {boundariesOn && <BoundaryOverlay />}
    </>
  );
}
