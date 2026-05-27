import { Play } from 'lucide-react';
import { AlbumArt } from '@/components/ui/album-art';
import { Skeleton } from '@/components/ui/skeleton';
import { TrackPlayRow, TrackLink } from '@/features/track/components/track-interactions';
import { getRecentlyPlayed } from '@/features/track/track-queries';

export async function QuickPlayGrid() {
  const tracks = await getRecentlyPlayed(6);
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {tracks.map(track => (
        <TrackPlayRow key={track.id} track={track}>
          <div className="bg-card/60 hover:bg-card dark:bg-card-dark/60 dark:hover:bg-card-dark group/quick flex items-center gap-3 rounded-md px-3 py-2 transition-colors">
            <span className="w-5 text-right">
              <Play className="hidden h-3.5 w-3.5 text-white group-hover/quick:inline" fill="currentColor" />
            </span>
            <AlbumArt coverColor={track.coverColor} size="sm" className="!h-10 !w-10 !rounded-md" />
            <div className="flex min-w-0 flex-1 flex-col">
              <TrackLink href={`/track/${track.id}`}>{track.title}</TrackLink>
              <span className="text-muted truncate text-xs">{track.artist}</span>
            </div>
          </div>
        </TrackPlayRow>
      ))}
    </div>
  );
}

export function QuickPlayGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-md px-3 py-2">
          <span className="w-5" />
          <Skeleton className="h-10 w-10 shrink-0 rounded-md" />
        </div>
      ))}
    </div>
  );
}
