import { Suspense } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import { PageWrapper } from '@/components/ui/page-layout';
import { CreatePlaylistForm } from '@/features/playlist/components/create-playlist-form';
import { PlaylistBrowse, PlaylistBrowseSkeleton } from '@/features/playlist/components/playlist-browse';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playlists',
};

export default function PlaylistsPage() {
  return (
    <PageWrapper title="Playlists">
      <div className="mb-6 max-w-md">
        <CreatePlaylistForm />
      </div>
      <Suspense fallback={<PlaylistBrowseSkeleton count={3} />}>
        <Crossfade>
          <PlaylistBrowse />
        </Crossfade>
      </Suspense>
    </PageWrapper>
  );
}
