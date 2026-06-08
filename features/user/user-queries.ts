import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';
import { prisma } from '@/lib/db';

const SESSION_COOKIE = 'beats-user';

export const getCurrentUser = cache(async (): Promise<string> => {
  'use cache: private';

  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? '';
});

export const getCurrentUserName = cache(async (): Promise<string> => {
  const userId = await getCurrentUser();
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });
  return user?.name ?? 'listener';
});

export async function verifyAuth(): Promise<string> {
  return getCurrentUser();
}
