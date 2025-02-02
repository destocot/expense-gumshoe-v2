import { ScrollArea } from '@/components/ui/scroll-area'
import { findAllExpenses } from '@/features/expenses/queries'
import type { Filter } from '@/features/expenses/types'
import { ExpenseAggregations } from '@/features/expenses/components/expense-aggregations'
import { ExpenseList } from '@/features/expenses/components/expense-list'

type ExpenseServer = { searchParamsPromise: Promise<{ filter?: Filter }> }

export const ExpenseServer = async ({ searchParamsPromise }: ExpenseServer) => {
  const filter = (await searchParamsPromise).filter

  // ------------------------------------------------------------
  const now = new Date()
  const startOfDay = new Date(now.setHours(0, 0, 0, 0))
  const endOfDay = new Date(now.setHours(23, 59, 59, 999))

  const startOfWeek = new Date(startOfDay)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(endOfWeek.getDate() + 6)
  endOfWeek.setHours(23, 59, 59, 999)
  // ------------------------------------------------------------

  const gte = filter === 'week' ? startOfWeek : filter === 'day' ? startOfDay : undefined
  const lte = filter === 'week' ? endOfWeek : filter === 'day' ? endOfDay : undefined

  const { data: expenses } = await findAllExpenses({
    createdAt: {
      ...(gte ? { gte } : {}),
      ...(lte ? { lte } : {}),
    },
  })

  if (!expenses) return null

  return (
    <>
      <div className='px-4'>
        <ExpenseAggregations expenses={expenses} />
      </div>

      <ScrollArea className='grow overflow-auto px-4'>
        <ul className='space-y-3'>
          <ExpenseList expenses={expenses} />
        </ul>
      </ScrollArea>
    </>
  )
}
