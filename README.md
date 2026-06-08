<div align="center">

<img src="public/logo.svg" alt="NextBeats" width="72" height="72" />

# NextBeats

A Next.js 16.3 music player demonstrating [Instant Navigations](https://next-site-git-worktree-instant-navs-blog-post.vercel.sh/blog/next-16-3). <!-- TODO: swap to https://nextjs.org/blog/next-16-3 once the post ships -->

[**Live demo →**](https://next-beats.dev)

</div>

---

## Features

- **[Cache Components](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents)** (`cacheComponents: true`) — opt-in caching at the component and query level
- **[Partial Prefetching](https://nextjs.org/docs/app/guides/prefetching)**, the 16.3 default that prefetches the static shell and cached content when links enter the viewport so navigations feel instant
- **App Shells** for instant first paint on dynamic routes, even before cached data arrives
- **Per-user caching** with [`'use cache: private'`](https://nextjs.org/docs/app/api-reference/directives/use-cache-private) for things like favorites and recently-played, scoped to the session instead of shared globally
- **Push-driven invalidation** via [`updateTag`](https://nextjs.org/docs/app/api-reference/functions/updateTag) from [Server Functions](https://nextjs.org/docs/app/getting-started/mutating-data) so mutations refresh only the affected surface
- **[View Transitions](https://nextjs.org/docs/app/guides/view-transitions)** on Suspense reveals, `useOptimistic` for client interactions — UI changes feel continuous instead of flashing
- **`instant()` e2e tests** with [`@next/playwright`](https://nextjs.org/docs/app/guides/testing/playwright) to lock in the instant-navigation contract and catch regressions in CI

## What to observe

Open DevTools and watch the Network tab while you navigate:

- Cached parts of a page come from the prefetch. Uncached parts stream in after.
- Favoriting a track only refetches what depends on it. Everything else stays put.

## Caching

The app mixes shared caches ([`'use cache'`](https://nextjs.org/docs/app/api-reference/directives/use-cache)) and per-session caches ([`'use cache: private'`](https://nextjs.org/docs/app/api-reference/directives/use-cache-private)), with [`cacheTag`](https://nextjs.org/docs/app/api-reference/functions/cacheTag) and [`cacheLife`](https://nextjs.org/docs/app/api-reference/functions/cacheLife) tuning each entry. Mutations push-invalidate the affected tag via [`updateTag`](https://nextjs.org/docs/app/api-reference/functions/updateTag) so freshness comes from intent, not the clock.

See the [caching docs](https://nextjs.org/docs/app/getting-started/caching) for the full picture.

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
