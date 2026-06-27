import type { UserProfile } from '@/types/user'

interface ProfileHeaderProps {
  profile: UserProfile | null
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-6 mb-10">
      <div
        className="w-[80px] h-[80px] overflow-hidden flex-shrink-0"
        style={{ borderRadius: '50%', border: '2px solid rgba(201,168,76,0.3)' }}
      >
        {profile?.avatar_url ? (
          <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#1A0808] flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#6B4B4B" stroke="none">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
          </div>
        )}
      </div>
      <div>
        <h1 className="font-['Playfair_Display'] text-white text-[28px] font-bold">
          {profile?.full_name || 'Audience Member'}
        </h1>
        {profile?.bio && (
          <p className="font-['Cormorant_Garamond'] italic text-[#B38080] text-[16px] mt-1">
            {profile.bio}
          </p>
        )}
      </div>
    </div>
  )
}
