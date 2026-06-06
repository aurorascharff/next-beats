import { isPrefetchEnabled } from './demo-actions';
import { DemoToolbar } from './demo-toolbar';

export async function DemoToggles() {
  const enabled = await isPrefetchEnabled();

  return <DemoToolbar prefetchEnabled={enabled} />;
}
