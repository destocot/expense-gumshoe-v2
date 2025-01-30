import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ExpenseType } from '@prisma/client'

type ExpenseTypeBadgeProps = { type: ExpenseType; clip?: boolean }

export const ExpenseTypeBadge = ({ type, clip }: ExpenseTypeBadgeProps) => {
  return (
    <Badge
      className={cn('rounded-full', {
        'bg-red-500 hover:bg-red-500': type === 'EXPENSE',
        'bg-green-500 hover:bg-green-500': type === 'INCOME',
        'bg-blue-500 hover:bg-blue-500': type === 'SAVINGS',
        'bg-yellow-500 hover:bg-yellow-500': type === 'OTHER',
      })}
    >
      <span className='w-12 text-center'>{clip ? type.substring(0, 3) : type}</span>
    </Badge>
  )
}
