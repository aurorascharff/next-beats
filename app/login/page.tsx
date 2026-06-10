import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { MusicNote } from '@/components/ui/music-note';
import { signIn } from '@/features/user/user-actions';

const SESSION_COOKIE = 'beats-user';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Suspense>
        <RedirectIfAuthed />
      </Suspense>
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
          <MusicNote size={28} className="text-accent" />
          <span>NextBeats</span>
        </div>
        <form action={signIn} className="flex flex-col gap-3">
          <label htmlFor="name" className="text-muted text-sm">
            Sign in with a display name
          </label>
          <input id="name" name="name" type="text" autoComplete="username" required autoFocus placeholder="Aurora" />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

async function RedirectIfAuthed() {
  const store = await cookies();
  if (store.has(SESSION_COOKIE)) redirect('/');
  return null;
}
