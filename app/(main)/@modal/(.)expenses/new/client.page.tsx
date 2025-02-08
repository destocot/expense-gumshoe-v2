'use client'

import { ResponsiveModal } from '@/components/responsive-modal'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateExpenseForm } from '@/features/expenses/components/create-expense-form'
import { useRouter } from 'next/navigation'

export default function ClientPage() {
  const router = useRouter()
  const handleOpenChange = () => void router.back()

  return (
    <ResponsiveModal open={true} onOpenChange={handleOpenChange}>
      <Card className='border-0 shadow-none'>
        <CardHeader>
          <CardTitle>Create New Expense</CardTitle>
          <CardDescription>Fill out the details below to log a new expense.</CardDescription>
        </CardHeader>

        <CardContent>
          <CreateExpenseForm handleOpenChange={handleOpenChange} />
        </CardContent>
      </Card>
    </ResponsiveModal>
  )
}
