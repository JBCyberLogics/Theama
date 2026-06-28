import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Movie } from '@/types/movie'
import PlaybillCard from './PlaybillCard'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'

interface CuratedRevealProps {
  title: string
  subtitle?: string
  movies: Movie[]
  seeAllLink?: string
  loading?: boolean
}

export default function CuratedReveal({ title, subtitle, movies, seeAllLink, loading = false }: CuratedRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start center'],
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const headerX = useTransform(scrollYProgress, [0, 0.5], [-20, 0])

  return (
    <section ref={sectionRef} className="py-10 px-6 md:px-10 max-w-[1440px] mx-auto">
      <motion.div
        style={{ opacity: headerOpacity, x: headerX }}
        className="flex items-end justify-between mb-6"
      >
        <div>
          <h2 className="font-['Playfair_Display'] text-white text-[24px] font-bold tracking-[0.02em]">
            {title}
          </h2>
          {subtitle && (
            <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[16px] mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {seeAllLink && (
          <Link
            href={seeAllLink}
            className="text-[13px] font-medium tracking-[0.1em] no-underline transition-colors flex items-center gap-1.5"
            style={{ color: 'var(--text-muted-3)' }}

          >
            SEE ALL
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </motion.div>

      <div className="relative">
        <div
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {loading
            ? Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="flex-shrink-0" style={{ width: '200px' }}>
                  <LoadingSkeleton type="card" />
                </div>
              ))
            : movies.slice(0, 10).map((movie, i) => (
                <div
                  key={movie.id}
                  className="flex-shrink-0"
                  style={{ width: '200px', scrollSnapAlign: 'start' }}
                >
                  <PlaybillCard movie={movie} index={i} />
                </div>
              ))
          }
        </div>

        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 pointer-events-none" style={{
          background: 'linear-gradient(to right, var(--surface-base) 0%, transparent 100%)',
        }} />
        <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none" style={{
          background: 'linear-gradient(to left, var(--surface-base) 0%, transparent 100%)',
        }} />
      </div>
    </section>
  )
}
