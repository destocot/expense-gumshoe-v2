import { Card } from '@/components/ui/card'
import { findAllExpenses } from '../queries'
import { cn, formatCurrency } from '@/lib/utils'
import type { View } from '@/features/expenses/types'

type ExpenseAggregationsProps = { view: View }

export const ExpenseAggregations = async ({ view }: ExpenseAggregationsProps) => {
  const { data: expenses } = await findAllExpenses({ view })

  if (!expenses) return null

  const aggregations = expenses.reduce(
    (accu, { type, amount }) => {
      switch (type) {
        case 'EXPENSE':
          return { ...accu, net: accu.net - amount }
        case 'INCOME':
          return { ...accu, net: accu.net + amount }
        case 'OTHER':
          return { ...accu, other: accu.other + amount }
        case 'SAVINGS':
          return { ...accu, savings: accu.savings + amount }
        default:
          return accu
      }
    },
    { net: 0, savings: 0, other: 0 },
  )

  return (
    <Card className='rounded'>
      <div className='flex items-center justify-between px-6 py-2'>
        <h1
          className={cn('text-3xl font-bold tabular-nums', {
            'text-green-500': aggregations.net > 0,
            'text-red-500': aggregations.net < 0,
          })}
        >
          {formatCurrency(aggregations.net)}
        </h1>

        <div className='flex flex-col gap-2'>
          <h3 className='font-bold tabular-nums text-blue-500'>
            {formatCurrency(aggregations.savings)}
          </h3>
          <h3 className='font-bold tabular-nums text-yellow-500'>
            {formatCurrency(aggregations.other)}
          </h3>
        </div>
      </div>
    </Card>
  )
}
