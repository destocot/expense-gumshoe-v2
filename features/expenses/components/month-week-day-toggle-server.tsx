import { MonthWeekDayToggle } from '@/features/expenses/components/month-week-day-toggle'
import type { Filter } from '@/features/expenses/types'

type MonthWeekDayToggleServer = { searchParamsPromise: Promise<{ filter?: Filter }> }

export const MonthWeekDayToggleServer = async ({
  searchParamsPromise,
}: MonthWeekDayToggleServer) => {
  const filter = (await searchParamsPromise).filter

  return <MonthWeekDayToggle filter={filter} />
}
