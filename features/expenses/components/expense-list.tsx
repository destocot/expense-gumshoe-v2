import { formatCurrency, formatDate } from '@/lib/utils'
import { ExpenseTypeBadge } from '@/features/expenses/components/expense-type-badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Expense } from '@prisma/client'
import { ExpenseActionButtons } from './expense-action-buttons'

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
          <div className='relative flex items-center justify-between gap-2'>
            <p className='line-clamp-1 text-sm text-muted-foreground group-hover:max-w-[45ch] md:group-hover:max-w-[55ch]'>
              {e.description ?? '-'}
            </p>

            <div className='absolute right-0 hidden group-hover:block'>
              <ExpenseActionButtons expenseId={e.expenseId} />
            </div>
          </div>
        </CardContent>
      </Card>
    </li>
  ))
}
