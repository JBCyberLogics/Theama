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
    <div className="min-h-screen pb-[56px] md:pb-0" style={{ backgroundColor: '#0A0A0A' }}>
      <TheaterNavbar transparent={transparentNav} />
      <main className="min-h-screen">
        {children}
      </main>
      {!hideFooter && <TheaterFooter />}
      <MobileNav />
    </div>
  )
}
