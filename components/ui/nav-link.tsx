'use client';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Suspense } from 'react';
import { Boundary } from '@/components/demo/boundary';
import type { Route } from 'next';

type Props<T extends string = string> = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  href: Route<T> | URL;
};

export function NavLink<T extends string>(props: Props<T>) {
  return (
    <Boundary label="NavLink">
      <Suspense fallback={<NavLinkSkeleton {...props} />}>
        <ActiveLink {...props} />
      </Suspense>
    </Boundary>
  );
}

export function NavLinkSkeleton<T extends string>({ href, ...rest }: Props<T>) {
  return <Link {...rest} href={href as Route} />;
}

function ActiveLink<T extends string>({ href, ...rest }: Props<T>) {
  const segments = useSelectedLayoutSegments();
  const want = href.toString().split('?')[0].split('#')[0].split('/').filter(Boolean);
  const isActive = want.length === segments.length && want.every((s, i) => s === segments[i]);
  return <Link {...rest} href={href as Route} aria-current={isActive ? 'page' : undefined} />;
}
