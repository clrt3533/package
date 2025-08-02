// Prisma client setup - optional dependency
// This allows the app to work even without a database configured

let prisma: any = null

try {
  // Only import Prisma if it's available and DATABASE_URL is set
  if (process.env.DATABASE_URL) {
    const { PrismaClient } = require('@prisma/client')
    
    const globalForPrisma = globalThis as unknown as {
      prisma: typeof PrismaClient | undefined
    }

    prisma = globalForPrisma.prisma ?? new PrismaClient()

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prisma
    }
  }
} catch (error) {
  console.warn('Prisma not available, running without database features')
}

export { prisma }