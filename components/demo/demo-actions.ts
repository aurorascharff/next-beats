'use server';

import { updateTag } from 'next/cache';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'no-prefetch';

const BUST_TAGS = ['library', 'tracks', 'favorites', 'recently-played', 'playlists', 'genres', 'search'] as const;

export async function togglePrefetch(enable: boolean) {
  const store = await cookies();
  if (enable) {
    store.delete(COOKIE_NAME);
  } else {
    store.set(COOKIE_NAME, '1', { path: '/', sameSite: 'lax' });
  }
}

export async function bustCache() {
  for (const tag of BUST_TAGS) updateTag(tag);
}

export async function isPrefetchEnabled() {
  const store = await cookies();
  return !store.has(COOKIE_NAME);
}
