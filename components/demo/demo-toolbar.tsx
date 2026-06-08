'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useBoundaryMode } from '@/components/demo/boundary-provider';
import { cn } from '@/lib/utils';

export function DemoToolbar() {
  const { mode, toggleMode } = useBoundaryMode();

  return (
    <div
      style={{ viewTransitionName: 'demo-toolbar' }}
      className={cn(
        'flex items-center overflow-hidden rounded-full border text-xs font-medium shadow-sm backdrop-blur-md transition-colors',
        'border-divider dark:border-divider-dark bg-white/80 dark:bg-black/80',
      )}
    >
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
