import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

class TursoPrismaClient extends PrismaClient {
  constructor() {
    const libsql = createClient({
      url: `${process.env.TURSO_DATABASE_URL}`,
      authToken: `${process.env.TURSO_AUTH_TOKEN}`,
    })

    const adapter = new PrismaLibSQL(libsql)

    super({ adapter })
  }
}

const globalForPrisma = global as unknown as { prisma: TursoPrismaClient }

export const prisma = globalForPrisma.prisma || new TursoPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
