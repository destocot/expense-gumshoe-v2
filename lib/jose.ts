import { SignJWT, jwtVerify } from 'jose'
import { z } from 'zod'

const alg = 'HS256'
const key = new TextEncoder().encode(process.env.AUTH_SECRET)

export const SessionSchema = z.object({
  user: z.object({
    id: z.string().min(1),
  }),
  expires: z.string().min(1),
})

export type Session = z.infer<typeof SessionSchema>

export async function signToken(payload: Session, expiresAt: Date) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(key)
}

export async function verifyToken(input: string) {
  const { payload } = await jwtVerify(input, key, { algorithms: [alg] })
  return SessionSchema.parse(payload)
}
