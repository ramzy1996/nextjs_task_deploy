// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClient | undefined
// }

// const client = globalForPrisma.prisma ?? new PrismaClient()

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client
// export default client

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

const client = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client;

export default client;

