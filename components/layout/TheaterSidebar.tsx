import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { TheaterSidebarProps, SidebarItem } from '@/types/components'
import UserAvatarIcon from '@/components/ui/icons/UserAvatarIcon'

const SIDEBAR_ICONS: Record<string, React.ReactNode> = {
  spotlight_beam: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2v20" />
      <path d="M8 6l4-4 4 4" />
      <ellipse cx="12" cy="18" rx="6" ry="3" />
    </svg>
  ),
  vintage_admission_ticket: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M10 12c0 1.1.9 2 2 2s2-.9 2-2M6 6l1 3M18 6l-1 3" />
    </svg>
  ),
  crimson_rose: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22c-4 0-6-3-6-6s2-6 6-6 6 3 6 6-2 6-6 6z" />
      <path d="M12 10V2" />
      <path d="M9 5l3-3 3 3" />
    </svg>
  ),
  curtain_rise: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 4v16l8-4 8 4V4l-8 4-8-4z" />
    </svg>
  ),
  audience_member: (
    <UserAvatarIcon size={20} stroke="currentColor" strokeWidth={1.5} />
  ),
}

const DEFAULT_ITEMS: SidebarItem[] = [
  { icon: 'spotlight_beam', label: 'Browse', href: '/browse' },
  { icon: 'vintage_admission_ticket', label: 'My Collection', href: '/my-collection' },
  { icon: 'crimson_rose', label: 'My Ratings', href: '/profile#ratings' },
  { icon: 'curtain_rise', label: 'Collections', href: '/collections' },
  { icon: 'audience_member', label: 'Profile', href: '/profile' },
]

export default function TheaterSidebar({ items = DEFAULT_ITEMS }: TheaterSidebarProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(false)

  const isActive = (href: string) => {
    if (href === '/browse') return pathname === '/browse'
    if (href === '/profile') return pathname === '/profile'
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="fixed left-0 top-[72px] bottom-0 z-40 bg-[var(--surface-off)] transition-all duration-300 ease-out hidden md:block"
      style={{ width: expanded ? '220px' : '64px' }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex flex-col gap-1 py-4 px-2">
        {items.map(item => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex items-center gap-3 h-[48px] px-3 no-underline transition-all duration-200 group"
              style={{
                backgroundColor: active ? 'rgba(220,20,60,0.1)' : 'transparent',
                borderRadius: '2px',
                borderLeft: active ? '3px solid var(--color-primary)' : '3px solid transparent',
              }}

              title={expanded ? undefined : item.label}
            >
              <span
                className="flex-shrink-0 transition-colors duration-200"
                style={{
                  color: active ? 'var(--color-primary)' : 'var(--text-muted-2)',
                  filter: active ? 'drop-shadow(0 0 10px rgba(220,20,60,0.2))' : 'none',
                }}
              >
                {SIDEBAR_ICONS[item.icon]}
              </span>
              <span
                className="text-[14px] font-medium whitespace-nowrap overflow-hidden transition-all duration-300"
                style={{
                  color: active ? 'var(--color-primary)' : 'var(--text-secondary)',
                  opacity: expanded ? 1 : 0,
                  width: expanded ? 'auto' : 0,
                }}
              >
                {item.label}
              </span>

              {!expanded && (
                <div
                  className="absolute left-[60px] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[var(--surface-elevated)] border border-[var(--border-default)] text-[13px] text-white whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50"
                  style={{ borderRadius: '2px' }}
                >
                  {item.label}
                </div>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
