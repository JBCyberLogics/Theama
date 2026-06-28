'use client'

import { useState } from 'react'
import TicketAuthCard from '@/components/auth/TicketAuthCard'

export default function ForgotPasswordPage() {
  const [error] = useState(null)
  const [resetSent, setResetSent] = useState(false)

  const handleSubmit = async (data) => {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (result.error) throw new Error(result.error)
      setResetSent(true)
    } catch (err) {
      throw err
    }
  }

  if (resetSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--surface-base)' }}>
        <div className="text-center max-w-[420px]">
          <h1 className="font-['Playfair_Display'] text-white text-[24px] mb-4">Check Your Inbox</h1>
          <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[16px]">
            If an account exists with that email, you will receive a reset link shortly.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--surface-base)' }}>
        <div className="text-center">
          <h1 className="font-['Playfair_Display'] text-white text-[24px] mb-4">Connection Issue</h1>
          <p className="text-[var(--text-muted)] text-[14px]">Unable to connect to the server.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20" style={{ backgroundColor: 'var(--surface-base)' }}>
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <h1 className="font-['Playfair_Display'] text-white text-[32px] font-bold tracking-[-0.02em]">Lost Your Ticket?</h1>
          <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[16px] mt-2">We&apos;ll send a new pass</p>
        </div>
        <TicketAuthCard mode="forgot_password" onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
