import { Heart, Home, Library, ListMusic, Plus, Search, Music } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import ErrorBoundary from '@/components/ui/error-boundary';
import { GitHubIcon } from '@/components/ui/github-icon';
import { MusicNote } from '@/components/ui/music-note';
import { Skeleton } from '@/components/ui/skeleton';
import { getPlaylists } from '@/features/playlist/playlist-queries';
import { SidebarNavLink } from './nav-link-wrappers';
import type { Route } from 'next';

export function Sidebar() {
  return (
    <aside
      style={{ viewTransitionName: 'sidebar' }}
      className="hidden w-[4.5rem] flex-col gap-2 p-2 sm:flex lg:w-[17.5rem]"
    >
      {/* Top nav card */}
      <div className="bg-card dark:bg-card-dark rounded-lg p-3 lg:p-4">
        <Link
          href="/"
          className="mb-4 hidden items-center gap-2 px-1 text-xl font-bold tracking-tight text-blue-600 lg:inline-flex dark:text-blue-400"
          aria-label="NextBeats home"
        >
          <MusicNote size={24} className="text-blue-600 dark:text-blue-400" />
          <span>NextBeats</span>
        </Link>
        <nav className="flex flex-col gap-1 text-sm font-medium">
          <SidebarNavLink href="/" icon={<Home className="h-5 w-5" />} label="Home" />
          <SidebarNavLink href="/search" icon={<Search className="h-5 w-5" />} label="Search" />
          <SidebarNavLink href="/library" icon={<Music className="h-5 w-5" />} label="Library" />
        </nav>
      </div>

      {/* Library card */}
      <div className="bg-card dark:bg-card-dark flex min-h-0 flex-1 flex-col rounded-lg">
        <div className="flex items-center gap-2 px-3 py-3 lg:px-4">
          <Library className="text-gray h-5 w-5 shrink-0" />
          <span className="text-gray hidden text-sm font-bold lg:inline">Your Library</span>
          <Link
            href="/playlist"
            className="text-gray ml-auto hidden rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-black lg:block dark:hover:text-white"
            aria-label="Create playlist"
            title="Create playlist"
          >
            <Plus className="h-5 w-5" />
          </Link>
        </div>
        <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-2 pb-2">
          <SidebarNavLink href="/favorites" icon={<Heart className="h-4 w-4" />} label="Liked Tracks" />
          <SidebarNavLink href="/genre" icon={<ListMusic className="h-4 w-4" />} label="Genres" />
          <div className="border-divider dark:border-divider-dark my-1 hidden border-t lg:block" />
          <ErrorBoundary title="Playlists unavailable" compact>
            <Suspense fallback={<SidebarPlaylistsSkeleton />}>
              <SidebarPlaylists />
            </Suspense>
          </ErrorBoundary>
        </nav>
        <div className="border-divider dark:border-divider-dark hidden items-center justify-between border-t px-3 py-2 lg:flex">
          <ThemeToggle variant="inline" />
          <a
            href="https://github.com/vercel-labs/next-beats"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-1.5 text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
            aria-label="View source on GitHub"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </aside>
  );
}

async function SidebarPlaylists() {
  const playlists = await getPlaylists();
  if (playlists.length === 0) return null;
  return (
    <>
      {playlists.map(pl => (
        <SidebarNavLink
          key={pl.id}
          href={`/playlist/${pl.id}` as Route}
          icon={<span className={`inline-block h-3 w-3 shrink-0 rounded-sm bg-gradient-to-br ${pl.coverColor}`} />}
          label={pl.name}
        />
      ))}
    </>
  );
}

function SidebarPlaylistsSkeleton() {
  return (
    <div className="hidden flex-col gap-0.5 lg:flex">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex min-h-9 items-center gap-3 rounded-md p-2 lg:px-3">
          <Skeleton className="h-3 w-3 shrink-0 rounded-sm" />
        </div>
      ))}
    </div>
  );
}
