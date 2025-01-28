import { findAllExpenses } from '@/features/expenses/queries'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { ExpenseTypeBadge } from '@/features/expenses/components/expense-type-badge'

export default async function HomePage() {
  const expenses = await findAllExpenses()

  return (
    <>
      <div className='container mx-auto h-full max-w-screen-md px-4 py-16 sm:px-8'>
        <div className='w-full space-y-8'>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>Expenses</h1>

            <Button size='sm' asChild>
              <Link href='/expenses/new'>
                <PlusIcon />
                <span className='hidden sm:inline'>New Expense</span>
              </Link>
            </Button>
          </div>

          {expenses ? (
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
                      <div className='truncate text-sm text-muted-foreground'>
                        {e.description ?? '-'}
                      </div>
                      <div className='shrink-0 text-sm text-muted-foreground'>
                        {formatDate(e.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
