import { isPrefetchEnabled, isRuntimeEnabled } from '@/components/demo/demo-actions';
import { DemoToolbarClient } from './demo-toolbar-client';

export async function DemoToolbar() {
  const [prefetchEnabled, runtimeEnabled] = await Promise.all([isPrefetchEnabled(), isRuntimeEnabled()]);
  return <DemoToolbarClient prefetchEnabled={prefetchEnabled} runtimeEnabled={runtimeEnabled} />;
}
