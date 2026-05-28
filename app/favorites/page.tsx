import { Suspense, ViewTransition } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import { PageHeader } from '@/components/ui/page-layout';
import { TopGenresGrid } from '@/features/genre/components/genre-browse';
import { FavoritesFeed } from '@/features/track/components/favorites-feed';
import { MostPlayed } from '@/features/track/components/most-played';
import { TrackListSkeleton } from '@/features/track/components/track-row';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liked Tracks',
};

export const unstable_prefetch = 'force-runtime';

export default function FavoritesPage() {
  return (
    <PageHeader title="Liked Tracks">
      <Suspense fallback={<TrackListSkeleton count={5} showIndex />}>
        <Crossfade>
          <FavoritesFeed />
          <ViewTransition>
            <section className="mt-10">
              <h2 className="mb-4">You Might Also Like</h2>
              <MostPlayed />
            </section>
            <section className="mt-10">
              <h2 className="mb-4">Explore Genres</h2>
              <TopGenresGrid />
            </section>
          </ViewTransition>
        </Crossfade>
      </Suspense>
    </PageHeader>
  );
}
