import { Suspense } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import { GenreBrowse, GenreBrowseSkeleton } from '@/features/genre/components/genre-browse';
import { MostPlayed } from '@/features/track/components/most-played';
import { QuickPlayGrid, QuickPlayGridSkeleton } from '@/features/track/components/quick-play-grid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Genres',
};

export const unstable_prefetch = 'force-runtime';

export default function GenresPage() {
  return (
    <div className="px-6 py-6 sm:px-8">
      <h1 className="mb-6 text-3xl font-bold">Browse All</h1>
      <Suspense fallback={<GenreBrowseSkeleton />}>
        <Crossfade>
          <GenreBrowse />
        </Crossfade>
      </Suspense>
      <Suspense
        fallback={
          <>
            <section className="mt-10">
              <h2 className="mb-4">Jump Back In</h2>
              <QuickPlayGridSkeleton />
            </section>
          </>
        }
      >
        <Crossfade>
          <section className="mt-10">
            <h2 className="mb-4">Jump Back In</h2>
            <QuickPlayGrid />
          </section>
          <section className="mt-10">
            <h2 className="mb-4">Popular Tracks</h2>
            <MostPlayed />
          </section>
        </Crossfade>
      </Suspense>
    </div>
  );
}
