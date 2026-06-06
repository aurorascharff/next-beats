import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

const SESSION_COOKIE = 'beats-user';

export const getCurrentUser = cache(async (): Promise<string> => {
  'use cache: private';

  const store = await cookies();
  const user = store.get(SESSION_COOKIE)?.value;
  if (!user) redirect('/login');
  return user;
});

export async function verifyAuth(): Promise<string> {
  return getCurrentUser();
}
