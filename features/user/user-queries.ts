import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/lib/db';

const SESSION_COOKIE = 'beats-user';

export const getCurrentUser = cache(async () => {
  const store = await cookies();
  const userId = store.get(SESSION_COOKIE)?.value;
  if (!userId) return '';
  const exists = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  return exists?.id ?? '';
});

export const getCurrentUserName = cache(async () => {
  const userId = await getCurrentUser();
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });
  return user?.name ?? 'listener';
});

export async function verifyAuth() {
  const userId = await getCurrentUser();
  if (!userId) {
    const store = await cookies();
    store.delete(SESSION_COOKIE);
    redirect('/login');
  }
  return userId;
}
