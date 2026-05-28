import 'server-only';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const connectionString = process.env.DATABASE_URL!;
const sslUrl = connectionString
  .replace(/sslmode=require\b/, 'sslmode=verify-full')
  .replace(/sslmode=prefer\b/, 'sslmode=verify-full');
const finalUrl = sslUrl.includes('sslmode=')
  ? sslUrl
  : `${sslUrl}${sslUrl.includes('?') ? '&' : '?'}sslmode=verify-full`;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: finalUrl }),
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
