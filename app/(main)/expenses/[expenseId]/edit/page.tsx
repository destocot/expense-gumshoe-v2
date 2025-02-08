import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EditExpenseForm } from '@/features/expenses/components/edit-expense-form'
import { findOneExpense } from '@/features/expenses/queries'
import { auth } from '@/lib/auth'
import { notFound, redirect } from 'next/navigation'

type PageProps = { params: Promise<{ expenseId: string }> }

export default async function Page({ params }: PageProps) {
  const session = await auth()
  if (!session) redirect('/login')

  const expenseId = (await params).expenseId

  const { data: expense } = await findOneExpense({ expenseId })

  if (!expense) notFound()

  return (
    <div className='container mx-auto grid h-full max-w-screen-md place-items-center px-4 pb-16 pt-8 sm:px-8'>
      <Card className='w-full max-w-lg border-0 shadow-none sm:border sm:shadow'>
        <CardHeader>
          <CardTitle>Edit Expense</CardTitle>
          <CardDescription>Modify the details below to update this expense.</CardDescription>
        </CardHeader>

        <CardContent>
          <EditExpenseForm defaultValues={expense} />
        </CardContent>
      </Card>
    </div>
  )
}
