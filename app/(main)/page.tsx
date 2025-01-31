import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MonthWeekDayToggle } from '@/features/expenses/components/month-week-day-toggle'
import { ExpenseList } from '@/features/expenses/components/expense-list'
import { ExpenseAggregations } from '@/features/expenses/components/expense-aggregations'
import { PlusIcon } from 'lucide-react'
import type { View } from '@/features/expenses/types'

type PageProps = { searchParams: Promise<{ view: View }> }

export default async function Page({ searchParams }: PageProps) {
  const view = (await searchParams).view ?? 'month'

  return (
    <div className='container mx-auto h-[calc(100dvh-4rem-4rem)] max-w-screen-md px-4 py-8 sm:px-8'>
      <div className='flex h-full flex-col gap-y-6'>
        <div className='flex items-center justify-between px-4'>
          <h2 className='text-2xl font-bold'>Expenses</h2>

          <MonthWeekDayToggle view={view} />

          <Button variant='outline' size='sm' asChild>
            <Link href='/expenses/new'>
              <PlusIcon />
              <span className='hidden sm:inline'>New Expense</span>
            </Link>
          </Button>
        </div>

        <div className='px-4'>
          <ExpenseAggregations view={view} />
        </div>

        <ScrollArea className='grow overflow-auto px-4'>
          <ul className='space-y-3'>
            <ExpenseList view={view} />
          </ul>
        </ScrollArea>
      </div>
    </div>
  )
}
