'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { View } from '@/features/expenses/types'
import { Prisma } from '@prisma/client'

export async function findAllExpenses({ view }: { view: View }) {
  const session = await auth()
  if (!session) return { data: null }

  const createdAt: Prisma.ExpenseWhereInput['createdAt'] = {
    gte:
      view === 'month'
        ? new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        : view === 'week'
          ? new Date(new Date().setDate(new Date().getDate() - 7))
          : new Date(new Date().setDate(new Date().getDate() - 1)),
  }

  const expenses = await prisma.expense.findMany({
    where: { userId: session.user.id, createdAt },

    orderBy: { createdAt: 'desc' },
  })

  return { data: expenses }
}
