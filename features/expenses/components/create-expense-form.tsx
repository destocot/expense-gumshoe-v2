'use client'

import { createExpenseAction } from '@/features/expenses/actions/create-expense.action'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type CreateExpenseInput, CreateExpenseSchema, TYPES } from '@/features/expenses/schemas'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { DollarSignIcon } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

type CreateExpenseFormProps = { handleOpenChange?: () => void }

export const CreateExpenseForm = ({ handleOpenChange }: CreateExpenseFormProps) => {
  const close = handleOpenChange ? handleOpenChange : () => {}

  const form = useForm<CreateExpenseInput>({
    resolver: zodResolver(CreateExpenseSchema),
    defaultValues: { amount: '', description: '', type: TYPES[0] },
  })

  const submit = async (values: CreateExpenseInput) => {
    const { error } = await createExpenseAction(values)

    if (error) {
      for (const name in error) {
        if (name === 'amount' || name === 'type' || name === 'description') {
          form.setError(name, { message: error[name]?._errors?.[0] })
        } else {
          const message = error._errors?.[0]
          if (message) form.setError('description', { message })
        }
      }
    } else {
      close()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    {...field}
                    className='ps-7'
                    onChange={(evt) => {
                      let value = evt.target.value
                      if (value.endsWith('.')) return field.onChange(evt)

                      let [int, dec] = value.split('.')
                      value = dec ? `${int}.${dec.slice(0, 2)}` : value
                      evt.target.value = value
                      return field.onChange(evt)
                    }}
                  />
                  <DollarSignIcon className='absolute left-2 top-1/2 size-4 -translate-y-1/2 stroke-muted-foreground' />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <div className='relative'>
                    <SelectTrigger>
                      <SelectValue />
                      <div
                        className={cn(
                          'absolute right-12 top-1/2 size-4 -translate-y-1/2 rounded-full',
                          {
                            'bg-red-500': field.value === 'EXPENSE',
                            'bg-green-500': field.value === 'INCOME',
                            'bg-blue-500': field.value === 'SAVINGS',
                            'bg-yellow-500': field.value === 'OTHER',
                          },
                        )}
                      />
                    </SelectTrigger>
                  </div>
                </FormControl>

                <SelectContent>
                  {TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} className='resize-none' maxLength={200} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={form.formState.isSubmitting} className='w-full'>
          {form.formState.isSubmitting ? 'Creating Expense...' : 'Create Expense'}
        </Button>
      </form>
    </Form>
  )
}
