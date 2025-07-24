'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import PageWrapper from './page-wrapper'

interface AppShellProps {
  children: ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  
  // Routes that should not show navigation
  const noNavRoutes = ['/onboarding']
  const shouldHideNav = noNavRoutes.some(route => pathname.startsWith(route))
  
  if (shouldHideNav) {
    return <>{children}</>
  }
  
  return (
    <PageWrapper 
      showDesktopNav={false} 
      showMobileAppBar={true}
      className="bg-background"
    >
      {children}
    </PageWrapper>
  )
}