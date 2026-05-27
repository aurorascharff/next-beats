import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import { Skeleton } from '@/components/ui/skeleton';
import { TopGenresGrid } from '@/features/genre/components/genre-browse';
import { PlaylistBrowse } from '@/features/playlist/components/playlist-browse';
import { LibraryGrid } from '@/features/track/components/library-grid';
import { QuickPlayGrid, QuickPlayGridSkeleton } from '@/features/track/components/quick-play-grid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Library',
};

export const unstable_prefetch = 'force-runtime';

export default function LibraryPage() {
  return (
    <div className="px-6 py-6 sm:px-8">
      <h1 className="mb-6 text-3xl font-bold">Your Library</h1>
      <section className="mb-10">
        <h2 className="mb-4">Jump Back In</h2>
        <Suspense fallback={<QuickPlayGridSkeleton />}>
          <Crossfade>
            <QuickPlayGrid />
          </Crossfade>
        </Suspense>
      </section>
      <Suspense
        fallback={
          <section className="mb-10">
            <h2 className="mb-4">All Tracks</h2>
            <div className="p-3">
              <Skeleton className="h-40 w-40 rounded-md" />
            </div>
          </section>
        }
      >
        <Crossfade>
          <section className="mb-10">
            <h2 className="mb-4">All Tracks</h2>
            <LibraryGrid />
          </section>
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-2">
              <h2>Your Playlists</h2>
              <Link
                href="/playlist"
                className="text-gray rounded-full p-1 transition-colors hover:bg-black/10 hover:text-black dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Create playlist"
                title="Create playlist"
              >
                <Plus className="h-5 w-5" />
              </Link>
            </div>
            <PlaylistBrowse />
          </section>
          <section>
            <h2 className="mb-4">Genres</h2>
            <TopGenresGrid />
          </section>
        </Crossfade>
      </Suspense>
    </div>
  );
}
