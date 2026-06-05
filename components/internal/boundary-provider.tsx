'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type BoundaryMode = 'off' | 'on';

type BoundaryContextType = {
  mode: BoundaryMode;
  toggleMode: () => void;
};

const BoundaryContext = createContext<BoundaryContextType | null>(null);

const BOUNDARY_MODE_KEY = 'boundaryMode';

export function BoundaryProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<BoundaryMode>('off');

  useEffect(() => {
    const saved = localStorage.getItem(BOUNDARY_MODE_KEY) as BoundaryMode;
    if (saved === 'on') setMode(saved);
  }, []);

  const toggleMode = () => {
    setMode(prev => {
      const next = prev === 'off' ? 'on' : 'off';
      localStorage.setItem(BOUNDARY_MODE_KEY, next);
      return next;
    });
  };

  return <BoundaryContext.Provider value={{ mode, toggleMode }}>{children}</BoundaryContext.Provider>;
}

export function useBoundaryMode() {
  const ctx = useContext(BoundaryContext);
  if (!ctx) throw new Error('useBoundaryMode must be used within BoundaryProvider');
  return ctx;
}
