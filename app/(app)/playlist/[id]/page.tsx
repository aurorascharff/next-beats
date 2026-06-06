import { Suspense, ViewTransition } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import ErrorBoundary from '@/components/ui/error-boundary';
import { PageWrapper } from '@/components/ui/page-layout';
import { OtherPlaylists, PlaylistBrowseSkeleton } from '@/features/playlist/components/playlist-browse';
import { PlaylistDetail, PlaylistDetailSkeleton } from '@/features/playlist/components/playlist-detail';
import { getPlaylist } from '@/features/playlist/playlist-queries';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps<'/playlist/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const playlist = await getPlaylist(id);
  return { title: playlist.name };
}

export default function PlaylistDetailPage({ params }: PageProps<'/playlist/[id]'>) {
  return (
    <PageWrapper>
      <Suspense fallback={<PlaylistDetailSkeleton />}>
        <Crossfade>
          {params.then(({ id }) => (
            <>
              <PlaylistDetail id={id} />
              <ViewTransition>
                <section className="mt-10">
                  <h2 className="mb-4">Other Playlists</h2>
                  <ErrorBoundary title="Couldn't load other playlists">
                    <Suspense fallback={<PlaylistBrowseSkeleton count={3} />}>
                      <Crossfade>
                        <OtherPlaylists excludeId={id} />
                      </Crossfade>
                    </Suspense>
                  </ErrorBoundary>
                </section>
              </ViewTransition>
            </>
          ))}
        </Crossfade>
      </Suspense>
    </PageWrapper>
  );
}
