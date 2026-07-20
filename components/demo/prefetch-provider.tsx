'use client';

import { createContext, Suspense, use, useContext } from 'react';

const PrefetchContext = createContext<Promise<boolean> | null>(null);

export function PrefetchProvider({ value, children }: { value: Promise<boolean>; children: React.ReactNode }) {
  return <PrefetchContext.Provider value={value}>{children}</PrefetchContext.Provider>;
}

// Returns the value to pass to a `<Link prefetch>`. The demo toggle chooses
// between the full prefetch (`true`) and App Shell only (`null`) — never `false`,
// which would also drop the App Shell, the instant-navigation floor.
export function usePrefetchDefault() {
  const promise = useContext(PrefetchContext);
  const enabled = promise ? use(promise) : true;
  return enabled ? true : null;
}
