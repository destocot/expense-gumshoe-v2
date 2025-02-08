import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LogoutButton } from '@/features/auth/components/logout-button'
import { ExpenseTypeBadge } from '@/features/expenses/components/expense-type-badge'
import { findAllExpenses } from '@/features/expenses/queries'
import { auth } from '@/lib/auth'
import { cn, formatCurrency } from '@/lib/utils'
import { PencilIcon } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth()
  if (!session) redirect('/login')

  const { data: expenses } = await findAllExpenses({})

  const aggregations = (expenses ?? []).reduce(
    (accu, { type, amount }) => {
      switch (type) {
        case 'EXPENSE':
          return { ...accu, net: accu.net - amount, expenses: accu.expenses + amount }
        case 'INCOME':
          return { ...accu, net: accu.net + amount, income: accu.income + amount }
        case 'OTHER':
          return { ...accu, other: accu.other + amount }
        case 'SAVINGS':
          return { ...accu, savings: accu.savings + amount }
        default:
          return accu
      }
    },
    { expenses: 0, income: 0, savings: 0, other: 0, net: 0 },
  )

  return (
    <div className='container mx-auto h-full max-w-screen-md px-4 py-8 sm:px-8'>
      <div className='w-full space-y-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>Profile</h2>

          <LogoutButton />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User</CardTitle>
            <CardDescription>{session.user.id}</CardDescription>
          </CardHeader>

          <CardContent>
            <div className='relative grid grid-cols-2 justify-items-center gap-4'>
              <div className='space-x-2'>
                <ExpenseTypeBadge type='EXPENSE' />
                <span className='tabular-nums'>{formatCurrency(aggregations.expenses)}</span>
              </div>

              <div className='space-x-2'>
                <ExpenseTypeBadge type='INCOME' />
                <span className='tabular-nums'>{formatCurrency(aggregations.income)}</span>
              </div>

              <div className='space-x-2'>
                <ExpenseTypeBadge type='SAVINGS' />
                <span className='tabular-nums'>{formatCurrency(aggregations.savings)}</span>
              </div>

              <div className='space-x-2'>
                <ExpenseTypeBadge type='OTHER' />
                <span className='tabular-nums'>{formatCurrency(aggregations.other)}</span>
              </div>

              <div className='absolute inset-x-0 top-1/2 -translate-y-1/2 border border-dashed' />
              <div className='absolute inset-y-0 left-1/2 top-0 -translate-x-1/2 border border-dashed' />
            </div>
          </CardContent>

          <CardFooter className='justify-center'>
            <div className='space-x-2'>
              <Badge>Net</Badge>
              <span
                className={cn('tabular-nums', {
                  'text-green-500': aggregations.net > 0,
                  'text-red-500': aggregations.net < 0,
                })}
              >
                {formatCurrency(aggregations.net)}
              </span>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Check Breakdown</CardTitle>
          </CardHeader>

          <CardContent>
            <div className='grid grid-cols-3 justify-items-center gap-4'>
              <div className='space-x-2'>
                <Badge variant='outline'>Income</Badge>
                <span>33%</span>
              </div>
              <div className='space-x-2'>
                <Badge variant='outline'>Savings</Badge>
                <span>33%</span>
              </div>
              <div className='space-x-2'>
                <Badge variant='outline'>Other</Badge>
                <span>34%</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className='justify-center'>
            <Button size='sm' variant='ghost'>
              <PencilIcon />
              Edit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
