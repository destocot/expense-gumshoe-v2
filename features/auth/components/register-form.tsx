'use client'

import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerAction } from '@/features/auth/actions/register.action'

export const RegisterForm = () => {
  const [state, action, isPending] = useActionState(registerAction, undefined)

  return (
    <form action={action} className='space-y-4'>
      <div>
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

      <div>
        <Label htmlFor='password'>Password</Label>
        <Input type='password' id='password' name='password' aria-describedby='password-error' />
        <p id='password-error' className='text-[0.8rem] font-medium text-destructive'>
          {state?.error?.password?._errors[0]}
        </p>
      </div>

      <div>
        <Label htmlFor='confirmPassword'>Confirm Password</Label>
        <Input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          aria-describedby='confirmPassword-error'
        />
        <p id='confirmPassword-error' className='text-[0.8rem] font-medium text-destructive'>
          {state?.error?.confirmPassword?._errors[0]}
        </p>
        <p className='text-[0.8rem] font-medium text-destructive'>{state?.error?._errors[0]}</p>
      </div>

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Registering...' : 'Register'}
      </Button>
    </form>
  )
}
