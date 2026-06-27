import type { Movie } from '@/types/movie'
import CuratedReveal from './CuratedReveal'

interface RelatedPlaybillsProps {
  movies: Movie[]
  loading?: boolean
}

export default function RelatedPlaybills({ movies, loading }: RelatedPlaybillsProps) {
  if (!loading && (!movies || movies.length === 0)) return null

  return (
    <CuratedReveal
      title="Similar Spectacles"
      subtitle="If you enjoyed this feature, you might also appreciate"
      movies={movies || []}
      loading={loading}
    />
  )
}
