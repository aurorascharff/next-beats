'use client';

import { useEffect, useRef } from 'react';

const BAR_FRAMES = [
  [20, 12, 24, 16],
  [14, 22, 16, 20],
  [24, 16, 12, 22],
  [16, 24, 20, 14],
];

export function useFaviconEqualizer(isPlaying: boolean) {
  const originalHref = useRef<string | null>(null);

  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) return;

    if (!originalHref.current) {
      originalHref.current = link.href;
    }

    if (!isPlaying) {
      link.href = originalHref.current;
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;

    function draw() {
      ctx!.clearRect(0, 0, 32, 32);
      ctx!.fillStyle = '#4f6ef7';
      const barWidth = 5;
      const gap = 3;
      const startX = 4;
      const h = BAR_FRAMES[frame % BAR_FRAMES.length];
      for (let i = 0; i < 4; i++) {
        const x = startX + i * (barWidth + gap);
        ctx!.beginPath();
        ctx!.roundRect(x, 32 - h[i], barWidth, h[i], 2);
        ctx!.fill();
      }
      link!.href = canvas.toDataURL();
      frame++;
    }

    draw();
    const interval = setInterval(draw, 300);

    return () => {
      clearInterval(interval);
      if (originalHref.current) {
        link.href = originalHref.current;
      }
    };
  }, [isPlaying]);
}
