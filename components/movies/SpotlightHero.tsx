import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { Movie } from '@/types/movie'
import { getPosterUrl, getBackdropFallback } from '@/lib/imageUrlBuilder'
import { formatYear, formatRating } from '@/lib/formatters'

interface SpotlightHeroProps {
  movies: Movie[]
  autoCycle?: boolean
  cycleInterval?: number
  loading?: boolean
}

export default function SpotlightHero({
  movies,
  autoCycle = true,
  cycleInterval = 8000,
  loading = false,
}: SpotlightHeroProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent(prev => (prev + 1) % movies.length)
  }, [movies.length])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(prev => (prev - 1 + movies.length) % movies.length)
  }, [movies.length])

  useEffect(() => {
    if (!autoCycle || movies.length <= 1) return
    const interval = setInterval(next, cycleInterval)
    return () => clearInterval(interval)
  }, [autoCycle, cycleInterval, movies.length, next])

  if (loading || movies.length === 0) {
    return (
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: '90vh',
          minHeight: '500px',
          maxHeight: '900px',
          background: '#0A0A0A',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-shimmer w-full h-full" style={{ backgroundColor: '#1A0808' }} />
        </div>
      </div>
    )
  }

  const movie = movies[current]

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: '90vh',
        minHeight: '500px',
        maxHeight: '900px',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={getBackdropFallback(movie.backdrop_path)}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 20%' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at top center, rgba(220,20,60,0.08) 0%, transparent 70%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent 40%, #0A0A0A 100%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to right, rgba(10,10,10,0.9) 0%, transparent 50%)',
      }} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-8 md:px-16 max-w-[1440px] mx-auto">
        <motion.div
          key={movie.id + '-content'}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-[600px]"
        >
          <h1
            className="font-['Playfair_Display'] font-bold text-white mb-3"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textShadow: '0 2px 20px rgba(0,0,0,0.8)',
            }}
          >
            {movie.title}
          </h1>

          {movie.tagline && (
            <p
              className="font-['Cormorant_Garamond'] italic mb-4"
              style={{
                fontSize: 'clamp(16px, 2vw, 22px)',
                color: '#B38080',
              }}
            >
              {movie.tagline}
            </p>
          )}

          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-1.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#DC143C" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-white text-[14px] font-medium">
                {formatRating(movie.vote_average)}
              </span>
            </div>

            {movie.release_date && (
              <span className="text-[#B3B3B3] text-[14px]">
                {formatYear(movie.release_date)}
              </span>
            )}

            {movie.genres && movie.genres.slice(0, 3).map(g => (
              <span
                key={g.id}
                className="text-[12px] px-2.5 py-1"
                style={{
                  color: '#808080',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '2px',
                }}
              >
                {g.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/film/${movie.id}`}
              className="h-[52px] px-8 inline-flex items-center text-[14px] font-medium tracking-[0.1em] text-white no-underline transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #8B0000, #DC143C)',
                borderRadius: '2px',
                boxShadow: '0 4px 15px rgba(220,20,60,0.2)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #DC143C, #FF1744)'
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(220,20,60,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #8B0000, #DC143C)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(220,20,60,0.2)'
              }}
            >
              ENTER THE SPECTACLE
            </Link>

            <Link
              href={`/film/${movie.id}`}
              className="h-[52px] px-6 inline-flex items-center text-[14px] font-medium tracking-[0.1em] no-underline transition-all duration-200"
              style={{
                color: '#B38080',
                border: '1px solid rgba(179,128,128,0.3)',
                borderRadius: '2px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#FFFFFF'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#B38080'
                e.currentTarget.style.borderColor = 'rgba(179,128,128,0.3)'
              }}
            >
              MORE INFO
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Navigation dots */}
      {movies.length > 1 && (
        <div className="absolute bottom-8 right-8 md:right-16 z-20 flex gap-2">
          {movies.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              className="transition-all duration-300"
              style={{
                width: i === current ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: i === current ? '#DC143C' : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
