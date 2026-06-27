'use client'

import { useRouter } from 'next/navigation'
import StageLayout from '@/components/layout/StageLayout'
import TicketAuthCard from '@/components/auth/TicketAuthCard'
import { useAuth } from '@/context/AuthContext'

export default function SignUpPage() {
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSubmit = async (formData) => {
    const { error } = await signUp(formData.email, formData.password, formData.full_name)
    if (!error) {
      setTimeout(() => router.push('/auth/sign-in'), 1500)
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
          mode="sign_up"
          onSubmit={handleSubmit}
          onSocialAuth={handleSocialAuth}
        />
      </div>
    </StageLayout>
  )
}
