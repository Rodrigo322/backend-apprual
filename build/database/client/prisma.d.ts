import { PrismaClient } from "@prisma/client";
export declare const prisma: PrismaClient<{
    log: ("info" | "query" | "warn" | "error")[];
}, never, false>;
