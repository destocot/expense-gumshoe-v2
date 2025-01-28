import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RegisterForm } from '@/features/auth/components/register-form'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className='container mx-auto flex h-full max-w-screen-md items-center justify-center px-4 sm:px-8'>
      <Card className='w-full max-w-sm border-0 shadow-none sm:border sm:shadow'>
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>Register and get started in a few easy steps.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <span className='text-sm'>
            Already have an account? Click{' '}
            <Button variant='link' className='px-0 font-semibold' asChild>
              <Link href='/login'>here</Link>
            </Button>{' '}
            to login.
          </span>
        </CardFooter>
      </Card>
    </div>
  )
}
