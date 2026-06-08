import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';

const SESSION_COOKIE = 'beats-user';

export async function POST(req: Request) {
  const store = await cookies();
  const userId = store.get(SESSION_COOKIE)?.value;
  if (!userId) return new Response(null, { status: 401 });

  const { trackId } = await req.json();
  if (typeof trackId !== 'string') {
    return new Response(null, { status: 400 });
  }

  // Global play count
  const track = await prisma.track.update({
    where: { id: trackId },
    data: { playCount: { increment: 1 } },
    select: { genre: true },
  });

  // Per-user recently played
  await prisma.userTrackPlay.upsert({
    where: { userId_trackId: { userId, trackId } },
    create: { userId, trackId },
    update: { lastPlayedAt: new Date() },
  });

  revalidateTag('tracks', 'soft');
  revalidateTag(`track-${trackId}`, 'soft');
  revalidateTag(`genre-${track.genre}`, 'soft');
  revalidateTag('discover', 'soft');
  revalidateTag(`recently-played:${userId}`, 'soft');

  return new Response(null, { status: 204 });
}
