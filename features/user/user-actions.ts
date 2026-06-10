'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';

const SESSION_COOKIE = 'beats-user';

export async function signIn(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim() || 'listener';
  const user = await prisma.user.upsert({
    where: { name },
    create: { name },
    update: {},
  });
  const store = await cookies();
  store.set(SESSION_COOKIE, user.id, { path: '/', sameSite: 'lax' });
  redirect('/');
}

export async function signOut() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect('/login');
}
