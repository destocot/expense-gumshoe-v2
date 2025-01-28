'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { loginAction } from '@/features/auth/actions/login.action'

export const LoginForm = () => {
  const [state, action, isPending] = useActionState(loginAction, undefined)

  return (
    <form action={action} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='username'>Username</Label>
        <Input
          type='text'
          id='username'
          name='username'
          aria-describedby='username-error'
          placeholder='John Smith'
        />

        <p id='username-error' className='text-[0.8rem] font-medium text-destructive'>
          {state?.error?.username?._errors[0]}
        </p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input type='password' id='password' name='password' aria-describedby='password-error' />
        <p id='password-error' className='text-[0.8rem] font-medium text-destructive'>
          {state?.error?.password?._errors[0]}
        </p>
        <p className='text-[0.8rem] font-medium text-destructive'>{state?.error?._errors[0]}</p>
      </div>

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Logging In...' : 'Log In'}
      </Button>
    </form>
  )
}
