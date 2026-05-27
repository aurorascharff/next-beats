import { AlbumCard, AlbumCardSkeleton } from '@/features/track/components/album-card';
import { getLibrary } from '@/features/track/track-queries';

export async function LibraryGrid() {
  const { tracks } = await getLibrary();
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {tracks.map(track => (
        <AlbumCard key={track.id} track={track} />
      ))}
    </div>
  );
}

export function LibraryGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <AlbumCardSkeleton key={i} />
      ))}
    </div>
  );
}
