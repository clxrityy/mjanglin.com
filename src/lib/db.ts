import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'

// declare global {
//     var prisma: DynamicClientExtensionThis<PrismaClient, any, any> | undefined;
// }

// export const db = globalThis.prisma || new PrismaClient().$extends(withAccelerate());

// if (process.env.NODE_ENV !== "production") {
//     globalThis.prisma = db;
// }

function makePrisma() {
    return new PrismaClient({
        datasources: {
            db: {
                url: process.env.ACCELERATE_URL!,
            }
        }
    }).$extends(withAccelerate());
}

const globalForPrisma = global as unknown as {
    prisma: ReturnType<typeof makePrisma>;
}

export const db = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = makePrisma();
}