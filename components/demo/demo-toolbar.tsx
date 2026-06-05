'use client';

import { Eye, EyeOff, Zap, ZapOff } from 'lucide-react';
import { useOptimistic } from 'react';
import { useBoundaryMode } from '@/components/internal/boundary-provider';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

export function DemoToolbar({
  prefetchEnabled,
  togglePrefetchAction,
}: {
  prefetchEnabled: boolean;
  togglePrefetchAction: (enable: boolean) => Promise<void>;
}) {
  const { mode, toggleMode } = useBoundaryMode();
  const [optimisticPrefetch, setOptimisticPrefetch] = useOptimistic(prefetchEnabled);
  const prefetchPending = optimisticPrefetch !== prefetchEnabled;

  return (
    <div
      style={{ viewTransitionName: 'demo-toolbar' }}
      className={cn(
        'flex items-center overflow-hidden rounded-full border text-xs font-medium shadow-sm backdrop-blur-md transition-colors',
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
        onClick={toggleMode}
        aria-label={mode === 'on' ? 'Boundaries on' : 'Boundaries off'}
        aria-pressed={mode === 'on'}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 transition-colors',
          mode === 'on' ? 'text-accent' : 'text-gray',
        )}
      >
        {mode === 'on' ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
        <span className="hidden sm:inline">Boundaries</span>
      </button>
    </div>
  );
}
