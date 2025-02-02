import { formatCurrency, formatDate } from '@/lib/utils'
import { ExpenseTypeBadge } from '@/features/expenses/components/expense-type-badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Expense } from '@prisma/client'
import { ExpenseActionButtons } from '@/features/expenses/components/expense-action-buttons'

type ExpenseListProps = { expenses: Array<Expense> }

export const ExpenseList = ({ expenses }: ExpenseListProps) => {
  return expenses.map((e) => (
    <li key={e.expenseId}>
      <Card key={e.expenseId} className='group rounded'>
        <CardHeader>
          <div className='flex items-center justify-between gap-2'>
            <CardTitle>{formatCurrency(e.amount)}</CardTitle>
            <ExpenseTypeBadge type={e.type} />
          </div>
          <CardDescription>{formatDate(e.createdAt)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='relative flex items-center'>
            <p className='line-clamp-1 break-all pr-20 text-sm text-muted-foreground sm:pr-36'>
              {e.description ?? '-'}
            </p>

            <div className='absolute right-0 opacity-0 group-hover:opacity-100'>
              <ExpenseActionButtons expenseId={e.expenseId} />
            </div>
          </div>
        </CardContent>
      </Card>
    </li>
  ))
}
