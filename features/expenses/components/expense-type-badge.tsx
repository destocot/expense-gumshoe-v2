import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ExpenseType } from '@prisma/client'

type ExpenseTypeBadgeProps = { type: ExpenseType; clip?: boolean }

export const ExpenseTypeBadge = ({ type, clip }: ExpenseTypeBadgeProps) => {
  return (
    <Badge
      className={cn('aspect-square justify-center rounded-full sm:aspect-auto sm:w-[4.65rem]', {
        'bg-red-500 hover:bg-red-500': type === 'EXPENSE',
        'bg-green-500 hover:bg-green-500': type === 'INCOME',
        'bg-blue-500 hover:bg-blue-500': type === 'SAVINGS',
        'bg-yellow-500 hover:bg-yellow-500': type === 'OTHER',
      })}
    >
      {clip ? type.charAt(0) : type}
    </Badge>
  )
}
