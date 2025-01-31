'use client'

import { Calendar1Icon, CalendarDaysIcon, CalendarRangeIcon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { View } from '@/features/expenses/types'

export const MonthWeekDayToggle = ({ view }: { view: View }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const createPageURL = (view: View) => {
    const params = new URLSearchParams(searchParams)
    params.set('view', view)
    return `${pathname}?${params.toString()}`
  }

  const handleViewChange = (view: View) => {
    switch (view) {
      case 'month':
        router.push(createPageURL('month'))
        break
      case 'week':
        router.push(createPageURL('week'))
        break
      case 'day':
        router.push(createPageURL('day'))
        break
      default:
        return
    }
  }

  return (
    <ToggleGroup type='single' value={view} onValueChange={handleViewChange}>
      <ToggleGroupItem value='month' aria-label='Toggle month'>
        <CalendarDaysIcon className='size-4' />
      </ToggleGroupItem>
      <ToggleGroupItem value='week' aria-label='Toggle week'>
        <CalendarRangeIcon className='size-4' />
      </ToggleGroupItem>
      <ToggleGroupItem value='day' aria-label='Toggle day'>
        <Calendar1Icon className='size-4' />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
