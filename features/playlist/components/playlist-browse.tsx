import { EmptyState } from '@/components/ui/empty-state';
import { PlaylistList, PlaylistListSkeleton } from '@/features/playlist/components/playlist-card';
import { getPlaylists } from '@/features/playlist/playlist-queries';

export async function PlaylistBrowse() {
  const playlists = await getPlaylists();
  if (playlists.length === 0) {
    return <EmptyState title="No playlists" body="Create your first playlist." />;
  }
  return <PlaylistList prefetch={true} playlists={playlists} />;
}

export async function OtherPlaylists({ excludeId }: { excludeId: string }) {
  const playlists = await getPlaylists();
  const filtered = playlists.filter(p => p.id !== excludeId);
  if (filtered.length === 0) return null;
  return <PlaylistList prefetch={true} playlists={filtered} />;
}

export { PlaylistListSkeleton as PlaylistBrowseSkeleton } from '@/features/playlist/components/playlist-card';
