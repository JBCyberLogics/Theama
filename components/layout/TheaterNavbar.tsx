'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import type { TheaterNavbarProps } from '@/types/components'
import SearchIcon from '@/components/ui/icons/SearchIcon'
import UserAvatarIcon from '@/components/ui/icons/UserAvatarIcon'

const NAV_LINKS = [
  { text: 'Browse', href: '/browse' },
  { text: 'Genres', href: '/genres' },
]

export default function TheaterNavbar({ transparent = true }: TheaterNavbarProps) {
  const { isAuthenticated, profile, signOut } = useAuth()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [avatarOpen, setAvatarOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isSolid = !transparent || scrolled

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
        isSolid ? 'bg-[rgba(10,5,5,0.95)] backdrop-blur-[10px] shadow-navbar' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="16" cy="16" r="15" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" />
            <path d="M16 6C12 6 8 8 8 12C8 14 9 16 10 18C11 20 12 21 16 26C20 21 21 20 22 18C23 16 24 14 24 12C24 8 20 6 16 6Z" fill="var(--color-primary)" opacity="0.8" />
            <path d="M16 10C13.5 10 12 11.5 12 13.5C12 14.8 12.8 16 14 17C14.8 17.8 15.4 18.4 16 22C16.6 18.4 17.2 17.8 18 17C19.2 16 20 14.8 20 13.5C20 11.5 18.5 10 16 10Z" fill="var(--color-gold)" opacity="0.6" />
          </svg>
          <div className="flex flex-col">
            <span
              className="font-['Playfair_Display'] text-[clamp(22px,5vw,28px)] font-bold text-white tracking-[-0.02em] leading-none"
            >
              THEAMA
              <span className="text-[var(--color-primary)]">.</span>
            </span>
            <span className="font-['Cormorant_Garamond'] italic text-[var(--text-muted-2)] text-[11px] leading-tight mt-0.5">
              created with love by WANJAMA-LABS
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--text-secondary)] hover:text-white transition-colors duration-200 text-[14px] font-medium tracking-[0.02em] no-underline"
            >
              {link.text}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/search')}
            className="w-11 h-11 flex items-center justify-center text-[var(--text-muted-2)] hover:text-[var(--color-primary)] transition-colors duration-200"
            aria-label="Search films"
          >
            <SearchIcon size={20} stroke="currentColor" />
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="w-11 h-11 rounded-full border-2 border-[var(--border-subtle)] overflow-hidden hover:border-[var(--color-primary)] transition-colors duration-200"
                aria-label="User menu"
              >
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[var(--surface-theater)] flex items-center justify-center">
                    <UserAvatarIcon size={16} />
                  </div>
                )}
              </button>

              {avatarOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setAvatarOpen(false)} />
                  <div className="absolute right-0 top-12 z-50 w-48 bg-[var(--surface-elevated)] border border-[var(--border-default)] rounded-[4px] py-2 shadow-lg">
                    <Link href="/my-collection" className="block px-4 py-2.5 text-[14px] text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(220,20,60,0.05)] no-underline transition-colors">
                      My Collection
                    </Link>
                    <Link href="/profile" className="block px-4 py-2.5 text-[14px] text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(220,20,60,0.05)] no-underline transition-colors">
                      Profile
                    </Link>
                    <div className="h-[1px] bg-[var(--border-default)] my-1" />
                    <button
                      onClick={() => { signOut(); setAvatarOpen(false) }}
                      className="w-full text-left px-4 py-2.5 text-[14px] text-[var(--text-muted)] hover:text-[var(--color-primary)] hover:bg-[rgba(220,20,60,0.05)] transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/sign-in"
                className="min-h-[44px] px-5 flex items-center text-[14px] font-medium tracking-[0.1em] text-[var(--color-gold)] border border-[var(--color-gold)] hover:bg-[rgba(201,168,76,0.08)] transition-all duration-200 no-underline"
                style={{ borderRadius: '2px' }}
              >
                SIGN IN
              </Link>
              <Link
                href="/auth/sign-up"
                className="min-h-[44px] px-5 hidden sm:inline-flex items-center text-[14px] font-medium tracking-[0.1em] text-white bg-gradient-to-r from-[var(--color-deep)] to-[var(--color-primary)] hover:from-[var(--color-primary)] hover:to-[var(--color-error)] transition-all duration-200 no-underline shadow-[0_4px_15px_rgba(220,20,60,0.2)] hover:shadow-[0_6px_25px_rgba(220,20,60,0.4)]"
                style={{ borderRadius: '2px' }}
              >
                CLAIM TICKET
              </Link>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center text-[var(--text-secondary)]"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 6h18" />
              <path d="M3 12h18" />
              <path d="M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[rgba(10,5,5,0.98)] backdrop-blur-[10px] border-t border-[var(--border-default)]">
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[var(--text-secondary)] hover:text-white py-2 text-[14px] font-medium no-underline"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
