import Link from 'next/link'
import type { Movie } from '@/types/movie'
import { getBackdropFallback, getPosterFallback } from '@/lib/imageUrlBuilder'
import { formatYear, formatRuntime, formatRating } from '@/lib/formatters'
import TheaterBadge from '@/components/ui/TheaterBadge'
import RoseRating from '@/components/ui/RoseRating'

interface FilmBackdropHeroProps {
  movie: Movie
  onPlay?: () => void
  onAddToWatchlist?: () => void
  inWatchlist?: boolean
  watchlistLoading?: boolean
}

export default function FilmBackdropHero({ movie, onPlay, onAddToWatchlist, inWatchlist = false, watchlistLoading = false }: FilmBackdropHeroProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(50vh, 70vh, 900px)', minHeight: '400px' }}
    >
      <img
        src={getBackdropFallback(movie.backdrop_path)}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 20%' }}
      />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at top center, rgba(220,20,60,0.08) 0%, transparent 70%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent 40%, var(--surface-base) 100%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to right, rgba(10,10,10,0.9) 0%, transparent 50%)',
      }} />

      <div className="relative z-10 h-full flex items-end pb-12 md:pb-16 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="flex gap-8 items-end">
          {/* Poster */}
          {movie.poster_path && (
            <div className="hidden md:block flex-shrink-0" style={{ width: '220px' }}>
              <img
                src={getPosterFallback(movie.poster_path) || ''}
                alt={`${movie.title} poster`}
                className="w-full rounded-[4px] shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
                style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
              />
            </div>
          )}

          <div className="max-w-[600px] w-full">
            <h1
              className="font-['Playfair_Display'] font-bold text-white mb-2"
              style={{
                fontSize: 'clamp(32px, 4vw, 56px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                textShadow: '0 2px 20px rgba(0,0,0,0.8)',
              }}
            >
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5">
                <RoseRating value={Math.round(movie.vote_average / 2)} size="sm" />
                <span className="text-white text-[14px] font-medium ml-1">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              {movie.release_date && (
                <TheaterBadge text={formatYear(movie.release_date)} variant="year" />
              )}
              {movie.runtime && (
                <TheaterBadge text={formatRuntime(movie.runtime)} variant="year" />
              )}
              {movie.genres?.slice(0, 3).map(g => (
                <TheaterBadge key={g.id} text={g.name} variant="genre" />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onPlay}
                className="h-[48px] px-7 inline-flex items-center gap-2 text-[14px] font-medium tracking-[0.1em] text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--color-deep), var(--color-primary))',
                  borderRadius: '2px',
                  boxShadow: '0 4px 15px rgba(220,20,60,0.2)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                PLAY TRAILER
              </button>

              <button
                onClick={onAddToWatchlist}
                disabled={watchlistLoading}
                className="h-[48px] px-5 inline-flex items-center gap-2 text-[14px] font-medium tracking-[0.1em] transition-all duration-200"
                style={{
                  color: inWatchlist ? 'var(--color-gold)' : 'var(--text-muted)',
                  border: inWatchlist
                    ? '1px solid var(--color-gold)'
                    : '1px solid rgba(179,128,128,0.3)',
                  borderRadius: '2px',
                  opacity: watchlistLoading ? 0.6 : 1,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={inWatchlist ? 'var(--color-gold)' : 'none'} stroke={inWatchlist ? 'var(--color-gold)' : 'currentColor'} strokeWidth="1.5">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                {inWatchlist ? 'IN COLLECTION' : 'ADD TO COLLECTION'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
