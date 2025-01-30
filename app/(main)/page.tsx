import { findAllExpenses } from '@/features/expenses/queries'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, PlusIcon } from 'lucide-react'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import { ExpenseTypeBadge } from '@/features/expenses/components/expense-type-badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Expense } from '@prisma/client'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Calendar1Icon, CalendarDaysIcon, CalendarRangeIcon } from 'lucide-react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export default async function HomePage() {
  const expenses = await findAllExpenses()

  if (!expenses) {
    return (
      <>
        <div className='container mx-auto h-full max-w-screen-md px-4 py-8 sm:px-8'>
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
    <div className='container mx-auto h-[calc(100dvh-4rem-4rem)] max-w-screen-md px-4 py-8 sm:px-8'>
      <div className='flex h-full flex-col gap-y-6'>
        <div className='flex items-center justify-between px-4'>
          <h2 className='text-2xl font-bold'>Expenses</h2>

          <ToggleGroup type='single'>
            <ToggleGroupItem value='bold' aria-label='Toggle month'>
              <CalendarDaysIcon className='size-4' />
            </ToggleGroupItem>
            <ToggleGroupItem value='italic' aria-label='Toggle week'>
              <CalendarRangeIcon className='size-4' />
            </ToggleGroupItem>
            <ToggleGroupItem value='strikethrough' aria-label='Toggle day'>
              <Calendar1Icon className='size-4' />
            </ToggleGroupItem>
          </ToggleGroup>

          <Button variant='outline' size='sm' asChild>
            <Link href='/expenses/new'>
              <PlusIcon />
              <span className='hidden sm:inline'>New Expense</span>
            </Link>
          </Button>
        </div>

        <div className='px-4'>
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
        </div>

        <ScrollArea className='grow overflow-auto px-4'>
          <ul className='space-y-3'>
            <ExpenseList expenses={expenses} />
          </ul>
        </ScrollArea>
      </div>
    </div>
  )
}

type ExpenseListProps = { expenses: Array<Expense> }

const ExpenseList = ({ expenses }: ExpenseListProps) => {
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
