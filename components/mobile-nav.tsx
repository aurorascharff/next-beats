import { Heart, Home, Library, Search } from 'lucide-react';
import { NavLink } from './ui/nav-link';

const mobileTab = ({ isActive }: { isActive: boolean }) =>
  `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] transition-colors ${
    isActive
      ? 'text-accent font-bold [&_svg]:stroke-[2.5]'
      : 'text-gray font-medium hover:text-black dark:hover:text-white'
  }`;

export function MobileTabBar() {
  return (
    <nav
      aria-label="Primary"
      style={{ viewTransitionName: 'mobile-nav' }}
      className="border-divider/70 dark:border-divider-dark/70 flex w-full shrink-0 border-t bg-white pb-[env(safe-area-inset-bottom)] sm:hidden dark:bg-[#181818]"
    >
      <NavLink href="/" aria-label="Home" className={mobileTab}>
        <Home className="h-5 w-5" />
        <span>Home</span>
      </NavLink>
      <NavLink href="/search" aria-label="Search" className={mobileTab}>
        <Search className="h-5 w-5" />
        <span>Search</span>
      </NavLink>
      <NavLink href="/library" aria-label="Library" className={mobileTab}>
        <Library className="h-5 w-5" />
        <span>Library</span>
      </NavLink>
      <NavLink href="/favorites" aria-label="Liked" className={mobileTab}>
        <Heart className="h-5 w-5" />
        <span>Liked</span>
      </NavLink>
    </nav>
  );
}
