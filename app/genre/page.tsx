import { Suspense } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import { PageHeader } from '@/components/ui/page-layout';
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
    <PageHeader title="Browse All">
      <Suspense fallback={<GenreBrowseSkeleton />}>
        <Crossfade>
          <GenreBrowse />
        </Crossfade>
      </Suspense>
      <h2 className="mt-10 mb-4">Jump Back In</h2>
      <Suspense fallback={<QuickPlayGridSkeleton />}>
        <Crossfade>
          <QuickPlayGrid />
          <section className="mt-10">
            <h2 className="mb-4">Popular Tracks</h2>
            <MostPlayed />
          </section>
        </Crossfade>
      </Suspense>
    </PageHeader>
  );
}
