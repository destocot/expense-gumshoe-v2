import { formatCurrency, formatDate } from '@/lib/utils'
import { ExpenseTypeBadge } from '@/features/expenses/components/expense-type-badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { findAllExpenses } from '@/features/expenses/queries'
import type { View } from '@/features/expenses/types'

type ExpenseAggregationsProps = { view: View }

export const ExpenseList = async ({ view }: ExpenseAggregationsProps) => {
  const { data: expenses } = await findAllExpenses({ view })

  if (!expenses) return null

  return expenses.map((e) => (
    <li key={e.expenseId}>
      <Card key={e.expenseId} className='rounded'>
        <CardHeader className='py-4'>
          <div className='flex items-center justify-between gap-2'>
            <CardTitle>{formatCurrency(e.amount)}</CardTitle>
            <ExpenseTypeBadge type={e.type} />
          </div>
          <CardDescription>{formatDate(e.createdAt)}</CardDescription>
        </CardHeader>
        <CardContent className='pb-4'>
          <p className='line-clamp-1 max-w-[55ch] text-sm text-muted-foreground'>
            {e.description ?? '-'}
          </p>
        </CardContent>
      </Card>
    </li>
  ))
}
