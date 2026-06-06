import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/lib/db';
import { delay } from '@/lib/utils';
import { toTrack, type Track } from '@/types/track';

type PlaylistWithTracks = {
  id: string;
  name: string;
  description: string;
  coverColor: string;
  trackCount: number;
  tracks: Track[];
};

export type PlaylistSummary = {
  id: string;
  name: string;
  description: string;
  coverColor: string;
  trackCount: number;
};

export const getPlaylists = cache(async (): Promise<PlaylistSummary[]> => {
  await delay(900);
  const rows = await prisma.playlist.findMany({
    include: { _count: { select: { tracks: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return rows.map(r => ({
    coverColor: r.coverColor,
    description: r.description,
    id: r.id,
    name: r.name,
    trackCount: r._count.tracks,
  }));
});

export const getPlaylist = cache(async (id: string): Promise<PlaylistWithTracks> => {
  await delay(500);
  const row = await prisma.playlist.findUnique({
    include: {
      tracks: {
        include: { track: true },
        orderBy: { position: 'asc' },
      },
    },
    where: { id },
  });
  if (!row) notFound();
  return {
    coverColor: row.coverColor,
    description: row.description,
    id: row.id,
    name: row.name,
    trackCount: row.tracks.length,
    tracks: row.tracks.map(pt => toTrack(pt.track)),
  };
});

export type PlaylistMenuItem = { label: string; value: string; active: boolean };

export const getPlaylistMenuItems = cache(async (trackId: string): Promise<PlaylistMenuItem[]> => {
  const playlists = await prisma.playlist.findMany({
    include: { _count: { select: { tracks: true } } },
    orderBy: { createdAt: 'desc' },
  });
  if (playlists.length === 0) return [];

  const existing = await prisma.playlistTrack.findMany({
    select: { playlistId: true },
    where: { playlistId: { in: playlists.map(p => p.id) }, trackId },
  });
  const addedSet = new Set(existing.map(e => e.playlistId));
  return playlists.map(p => ({ label: p.name, value: p.id, active: addedSet.has(p.id) }));
});
