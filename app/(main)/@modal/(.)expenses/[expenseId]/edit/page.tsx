import EditExpenseModal from '@/features/expenses/components/edit-expense-modal'
import { findOneExpense } from '@/features/expenses/queries'
import { notFound } from 'next/navigation'
type PageProps = { params: Promise<{ expenseId: string }> }

export default async function Page({ params }: PageProps) {
  const expenseId = (await params).expenseId

  const { data: expense } = await findOneExpense({ expenseId })

  if (!expense) notFound()
  return <EditExpenseModal expense={expense} />
}
