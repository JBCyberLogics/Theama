'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import StageLayout from '@/components/layout/StageLayout'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Completing authentication...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { supabase } = await import('@/lib/supabaseClient')
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          setStatus('Authentication successful! Redirecting...')
          setTimeout(() => router.push('/browse'), 1000)
        } else {
          const params = new URLSearchParams(window.location.hash.replace('#', '?'))
          const accessToken = params.get('access_token')
          if (accessToken) {
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: params.get('refresh_token') || '',
            })
            setStatus('Authentication successful! Redirecting...')
            setTimeout(() => router.push('/browse'), 1000)
          } else {
            setStatus('No authentication data found. You may close this window.')
          }
        }
      } catch {
        setStatus('Something went wrong. Please try signing in again.')
      }
    }
    handleCallback()
  }, [router])

  return (
    <StageLayout transparentNav={false} hideFooter>
      <div className="min-h-screen flex items-center justify-center px-4 pt-[72px]" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="flex flex-col items-center gap-6">
          <svg className="animate-spin-slow" width="48" height="48" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" stroke="#DC143C" strokeWidth="1.5" fill="none" opacity="0.3" />
            <path d="M16 6C12 6 8 8 8 12C8 14 9 16 10 18C11 20 12 21 16 26" stroke="#DC143C" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="font-['Cormorant_Garamond'] italic text-[#B38080] text-[16px]">
            {status}
          </p>
        </div>
      </div>
    </StageLayout>
  )
}
