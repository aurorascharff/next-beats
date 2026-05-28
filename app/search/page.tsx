import { Suspense } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import ErrorBoundary from '@/components/ui/error-boundary';
import { PageHeader } from '@/components/ui/page-layout';
import { GenreBrowse, GenreBrowseSkeleton } from '@/features/genre/components/genre-browse';
import { SearchInput } from '@/features/search/components/search-input';
import { SearchResults } from '@/features/search/components/search-results';
import { TrackListSkeleton } from '@/features/track/components/track-row';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
};

export const unstable_prefetch = 'force-runtime';

export default function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return (
    <PageHeader title="Search">
      <div className="mb-8">
        <SearchInput />
      </div>
      <ErrorBoundary title="Search is taking a breather">
        <Suspense
          fallback={
            <>
              <h2 className="mb-4">Browse All</h2>
              <GenreBrowseSkeleton />
            </>
          }
        >
          <Crossfade>
            {searchParams.then(sp => {
              const q = typeof sp.q === 'string' ? sp.q : '';
              if (!q) {
                return (
                  <>
                    <h2 className="mb-4">Browse All</h2>
                    <GenreBrowse />
                  </>
                );
              }
              return (
                <Suspense fallback={<TrackListSkeleton count={5} />}>
                  <SearchResults query={q} />
                </Suspense>
              );
            })}
          </Crossfade>
        </Suspense>
      </ErrorBoundary>
    </PageHeader>
  );
}
