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

export async function toggleDraftMode() {
  const draft = await draftMode();
  if (draft.isEnabled) {
    draft.disable();
  } else {
    draft.enable();
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
