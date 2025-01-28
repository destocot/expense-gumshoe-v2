import { z } from 'zod'

export const LoginSchema = z.object({
  username: z
    .string({ required_error: 'Please enter your username.' })
    .toLowerCase()
    .min(1, 'Please enter your username.'),
  password: z
    .string({ required_error: 'Please enter your password.' })
    .min(1, 'Please enter your password.'),
})

export const RegisterSchema = z
  .object({
    username: z
      .string({ required_error: 'Please enter your username.' })
      .toLowerCase()
      .min(6, 'Your username must have 6 characters or more.'),
    password: z
      .string({ required_error: 'Please enter your password.' })
      .min(6, 'Your password must have 6 characters or more.'),
    confirmPassword: z.string({ required_error: 'Please enter your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The two passwords do not match.',
    path: ['confirmPassword'],
  })

export type LoginOutput = z.infer<typeof LoginSchema>
export type RegisterOutput = z.infer<typeof RegisterSchema>
