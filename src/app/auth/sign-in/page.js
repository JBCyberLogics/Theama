'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import TicketAuthCard from '@/components/auth/TicketAuthCard'

export default function SignInPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [error] = useState(null)

  const handleSubmit = async (data) => {
    const { error } = await signIn(data.email, data.password)
    if (error) throw new Error(error)
    router.push('/profile')
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--surface-base)' }}>
        <div className="text-center">
          <h1 className="font-['Playfair_Display'] text-white text-[24px] mb-4">Connection Issue</h1>
          <p className="text-[var(--text-muted)] text-[14px]">Unable to connect to the server. Please ensure the backend is running.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20" style={{ backgroundColor: 'var(--surface-base)' }}>
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <h1 className="font-['Playfair_Display'] text-white text-[32px] font-bold tracking-[-0.02em]">Welcome Back</h1>
          <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[16px] mt-2">The stage awaits your arrival</p>
        </div>
        <TicketAuthCard mode="sign_in" onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
