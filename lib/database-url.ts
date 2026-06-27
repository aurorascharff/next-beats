// Normalize the Postgres connection string to `sslmode=verify-full`.
// `prefer`, `require`, and `verify-ca` will adopt weaker libpq semantics in
// pg-connection-string v3 / pg v9 and emit a deprecation warning today.
// We always want full TLS verification, so rewrite (or append) the param
// before passing the URL to any client/adapter/CLI codepath.
export function normalizeDatabaseUrl(url: string): string {
  const u = new URL(url);
  u.searchParams.set('sslmode', 'verify-full');
  return u.toString();
}
