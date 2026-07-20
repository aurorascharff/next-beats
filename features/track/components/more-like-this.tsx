import { TrackList, TrackListSkeleton } from '@/features/track/components/track-row';
import { getRecommendedTracks } from '@/features/track/track-queries';

export async function MoreLikeThis({ trackId }: { trackId: string }) {
  const tracks = await getRecommendedTracks(trackId);
  if (tracks.length === 0) return null;
  return (
    <section>
      <h2 className="mb-4">More songs you might like</h2>
      <TrackList tracks={tracks} />
    </section>
  );
}

export function MoreLikeThisSkeleton() {
  return (
    <section>
      <h2 className="mb-4">More songs you might like</h2>
      <TrackListSkeleton count={3} />
    </section>
  );
}
