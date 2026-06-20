import 'server-only';

import { cache } from 'react';
import { prisma } from '@/lib/db';
import { delay } from '@/lib/utils';

export const getGenres = cache(async () => {
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
