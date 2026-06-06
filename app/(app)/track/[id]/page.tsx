import { Suspense } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import { TrackDetail, TrackDetailSkeleton } from '@/features/track/components/track-detail';
import { getTrack } from '@/features/track/track-queries';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps<'/track/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const track = await getTrack(id);
  return { title: track.title };
}

export const unstable_prefetch = 'force-runtime';

export default function TrackPage({ params }: PageProps<'/track/[id]'>) {
  return (
    <Suspense fallback={<TrackDetailSkeleton />}>
      <Crossfade>
        {params.then(({ id }) => (
          <TrackDetail id={id} />
        ))}
      </Crossfade>
    </Suspense>
  );
}
