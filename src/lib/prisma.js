import { PrismaClient } from '@prisma/client';
import { userMutations } from './extensions/index.js';


const globalForPrisma = globalThis;

const getPrismaWithExtensions = () => {
    const client = new PrismaClient();
    return client.$extends(userMutations);
};

const extendedClient = globalForPrisma.prisma ?? getPrismaWithExtensions();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = extendedClient;
}

const prisma = extendedClient;
export default prisma;
