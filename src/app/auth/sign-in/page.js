'use client'

import { useRouter } from 'next/navigation'
import StageLayout from '@/components/layout/StageLayout'
import TicketAuthCard from '@/components/auth/TicketAuthCard'
import { useAuth } from '@/context/AuthContext'

export default function SignInPage() {
  const router = useRouter()
  const { signIn } = useAuth()

  const handleSubmit = async (formData) => {
    const { error } = await signIn(formData.email, formData.password)
    if (!error) {
      setTimeout(() => router.push('/browse'), 500)
    }
    if (error) throw new Error(error)
  }

  const handleSocialAuth = async (provider) => {
    const { supabase } = await import('@/lib/supabaseClient')
    await supabase.auth.signInWithOAuth({ provider })
  }

  return (
    <StageLayout transparentNav={false} hideFooter>
      <div className="min-h-screen flex items-center justify-center px-4 pt-[72px]" style={{ backgroundColor: '#0A0A0A' }}>
        <TicketAuthCard
          mode="sign_in"
          onSubmit={handleSubmit}
          onSocialAuth={handleSocialAuth}
        />
      </div>
    </StageLayout>
  )
}
