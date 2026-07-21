import { ViewTransition } from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { PlaylistCard } from '@/features/playlist/components/playlist-card';
import { searchPlaylists } from '@/features/playlist/playlist-queries';
import { TrackRow } from '@/features/track/components/track-row';
import { searchTracks } from '@/features/track/track-queries';

export async function SearchResults({ query }: { query: string }) {
  const [tracks, playlists] = await Promise.all([searchTracks(query), searchPlaylists(query)]);

  if (tracks.length === 0 && playlists.length === 0) {
    return <EmptyState title="No results" body={`No tracks or playlists match "${query}".`} />;
  }

  return (
    <div className="flex flex-col gap-10">
      {tracks.length > 0 && (
        <section>
          <h2 className="mb-4">Tracks</h2>
          <div className="flex flex-col gap-0.5">
            {tracks.map((track, i) => (
              <ViewTransition key={track.id} name={`search-track-${track.id}`} share="morph" default="none">
                <TrackRow track={track} index={i} queue={tracks} />
              </ViewTransition>
            ))}
          </div>
        </section>
      )}
      {playlists.length > 0 && (
        <section>
          <h2 className="mb-4">Playlists</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {playlists.map(pl => (
              <ViewTransition key={pl.id} name={`search-playlist-${pl.id}`} share="morph" default="none">
                <PlaylistCard playlist={pl} />
              </ViewTransition>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
