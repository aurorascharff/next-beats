import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track',
};

export default function TrackPage({ params: _params }: PageProps<'/track/[id]'>) {
  return <div>{/* Track detail: album art, title, play & favorite, related tracks */}</div>;
}
