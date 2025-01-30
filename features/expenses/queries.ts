'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function findAllExpenses() {
  const session = await auth()
  if (!session) return null

  const expenses = await prisma.expense.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return expenses
}
