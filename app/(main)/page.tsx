import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import type { Filter } from '@/features/expenses/types'
import { MonthWeekDayToggleServer } from '@/features/expenses/components/month-week-day-toggle-server'
import { ExpenseServer } from '@/features/expenses/components/expense-server'

type PageProps = { searchParams: Promise<{ filter?: Filter }> }

export default function Page({ searchParams }: PageProps) {
  return (
    <div className='container mx-auto h-[calc(100dvh-4rem-4rem)] max-w-screen-md px-4 py-8 sm:px-8'>
      <div className='flex h-full flex-col gap-y-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>Expenses</h2>

          <MonthWeekDayToggleServer searchParamsPromise={searchParams} />

          <Button variant='outline' size='sm' asChild>
            <Link href='/expenses/new'>
              <PlusIcon />
              <span className='hidden sm:inline'>New Expense</span>
            </Link>
          </Button>
        </div>

        <ExpenseServer searchParamsPromise={searchParams} />
      </div>
    </div>
  )
}
