'use server'

import { LoginSchema } from '@/features/auth/schemas'
import { findOneUser } from '@/features/users/queries'
import { verifyPassword } from '@/lib/argon2'
import { setSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import type { ZodFormattedError } from 'zod'

type ActionState = { error: ZodFormattedError<typeof LoginSchema, string> } | undefined

export async function loginAction(prevState: ActionState, formData: FormData) {
  const output = LoginSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!output.success) return { error: output.error.format() }

  const user = await findOneUser({ username: output.data.username })

  if (!user) return { error: { _errors: ['Invalid credentials.'] } }

  const isPasswordValid = await verifyPassword(output.data.password, user.password)

  if (!isPasswordValid) return { error: { _errors: ['Invalid credentials.'] } }

  await setSession({ id: user.userId })

  redirect('/')
}
