import { TrackList, TrackListSkeleton } from '@/features/track/components/track-row';
import { getRecommendedTracks } from '@/features/track/track-queries';

export async function MoreLikeThis({ trackId }: { trackId: string }) {
  const tracks = await getRecommendedTracks(trackId);
  return <TrackList tracks={tracks} />;
}

export function MoreLikeThisSkeleton() {
  return <TrackListSkeleton count={3} />;
}
