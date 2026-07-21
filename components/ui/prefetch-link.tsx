'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { usePrefetchDefault } from '@/components/demo/prefetch-provider';
import type { Route } from 'next';

type Props<T extends string = string> = Omit<React.ComponentProps<typeof Link>, 'href' | 'prefetch'> & {
  href: Route<T> | URL;
};

// Fallback keeps the link in the static shell at App-Shell prefetch while the
// server cookie resolves, then upgrades to full prefetch if it's enabled.
export function PrefetchLink<T extends string>({ href, ...props }: Props<T>) {
  return (
    <Suspense fallback={<Link {...props} href={href as Route} prefetch={null} />}>
      <ResolvedLink href={href} {...props} />
    </Suspense>
  );
}

function ResolvedLink<T extends string>({ href, ...props }: Props<T>) {
  return <Link {...props} href={href as Route} prefetch={usePrefetchDefault()} />;
}
