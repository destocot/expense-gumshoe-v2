import { formatCurrency, formatDate } from '@/lib/utils'
import { ExpenseTypeBadge } from '@/features/expenses/components/expense-type-badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Expense } from '@prisma/client'

type ExpenseListProps = { expenses: Array<Expense> }

export const ExpenseList = ({ expenses }: ExpenseListProps) => {
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
