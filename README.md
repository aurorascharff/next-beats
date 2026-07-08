<div align="center">

<img src="public/logo.svg" alt="NextBeats" width="72" height="72" />

# NextBeats

A [Next.js 16.3](https://nextjs.org/blog/next-16-3-instant-navigations) music player demonstrating [Instant Navigations](https://preview.nextjs.org/docs/app/guides/instant-navigation).

[**Live demo →**](https://next-beats.dev)

</div>

---

## Features

- **[Cache Components](https://preview.nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents)**: server caching with `'use cache'`, `cacheTag`, and `cacheLife`.
- **[Partial Prefetching](https://preview.nextjs.org/docs/app/guides/adopting-partial-prefetching)**: in-viewport links prefetch the shared App Shell by default.
- **[Runtime prefetching](https://preview.nextjs.org/docs/app/guides/runtime-prefetching)**: `prefetch = 'allow-runtime'` lets the prefetch include request data like `searchParams` and dynamic `params`.
- **[Hover-triggered prefetch](https://preview.nextjs.org/docs/app/guides/prefetching#hover-triggered-prefetch)**: `hoverPrefetch` defers a link's prefetch to hover or focus.
- **[Server Functions](https://nextjs.org/docs/app/getting-started/mutating-data)**: mutations invalidate only the tags they change with [`updateTag`](https://nextjs.org/docs/app/api-reference/functions/updateTag).
- **[React Compiler](https://react.dev/learn/react-compiler)**: automatic memoization.
- **[View Transitions](https://nextjs.org/docs/app/guides/view-transitions)**: animate content and route changes.
- **Async React**: keep the UI interactive during server work with [`Suspense`](https://react.dev/reference/react/Suspense) streaming, [`useOptimistic`](https://react.dev/reference/react/useOptimistic), [`useTransition`](https://react.dev/reference/react/useTransition), [`useActionState`](https://react.dev/reference/react/useActionState), [`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus), and [`use`](https://react.dev/reference/react/use).
- **[`instant()`](https://preview.nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/instant)** end-to-end tests with [`@next/playwright`](https://nextjs.org/docs/app/guides/testing/playwright), run in CI.

## Things to try

Prefetching only runs in production, so try these on the [live demo](https://next-beats.dev) or a local `pnpm build && pnpm start`. Open the Network tab to watch requests fire.

1. **Scroll the home page.** Each link prefetches into the client cache as it enters the viewport. Click one and it navigates with no new request.
2. **Favorite a track or create a playlist.** A Server Function calls `updateTag`, and the affected content updates in place and re-prefetches, without a full-page reload.
3. **Toggle Prefetch in the demo toolbar.** Links always prefetch the App Shell. With it on, they also prefetch the destination's content so it is ready on click; with it off, that content loads on click instead.
4. **Toggle Client.** Client components get outlined. Everything outside the outlines is server-rendered and ships no JavaScript.
5. **Toggle Offline.** Routes you already prefetched still open from the client cache, and the shared App Shell is always available. Restore the network and the dynamic data recovers.

## Getting started

NextBeats runs on Postgres. Set `DATABASE_URL` in `.env.local`, then:

```bash
pnpm install
pnpm run prisma.push
pnpm run prisma.seed
pnpm run dev
```

<details>
<summary>Run locally without Postgres</summary>

Drop this prompt into your agent to swap the datasource for SQLite:

> Set up NextBeats to run locally on SQLite instead of Postgres. Swap `provider = "postgresql"` to `provider = "sqlite"` in `prisma/schema.prisma`. Replace `@prisma/adapter-pg` with `@prisma/adapter-better-sqlite3` in `lib/db.ts` and `prisma/seed.ts`, using `new PrismaBetterSqlite3({ url })` where `url` is `process.env.DATABASE_URL` with the `file:` prefix stripped. Remove any `mode: 'insensitive'` Prisma filter options since SQLite doesn't support them. Install `@prisma/adapter-better-sqlite3` and `better-sqlite3`, uninstall `@prisma/adapter-pg`, `pg`, and `@types/pg`. Write `DATABASE_URL=file:./prisma/dev.db` to `.env.local`.

The schema is otherwise identical, so the rest of the app behaves the same as production.

</details>

## Stack

- **[Next.js 16.3](https://nextjs.org/)**: App Router, Cache Components, Server Functions
- **[React 19](https://react.dev/)** with React Compiler: Suspense, View Transitions, `useOptimistic`
- **[TypeScript](https://www.typescriptlang.org/)** and **[Tailwind CSS v4](https://tailwindcss.com/)**
- **[Prisma 7](https://www.prisma.io/)** on PostgreSQL
- **[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)** for procedural per-genre synthesis

## License

[MIT](LICENSE)
