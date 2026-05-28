import { revalidateTag } from 'next/cache';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const { trackId } = await req.json();
  if (typeof trackId !== 'string') {
    return new Response(null, { status: 400 });
  }

  await prisma.track.update({
    where: { id: trackId },
    data: {
      playCount: { increment: 1 },
      lastPlayedAt: new Date(),
    },
  });
  revalidateTag('recently-played', 'soft');

  return new Response(null, { status: 204 });
}
