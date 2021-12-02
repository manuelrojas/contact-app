// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface Global {
       document: Document;
       window: Window;
       navigator: Navigator;
       prisma: PrismaClient;
    } 
  }
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma =  new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error']});
  }

  prisma = global.prisma;
}


export default prisma;