'use client'

import StageLayout from '@/components/layout/StageLayout'
import TicketAuthCard from '@/components/auth/TicketAuthCard'
import { supabase } from '@/lib/supabaseClient'

export default function ForgotPasswordPage() {
  const handleSubmit = async (formData) => {
    const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    })
    if (error) throw new Error(error)
  }

  return (
    <StageLayout transparentNav={false} hideFooter>
      <div className="min-h-screen flex items-center justify-center px-4 pt-[72px]" style={{ backgroundColor: '#0A0A0A' }}>
        <TicketAuthCard
          mode="forgot_password"
          onSubmit={handleSubmit}
        />
      </div>
    </StageLayout>
  )
}
