'use client'

import resolveConfig from 'tailwindcss/resolveConfig'
import config from '@/tailwind.config'
import { useMedia } from 'react-use'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from '@/components/ui/drawer'

const tailwindConfig = resolveConfig(config)

type ResponsiveModalProps = {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ResponsiveModal = ({ children, open, onOpenChange }: ResponsiveModalProps) => {
  const isDesktop = useMedia(`(min-width: ${tailwindConfig.theme.screens.sm}`, true)

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='hide-scrollbar w-full overflow-y-auto border-none p-0 sm:max-w-lg'>
          <DialogTitle className='sr-only'>Modal Title</DialogTitle>
          <DialogDescription className='sr-only'>Modal Description</DialogDescription>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerTitle className='sr-only'>Modal Title</DrawerTitle>
        <DrawerDescription className='sr-only'>Modal Description</DrawerDescription>
        <div className='hide-scrollbar overflow-y-auto'>{children}</div>
      </DrawerContent>
    </Drawer>
  )
}
