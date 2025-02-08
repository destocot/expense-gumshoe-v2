import { auth } from '@/lib/auth'
import ClientPage from './client.page'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth()
  if (!session) redirect('/login')

  return <ClientPage />
}
