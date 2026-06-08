import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
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
  if (!user) redirect('/login');
  return user.name;
});

export async function verifyAuth(): Promise<string> {
  return getCurrentUser();
}
