import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    errorFormat: 'minimal',
    log: ['query', 'info', 'warn', 'error'],
   
});

export default prisma;