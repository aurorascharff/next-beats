# NextBeats

A Next.js 16.3 music player demo for **Instant Navigations**. Every route transition feels native-app fast, even with dynamic, personalized data.

**[Live Demo](https://next-beats.dev)**

## App Features

- **Home**: Quick play grid, most played tracks, playlists, and genre browse
- **Library / Favorites**: Full track catalog with sorting and favorites
- **Playlists**: Create, rename, delete, and reorder with optimistic UI
- **Genre pages**: Browse by genre with streaming track lists
- **Search**: Streaming search results as you type
- **Track detail**: Per-track view with album art, play count, and playlist management
- **Now playing**: Persistent player bar with procedural Web Audio synthesis per genre
- **Prefetch toggle**: Toolbar to disable prefetching and feel the difference

## Instant Navigation Patterns

Three primitives do most of the work:

- **Block**: `async/await` directly in components, no client data layer
- **Cache**: `'use cache'` (shared) and `'use cache: private'` (per-user) for server-side caching
- **Stream**: `<Suspense>` to stream content as soon as it's ready

| Where              | What happens                                                       | How                                                                |
| ------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| All pages          | Static shell paints instantly, dynamic content streams in          | `cacheComponents: true` plus `<Suspense>` boundaries on every page |
| All pages          | Personalized data is prefetched at runtime, not just static shells | `unstable_prefetch = 'force-runtime'` on every page                |
| Shared data        | Catalog data appears in the shell immediately                      | `'use cache'` plus custom `catalog` cacheLife profile plus `cacheTag` |
| Per-user data      | Favorites and recently-played are cached per session, not globally | `'use cache: private'` on user-scoped queries                      |
| Mutations          | Cache updates are push-driven, not polled                          | `updateTag` / `revalidateTag('…', 'soft')` from Server Actions     |
| Development        | Surfaces components that block instant navigation                  | **Instant Insights** (built-in DevTools)                           |
| Development        | Visualize the prefetched shell before dynamic content streams in   | **Navigation Inspector** (built-in DevTools)                       |
| E2E tests          | Assert the prefetched shell renders before dynamic content         | `@next/playwright` `instant()` helper                              |
| Prefetch toggle    | Compare instant vs blocking navigations side by side               | `(demo)/noprefetch` route group with `unstable_prefetch = 'force-disabled'` |

See the [Next.js 16.3 release post](https://nextjs.org/blog/next-16-3) for the full Instant Navigations story.

## Setup

```bash
pnpm install
pnpm run prisma.push
pnpm run prisma.seed
pnpm run dev
```

## Tech Stack

- Next.js 16.3 App Router (Cache Components, Partial Prefetching, App Shells)
- React 19 (Server Components, Suspense, `<ViewTransition>`, React Compiler)
- TypeScript
- Tailwind CSS v4
- Prisma 7 on PostgreSQL
- Web Audio API (procedural music synthesis)
- Geist Sans and Mono fonts
