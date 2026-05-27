import { cookies } from 'next/headers';
import { DemoToolbar } from './demo-toolbar';

const COOKIE_NAME = 'no-prefetch';

export async function DemoToggles() {
  const store = await cookies();
  const enabled = !store.has(COOKIE_NAME);

  async function toggleAction(enable: boolean) {
    'use server';
    const store = await cookies();
    if (enable) {
      store.delete(COOKIE_NAME);
    } else {
      store.set(COOKIE_NAME, '1', { path: '/', sameSite: 'lax' });
    }
  }

  return <DemoToolbar prefetchEnabled={enabled} togglePrefetchAction={toggleAction} />;
}
