import { cn } from '@/lib/utils'
import Link from 'next/link'

type LogoProps = { className?: string }

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href='/'
      className={cn(
        'rounded bg-primary px-0.5 text-xl font-bold text-primary-foreground',
        className,
      )}
    >
      Expense Gumshoe
    </Link>
  )
}
