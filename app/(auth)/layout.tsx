import { Footer } from '@/components/footer'
import { AuthHeader } from '@/components/header'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AuthHeader />
      <main className='h-[calc(100dvh-4rem-4rem)]'>{children}</main>
      <Footer />
    </>
  )
}
