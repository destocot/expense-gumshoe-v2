import { ExpenseType } from '@prisma/client'
import { z } from 'zod'

export const TYPES = Object.values(ExpenseType) as [ExpenseType, ...Array<ExpenseType>]

export const CreateExpenseSchema = z.object({
  amount: z
    .string({ required_error: 'Please enter an amount.' })
    .regex(/^\d*\.?\d{0,2}$/, 'Amount must have up to 2 decimal places.'),
  type: z.enum(TYPES, { required_error: 'Please select a valid option.' }),
  description: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? undefined : val)),
})

export type CreateExpenseInput = z.input<typeof CreateExpenseSchema>
export type CreateExpenseOutput = z.output<typeof CreateExpenseSchema>
