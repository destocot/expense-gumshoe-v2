'use server'

import { RegisterSchema } from '@/features/auth/schemas'
import { createUser, findOneUser } from '@/features/users/queries'
import { hashPassword } from '@/lib/argon2'
import { redirect } from 'next/navigation'
import type { ZodFormattedError } from 'zod'

type ActionState = { error: ZodFormattedError<typeof RegisterSchema, string> } | undefined

export async function registerAction(prevState: ActionState, formData: FormData) {
  const output = RegisterSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!output.success) return { error: output.error.format() }

  const user = await findOneUser({ username: output.data.username })

  if (user) return { error: { _errors: ['This username is already in use.'] } }

  const hsahedPassword = await hashPassword(output.data.password)

  await createUser({ username: output.data.username, password: hsahedPassword })

  redirect('/')
}
