import { NextResponse, type NextRequest } from 'next/server';

const SESSION_COOKIE = 'beats-user';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthed = request.cookies.has(SESSION_COOKIE);

  // Auth gate: redirect unauthed page visits to /login.
  // /login itself is excluded so the form can render.
  if (pathname !== '/login' && !isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Demo: rewrite into /noprefetch/* shell when prefetching is disabled.
  if (request.cookies.has('no-prefetch')) {
    const url = request.nextUrl.clone();
    url.pathname = `/noprefetch${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|noprefetch|api|icon|favicon).*)'],
};
