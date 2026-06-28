'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Movie } from '@/types/movie'
import { getPosterFallback } from '@/lib/imageUrlBuilder'
import { formatYear, formatRating } from '@/lib/formatters'
import StarIcon from '@/components/ui/icons/StarIcon'

interface PlaybillCardProps {
  movie: Movie
  index?: number
  layout?: 'grid' | 'list'
}

export default function PlaybillCard({ movie, index = 0, layout = 'grid' }: PlaybillCardProps) {
  const isGrid = layout === 'grid'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link href={`/film/${movie.id}`} className="block no-underline">
        <div
          className="relative overflow-hidden transition-all duration-300 ease-out"
          style={{
            borderRadius: '4px',
            aspectRatio: isGrid ? '2/3' : 'auto',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <img
            src={getPosterFallback(movie.poster_path) || ''}
            alt={`${movie.title} poster`}
            className="w-full h-full object-cover transition-all duration-300 ease-out"
            style={{
              filter: 'brightness(0.9)',
            }}
            loading="lazy"
          />

          {/* Hover overlay - card overlay gradient */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 ease-out pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)',
            }}
          />

          {/* Hover info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 ease-out translate-y-2 group-hover:translate-y-0 group-active:translate-y-0">
            <h3 className="font-['Playfair_Display'] text-white text-[15px] font-semibold leading-tight mb-1.5 truncate">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <StarIcon size={12} />
                <span className="text-white text-[12px] font-medium">{formatRating(movie.vote_average)}</span>
              </div>
              {movie.release_date && (
                <span className="text-[var(--text-muted-3)] text-[12px]">{formatYear(movie.release_date)}</span>
              )}
            </div>
          </div>

          {/* Rating badge top-right */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300">
            <div
              className="flex items-center gap-1 px-2 py-1"
              style={{
                backgroundColor: 'rgba(220,20,60,0.9)',
                borderRadius: '2px',
              }}
            >
              <StarIcon size={10} fill="white" />
              <span className="text-white text-[11px] font-bold">{formatRating(movie.vote_average)}</span>
            </div>
          </div>

          {/* Crimson border accent on hover */}
          <div
            className="absolute inset-0 border border-transparent group-hover:border-[var(--color-primary)] transition-all duration-300 ease-out pointer-events-none"
            style={{ borderRadius: '4px' }}
          />
        </div>

        {!isGrid && (
          <div className="mt-3">
            <h3 className="font-['Playfair_Display'] text-white text-[16px] font-semibold truncate">
              {movie.title}
            </h3>
            <p className="text-[var(--text-muted-3)] text-[13px] mt-1 line-clamp-2">
              {movie.overview}
            </p>
          </div>
        )}
      </Link>
    </motion.div>
  )
}
