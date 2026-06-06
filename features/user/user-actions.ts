'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE = 'beats-user';

export async function signIn(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim() || 'listener';
  const store = await cookies();
  store.set(SESSION_COOKIE, name, { path: '/', sameSite: 'lax' });
  redirect('/');
}

export async function signOut() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect('/login');
}
