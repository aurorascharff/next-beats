import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getCurrentUser } from '@/features/user/user-queries';
import { prisma } from '@/lib/db';
import { delay } from '@/lib/utils';
import { toTrack, type Track } from '@/types/track';

const LIBRARY_PAGE_SIZE = 100;

type LibraryPage = { tracks: Track[]; hasMore: boolean };

export const getLibrary = cache(async (page: number = 1): Promise<LibraryPage> => {
  await delay(400);
  const rows = await prisma.track.findMany({
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * LIBRARY_PAGE_SIZE,
    take: LIBRARY_PAGE_SIZE + 1,
  });
  const hasMore = rows.length > LIBRARY_PAGE_SIZE;
  const items = hasMore ? rows.slice(0, LIBRARY_PAGE_SIZE) : rows;
  return {
    hasMore,
    tracks: items.map(row => toTrack(row)),
  };
});

export const getFavorites = cache(async (): Promise<Track[]> => {
  const userId = await getCurrentUser();
  return getFavoritesForUser(userId);
});

async function getFavoritesForUser(userId: string): Promise<Track[]> {
  await delay(500);
  const rows = await prisma.userFavorite.findMany({
    where: { userId },
    orderBy: { addedAt: 'desc' },
    include: { track: true },
  });
  return rows.map(row => toTrack(row.track, { favorites: [row] }));
}

export const getUserFavoriteIds = cache(async (): Promise<Set<string>> => {
  const userId = await getCurrentUser();
  if (!userId) return new Set();
  const rows = await prisma.userFavorite.findMany({
    where: { userId },
    select: { trackId: true },
  });
  return new Set(rows.map(r => r.trackId));
});

export const getRecentlyPlayed = cache(async (limit: number = 8): Promise<Track[]> => {
  const userId = await getCurrentUser();
  return getRecentlyPlayedForUser(userId, limit);
});

async function getRecentlyPlayedForUser(userId: string, limit: number): Promise<Track[]> {
  await delay(500);
  const rows = await prisma.userTrackPlay.findMany({
    where: { userId },
    orderBy: { lastPlayedAt: 'desc' },
    take: limit,
    include: { track: true },
  });
  return rows.map(row => toTrack(row.track, { trackPlays: [row] }));
}

export const getTrack = cache(async (id: string) => {
  const userId = await getCurrentUser();
  return getTrackForUser(id, userId);
});

async function getTrackForUser(id: string, userId: string) {
  await delay(400);
  const row = await prisma.track.findUnique({
    where: { id },
    include: {
      favorites: { where: { userId } },
    },
  });
  if (!row) notFound();
  return toTrack(row, { favorites: row.favorites });
}

export const getMostPlayed = cache(async (limit: number = 8): Promise<Track[]> => {
  await delay(700);
  const rows = await prisma.track.findMany({
    orderBy: { playCount: 'desc' },
    take: limit,
    where: { playCount: { gt: 0 } },
  });
  return rows.map(row => toTrack(row));
});

export const getDiscover = cache(async (limit: number = 8): Promise<Track[]> => {
  const userId = await getCurrentUser();
  return getDiscoverForUser(userId, limit);
});

async function getDiscoverForUser(userId: string, limit: number): Promise<Track[]> {
  await delay(1100);
  const rows = await prisma.track.findMany({
    orderBy: { playCount: 'desc' },
    take: limit,
    where: {
      favorites: { none: { userId } },
      trackPlays: { none: { userId } },
    },
  });
  return rows.map(row => toTrack(row));
}

export const getTracksByGenre = cache(async (genre: string): Promise<Track[]> => {
  await delay(900);
  const rows = await prisma.track.findMany({
    orderBy: { playCount: 'desc' },
    where: { genre },
  });
  return rows.map(row => toTrack(row));
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
  return rows.map(row => toTrack(row));
});
