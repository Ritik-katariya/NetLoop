import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    errorFormat: 'minimal',
    log: ['error'],
   
});

export default prisma;