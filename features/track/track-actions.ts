'use server';

import { updateTag } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { delay } from '@/lib/utils';

const trackIdSchema = z.string().min(1);

export async function toggleFavorite(trackId: string) {
  await delay(200);
  const id = trackIdSchema.parse(trackId);
  const track = await prisma.track.findUnique({ where: { id } });
  if (!track) return { ok: false as const };

  await prisma.track.update({
    data: { isFavorite: !track.isFavorite },
    where: { id },
  });
  updateTag(`track-${id}`);
  updateTag('favorites');
  updateTag('library');
  return { ok: true as const };
}
