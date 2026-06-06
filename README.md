<div align="center">

<img src="public/logo.svg" alt="NextBeats" width="72" height="72" />

# NextBeats

A Next.js 16.3 music player demonstrating [Instant Navigations](https://next-site-git-worktree-instant-navs-blog-post.vercel.sh/blog/next-16-3). <!-- TODO: swap to https://nextjs.org/blog/next-16-3 once the post ships -->

[**Live demo →**](https://next-beats.dev)

</div>

---

## Features

- **[Cache Components](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents)** (`cacheComponents: true`) — opt-in caching at the component and query level
- **Partial Prefetching**, the 16.3 default that prefetches the static shell on hover, extended to dynamic data via [`unstable_prefetch = 'force-runtime'`](https://nextjs.org/docs/app/guides/prefetching) on every page so navigations land instantly
- **App Shells** for instant first paint on dynamic routes, even before cached data arrives
- **Per-user caching** with [`'use cache: private'`](https://nextjs.org/docs/app/api-reference/directives/use-cache-private) for things like favorites and recently-played, scoped to the session instead of shared globally
- **Push-driven invalidation** via [`updateTag`](https://nextjs.org/docs/app/api-reference/functions/updateTag) from [Server Functions](https://nextjs.org/docs/app/getting-started/mutating-data) so mutations refresh only the affected surface
- **[View Transitions](https://nextjs.org/docs/app/guides/view-transitions)** on Suspense reveals, `useOptimistic` for client interactions — UI changes feel continuous instead of flashing
- **`instant()` e2e tests** with [`@next/playwright`](https://nextjs.org/docs/app/guides/testing/playwright) to lock in the instant-navigation contract and catch regressions in CI

## What to observe

Open with DevTools, Network tab visible:

- Repeat navigations issue zero RSC requests (client navigation cache)
- First clicks resolve instantly; hover prefetches dynamic content alongside the shell
- Mutations refetch only the invalidated tag; unrelated UI stays cached
- Toolbar **prefetch toggle** runs the same routes with prefetching disabled for comparison

## Cache profiles

[`'use cache'`](https://nextjs.org/docs/app/api-reference/directives/use-cache) results are stored on the server (shared across users) and mirrored to the browser for the `stale` window so revisits are instant. Server entries are keyed by [`cacheTag`](https://nextjs.org/docs/app/api-reference/functions/cacheTag), with revalidate and expire times set by [`cacheLife`](https://nextjs.org/docs/app/api-reference/functions/cacheLife).

[`'use cache: private'`](https://nextjs.org/docs/app/api-reference/directives/use-cache-private) results are **never stored on the server**. They live only in the browser's memory for the current session and clear on reload, which is how a cached function can safely read runtime APIs like `cookies()` and `headers()`.

In addition, the **client navigation cache** holds prefetched and visited routes in the browser. Back/forward and revisits render from it without an RSC request.

[`updateTag`](https://nextjs.org/docs/app/api-reference/functions/updateTag) from a Server Function expires the matching tag on the server and clears the client navigation cache, so the next render fetches fresh data.

Scope (shared `'use cache'` vs per-session `'use cache: private'`) and lifetime (`cacheLife`) are independent. The app uses all four corners.

|             | `seconds`             | `minutes`                                 | `hours` / `days`                                              |
| ----------- | --------------------- | ----------------------------------------- | ------------------------------------------------------------- |
| **Shared**  |                       | `getMostPlayed`, `getPlaylistMenuItems`   | catalog queries (hours); `getGenres`, `getTopGenres` (days)   |
| **Private** | `getRecentlyPlayed`   |                                           | `getFavorites` (hours)                                        |

Lifetimes are long on purpose. Mutations call `updateTag`, so freshness comes from the tag rather than the clock. `cacheLife` is the safety net for entries that never get invalidated (the catalog changes shape, a tag is missed). Short profiles like `seconds` are reserved for things that should feel live regardless of mutations, like recently-played.

## Getting started

```bash
cp .env.sample .env.local   # set DATABASE_URL (PostgreSQL)
pnpm install
pnpm run prisma.push
pnpm run prisma.seed
pnpm run dev
```

## Stack

- [Next.js 16.3](https://nextjs.org/) — App Router, Cache Components, Server Functions
- [React 19](https://react.dev/) — Suspense, View Transitions, `useOptimistic`
- [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/)
- [Prisma 7](https://www.prisma.io/) on PostgreSQL
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) for procedural per-genre synthesis

## License

[MIT](LICENSE)