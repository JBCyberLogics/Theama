'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Completing your authentication...')

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')
    const type = params.get('type')

    if (accessToken) {
      setStatus('Authentication successful! Redirecting...')
      setTimeout(() => {
        const dest = type === 'recovery' ? '/auth/forgot-password' : '/'
        router.push(dest)
      }, 1500)
    } else {
      setStatus('No authentication data found.')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--surface-base)' }}>
      <div className="text-center">
        <div className="animate-spin-slow w-12 h-12 border-2 border-[var(--color-primary)] border-t-transparent rounded-full mx-auto mb-6" />
        <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[16px]">{status}</p>
      </div>
    </div>
  )
}
