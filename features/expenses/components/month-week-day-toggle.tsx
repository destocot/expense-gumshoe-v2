'use client'

import { Calendar1Icon, CalendarDaysIcon, CalendarRangeIcon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Filter } from '@/features/expenses/types'

export const MonthWeekDayToggle = ({ filter }: { filter?: Filter }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const createPageURL = (filter: Filter) => {
    const params = new URLSearchParams(searchParams)
    params.set('filter', filter)
    return `${pathname}?${params.toString()}`
  }

  const handleFilterChange = (filter: Filter) => {
    switch (filter) {
      case 'all':
        router.push(createPageURL('all'))
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
    <ToggleGroup type='single' value={filter} onValueChange={handleFilterChange}>
      <ToggleGroupItem value='all' aria-label='Toggle all'>
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
