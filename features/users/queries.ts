import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function findOneUser(where: Prisma.UserWhereUniqueInput) {
  const user = await prisma.user.findUnique({ where })
  return user
}

export async function createUser(data: Prisma.UserCreateInput) {
  const { password: _, ...user } = await prisma.user.create({ data })
  return user
}
