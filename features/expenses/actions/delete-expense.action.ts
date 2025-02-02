'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function deleteExpenseAction(expenseId: string) {
  const session = await auth()

  if (!session) throw new Error('Unauthorized')

  await prisma.expense.delete({
    where: { expenseId },
  })

  revalidatePath('/')

  return { error: null }
}
