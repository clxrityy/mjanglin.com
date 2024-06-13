import { PrismaClient } from "@prisma/client";
import { DynamicClientExtensionThis } from "@prisma/client/runtime/library";
import { withAccelerate } from '@prisma/extension-accelerate'

declare global {
    var prisma: DynamicClientExtensionThis<PrismaClient, any, any> | undefined;
}

export const db = globalThis.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}