'use client';

import Link, { useLinkStatus } from 'next/link';
import { useClientPathname } from '@/hooks/use-client-pathname';
import type { Route } from 'next';

type ActiveProps = { isActive: boolean };
type RenderProps = ActiveProps & { isPending: boolean };

type Props<T extends string = string> = {
  href: Route<T> | URL;
  className: string | ((props: ActiveProps) => string);
  children: React.ReactNode | ((props: RenderProps) => React.ReactNode);
  exact?: boolean;
} & Omit<React.ComponentProps<typeof Link>, 'href' | 'className' | 'children'>;

function checkActive(pathname: string | null, href: string, exact: boolean): boolean {
  if (pathname === null) return false;
  if (exact || href === '/') return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function resolve<T, P>(value: T | ((props: P) => T), props: P): T {
  return typeof value === 'function' ? (value as (props: P) => T)(props) : value;
}

export function NavLink<T extends string>({ href, className, children, exact = false, ...rest }: Props<T>) {
  const pathname = useClientPathname();
  const isActive = checkActive(pathname, href.toString(), exact);

  return (
    <Link
      href={href as Route}
      aria-current={isActive ? 'page' : undefined}
      className={resolve(className, { isActive })}
      data-navlink-href={href.toString()}
      data-navlink-exact={exact || undefined}
      data-navlink-active={resolve(className, { isActive: true })}
      data-navlink-inactive={resolve(className, { isActive: false })}
      data-client="NavLink"
      suppressHydrationWarning
      {...rest}
    >
      <NavLinkContent isActive={isActive}>{children}</NavLinkContent>
    </Link>
  );
}

function NavLinkContent({ isActive, children }: { isActive: boolean; children: Props['children'] }) {
  const { pending } = useLinkStatus();
  return <>{resolve(children, { isActive, isPending: pending })}</>;
}
