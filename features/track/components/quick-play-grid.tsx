import { AlbumArt } from '@/components/ui/album-art';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { TrackPlayRow, NowPlayingTrackLink, TrackIndexCell } from '@/features/track/components/track-interactions';
import { getRecentlyPlayed } from '@/features/track/track-queries';

export async function QuickPlayGrid() {
  const tracks = await getRecentlyPlayed(6);
  return (
    <>
      <h2 className="mt-10 mb-4">Jump Back In</h2>
      {tracks.length === 0 ? (
        <EmptyState title="Nothing played yet" body="Play a track and it'll show up here." />
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map(track => (
            <TrackPlayRow key={track.id} track={track}>
              <div className="bg-card/60 hover:bg-card dark:bg-card-dark/60 dark:hover:bg-card-dark group/quick flex items-center gap-3 rounded-md px-3 py-2 transition-colors">
                <TrackIndexCell trackId={track.id} />
                <AlbumArt coverColor={track.coverColor} size="sm" className="!h-10 !w-10 !rounded-md" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <NowPlayingTrackLink trackId={track.id} href={`/track/${track.id}`}>
                    {track.title}
                  </NowPlayingTrackLink>
                  <span className="text-muted truncate text-xs">{track.artist}</span>
                </div>
              </div>
            </TrackPlayRow>
          ))}
        </div>
      )}
    </>
  );
}

export function QuickPlayGridSkeleton() {
  return (
    <>
      <h2 className="mt-10 mb-4">Jump Back In</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-md px-3 py-2">
            <span className="w-5" />
            <Skeleton className="h-10 w-10 shrink-0 rounded-md" />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
