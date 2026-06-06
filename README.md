<div align="center">

# NextBeats

A music player built with **Next.js 16.3**: Cache Components, Partial Prefetching, App Shells.

[**Live demo →**](https://next-beats.dev)

</div>

---

## Overview

NextBeats demonstrates Instant Navigations end-to-end. Open it, click anywhere, hit back. The network tab stays quiet.

## Features

- **Cache Components** with `cacheComponents: true`
- **Partial Prefetching** with `unstable_prefetch = 'force-runtime'`
- **App Shells** for instant first paint on dynamic routes
- **Per-user caching** with `'use cache: private'`
- **Push-driven invalidation** with `updateTag` from Server Actions
- **View Transitions** on Suspense reveals
- **Optimistic UI** with `useOptimistic`
- **Instant Insights** dev overlay with **Copy prompt** for AI agents
- **`instant()` e2e tests** with `@next/playwright`

## Cache profiles

Scope (`'use cache'` vs `'use cache: private'`) and lifetime (`cacheLife`) are independent. The app uses all four corners.

|                     | `seconds`             | `minutes`                                 | `hours` / `days`                                              |
| ------------------- | --------------------- | ----------------------------------------- | ------------------------------------------------------------- |
| **Shared**          |                       | `getMostPlayed`, `getPlaylistMenuItems`   | catalog queries (hours); `getGenres`, `getTopGenres` (days)   |
| **Private**         | `getRecentlyPlayed`   |                                           | `getFavorites` (hours)                                        |

> **Good to know:** Lifetimes are long because mutations push-invalidate. The lifetime is the safety net, not the freshness contract.

## Getting started

```bash
cp .env.sample .env.local   # set DATABASE_URL (PostgreSQL)
pnpm install
pnpm run prisma.push
pnpm run prisma.seed
pnpm run dev
```

## Stack

Next.js 16.3 · React 19 · TypeScript · Tailwind v4 · Prisma 7 on PostgreSQL · Web Audio API
