import type { Track as PrismaTrack } from '@/generated/prisma/client';

export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  genre: string;
  coverColor: string;
  playCount: number;
  isFavorite: boolean;
  createdAt: Date;
};

export function toTrack(row: PrismaTrack): Track {
  return {
    album: row.album,
    artist: row.artist,
    coverColor: row.coverColor,
    createdAt: row.createdAt,
    duration: row.duration,
    genre: row.genre,
    id: row.id,
    isFavorite: row.isFavorite,
    playCount: row.playCount,
    title: row.title,
  };
}
