import type { CastMember } from '@/types/movie'
import { getProfileUrl } from '@/lib/imageUrlBuilder'
import UserAvatarIcon from '@/components/ui/icons/UserAvatarIcon'

interface CastArcProps {
  cast: CastMember[]
}

export default function CastArc({ cast }: CastArcProps) {
  if (!cast || cast.length === 0) return null

  return (
    <section className="py-10">
      <h3 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-6 tracking-[0.02em]">
        The Players
      </h3>

      <div
        className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {cast.slice(0, 10).map(member => (
          <div
            key={member.id + member.character}
            className="flex-shrink-0 flex flex-col items-center gap-2.5"
            style={{ width: '90px', scrollSnapAlign: 'start' }}
          >
            <div
              className="w-[72px] sm:w-[80px] h-[72px] sm:h-[80px] overflow-hidden"
              style={{
                borderRadius: '50%',
                border: '2px solid rgba(201,168,76,0.3)',
              }}
            >
              {member.profile_path ? (
                <img
                  src={getProfileUrl(member.profile_path, 'w185') || ''}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[var(--surface-theater)] flex items-center justify-center">
                  <UserAvatarIcon size={24} />
                </div>
              )}
            </div>
            <span className="text-white text-[12px] font-medium text-center leading-tight">
              {member.name}
            </span>
            <span className="text-[var(--text-muted-3)] text-[11px] text-center leading-tight">
              {member.character}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
