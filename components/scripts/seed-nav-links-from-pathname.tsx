// Activate nav links from location.pathname during HTML parse, before paint.
// On soft navigations the script becomes type="text/plain" so it's inert.
export function SeedNavLinksFromPathname() {
  const html = `(function(){
  var p = location.pathname;
  document.querySelectorAll('[data-navlink-href]').forEach(function(el) {
    var href = el.getAttribute('data-navlink-href');
    var exact = el.hasAttribute('data-navlink-exact');
    var active = (exact || href === '/') ? p === href : (p === href || p.startsWith(href + '/'));
    el.className = el.getAttribute(active ? 'data-navlink-active' : 'data-navlink-inactive');
    if (active) el.setAttribute('aria-current', 'page');
    else el.removeAttribute('aria-current');
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
