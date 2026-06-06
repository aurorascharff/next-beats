import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import { DemoToggles } from '@/components/demo/demo-toggles';
import { BoundaryProvider } from '@/components/internal/boundary-provider';
import { MobileTabBar } from '@/components/mobile-nav';
import { NowPlayingBar } from '@/components/now-playing-bar';
import { OfflineIndicator } from '@/components/offline-indicator';
import { SeedNavLinksFromPathname } from '@/components/scripts/seed-nav-links-from-pathname';
import { Sidebar } from '@/components/sidebar';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { PlayerProvider } from '@/providers/player-provider';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  description:
    'A Next.js 16.3 music player demonstrating Instant Navigations — Partial Prefetching, Navigation Inspector, Instant Insights, and Optimistic Routing.',
  title: {
    default: 'NextBeats',
    template: '%s · NextBeats',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="bg-surface dark:bg-surface-dark flex h-[100dvh] flex-col text-black antialiased dark:text-white">
        <ThemeProvider>
          <BoundaryProvider>
            <OfflineIndicator />
            <PlayerProvider>
              <div className="flex min-h-0 flex-1">
                <Sidebar />
                <main className="min-w-0 flex-1 overflow-y-auto pb-24 sm:pb-0">{children}</main>
              </div>
              <NowPlayingBar />
              <MobileTabBar />
              <SeedNavLinksFromPathname />
            </PlayerProvider>
            <div className="demo-toggles fixed top-3 right-3 z-50 hidden items-end gap-2 sm:flex">
              <Suspense>
                <DemoToggles />
              </Suspense>
            </div>
            <Toaster
              theme="system"
              position="bottom-right"
              toastOptions={{ style: { viewTransitionName: 'none' } }}
              style={{ zIndex: 9999 }}
            />
          </BoundaryProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
