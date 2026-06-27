import type { CastMember } from '@/types/movie'
import { getProfileUrl } from '@/lib/imageUrlBuilder'

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
        className="flex gap-5 overflow-x-auto pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {cast.slice(0, 10).map(member => (
          <div
            key={member.id + member.character}
            className="flex-shrink-0 flex flex-col items-center gap-2.5"
            style={{ width: '90px', scrollSnapAlign: 'start' }}
          >
            <div
              className="w-[80px] h-[80px] overflow-hidden"
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
                <div className="w-full h-full bg-[#1A0808] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#6B4B4B" stroke="none">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                  </svg>
                </div>
              )}
            </div>
            <span className="text-white text-[12px] font-medium text-center leading-tight">
              {member.name}
            </span>
            <span className="text-[#808080] text-[11px] text-center leading-tight">
              {member.character}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
