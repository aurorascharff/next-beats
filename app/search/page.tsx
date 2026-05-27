import { Suspense } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import ErrorBoundary from '@/components/ui/error-boundary';
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
    <div className="px-6 py-6 sm:px-8">
      <h1 className="mb-6 text-3xl font-bold">Search</h1>
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
    </div>
  );
}
