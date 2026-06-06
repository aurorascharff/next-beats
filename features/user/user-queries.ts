import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';

const SESSION_COOKIE = 'beats-user';
const DEFAULT_USER = 'listener';

export const getCurrentUser = cache(async (): Promise<string> => {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? DEFAULT_USER;
});

export async function verifyAuth(): Promise<string> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  return user;
}
