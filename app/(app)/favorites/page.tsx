import { Suspense } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import ErrorBoundary from '@/components/ui/error-boundary';
import { PageHeader } from '@/components/ui/page-layout';
import { TopGenresGrid } from '@/features/genre/components/genre-browse';
import { Discover, DiscoverSkeleton } from '@/features/track/components/discover';
import { FavoritesFeed } from '@/features/track/components/favorites-feed';
import { TrackListSkeleton } from '@/features/track/components/track-row';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liked Tracks',
};

export default function FavoritesPage() {
  return (
    <PageHeader title="Liked Tracks">
      <Suspense fallback={<TrackListSkeleton count={5} showIndex />}>
        <Crossfade>
          <FavoritesFeed />
        </Crossfade>
        <ErrorBoundary title="Couldn't load recommendations">
          <h2 className="mt-10 mb-4">You Might Also Like</h2>
          <Suspense fallback={<DiscoverSkeleton />}>
            <Crossfade>
              <Discover />
            </Crossfade>
            <Crossfade>
              <section className="mt-10">
                <h2 className="mb-4">Explore Genres</h2>
                <TopGenresGrid />
              </section>
            </Crossfade>
          </Suspense>
        </ErrorBoundary>
      </Suspense>
    </PageHeader>
  );
}
