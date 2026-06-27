import Link from 'next/link'
import type { EmptyStateProps } from '@/types/components'

const EMPTY_CONFIG = {
  watchlist: {
    illustration: 'empty_theater_seats',
    headline: 'Your Collection Awaits Its Opening Night',
    subheadline: "Films you add will appear here, like playbills in a collector's album",
    cta: 'Browse Tonight\'s Features',
    ctaHref: '/browse',
  },
  search: {
    illustration: 'spotlight_on_empty_stage',
    headline: 'The Stage is Empty',
    subheadline: 'No films match your search. Try a different title, actor, or director.',
    cta: 'Browse All Films',
    ctaHref: '/browse',
  },
  ratings: {
    illustration: 'blank_theater_program',
    headline: 'No Reviews Yet',
    subheadline: 'Rate films you\'ve watched to build your critic\'s portfolio',
    cta: 'Rate Your First Film',
    ctaHref: '/browse',
  },
  collections: {
    illustration: 'empty_dressing_room',
    headline: 'No Collections Yet',
    subheadline: 'Create themed collections to organize your favorite films',
    cta: 'Create First Collection',
    ctaHref: '/my-collection',
  },
  error: {
    illustration: 'broken_spotlight',
    headline: 'The Lights Have Dimmed',
    subheadline: 'Something went wrong backstage. Our crew is working on it.',
    cta: 'Retry',
    ctaHref: '/',
  },
  offline: {
    illustration: 'disconnected_curtain',
    headline: 'Curtains Won\'t Rise',
    subheadline: 'Check your internet connection and try again.',
    cta: 'Retry',
    ctaHref: '/',
  },
}

export default function EmptyState({ type, ctaHref, onRetry }: EmptyStateProps) {
  const config = EMPTY_CONFIG[type]
  const href = ctaHref || config.ctaHref

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#3D0000" strokeWidth="1" className="mb-8">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M8 2v20M16 2v20M2 8h20M2 16h20" />
      </svg>

      <h2 className="font-['Playfair_Display'] text-[24px] text-white font-bold mb-3 text-balance">
        {config.headline}
      </h2>

      <p className="font-['Cormorant_Garamond'] text-[18px] text-[#B38080] italic max-w-[440px] mb-8">
        {config.subheadline}
      </p>

      {onRetry ? (
        <button
          onClick={onRetry}
          className="h-[48px] px-8 flex items-center text-[14px] font-medium tracking-[0.1em] text-white bg-gradient-to-r from-[#8B0000] to-[#DC143C] hover:from-[#DC143C] hover:to-[#FF1744] transition-all duration-200 shadow-[0_4px_15px_rgba(220,20,60,0.2)]"
          style={{ borderRadius: '2px' }}
        >
          {config.cta}
        </button>
      ) : (
        <Link
          href={href}
          className="h-[48px] px-8 inline-flex items-center text-[14px] font-medium tracking-[0.1em] text-white bg-gradient-to-r from-[#8B0000] to-[#DC143C] hover:from-[#DC143C] hover:to-[#FF1744] transition-all duration-200 no-underline shadow-[0_4px_15px_rgba(220,20,60,0.2)]"
          style={{ borderRadius: '2px' }}
        >
          {config.cta}
        </Link>
      )}
    </div>
  )
}
