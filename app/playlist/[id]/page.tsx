import { Suspense, ViewTransition } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import { OtherPlaylists } from '@/features/playlist/components/playlist-browse';
import { PlaylistDetail, PlaylistDetailSkeleton } from '@/features/playlist/components/playlist-detail';
import { getPlaylist } from '@/features/playlist/playlist-queries';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const playlist = await getPlaylist(id);
  return { title: playlist.name };
}

export const unstable_prefetch = 'force-runtime';

export default function PlaylistDetailPage({ params }: Props) {
  return (
    <div className="px-6 py-6 sm:px-8">
      <Suspense fallback={<PlaylistDetailSkeleton />}>
        <Crossfade>
          {params.then(({ id }) => (
            <>
              <PlaylistDetail id={id} />
              <ViewTransition>
                <section className="mt-10">
                  <h2 className="mb-4">Other Playlists</h2>
                  <OtherPlaylists excludeId={id} />
                </section>
              </ViewTransition>
            </>
          ))}
        </Crossfade>
      </Suspense>
    </div>
  );
}
