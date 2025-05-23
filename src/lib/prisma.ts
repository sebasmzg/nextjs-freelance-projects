import {PrismaClient} from "../generated/prisma/client";

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

const prisma: PrismaClient = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    if (!global.prisma) {
        global.prisma = prisma;
    }
}

export default prisma;