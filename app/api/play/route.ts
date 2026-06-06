import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';

const SESSION_COOKIE = 'beats-user';

export async function POST(req: Request) {
  const store = await cookies();
  if (!store.has(SESSION_COOKIE)) return new Response(null, { status: 401 });

  const { trackId } = await req.json();
  if (typeof trackId !== 'string') {
    return new Response(null, { status: 400 });
  }

  const track = await prisma.track.update({
    where: { id: trackId },
    data: {
      playCount: { increment: 1 },
      lastPlayedAt: new Date(),
    },
    select: {
      genre: true,
      isFavorite: true,
    },
  });

  revalidateTag('library', 'soft');
  revalidateTag('tracks', 'soft');
  revalidateTag(`track-${trackId}`, 'soft');
  revalidateTag(`genre-${track.genre}`, 'soft');
  revalidateTag('discover', 'soft');
  if (track.isFavorite) revalidateTag('favorites', 'soft');

  return new Response(null, { status: 204 });
}
