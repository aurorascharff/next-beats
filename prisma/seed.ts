/* eslint-disable no-console */
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

type SeedTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  genre: string;
  coverColor: string;
  playCount: number;
  isFavorite: boolean;
  createdAt: Date;
};

const now = Date.now();
const minute = 60_000;
const hour = 60 * minute;
const day = 24 * hour;

const TRACKS: SeedTrack[] = [
  // Electronic
  {
    id: 't1',
    title: 'Async Await',
    artist: 'Neon Pulse',
    album: 'Event Loop',
    duration: 234,
    genre: 'electronic',
    coverColor: 'from-blue-500 to-indigo-600',
    playCount: 1842,
    isFavorite: true,
    createdAt: new Date(now - 2 * day),
  },
  {
    id: 't2',
    title: 'WebSocket Sunset',
    artist: 'Neon Pulse',
    album: 'Event Loop',
    duration: 198,
    genre: 'electronic',
    coverColor: 'from-sky-400 to-blue-500',
    playCount: 923,
    isFavorite: false,
    createdAt: new Date(now - 2 * day),
  },
  {
    id: 't3',
    title: 'Server Sent Vibes',
    artist: 'Chrome Echo',
    album: 'Streaming',
    duration: 267,
    genre: 'electronic',
    coverColor: 'from-blue-400 to-cyan-500',
    playCount: 2105,
    isFavorite: true,
    createdAt: new Date(now - 5 * day),
  },
  {
    id: 't4',
    title: 'Hydration',
    artist: 'Chrome Echo',
    album: 'Streaming',
    duration: 312,
    genre: 'electronic',
    coverColor: 'from-indigo-400 to-blue-500',
    playCount: 1567,
    isFavorite: false,
    createdAt: new Date(now - 5 * day),
  },
  {
    id: 't5',
    title: 'Hot Module Reload',
    artist: 'Axiom',
    album: 'Dev Mode',
    duration: 245,
    genre: 'electronic',
    coverColor: 'from-sky-500 to-indigo-600',
    playCount: 3201,
    isFavorite: true,
    createdAt: new Date(now - 1 * day),
  },
  // Indie
  {
    id: 't6',
    title: 'Localhost Morning',
    artist: 'Paper Lanterns',
    album: 'Soft Deploy',
    duration: 213,
    genre: 'indie',
    coverColor: 'from-blue-300 to-sky-500',
    playCount: 876,
    isFavorite: true,
    createdAt: new Date(now - 3 * day),
  },
  {
    id: 't7',
    title: 'README Love Letter',
    artist: 'Paper Lanterns',
    album: 'Soft Deploy',
    duration: 189,
    genre: 'indie',
    coverColor: 'from-cyan-400 to-sky-500',
    playCount: 654,
    isFavorite: false,
    createdAt: new Date(now - 3 * day),
  },
  {
    id: 't8',
    title: 'Open Source Crush',
    artist: 'Velvet Morning',
    album: 'Pull Request',
    duration: 227,
    genre: 'indie',
    coverColor: 'from-indigo-500 to-blue-600',
    playCount: 1432,
    isFavorite: false,
    createdAt: new Date(now - 7 * day),
  },
  {
    id: 't9',
    title: 'Sunday Deploy',
    artist: 'Velvet Morning',
    album: 'Pull Request',
    duration: 256,
    genre: 'indie',
    coverColor: 'from-sky-300 to-blue-400',
    playCount: 987,
    isFavorite: true,
    createdAt: new Date(now - 7 * day),
  },
  {
    id: 't10',
    title: 'npm install feelings',
    artist: 'Fern & Ivy',
    album: 'Dependencies',
    duration: 201,
    genre: 'indie',
    coverColor: 'from-blue-600 to-indigo-700',
    playCount: 1123,
    isFavorite: false,
    createdAt: new Date(now - 10 * day),
  },
  // Hip-Hop
  {
    id: 't11',
    title: 'Ship It',
    artist: 'BLKSMTH',
    album: 'Production Ready',
    duration: 194,
    genre: 'hip-hop',
    coverColor: 'from-slate-500 to-blue-700',
    playCount: 4521,
    isFavorite: true,
    createdAt: new Date(now - 1 * day),
  },
  {
    id: 't12',
    title: 'Stack Overflow Flow',
    artist: 'BLKSMTH',
    album: 'Production Ready',
    duration: 218,
    genre: 'hip-hop',
    coverColor: 'from-indigo-600 to-blue-800',
    playCount: 3876,
    isFavorite: false,
    createdAt: new Date(now - 1 * day),
  },
  {
    id: 't13',
    title: '3 AM Push',
    artist: 'SyntaxErr',
    album: 'Debug Mode',
    duration: 242,
    genre: 'hip-hop',
    coverColor: 'from-blue-500 to-sky-600',
    playCount: 2987,
    isFavorite: true,
    createdAt: new Date(now - 4 * day),
  },
  {
    id: 't14',
    title: 'Merge Conflict',
    artist: 'SyntaxErr',
    album: 'Debug Mode',
    duration: 176,
    genre: 'hip-hop',
    coverColor: 'from-cyan-500 to-blue-600',
    playCount: 2145,
    isFavorite: false,
    createdAt: new Date(now - 4 * day),
  },
  {
    id: 't15',
    title: 'git push --force',
    artist: 'Null Pointer',
    album: 'No Regrets',
    duration: 208,
    genre: 'hip-hop',
    coverColor: 'from-sky-500 to-blue-600',
    playCount: 1654,
    isFavorite: false,
    createdAt: new Date(now - 6 * day),
  },
  // Pop
  {
    id: 't16',
    title: 'Pixel Perfect',
    artist: 'Luna Park',
    album: 'Responsive',
    duration: 195,
    genre: 'pop',
    coverColor: 'from-blue-400 to-indigo-500',
    playCount: 5432,
    isFavorite: true,
    createdAt: new Date(now - 0.5 * day),
  },
  {
    id: 't17',
    title: 'Tailwind Hearts',
    artist: 'Luna Park',
    album: 'Responsive',
    duration: 221,
    genre: 'pop',
    coverColor: 'from-indigo-400 to-sky-500',
    playCount: 4321,
    isFavorite: true,
    createdAt: new Date(now - 0.5 * day),
  },
  {
    id: 't18',
    title: 'Component Chemistry',
    artist: 'Prism',
    album: 'Render Cycle',
    duration: 237,
    genre: 'pop',
    coverColor: 'from-sky-400 to-cyan-500',
    playCount: 3654,
    isFavorite: false,
    createdAt: new Date(now - 2 * day),
  },
  {
    id: 't19',
    title: 'Type Safe Love',
    artist: 'Prism',
    album: 'Render Cycle',
    duration: 189,
    genre: 'pop',
    coverColor: 'from-blue-300 to-indigo-400',
    playCount: 2876,
    isFavorite: false,
    createdAt: new Date(now - 2 * day),
  },
  {
    id: 't20',
    title: 'First Contentful Paint',
    artist: 'Morning Glow',
    album: 'Core Web Vitals',
    duration: 214,
    genre: 'pop',
    coverColor: 'from-indigo-500 to-blue-700',
    playCount: 1987,
    isFavorite: true,
    createdAt: new Date(now - 8 * day),
  },
  // Rock
  {
    id: 't21',
    title: 'Breaking Changes',
    artist: 'Iron Veil',
    album: 'Major Version',
    duration: 278,
    genre: 'rock',
    coverColor: 'from-blue-500 to-slate-600',
    playCount: 2543,
    isFavorite: false,
    createdAt: new Date(now - 3 * day),
  },
  {
    id: 't22',
    title: 'Deprecation Warning',
    artist: 'Iron Veil',
    album: 'Major Version',
    duration: 302,
    genre: 'rock',
    coverColor: 'from-sky-600 to-blue-700',
    playCount: 1876,
    isFavorite: true,
    createdAt: new Date(now - 3 * day),
  },
  {
    id: 't23',
    title: 'Edge Runtime',
    artist: 'Desert Sun',
    album: 'Distributed',
    duration: 264,
    genre: 'rock',
    coverColor: 'from-cyan-400 to-blue-500',
    playCount: 1234,
    isFavorite: false,
    createdAt: new Date(now - 12 * day),
  },
  {
    id: 't24',
    title: 'Cache Invalidation',
    artist: 'Desert Sun',
    album: 'Distributed',
    duration: 231,
    genre: 'rock',
    coverColor: 'from-blue-400 to-sky-500',
    playCount: 1567,
    isFavorite: true,
    createdAt: new Date(now - 12 * day),
  },
  {
    id: 't25',
    title: 'Turbopack',
    artist: 'Volt',
    album: 'Bundled',
    duration: 198,
    genre: 'rock',
    coverColor: 'from-indigo-300 to-blue-400',
    playCount: 987,
    isFavorite: false,
    createdAt: new Date(now - 15 * day),
  },
  // Jazz
  {
    id: 't26',
    title: 'Late Night Refactor',
    artist: 'Blue Note Trio',
    album: 'Clean Code',
    duration: 345,
    genre: 'jazz',
    coverColor: 'from-blue-600 to-indigo-800',
    playCount: 876,
    isFavorite: true,
    createdAt: new Date(now - 6 * day),
  },
  {
    id: 't27',
    title: 'Smooth Operator Overload',
    artist: 'Blue Note Trio',
    album: 'Clean Code',
    duration: 298,
    genre: 'jazz',
    coverColor: 'from-sky-500 to-indigo-600',
    playCount: 654,
    isFavorite: false,
    createdAt: new Date(now - 6 * day),
  },
  {
    id: 't28',
    title: 'Lazy Loading Blues',
    artist: 'Ivory Keys',
    album: 'Suspense',
    duration: 276,
    genre: 'jazz',
    coverColor: 'from-blue-500 to-cyan-600',
    playCount: 543,
    isFavorite: false,
    createdAt: new Date(now - 9 * day),
  },
  {
    id: 't29',
    title: 'Promise Resolution',
    artist: 'Ivory Keys',
    album: 'Suspense',
    duration: 312,
    genre: 'jazz',
    coverColor: 'from-indigo-400 to-blue-600',
    playCount: 432,
    isFavorite: true,
    createdAt: new Date(now - 9 * day),
  },
  {
    id: 't30',
    title: 'Callback Serenade',
    artist: 'The Standards',
    album: 'Legacy Code',
    duration: 287,
    genre: 'jazz',
    coverColor: 'from-cyan-500 to-indigo-600',
    playCount: 765,
    isFavorite: false,
    createdAt: new Date(now - 14 * day),
  },
];

type SeedPlaylist = {
  id: string;
  name: string;
  description: string;
  coverColor: string;
  trackIds: string[];
};

const PLAYLISTS: SeedPlaylist[] = [
  {
    id: 'pl1',
    name: 'Late Night Coding',
    description: 'Beats for the midnight commit.',
    coverColor: 'from-violet-500 to-purple-600',
    trackIds: ['t1', 't3', 't5', 't11', 't13', 't26', 't27'],
  },
  {
    id: 'pl2',
    name: 'Morning Vibes',
    description: 'Start the day right.',
    coverColor: 'from-purple-400 to-violet-500',
    trackIds: ['t6', 't7', 't16', 't17', 't20', 't10'],
  },
  {
    id: 'pl3',
    name: 'High Energy',
    description: 'Turn it up to eleven.',
    coverColor: 'from-fuchsia-500 to-purple-600',
    trackIds: ['t11', 't12', 't21', 't22', 't24', 't25', 't5'],
  },
];

async function main() {
  console.log('Seeding music player database...');

  // Clear existing data
  await prisma.playlistTrack.deleteMany();
  await prisma.playlist.deleteMany();
  await prisma.track.deleteMany();

  // Seed tracks
  for (const t of TRACKS) {
    await prisma.track.create({ data: t });
  }
  console.log(`  ${TRACKS.length} tracks created`);

  // Seed playlists
  for (const pl of PLAYLISTS) {
    await prisma.playlist.create({
      data: {
        id: pl.id,
        name: pl.name,
        description: pl.description,
        coverColor: pl.coverColor,
        createdAt: new Date(),
      },
    });
    for (let i = 0; i < pl.trackIds.length; i++) {
      await prisma.playlistTrack.create({
        data: {
          playlistId: pl.id,
          trackId: pl.trackIds[i],
          position: i,
        },
      });
    }
  }
  console.log(`  ${PLAYLISTS.length} playlists created`);

  console.log('Seed complete.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
