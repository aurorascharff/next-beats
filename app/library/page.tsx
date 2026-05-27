import { Plus } from 'lucide-react';
import { Suspense } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import { IconButtonLink } from '@/components/ui/icon-button-link';
import { TopGenresGrid } from '@/features/genre/components/genre-browse';
import { PlaylistBrowse } from '@/features/playlist/components/playlist-browse';
import { MostPlayedSkeleton } from '@/features/track/components/most-played';
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
      <section className="mb-10">
        <h2 className="mb-4">All Tracks</h2>
        <Suspense fallback={<MostPlayedSkeleton />}>
          <Crossfade>
            <LibraryGrid />
          </Crossfade>
        </Suspense>
      </section>
      <Suspense>
        <Crossfade>
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-2">
              <h2>Your Playlists</h2>
              <IconButtonLink href="/playlist" label="Create playlist">
                <Plus className="h-5 w-5" />
              </IconButtonLink>
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
