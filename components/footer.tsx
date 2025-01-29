import { Logo } from '@/components/logo'

export const Footer = () => {
  return (
    <footer className='h-16'>
      <div className='container mx-auto flex h-full max-w-screen-md flex-col items-center justify-center gap-2 px-4 sm:flex-row sm:justify-between sm:px-8'>
        <Logo className='-rotate-2 text-sm' />

        <span className='text-xs text-muted-foreground'>
          {new Date().getFullYear()} Khurram Ali. All Rights Reserved
        </span>
      </div>
    </footer>
  )
}
