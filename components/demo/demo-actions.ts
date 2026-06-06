'use server';

import { cookies, draftMode } from 'next/headers';

const COOKIE_NAME = 'no-prefetch';

export async function togglePrefetch(enable: boolean) {
  const store = await cookies();
  if (enable) {
    store.delete(COOKIE_NAME);
  } else {
    store.set(COOKIE_NAME, '1', { path: '/', sameSite: 'lax' });
  }
}

export async function setCacheDisabled(disabled: boolean) {
  const draft = await draftMode();
  const store = await cookies();
  if (disabled) {
    if (!draft.isEnabled) draft.enable();
    // Cache off implies prefetch off: prefetching would repopulate the client navigation cache instantly.
    store.set(COOKIE_NAME, '1', { path: '/', sameSite: 'lax' });
  } else {
    if (draft.isEnabled) draft.disable();
  }
}

export async function isPrefetchEnabled() {
  const store = await cookies();
  return !store.has(COOKIE_NAME);
}

export async function isCacheDisabled() {
  const draft = await draftMode();
  return draft.isEnabled;
}
