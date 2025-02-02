import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateExpenseForm } from '@/features/expenses/components/create-expense-form'

export default function Page() {
  return (
    <div className='container mx-auto grid h-full max-w-screen-md place-items-center px-4 pb-16 pt-8 sm:px-8'>
      <Card className='w-full max-w-lg border-0 shadow-none sm:border sm:shadow'>
        <CardHeader>
          <CardTitle>Create New Expense</CardTitle>
          <CardDescription>Fill out the details below to log a new expense.</CardDescription>
        </CardHeader>

        <CardContent>
          <CreateExpenseForm />
        </CardContent>
      </Card>
    </div>
  )
}
