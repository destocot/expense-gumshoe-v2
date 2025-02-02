import { ExpenseType } from '@prisma/client'
import { z } from 'zod'

export const TYPES = Object.values(ExpenseType) as [ExpenseType, ...Array<ExpenseType>]

export const CreateExpenseSchema = z.object({
  amount: z
    .string({ required_error: 'Please enter an amount.' })
    .regex(/^\d*\.?\d{0,2}$/, 'Amount must have up to 2 decimal places.')
    .refine((val) => parseFloat(val) > 0, { message: 'Amount must be greater than 0.' }),
  type: z.enum(TYPES, { required_error: 'Please select a valid option.' }),
  description: z
    .string()
    .trim()
    .max(200, 'Description must be at most 200 characters.')
    .optional()
    .transform((val) => (val === '' ? undefined : val)),
})

export const EditExpenseSchema = CreateExpenseSchema.partial()
  .extend({
    expenseId: z
      .string({ required_error: 'Please provide an expense ID.' })
      .cuid({ message: 'Please provide a valid expense ID.' }),
  })
  .refine(
    ({ expenseId: _, ...data }) => {
      return Object.keys(data).length > 0
    },
    { message: 'Please provide at least one field to update.' },
  )

export type CreateExpenseInput = z.input<typeof CreateExpenseSchema>
export type CreateExpenseOutput = z.output<typeof CreateExpenseSchema>

export type EditExpenseInput = z.input<typeof EditExpenseSchema>
export type EditExpenseOutput = z.output<typeof EditExpenseSchema>
