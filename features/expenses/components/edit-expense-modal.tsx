'use client'

import { ResponsiveModal } from '@/components/responsive-modal'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EditExpenseForm } from '@/features/expenses/components/edit-expense-form'
import type { Expense } from '@prisma/client'
import { useRouter } from 'next/navigation'

type EditExpenseModalProps = { expense: Expense }

export default function EditExpenseModal({ expense }: EditExpenseModalProps) {
  const router = useRouter()
  const handleOpenChange = () => void router.back()

  return (
    <ResponsiveModal open={true} onOpenChange={handleOpenChange}>
      <Card className='border-0 shadow-none'>
        <CardHeader>
          <CardTitle>Edit Expense</CardTitle>
          <CardDescription>Modify the details below to update this expense.</CardDescription>
        </CardHeader>

        <CardContent>
          <EditExpenseForm defaultValues={expense} handleOpenChange={handleOpenChange} />
        </CardContent>
      </Card>
    </ResponsiveModal>
  )
}
