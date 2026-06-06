import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/lib/db';
import { delay } from '@/lib/utils';
import { toTrack, type Track } from '@/types/track';

const LIBRARY_PAGE_SIZE = 20;

type LibraryPage = { tracks: Track[]; hasMore: boolean };

export const getLibrary = cache(async (page: number = 1): Promise<LibraryPage> => {
  await delay(500);
  const rows = await prisma.track.findMany({
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * LIBRARY_PAGE_SIZE,
    take: LIBRARY_PAGE_SIZE + 1,
  });
  const hasMore = rows.length > LIBRARY_PAGE_SIZE;
  const items = hasMore ? rows.slice(0, LIBRARY_PAGE_SIZE) : rows;
  return {
    hasMore,
    tracks: items.map(toTrack),
  };
});

export const getFavorites = cache(async (): Promise<Track[]> => {
  await delay(500);
  const rows = await prisma.track.findMany({
    orderBy: { createdAt: 'desc' },
    where: { isFavorite: true },
  });
  return rows.map(toTrack);
});

export const getRecentlyPlayed = cache(async (limit: number = 8): Promise<Track[]> => {
  await delay(300);
  const rows = await prisma.track.findMany({
    orderBy: { lastPlayedAt: 'desc' },
    take: limit,
    where: { lastPlayedAt: { not: null } },
  });
  return rows.map(toTrack);
});

export const getMostPlayed = cache(async (limit: number = 8): Promise<Track[]> => {
  await delay(600);
  const rows = await prisma.track.findMany({
    orderBy: { playCount: 'desc' },
    take: limit,
    where: { playCount: { gt: 0 } },
  });
  return rows.map(toTrack);
});

export const getDiscover = cache(async (limit: number = 8): Promise<Track[]> => {
  await delay(1100);
  const rows = await prisma.track.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    where: { isFavorite: false, lastPlayedAt: null },
  });
  return rows.map(toTrack);
});

export const getTrack = cache(async (id: string) => {
  await delay(400);
  const row = await prisma.track.findUnique({ where: { id } });
  if (!row) notFound();
  return toTrack(row);
});

export const getTracksByGenre = cache(async (genre: string): Promise<Track[]> => {
  await delay(900);
  const rows = await prisma.track.findMany({
    orderBy: { playCount: 'desc' },
    where: { genre },
  });
  return rows.map(toTrack);
});

export const searchTracks = cache(async (query: string): Promise<Track[]> => {
  await delay(800);
  const rows = await prisma.track.findMany({
    orderBy: { playCount: 'desc' },
    take: 30,
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { artist: { contains: query, mode: 'insensitive' } },
        { album: { contains: query, mode: 'insensitive' } },
      ],
    },
  });
  return rows.map(toTrack);
});
