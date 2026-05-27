import { Suspense } from 'react';
import { Crossfade } from '@/components/ui/crossfade';
import { CreatePlaylistForm } from '@/features/playlist/components/create-playlist-form';
import { PlaylistBrowse, PlaylistBrowseSkeleton } from '@/features/playlist/components/playlist-browse';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playlists',
};

export const unstable_prefetch = 'force-runtime';

export default function PlaylistsPage() {
  return (
    <div className="px-6 py-6 sm:px-8">
      <h1 className="mb-6 text-3xl font-bold">Playlists</h1>
      <div className="mb-6 max-w-md">
        <CreatePlaylistForm />
      </div>
      <Suspense fallback={<PlaylistBrowseSkeleton count={3} />}>
        <Crossfade>
          <PlaylistBrowse />
        </Crossfade>
      </Suspense>
    </div>
  );
}
