'use client';

import { NavLink } from './ui/nav-link';
import type { Route } from 'next';

type CommonProps = {
  href: Route;
  icon: React.ReactNode | null;
  label: string;
};

const sidebarLinkBase =
  'flex items-center justify-center gap-3 rounded-md p-2 text-sm tracking-tight transition-colors lg:justify-start lg:px-3';

const mobileTabBase = 'flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] transition-colors';

export function SidebarNavLink({ href, icon, label }: CommonProps) {
  return (
    <NavLink
      href={href}
      aria-label={label}
      className={({ isActive }) =>
        `${sidebarLinkBase} ${
          isActive
            ? 'bg-white/10 font-bold text-black dark:text-white [&_svg]:stroke-[2.5]'
            : 'text-muted hover:text-black dark:hover:text-white'
        }`
      }
    >
      {icon}
      <span className="hidden truncate lg:inline">{label}</span>
    </NavLink>
  );
}

export function MobileTabLink({ href, icon, label }: CommonProps) {
  return (
    <NavLink
      href={href}
      aria-label={label}
      className={({ isActive }) =>
        `${mobileTabBase} ${
          isActive
            ? 'text-accent font-bold [&_svg]:stroke-[2.5]'
            : 'text-gray font-medium hover:text-black dark:hover:text-white'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
