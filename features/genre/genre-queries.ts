import 'server-only';

import { cache } from 'react';
import { prisma } from '@/lib/db';
import { delay } from '@/lib/utils';

export type GenreSummary = {
  genre: string;
  count: number;
};

export const getGenres = cache(async (): Promise<GenreSummary[]> => {
  await delay(600);
  const rows = await prisma.track.groupBy({
    by: ['genre'],
    _count: { genre: true },
    orderBy: { _count: { genre: 'desc' } },
  });
  return rows.map(r => ({
    count: r._count.genre,
    genre: r.genre,
  }));
});

export const getTopGenres = cache(async (limit: number = 5): Promise<GenreSummary[]> => {
  await delay(1500);
  const rows = await prisma.track.groupBy({
    by: ['genre'],
    _count: { genre: true },
    orderBy: { _count: { genre: 'desc' } },
    take: limit,
  });
  return rows.map(r => ({
    count: r._count.genre,
    genre: r.genre,
  }));
});
