import { Suspense } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import { TopGenresGrid } from '@/features/genre/components/genre-browse';
import { PlaylistBrowse } from '@/features/playlist/components/playlist-browse';
import { MostPlayed, MostPlayedSkeleton } from '@/features/track/components/most-played';
import { QuickPlayGrid, QuickPlayGridSkeleton } from '@/features/track/components/quick-play-grid';

export const unstable_prefetch = 'force-runtime';

export default function HomePage() {
  return (
    <div className="px-6 py-6 sm:px-8">
      <h1 className="mb-6 text-3xl font-bold">Good evening</h1>
      <Suspense fallback={<QuickPlayGridSkeleton />}>
        <Crossfade>
          <QuickPlayGrid />
        </Crossfade>
      </Suspense>
      <Suspense
        fallback={
          <section className="mt-10">
            <h2 className="mb-4">Most Played</h2>
            <MostPlayedSkeleton />
          </section>
        }
      >
        <Crossfade>
          <section className="mt-10">
            <h2 className="mb-4">Most Played</h2>
            <MostPlayed />
          </section>
          <section className="mt-10">
            <h2 className="mb-4">Your Playlists</h2>
            <PlaylistBrowse />
          </section>
          <section className="mt-10">
            <h2 className="mb-4">Browse Genres</h2>
            <TopGenresGrid />
          </section>
        </Crossfade>
      </Suspense>
    </div>
  );
}
