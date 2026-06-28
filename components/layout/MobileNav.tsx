'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import SearchIcon from '@/components/ui/icons/SearchIcon'
import UserAvatarIcon from '@/components/ui/icons/UserAvatarIcon'

export default function MobileNav() {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  useEffect(() => { setMounted(true) }, [])

  const authed = mounted && isAuthenticated

  const tabs = [
    {
      href: '/browse',
      label: 'Browse',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? 'var(--color-primary)' : 'none'} stroke={active ? 'var(--color-primary)' : 'var(--text-muted-2)'} strokeWidth="1.5" strokeLinecap="round">
          <path d="M12 2v20" />
          <path d="M8 6l4-4 4 4" />
          <ellipse cx="12" cy="18" rx="6" ry="3" />
        </svg>
      ),
    },
    {
      href: '/search',
      label: 'Search',
      icon: (active: boolean) => (
        <SearchIcon size={20} stroke={active ? 'var(--color-primary)' : 'var(--text-muted-2)'} />
      ),
    },
    {
      href: authed ? '/my-collection' : '/auth/sign-in',
      label: 'Collection',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? 'var(--color-primary)' : 'none'} stroke={active ? 'var(--color-primary)' : 'var(--text-muted-2)'} strokeWidth="1.5">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M10 12c0 1.1.9 2 2 2s2-.9 2-2M6 6l1 3M18 6l-1 3" />
        </svg>
      ),
    },
    {
      href: '/collections',
      label: 'Collections',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--color-primary)' : 'var(--text-muted-2)'} strokeWidth="1.5" strokeLinecap="round">
          <path d="M4 4v16l8-4 8 4V4l-8 4-8-4z" />
        </svg>
      ),
    },
    {
      href: authed ? '/profile' : '/auth/sign-in',
      label: authed ? 'Profile' : 'Sign In',
      icon: (active: boolean) => (
        <UserAvatarIcon size={20} stroke={active ? 'var(--color-primary)' : 'var(--text-muted-2)'} strokeWidth={1.5} />
      ),
    },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        backgroundColor: 'rgba(10,5,5,0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--border-default)',
      }}
    >
      <div className="flex items-center justify-around min-h-[56px] px-1 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const active = pathname === tab.href || pathname.startsWith(tab.href + '/') ||
            (tab.href === '/browse' && pathname === '/')
          return (
            <Link
              key={tab.href + tab.label}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[48px] h-full no-underline"
            >
              {tab.icon(active)}
              <span
                className="text-[9px] font-medium tracking-[0.02em]"
                style={{ color: active ? 'var(--color-primary)' : 'var(--text-muted-2)' }}
              >
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
