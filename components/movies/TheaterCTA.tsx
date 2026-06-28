import Link from 'next/link'

export default function TheaterCTA() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 px-6 text-center"
      style={{
        background: 'linear-gradient(to bottom, var(--surface-base) 0%, var(--surface-theater) 50%, var(--surface-base) 100%)',
      }}
    >
      {/* Spotlight beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top center, rgba(220,20,60,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[600px] mx-auto">
        <h2
          className="font-['Playfair_Display'] font-bold text-white mb-4"
          style={{
            fontSize: 'clamp(28px, 3vw, 48px)',
            lineHeight: 1.2,
          }}
        >
          Ready for Your Private Screening?
        </h2>

        <p
          className="font-['Cormorant_Garamond'] italic text-[18px] mb-8 leading-relaxed max-w-[500px] mx-auto"
          style={{ color: 'var(--text-muted)' }}
        >
          Curate your collection. Rate films. Discover hidden masterpieces. No ads. No algorithms. Just cinema.
        </p>

        {/* Golden divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: 'var(--border-subtle)' }} />
          <span style={{ color: 'var(--color-gold)', fontSize: '14px' }}>✦</span>
          <div className="h-[1px] flex-1 max-w-[80px]" style={{ backgroundColor: 'var(--border-subtle)' }} />
        </div>

        <Link
          href="/auth/sign-up"
          className="inline-flex h-[56px] px-10 items-center text-[16px] font-bold tracking-[0.15em] text-white no-underline transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, var(--color-deep), var(--color-primary))',
            borderRadius: '2px',
            boxShadow: '0 4px 15px rgba(220,20,60,0.2)',
            fontFamily: "'Playfair Display SC', serif",
          }}

        >
          CLAIM YOUR FREE TICKET
        </Link>

        <p className="mt-5 text-[14px]" style={{ color: 'var(--text-muted-2)' }}>
          Already a member?{' '}
          <Link href="/auth/sign-in" className="text-[var(--color-primary)] no-underline hover:text-[var(--color-error)] transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  )
}
