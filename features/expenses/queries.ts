'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function findAllExpenses(where: Prisma.ExpenseWhereInput) {
  const session = await auth()
  if (!session) return { data: null }

  const expenses = await prisma.expense.findMany({
    where: { userId: session.user.id, ...where },
    orderBy: { createdAt: 'desc' },
  })

  return { data: expenses }
}

export async function findOneExpense(where: Prisma.ExpenseWhereUniqueInput) {
  const session = await auth()
  if (!session) return { data: null }

  const expense = await prisma.expense.findUnique({
    where: { userId: session.user.id, ...where },
  })

  return { data: expense }
}
