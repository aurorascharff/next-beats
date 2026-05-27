'use client';

import { useSyncExternalStore } from 'react';

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);

  window.addEventListener('popstate', callback);

  return () => {
    listeners.delete(callback);
    window.removeEventListener('popstate', callback);
  };
}

if (typeof window !== 'undefined') {
  const original = { pushState: history.pushState, replaceState: history.replaceState };
  for (const method of ['pushState', 'replaceState'] as const) {
    history[method] = function (...args: Parameters<typeof history.pushState>) {
      original[method].apply(this, args);
      setTimeout(() => listeners.forEach(fn => fn()), 0);
    };
  }
}

export function useClientPathname(): string | null {
  return useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => null,
  );
}
