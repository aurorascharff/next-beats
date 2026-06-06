import { PageHeader } from '@/components/ui/page-layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <PageHeader title="Welcome back">
      {/* Recently played: quick play grid */}
      {/* Most played tracks */}
      {/* Your playlists */}
      {/* Browse genres */}
    </PageHeader>
  );
}
