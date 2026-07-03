<div align="center">

<img src="public/logo.svg" alt="NextBeats" width="72" height="72" />

# NextBeats

A [Next.js 16.3](https://nextjs.org/blog/next-16-3-instant-navigations) music player demonstrating [Instant Navigations](https://preview.nextjs.org/docs/app/guides/instant-navigation).

[**Live demo →**](https://next-beats.dev)

</div>

---

## Features

- [Cache Components](https://preview.nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents) opt queries and components into the server cache with `'use cache'`, `cacheTag`, and `cacheLife`.
- [Partial Prefetching](https://preview.nextjs.org/docs/app/guides/adopting-partial-prefetching) (`partialPrefetching: true` in 16.3) prefetches each in-viewport link's App Shell by default.
- `<Link prefetch={true}>` adds the destination's cached page content on top of the App Shell.
- [`export const prefetch = 'allow-runtime'`](https://preview.nextjs.org/docs/app/guides/runtime-prefetching) on the destination prerenders the per-link request data the shared App Shell can't hold, like `searchParams` and dynamic `params`, at prefetch time.
- [Hover-triggered prefetch](https://preview.nextjs.org/docs/app/guides/prefetching) on the playlist list (`hoverPrefetch` on `NavLink`) holds each link at its shared App Shell and fires the per-link runtime prefetch only on hover or focus.
- [`updateTag`](https://nextjs.org/docs/app/api-reference/functions/updateTag) from [Server Functions](https://nextjs.org/docs/app/getting-started/mutating-data) invalidates only the tags a mutation touches.
- [View Transitions](https://nextjs.org/docs/app/guides/view-transitions) on Suspense reveals and `useOptimistic` for client interactions keep UI changes continuous.
- [`instant()`](https://preview.nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/instant) e2e tests with [`@next/playwright`](https://nextjs.org/docs/app/guides/testing/playwright) lock in the instant-navigation contract in CI.

## What to look at

Open DevTools and watch the Network tab while you navigate. Each link in the viewport prepares its App Shell; the destination commits before per-request data lands. Favorite a track and only the surfaces tagged for that user refetch.

The demo toolbar has two levers:

1. **Link prefetch** toggles `<Link prefetch={true}>` so you can see the cached page content land before the click.
2. **Client** outlines every `'use client'` component so you can see how little ships.

## Getting started

```bash
pnpm install
pnpm run prisma.push
pnpm run prisma.seed
pnpm run dev
```

NextBeats runs on Postgres in production. To try it locally without provisioning a database, drop this prompt into your agent and it'll swap the datasource for SQLite:

> Set up NextBeats to run locally on SQLite instead of Postgres. Swap `provider = "postgresql"` to `provider = "sqlite"` in `prisma/schema.prisma`. Replace `@prisma/adapter-pg` with `@prisma/adapter-better-sqlite3` in `lib/db.ts` and `prisma/seed.ts`, using `new PrismaBetterSqlite3({ url })` where `url` is `process.env.DATABASE_URL` with the `file:` prefix stripped. Remove any `mode: 'insensitive'` Prisma filter options since SQLite doesn't support them. Install `@prisma/adapter-better-sqlite3` and `better-sqlite3`, uninstall `@prisma/adapter-pg`, `pg`, and `@types/pg`. Write `DATABASE_URL=file:./prisma/dev.db` to `.env.local`.

The schema is otherwise identical, so the rest of the app behaves the same as production.

## Stack

- [Next.js 16.3](https://nextjs.org/): App Router, Cache Components, Server Functions
- [React 19](https://react.dev/): Suspense, View Transitions, `useOptimistic`
- [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/)
- [Prisma 7](https://www.prisma.io/) on PostgreSQL
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) for procedural per-genre synthesis

## License

[MIT](LICENSE)
