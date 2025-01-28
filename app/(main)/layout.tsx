import { Footer } from '@/components/footer'
import { MainHeader } from '@/components/header'

export default function MainLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <>
      <MainHeader />
      <main className='h-[calc(100dvh-4rem-4rem)]'>
        {modal}
        {children}
      </main>
      <Footer />
    </>
  )
}
