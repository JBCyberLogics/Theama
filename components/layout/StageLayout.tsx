import type { ReactNode } from 'react'
import TheaterNavbar from './TheaterNavbar'
import TheaterFooter from './TheaterFooter'
import MobileNav from './MobileNav'

interface StageLayoutProps {
  children: ReactNode
  transparentNav?: boolean
  hideFooter?: boolean
}

export default function StageLayout({ children, transparentNav = true, hideFooter = false }: StageLayoutProps) {
  return (
    <div className="min-h-screen pb-[calc(56px+env(safe-area-inset-bottom))] md:pb-0" style={{ backgroundColor: 'var(--surface-base)', position: 'relative' }}>
      <TheaterNavbar transparent={transparentNav} />
      <main className="min-h-screen">
        {children}
      </main>
      {!hideFooter && <TheaterFooter />}
      <MobileNav />
    </div>
  )
}
