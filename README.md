<div align="center">

<img src="public/logo.svg" alt="NextBeats" width="72" height="72" />

# NextBeats

A Next.js 16.3 music player demonstrating [Instant Navigations](https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/instant-navigation.mdx).

[**Live demo →**](https://next-beats.dev)

</div>

---

## Features

- [Cache Components](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents) opt queries and components into the server cache with `'use cache'`, `cacheTag`, and `cacheLife`.
- [Partial Prefetching](https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/adopting-partial-prefetching.mdx) (`partialPrefetching: true` in 16.3) prefetches each in-viewport link's App Shell so the click commits before per-request data lands.
- `<Link prefetch={true}>` adds the destination's cached page body on top of the shell.
- `export const prefetch = 'allow-runtime'` on the destination prerenders link-specific data (params, searchParams, cookies, headers, `'use cache: private'`) at prefetch time.
- [Hover-triggered prefetch](https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/prefetching.mdx) on the playlist list (`hoverPrefetch` on `NavLink`) holds each link at its deduped App Shell and only fires the per-link runtime prefetch on intent, so an unbounded library doesn't wake one server per link on load.
- [`updateTag`](https://nextjs.org/docs/app/api-reference/functions/updateTag) from [Server Functions](https://nextjs.org/docs/app/getting-started/mutating-data) invalidates only the surfaces a mutation actually touches.
- [View Transitions](https://nextjs.org/docs/app/guides/view-transitions) on Suspense reveals and `useOptimistic` for client interactions keep UI changes continuous.
- [`instant()`](https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/instant.mdx) e2e tests with [`@next/playwright`](https://nextjs.org/docs/app/guides/testing/playwright) lock in the instant-navigation contract in CI.

## What to look at

Open DevTools and watch the Network tab while you navigate. Each link in the viewport prepares its App Shell; the destination commits before per-request data lands. Favorite a track and only the surfaces tagged for that user refetch.

The demo toolbar has two levers:

1. **Link prefetch** toggles `<Link prefetch={true}>` so you can see the cached page body land before the click.
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
