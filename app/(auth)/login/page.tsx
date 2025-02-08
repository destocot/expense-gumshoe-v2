import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoginForm } from '@/features/auth/components/login-form'
import { auth } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  if (await auth()) redirect('/')

  return (
    <div className='container mx-auto flex h-full max-w-screen-md items-center justify-center px-4 sm:px-8'>
      <Card className='w-full max-w-sm border-0 shadow-none sm:border sm:shadow'>
        <CardHeader>
          <CardTitle>Welcome Back!</CardTitle>
          <CardDescription>Log in to continue where you left off.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <span className='text-sm'>
            Don&apos;t have an account? Click{' '}
            <Button variant='link' className='px-0 font-semibold' asChild>
              <Link href='/register'>here</Link>
            </Button>{' '}
            to register.
          </span>
        </CardFooter>
      </Card>
    </div>
  )
}
