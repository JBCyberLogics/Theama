'use client'

import { useAuth } from '@/context/AuthContext'
import AuthGuard from '@/components/auth/AuthGuard'
import ProfileHeader from '@/components/profile/ProfileHeader'
import StatsOverview from '@/components/profile/StatsOverview'

export default function ProfilePage() {
  const { profile, loading } = useAuth()

  return (
    <AuthGuard>
      <div className="min-h-screen pt-[72px]" style={{ backgroundColor: 'var(--surface-base)' }}>
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          <ProfileHeader profile={profile} loading={loading} />
          <div className="mt-8">
            <StatsOverview />
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
