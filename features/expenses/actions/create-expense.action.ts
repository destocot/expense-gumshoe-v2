'use server'

import { CreateExpenseInput, CreateExpenseSchema } from '@/features/expenses/schemas'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function createExpenseAction(values: CreateExpenseInput) {
  const output = CreateExpenseSchema.safeParse({})

  if (!output.success) return { error: output.error.format() }

  const amountInCents = Number(output.data.amount) * 100

  const session = await auth()

  if (!session) throw new Error('Unauthorized')

  await prisma.expense.create({
    data: {
      amount: amountInCents,
      type: output.data.type,
      ...(output.data.description ? { description: output.data.description } : {}),
      userId: session.user.id,
    },
  })

  revalidatePath('/')

  return { error: null }
}
