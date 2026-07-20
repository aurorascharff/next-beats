'use client';

import * as Ariakit from '@ariakit/react';
import { CircleHelp, Eye, EyeOff, Timer, TimerOff, Wifi, WifiOff, Zap, ZapOff } from 'lucide-react';
import { type ButtonHTMLAttributes, type ReactNode, useEffect, useOptimistic, useState } from 'react';
import { useBoundaryMode } from '@/components/demo/boundary-provider';
import { togglePrefetch, toggleSlow } from '@/components/demo/demo-actions';
import { DemoGuideDialog } from '@/components/demo/demo-guide-dialog';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

let originalFetch: typeof fetch | null = null;

function setSimulatedOffline(offline: boolean) {
  if (typeof window === 'undefined') return;
  if (offline) {
    if (!originalFetch) originalFetch = window.fetch.bind(window);
    window.fetch = () => Promise.reject(new TypeError('Failed to fetch (demo offline)'));
    Object.defineProperty(navigator, 'onLine', { configurable: true, get: () => false });
    window.dispatchEvent(new Event('offline'));
  } else {
    if (originalFetch) {
      window.fetch = originalFetch;
      originalFetch = null;
    }
    Object.defineProperty(navigator, 'onLine', { configurable: true, get: () => true });
    window.dispatchEvent(new Event('online'));
  }
}

function Divider() {
  return <div className="bg-divider dark:bg-divider-dark h-5 w-px" />;
}

type ToggleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active: boolean;
  label: string;
  icon: ReactNode;
  pending?: boolean;
};

function ToggleButton({ active, label, icon, pending, className, ...props }: ToggleButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 transition-colors',
        active ? 'text-accent' : 'text-gray',
        pending && 'cursor-not-allowed opacity-70',
        className,
      )}
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}

function CookieToggle({
  enabled,
  onToggle,
  label,
  onIcon,
  offIcon,
}: {
  enabled: boolean;
  onToggle: (enable: boolean) => Promise<void>;
  label: string;
  onIcon: ReactNode;
  offIcon: ReactNode;
}) {
  const [optimistic, setOptimistic] = useOptimistic(enabled);
  const pending = optimistic !== enabled;
  return (
    <form
      action={async () => {
        setOptimistic(!optimistic);
        await onToggle(!optimistic);
        window.location.reload();
      }}
    >
      <ToggleButton
        type="submit"
        active={optimistic}
        pending={pending}
        disabled={pending}
        label={label}
        aria-label={pending ? 'Updating…' : `${label} ${optimistic ? 'on' : 'off'}`}
        icon={pending ? <Spinner className="size-3.5" /> : optimistic ? onIcon : offIcon}
      />
    </form>
  );
}

export function DemoToolbarClient({
  prefetchEnabled,
  slowEnabled,
}: {
  prefetchEnabled: boolean;
  slowEnabled: boolean;
}) {
  const { mode, toggleMode } = useBoundaryMode();
  const [offline, setOffline] = useState(false);
  const guide = Ariakit.useDialogStore();

  useEffect(() => () => setSimulatedOffline(false), []);

  function toggleOffline() {
    const next = !offline;
    setSimulatedOffline(next);
    setOffline(next);
  }

  return (
    <div
      style={{ viewTransitionName: 'demo-toolbar' }}
      className={cn(
        'flex items-center overflow-hidden rounded-full border text-xs font-medium shadow-sm backdrop-blur-md transition-colors',
        'border-divider dark:border-divider-dark bg-white/80 dark:bg-black/80',
      )}
    >
      <ToggleButton
        type="button"
        onClick={toggleMode}
        active={mode === 'on'}
        aria-pressed={mode === 'on'}
        aria-label={mode === 'on' ? 'Client outlines on' : 'Client outlines off'}
        label="Client"
        icon={mode === 'on' ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
      />
      <Divider />
      <CookieToggle
        enabled={prefetchEnabled}
        onToggle={togglePrefetch}
        label="Prefetch"
        onIcon={<Zap className="size-3.5" />}
        offIcon={<ZapOff className="size-3.5" />}
      />
      <Divider />
      <CookieToggle
        enabled={slowEnabled}
        onToggle={toggleSlow}
        label="Delays"
        onIcon={<Timer className="size-3.5" />}
        offIcon={<TimerOff className="size-3.5" />}
      />
      <Divider />
      <ToggleButton
        type="button"
        onClick={toggleOffline}
        active={!offline}
        aria-pressed={offline}
        aria-label={offline ? 'Simulating offline' : 'Online'}
        label="Online"
        icon={offline ? <WifiOff className="size-3.5" /> : <Wifi className="size-3.5" />}
      />
      <Divider />
      <Ariakit.DialogDisclosure
        store={guide}
        aria-label="How this demo works"
        className="text-gray flex items-center px-3 py-1.5 transition-colors hover:text-black dark:hover:text-white"
      >
        <CircleHelp className="size-3.5" />
      </Ariakit.DialogDisclosure>
      <DemoGuideDialog
        store={guide}
        prefetch={prefetchEnabled}
        delays={slowEnabled}
        offline={offline}
        client={mode === 'on'}
      />
    </div>
  );
}
