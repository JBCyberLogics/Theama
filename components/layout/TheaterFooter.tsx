import Link from 'next/link'

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Browse',
    links: [
      { label: 'Trending', href: '/browse?filter=trending' },
      { label: 'Top Rated', href: '/browse?filter=top_rated' },
      { label: 'Popular', href: '/browse?filter=popular' },
      { label: 'Now Playing', href: '/browse?filter=now_playing' },
      { label: 'Upcoming', href: '/browse?filter=upcoming' },
      { label: 'Genres', href: '/genres' },
    ],
  },
  {
    title: 'Theama',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
]

export default function TheaterFooter() {
  return (
    <footer
      className="border-t border-[var(--border-default)]"
      style={{ backgroundColor: 'var(--surface-off)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {FOOTER_COLUMNS.map(col => (
            <div key={col.title}>
              <h4 className="font-['Playfair_Display'] text-white text-[14px] font-semibold mb-4 tracking-[0.1em] uppercase">
                {col.title}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[var(--text-muted-3)] hover:text-[var(--text-secondary)] text-[14px] no-underline transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[var(--border-default)]">
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="16" cy="16" r="15" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" />
              <path d="M16 6C12 6 8 8 8 12C8 14 9 16 10 18C11 20 12 21 16 26C20 21 21 20 22 18C23 16 24 14 24 12C24 8 20 6 16 6Z" fill="var(--color-primary)" opacity="0.8" />
            </svg>
            <span className="font-['Playfair_Display'] text-white text-[16px] font-bold">
              THEAMA<span className="text-[var(--color-primary)]">.</span>
            </span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-[var(--text-muted-2)] text-[12px]">
              &copy; 2026 Theama. All rights reserved.
            </p>
            <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted-2)] text-[13px]">
              Everything created with love by WANJAMA-LABS
            </p>
            <p className="text-[var(--text-muted-2)] text-[11px] max-w-[400px] text-center md:text-right">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
