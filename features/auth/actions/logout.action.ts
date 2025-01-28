'use server'

import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { cookies } from 'next/headers'
import { SESSION_KEY } from '@/lib/constants'

export const logoutAction = async () => {
  const session = await auth()

  if (!session) {
    throw new Error('Unauthorized')
  }

  ;(await cookies()).delete(SESSION_KEY)
  redirect('/login')
}
