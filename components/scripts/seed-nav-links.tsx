// Pre-hydration script that sets `aria-current="page"` on matching NavLinks.
// Runs during HTML parse so the active style appears in the first paint; React
// then takes over after hydration. Mirrors the segment-equality check in
// <NavLink>.
export function SeedNavLinks() {
  const html = `(function(){
  var path = location.pathname.split('?')[0].split('#')[0].split('/').filter(Boolean);
  document.querySelectorAll('a[data-nav-link]').forEach(function(a){
    var want = (a.getAttribute('href') || '').split('?')[0].split('#')[0].split('/').filter(Boolean);
    var active = want.length === path.length && want.every(function(s, i){ return s === path[i]; });
    if (active) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
})()`;
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
