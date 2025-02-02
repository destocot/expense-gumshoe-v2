'use client'

import { Button } from '@/components/ui/button'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { useTransition } from 'react'
import { deleteExpenseAction } from '../actions/delete-expense.action'
import Link from 'next/link'

type ExpenseActionButtonsProps = { expenseId: string }

export const ExpenseActionButtons = ({ expenseId }: ExpenseActionButtonsProps) => {
  const [isPending, startTransition] = useTransition()

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteExpenseAction(id)
    })
  }

  return (
    <div className='flex gap-2'>
      <Button variant='secondary' size='sm' asChild>
        <Link href={`/expenses/${expenseId}/edit`}>
          <PencilIcon />
          <span className='hidden sm:inline'>Edit</span>
        </Link>
      </Button>

      <Button
        size='sm'
        variant='destructive'
        onClick={handleDelete.bind(null, expenseId)}
        disabled={isPending}
      >
        <TrashIcon />
        <span className='hidden sm:inline'>Delete</span>
      </Button>
    </div>
  )
}
