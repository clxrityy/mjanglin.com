import { PrismaClient } from '@prisma/client';

function makePrisma() {
    return new PrismaClient();
}

const globalForPrisma = global as unknown as {
    prisma: ReturnType<typeof makePrisma>;
}

export const db = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = makePrisma();
}