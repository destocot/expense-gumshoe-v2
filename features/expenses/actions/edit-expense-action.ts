'use server'

import { EditExpenseInput, EditExpenseSchema } from '@/features/expenses/schemas'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function editExpenseAction(values: EditExpenseInput) {
  const output = EditExpenseSchema.safeParse(values)

  if (!output.success) return { error: output.error.format() }

  const amountInCents = Number(output.data.amount) * 100

  const session = await auth()

  if (!session) throw new Error('Unauthorized')

  await prisma.expense.update({
    where: { expenseId: output.data.expenseId },
    data: {
      ...(output.data.amount ? { amount: amountInCents } : {}),
      ...(output.data.type ? { type: output.data.type } : {}),
      ...(output.data.description ? { description: output.data.description } : {}),
    },
  })

  revalidatePath('/')

  return { error: null }
}
