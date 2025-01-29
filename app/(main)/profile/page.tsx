import { LogoutButton } from '@/features/auth/components/logout-button'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className='container mx-auto h-full max-w-screen-md px-4 py-8 sm:px-8'>
      <div className='w-full space-y-8'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Profile</h1>

          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
