import { Suspense, ViewTransition } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import ErrorBoundary from '@/components/ui/error-boundary';
import { PageHeader } from '@/components/ui/page-layout';
import { TopGenresGrid, TopGenresGridSkeleton } from '@/features/genre/components/genre-browse';
import { Discover } from '@/features/track/components/discover';
import { FavoritesFeed } from '@/features/track/components/favorites-feed';
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
            <ErrorBoundary title="Couldn't load recommendations">
              <section className="mt-10">
                <h2 className="mb-4">You Might Also Like</h2>
                <Discover />
              </section>
              <section className="mt-10">
                <h2 className="mb-4">Explore Genres</h2>
                <Suspense fallback={<TopGenresGridSkeleton />}>
                  <Crossfade>
                    <TopGenresGrid />
                  </Crossfade>
                </Suspense>
              </section>
            </ErrorBoundary>
          </ViewTransition>
        </Crossfade>
      </Suspense>
    </PageHeader>
  );
}
