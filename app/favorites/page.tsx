import { Heart } from 'lucide-react';
import { Suspense, ViewTransition } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
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
    <div className="px-6 py-6 sm:px-8">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-linear-to-br from-indigo-500 to-purple-600">
          <Heart className="h-8 w-8 text-white" fill="white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Liked Tracks</h1>
          <p className="text-muted text-sm">Songs you&apos;ve favorited</p>
        </div>
      </div>
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
    </div>
  );
}
