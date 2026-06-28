import type { UserProfile } from '@/types/user'
import UserAvatarIcon from '@/components/ui/icons/UserAvatarIcon'

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
          <div className="w-full h-full bg-[var(--surface-theater)] flex items-center justify-center">
            <UserAvatarIcon size={32} />
          </div>
        )}
      </div>
      <div>
        <h1 className="font-['Playfair_Display'] text-white text-[28px] font-bold">
          {profile?.full_name || 'Audience Member'}
        </h1>
        {profile?.bio && (
          <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[16px] mt-1">
            {profile.bio}
          </p>
        )}
      </div>
    </div>
  )
}
