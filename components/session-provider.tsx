'use client'

import { SessionSchema, type Session } from '@/lib/jose'
import { createContext, useEffect, useState } from 'react'

const fetchSession = async (): Promise<Session | null> => {
  const res = await fetch('/api/auth/session')
  if (!res.ok) return null

  try {
    return SessionSchema.parse(await res.json())
  } catch {
    return null
  }
}

type Status = 'loading' | 'authenticated' | 'unauthenticated'

type TSessionContext = { data: Session | null; status: Status }

export const SessionContext = createContext<TSessionContext | undefined>(undefined)

type SessionProviderProps = { children: React.ReactNode }

export function SessionProvider({ children }: SessionProviderProps) {
  const [status, setStatus] = useState<Status>('loading')
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    ;(async function run() {
      const session = await fetchSession()
      setSession(session)
      setStatus(session ? 'authenticated' : 'unauthenticated')
    })()
  }, [])

  const value = { data: session, status }

  return <SessionContext value={value}>{children}</SessionContext>
}
