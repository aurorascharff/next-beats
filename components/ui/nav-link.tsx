'use client';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Suspense } from 'react';
import { Boundary } from '@/components/demo/boundary';
import { usePrefetchDefault } from '@/components/demo/prefetch-provider';
import type { Route } from 'next';

type Props<T extends string = string> = Omit<React.ComponentProps<typeof Link>, 'href' | 'prefetch'> & {
  href: Route<T> | URL;
};

export function NavLink<T extends string>(props: Props<T>) {
  return (
    <Boundary label="NavLink">
      <Suspense fallback={<NavLinkShell {...props} isActive={false} />}>
        <ActiveLink {...props} />
      </Suspense>
    </Boundary>
  );
}

export function NavLinkSkeleton<T extends string>(props: Props<T>) {
  return <NavLinkShell {...props} isActive={false} />;
}

function ActiveLink<T extends string>(props: Props<T>) {
  const segments = useSelectedLayoutSegments();
  const want = props.href.toString().split('?')[0].split('#')[0].split('/').filter(Boolean);
  const isActive = want.length === segments.length && want.every((s, i) => s === segments[i]);
  return <NavLinkShell {...props} isActive={isActive} />;
}

// Single source of truth for the rendered <a>. Fallback and resolved tree
// both come through here, so React reconciles them in place instead of
// swapping one DOM element for another during the Suspense boundary
// transition — which was making clicks land on a node that got replaced
// mid-handler.
function NavLinkShell<T extends string>({ href, isActive, ...rest }: Props<T> & { isActive: boolean }) {
  const prefetch = usePrefetchDefault();
  return (
    <Link
      prefetch={prefetch}
      {...rest}
      href={href as Route}
      data-nav-link
      aria-current={isActive ? 'page' : undefined}
      suppressHydrationWarning
    />
  );
}
