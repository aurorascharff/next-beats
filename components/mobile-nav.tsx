import { Heart, Home, Library, Search } from 'lucide-react';
import { MobileTabLink } from './nav-link-wrappers';

export function MobileTabBar() {
  return (
    <nav
      aria-label="Primary"
      style={{ viewTransitionName: 'mobile-nav' }}
      className="border-divider/70 dark:border-divider-dark/70 flex w-full shrink-0 border-t bg-white pb-[env(safe-area-inset-bottom)] sm:hidden dark:bg-[#181818]"
    >
      <MobileTabLink href="/" icon={<Home className="h-5 w-5" />} label="Home" />
      <MobileTabLink href="/search" icon={<Search className="h-5 w-5" />} label="Search" />
      <MobileTabLink href="/library" icon={<Library className="h-5 w-5" />} label="Library" />
      <MobileTabLink href="/favorites" icon={<Heart className="h-5 w-5" />} label="Liked" />
    </nav>
  );
}
