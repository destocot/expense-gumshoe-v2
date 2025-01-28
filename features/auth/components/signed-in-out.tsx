import { auth } from '@/lib/auth'

export const SignedIn = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (!session) return null

  return <>{children}</>
}

export const SignedOut = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (session) return null

  return <>{children}</>
}
