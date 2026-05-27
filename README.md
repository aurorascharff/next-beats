# NextBeats

A Next.js music player demonstrating Instant Navigations. Every route transition feels immediate, even with dynamic, personalized data.

**[Live Demo](https://next-beats.vercel.app)**

## App Features

- **Home** — Quick play grid, most played tracks, playlists, and genre browse
- **Library / Favorites** — Full track catalog with sorting and favorites
- **Playlists** — Create, rename, delete, and reorder with optimistic UI
- **Genre pages** — Browse by genre with streaming track lists
- **Search** — Streaming search results as you type
- **Track detail** — Per-track view with album art, play count, and playlist management
- **Now playing** — Persistent player bar with procedural Web Audio synthesis per genre
- **Prefetch toggle** — Toolbar to disable prefetching and feel the difference

## Instant Navigation Patterns

| Where | What happens | How |
|-------|-------------|-----|
| All pages | Static shell paints instantly, dynamic content streams in | `cacheComponents: true` + `<Suspense>` boundaries on every page |
| All pages | Personalized data is prefetched at runtime, not just static shells | `unstable_prefetch = 'force-runtime'` on every page |
| Data functions | Cached data appears in the shell immediately | `'use cache'` on query functions with `cacheLife` and `cacheTag` |
| Client navigations | Back/forward navigations are instant | `cachedNavigations` experimental flag |
| Client navigations | Next route starts rendering before navigation is confirmed | `optimisticRouting` experimental flag |
| Development | Surfaces components that would block instant navigation | `instantInsights: { validationLevel: 'warning' }` |
| Development | Visualize the static shell before dynamic content streams in | `instantNavigationDevToolsToggle` + Instant Navs panel |
| E2E tests | Assert the static shell renders before dynamic content | `@next/playwright` `instant()` helper |
| Prefetch toggle | Compare instant vs blocking navigations side by side | `(demo)/noprefetch` route group with `force-disabled` |

See the [Instant Navigation guide](https://nextjs.org/docs/app/guides/instant-navigation) for a full walkthrough.

## Setup

```bash
pnpm install
pnpm run prisma.push
pnpm run prisma.seed
pnpm run dev
```

## Tech Stack

- Next.js 16.3 App Router
- React 19 (Server Components, Suspense, ViewTransition)
- TypeScript
- Tailwind CSS v4
- Prisma 7 on PostgreSQL
- Web Audio API (procedural music synthesis)
- Geist Sans + Mono fonts
