'use client';

import Link, { useLinkStatus } from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { Boundary } from '@/components/demo/boundary';
import type { Route } from 'next';

type RenderProps = { isActive: boolean; isPending: boolean };
type Renderable<T> = T | ((props: RenderProps) => T);

type Props<T extends string = string> = Omit<React.ComponentProps<typeof Link>, 'href' | 'className' | 'children'> & {
  href: Route<T> | URL;
  className?: Renderable<string | undefined>;
  children?: Renderable<React.ReactNode>;
  exact?: boolean;
};

function checkActive(pathname: string, href: string, exact?: boolean): boolean {
  if (exact || href === '/') return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function resolve<T>(value: Renderable<T> | undefined, props: RenderProps): T | undefined {
  return typeof value === 'function' ? (value as (p: RenderProps) => T)(props) : value;
}

// `<Link>` with active and pending state.
// - `className` accepts a value or `({ isActive }) => value`.
// - `children` accepts a value or `({ isActive, isPending }) => value`.
// - Sets `aria-current="page"` when active.
//
// Outer `<Suspense>` makes `usePathname` safe under `cacheComponents` on
// dynamic routes; the fallback renders the link inactive so layout is stable.
export function NavLink<T extends string>(props: Props<T>) {
  return (
    <Boundary label="NavLink">
      <Suspense fallback={<NavLinkShell {...props} isActive={false} />}>
        <NavLinkInner {...props} />
      </Suspense>
    </Boundary>
  );
}

function NavLinkInner<T extends string>(props: Props<T>) {
  const pathname = usePathname();
  const isActive = checkActive(pathname, props.href.toString(), props.exact);
  return <NavLinkShell {...props} isActive={isActive} />;
}

function NavLinkShell<T extends string>({
  href,
  className,
  children,
  exact: _exact,
  isActive,
  ...rest
}: Props<T> & { isActive: boolean }) {
  return (
    <Link
      href={href as Route}
      aria-current={isActive ? 'page' : undefined}
      className={resolve(className, { isActive, isPending: false })}
      {...rest}
    >
      <PendingIndicator isActive={isActive}>{children}</PendingIndicator>
    </Link>
  );
}

function PendingIndicator({ isActive, children }: { isActive: boolean; children?: Renderable<React.ReactNode> }) {
  const { pending } = useLinkStatus();
  return <>{resolve(children, { isActive, isPending: pending })}</>;
}
