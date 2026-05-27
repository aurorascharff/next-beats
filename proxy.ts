import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const noPrefetch = request.cookies.has('no-prefetch');
  if (noPrefetch) {
    const url = request.nextUrl.clone();
    url.pathname = `/noprefetch${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|noprefetch|api|icon|favicon).*)'],
};
