import { MobileTabBar } from '@/components/mobile-nav';
import { NowPlayingBar } from '@/components/now-playing-bar';
import { SeedNavLinksFromPathname } from '@/components/scripts/seed-nav-links-from-pathname';
import { Sidebar } from '@/components/sidebar';
import { PlayerProvider } from '@/providers/player-provider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-y-auto pb-24 sm:pb-0">{children}</main>
      </div>
      <NowPlayingBar />
      <MobileTabBar />
      <SeedNavLinksFromPathname />
    </PlayerProvider>
  );
}
