import { Logo } from '@/components/logo'
import { ThemeToggler } from '@/components/theme-toggler'
import { SignedIn, SignedOut } from '@/features/auth/components/signed-in-out'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className='h-16'>
      <div className='container mx-auto flex h-full max-w-screen-md items-center justify-between px-4 sm:px-8'>
        <Logo className='-rotate-2' />
        {children}
      </div>
    </header>
  )
}

export const AuthHeader = () => {
  return (
    <Header>
      <ThemeToggler />
    </Header>
  )
}

export const MainHeader = () => {
  return (
    <Header>
      <nav className='flex items-center gap-x-2'>
        <ul className='flex items-center gap-x-2'>
          <li>
            <SignedOut>
              <Button variant='ghost' size='sm' asChild>
                <Link href='/login'>Log In</Link>
              </Button>
            </SignedOut>
          </li>

          <li>
            <SignedIn>
              <Button variant='ghost' size='sm' asChild>
                <Link href='/profile'>Profile</Link>
              </Button>
            </SignedIn>
          </li>
        </ul>

        <ThemeToggler />
      </nav>
    </Header>
  )
}
