'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserCircleIcon,
  BellIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  BellIcon as BellIconSolid,
  Squares2X2Icon as Squares2X2IconSolid
} from '@heroicons/react/24/solid'

interface PageWrapperProps {
  children: ReactNode
  showNavigation?: boolean
  showDesktopNav?: boolean
  showMobileAppBar?: boolean
  className?: string
}

interface NavItem {
  name: string
  href: string
  icon: typeof HomeIcon
  iconSolid: typeof HomeIconSolid
  mobileOnly?: boolean
  desktopOnly?: boolean
}

const navigationItems: NavItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: HomeIcon,
    iconSolid: HomeIconSolid
  },
  {
    name: 'Discover',
    href: '/discover',
    icon: MagnifyingGlassIcon,
    iconSolid: MagnifyingGlassIconSolid
  },
  {
    name: 'Create',
    href: '/onboarding',
    icon: PlusCircleIcon,
    iconSolid: PlusCircleIconSolid,
    mobileOnly: true
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Squares2X2Icon,
    iconSolid: Squares2X2IconSolid
  },
  {
    name: 'Activity',
    href: '/activity',
    icon: BellIcon,
    iconSolid: BellIconSolid,
    desktopOnly: true
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: UserCircleIcon,
    iconSolid: UserCircleIconSolid
  }
]

export default function PageWrapper({ 
  children, 
  showNavigation = true,
  showDesktopNav = true,
  showMobileAppBar = true,
  className = ''
}: PageWrapperProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === href
    return pathname.startsWith(href)
  }

  const filteredNavItems = (isMobile: boolean) => {
    return navigationItems.filter(item => {
      if (isMobile && item.desktopOnly) return false
      if (!isMobile && item.mobileOnly) return false
      return true
    })
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {showNavigation && (
        <>
          {/* Desktop/Tablet Navbar */}
          {showDesktopNav && (
            <nav className="hidden sm:block bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  {/* Logo */}
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/" className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">K</span>
                      </div>
                      <span className="font-bold text-xl text-gray-900">kiwik</span>
                    </Link>
                  </div>

                  {/* Desktop Navigation */}
                  <div className="ml-10 flex space-x-1">
                    {filteredNavItems(false).map((item) => {
                      const active = isActive(item.href)
                      const Icon = active ? item.iconSolid : item.icon
                      
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`
                            inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg
                            transition-colors duration-200
                            ${active 
                              ? 'text-blue-600 bg-blue-50' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }
                          `}
                        >
                          <Icon className="w-5 h-5 mr-2" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Desktop Actions */}
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <BellIcon className="w-6 h-6" />
                  </button>
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Create Project
                  </Link>
                </div>
              </div>
            </div>
            </nav>
          )}

          {/* Mobile Bottom App Bar */}
          {showMobileAppBar && (
            <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
            <div className="flex justify-around items-center h-16 px-2">
              {filteredNavItems(true).map((item) => {
                const active = isActive(item.href)
                const Icon = active ? item.iconSolid : item.icon
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex flex-col items-center justify-center flex-1 py-2 px-1
                      transition-colors duration-200
                      ${active ? 'text-blue-600' : 'text-gray-600'}
                    `}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs mt-1 font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>
            </nav>
          )}
        </>
      )}

      {/* Main Content */}
      <main className={`
        ${showNavigation && showDesktopNav ? 'sm:pt-0' : ''} 
        ${showNavigation && showMobileAppBar ? 'pb-16 sm:pb-0' : ''}
        flex-1
      `}>
        {children}
      </main>
    </div>
  )
}