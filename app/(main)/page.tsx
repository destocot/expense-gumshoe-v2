import { findAllExpenses } from '@/features/expenses/queries'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, PlusIcon } from 'lucide-react'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import { ExpenseTypeBadge } from '@/features/expenses/components/expense-type-badge'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export default async function HomePage() {
  const expenses = await findAllExpenses()

  if (!expenses) {
    return (
      <>
        <div className='container mx-auto h-full max-w-screen-md px-4 py-16 sm:px-8'>
          <div className='w-full space-y-8'>
            <div className='flex items-center justify-between'>
              <h1 className='text-3xl font-bold'>Expenses</h1>

              <Button size='sm' asChild>
                <Link href='/login'>
                  Get Started
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

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
    <>
      <div className='container mx-auto flex h-[calc(100dvh-4rem-4rem)] max-w-screen-md px-4 py-16 sm:px-8'>
        <div className='flex h-full w-full flex-col gap-y-8'>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>Expenses</h1>

            <Button size='sm' asChild>
              <Link href='/expenses/new'>
                <PlusIcon />
                <span className='hidden sm:inline'>New Expense</span>
              </Link>
            </Button>
          </div>

          <Card>
            <div className='flex items-center justify-between p-6'>
              <h2
                className={cn('flex-1 text-xl font-bold tabular-nums sm:text-2xl', {
                  'text-green-500': aggregations.net > 0,
                  'text-red-500': aggregations.net < 0,
                })}
              >
                {formatCurrency(aggregations.net)}
              </h2>

              <div className='flex flex-1 justify-between'>
                <h3 className='text-lg font-bold tabular-nums text-blue-500 sm:text-xl'>
                  {formatCurrency(aggregations.savings)}
                </h3>
                <h3 className='text-lg font-bold tabular-nums text-yellow-500 sm:text-xl'>
                  {formatCurrency(aggregations.other)}
                </h3>
              </div>
            </div>
          </Card>

          <ScrollArea className='flex-1 rounded border'>
            <div className='w-full'>
              {/* Desktop view */}
              <table className='hidden w-full sm:table sm:table-auto'>
                <thead>
                  <tr>
                    <th className='border-b p-4 text-right font-medium'>Amount</th>
                    <th className='border-b p-4 text-left font-medium'>Description</th>
                    <th className='border-b p-4 text-center font-medium'>Type</th>
                    <th className='border-b p-4 text-center font-medium'>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((e) => (
                    <tr key={e.expenseId} className='transition hover:bg-primary/5'>
                      <td className='border-b p-4 text-right tabular-nums'>
                        {formatCurrency(e.amount)}
                      </td>
                      <td className='border-b p-4 text-muted-foreground'>
                        <div className='max-w-[15rem] truncate md:max-w-xs'>
                          {e.description ?? '-'}
                        </div>
                      </td>
                      <td className='border-b p-4 text-center text-muted-foreground'>
                        <ExpenseTypeBadge type={e.type} />
                      </td>
                      <td className='border-b p-4 text-center text-muted-foreground'>
                        <div className='whitespace-nowrap'>{formatDate(e.createdAt)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile view */}
              <div className='sm:hidden'>
                {expenses.map((e) => (
                  <div
                    key={e.expenseId}
                    className='rounded border-b p-4 transition hover:bg-primary/5'
                  >
                    <div className='mb-2 flex items-center justify-between'>
                      <span className='font-medium'>{formatCurrency(e.amount)}</span>
                      <ExpenseTypeBadge type={e.type} clip />
                    </div>

                    <div className='flex items-center justify-between gap-8'>
                      <div className='w-0 flex-1 truncate text-sm text-muted-foreground'>
                        {e.description ?? '-'}
                      </div>
                      <div className='shrink-0 whitespace-nowrap text-sm text-muted-foreground'>
                        {formatDate(e.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  )
}
