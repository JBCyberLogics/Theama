import type { Movie } from '@/types/movie'
import PlaybillCard from './PlaybillCard'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'

interface PlaybillGridProps {
  movies: Movie[]
  columns?: number
  loading?: boolean
  emptyMessage?: string
}

export default function PlaybillGrid({
  movies,
  columns = 5,
  loading = false,
  emptyMessage = 'No films found',
}: PlaybillGridProps) {
  const gridClass = {
    2: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    3: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  }[columns] || 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'

  if (loading) {
    return (
      <div className={`grid ${gridClass} gap-3 sm:gap-4`}>
        {Array.from({ length: columns * 2 }, (_, i) => (
          <LoadingSkeleton key={i} type="card" />
        ))}
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--border-subtle)" strokeWidth="1" className="mb-4">
          <rect x="2" y="2" width="20" height="20" rx="2" />
          <path d="M8 2v20M16 2v20M2 8h20M2 16h20" />
        </svg>
        <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[16px] sm:text-[18px]">
          {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <div className={`grid ${gridClass} gap-3 sm:gap-4`}>
      {movies.map((movie, i) => (
        <PlaybillCard key={movie.id} movie={movie} index={i} />
      ))}
    </div>
  )
}
