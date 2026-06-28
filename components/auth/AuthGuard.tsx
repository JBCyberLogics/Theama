import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

interface AuthGuardProps {
  children: ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export default function AuthGuard({ children, requireAuth = true, redirectTo = '/auth/sign-in' }: AuthGuardProps) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        router.replace(redirectTo)
      }
    }
  }, [loading, isAuthenticated, requireAuth, redirectTo, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--surface-base)' }}>
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin-slow" width="48" height="48" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" opacity="0.3" />
            <path d="M16 6C12 6 8 8 8 12C8 14 9 16 10 18C11 20 12 21 16 26" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[16px]">
            The curtain rises...
          </span>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null
  }

  return <>{children}</>
}
