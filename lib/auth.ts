import { cookies } from 'next/headers'
import { SESSION_KEY } from '@/lib/constants'
import { type Session, signToken, verifyToken } from '@/lib/jose'

const SESSION_LIFESPAN_MS = 30 * 24 * 60 * 60 * 1000

export async function auth(): Promise<Session | null> {
  const session = (await cookies()).get(SESSION_KEY)?.value
  if (!session) return null

  return await verifyToken(session)
}

export async function setSession(user: Session['user']) {
  const expiresAt = new Date(Math.floor((Date.now() + SESSION_LIFESPAN_MS) / 1000) * 1000)

  const payload: Session = { user, expires: expiresAt.toISOString() }

  const encrypted = await signToken(payload, expiresAt)

  ;(await cookies()).set(SESSION_KEY, encrypted, {
    expires: expiresAt,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  })
}
