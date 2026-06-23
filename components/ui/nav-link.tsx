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

// `useSelectedLayoutSegments` is dynamic under `cacheComponents`, so the
// active-state computation has to live behind a Suspense boundary. The
// fallback renders the same DOM shape with `isActive=false` so React
// reconciles the resolved tree in place — no element swap, no flash.
export function NavLink<T extends string>(props: Props<T>) {
  return (
    <Boundary label="NavLink">
      <Suspense fallback={<NavLinkShell {...props} isActive={false} />}>
        <ActiveLink {...props} />
      </Suspense>
    </Boundary>
  );
}

function ActiveLink<T extends string>(props: Props<T>) {
  const segments = useSelectedLayoutSegments();
  const prefetch = usePrefetchDefault();
  const want = props.href.toString().split('?')[0].split('#')[0].split('/').filter(Boolean);
  const isActive = want.length === segments.length && want.every((s, i) => s === segments[i]);
  return <NavLinkShell {...props} isActive={isActive} prefetch={prefetch} />;
}

function NavLinkShell<T extends string>({
  href,
  isActive,
  prefetch = true,
  ...rest
}: Props<T> & { isActive: boolean; prefetch?: boolean }) {
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
