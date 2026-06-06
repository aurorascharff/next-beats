import { isCacheDisabled, isPrefetchEnabled } from './demo-actions';
import { DemoToolbar } from './demo-toolbar';

export async function DemoToggles() {
  const [prefetchEnabled, cacheDisabled] = await Promise.all([isPrefetchEnabled(), isCacheDisabled()]);

  return <DemoToolbar prefetchEnabled={prefetchEnabled} cacheDisabled={cacheDisabled} />;
}
