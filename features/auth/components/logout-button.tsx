'use client'

import { useTransition } from 'react'
import { logoutAction } from '@/features/auth/actions/logout.action'
import { Button } from '@/components/ui/button'

export const LogoutButton = () => {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      await logoutAction()
    })
  }

  return (
    <Button variant='destructive' size='sm' onClick={handleClick} disabled={isPending}>
      Log Out
    </Button>
  )
}
