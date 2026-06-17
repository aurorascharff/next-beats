'use server';

import { revalidateTag, updateTag } from 'next/cache';
import { z } from 'zod';
import { verifyAuth } from '@/features/user/user-queries';
import { prisma } from '@/lib/db';
import { delay } from '@/lib/utils';

const trackIdSchema = z.string().min(1);

export async function toggleFavorite(trackId: string) {
  const userId = await verifyAuth();
  await delay(200);
  const id = trackIdSchema.parse(trackId);

  const existing = await prisma.userFavorite.findUnique({
    where: { userId_trackId: { userId, trackId: id } },
  });

  if (existing) {
    await prisma.userFavorite.delete({
      where: { userId_trackId: { userId, trackId: id } },
    });
  } else {
    await prisma.userFavorite.create({
      data: { userId, trackId: id },
    });
  }

  updateTag(`track-${id}:${userId}`);
  updateTag(`favorites:${userId}`);
  revalidateTag(`discover:${userId}`, 'max');
  return { ok: true as const };
}

export async function recordPlay(trackId: string) {
  const userId = await verifyAuth();
  const id = trackIdSchema.parse(trackId);

  const track = await prisma.track.update({
    where: { id },
    data: { playCount: { increment: 1 } },
    select: { genre: true },
  });

  await prisma.userTrackPlay.upsert({
    where: { userId_trackId: { userId, trackId: id } },
    create: { userId, trackId: id },
    update: { lastPlayedAt: new Date() },
  });

  updateTag(`recently-played:${userId}`);
  revalidateTag('tracks', 'max');
  revalidateTag(`track-${id}`, 'max');
  revalidateTag(`genre-${track.genre}`, 'max');
  revalidateTag(`discover:${userId}`, 'max');
  return { ok: true as const };
}
