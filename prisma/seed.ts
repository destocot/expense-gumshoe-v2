import { PrismaClient, type ExpenseType } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
import { hash } from '@node-rs/argon2'
import { faker } from '@faker-js/faker'

function getRandomAmountInCents() {
  return faker.number.int({ min: 100, max: 1_000_000 })
}

function getRandomDescription() {
  return faker.helpers.maybe(() => faker.lorem.sentence())
}

function getRandomType(): ExpenseType {
  return faker.helpers.arrayElement(['EXPENSE', 'INCOME', 'OTHER', 'SAVINGS'])
}

function getRandomDate() {
  const now = new Date()

  // first date of this month
  const firstDateThisMonth = new Date(now)
  firstDateThisMonth.setDate(1)
  firstDateThisMonth.setHours(0, 0, 0, 0)

  const lastDateThisMonth = new Date(now)
  lastDateThisMonth.setMonth(now.getMonth() + 1)
  lastDateThisMonth.setDate(0)
  lastDateThisMonth.setHours(23, 59, 59, 999)

  return faker.date.between({ from: firstDateThisMonth, to: lastDateThisMonth })
}

function getRandomExpense() {
  return {
    amount: getRandomAmountInCents(),
    description: getRandomDescription(),
    type: getRandomType(),
    createdAt: getRandomDate(),
  }
}

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

const prisma = new TursoPrismaClient()

async function truncate() {
  const tablenames = await prisma.$queryRaw<
    Array<{ name: string }>
  >`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`

  const deleteQueries = tablenames.map(({ name }) => {
    return prisma.$executeRawUnsafe(`DELETE FROM ${name};`)
  })

  await prisma.$executeRawUnsafe('PRAGMA foreign_keys=OFF;')
  await Promise.all(deleteQueries)
  await prisma.$executeRawUnsafe('PRAGMA foreign_keys=ON;')

  console.info('🗑️   Tables have been truncated.')
}

async function main() {
  await truncate()

  const user = await prisma.user.create({
    data: {
      username: 'testing',
      password: await hash('testing', {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      }),
    },
    select: { userId: true },
  })

  const expenseQueries = Array.from({ length: 25 }, () => {
    return prisma.expense.create({
      data: {
        ...getRandomExpense(),
        userId: user.userId,
      },
    })
  })

  await Promise.all(expenseQueries)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
