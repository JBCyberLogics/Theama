'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import FilmBackdropHero from '@/components/movies/FilmBackdropHero'
import CastArc from '@/components/movies/CastArc'
import SynopsisProgram from '@/components/movies/SynopsisProgram'
import RelatedPlaybills from '@/components/movies/RelatedPlaybills'

export default function FilmPage() {
  const params = useParams()
  const movieId = params.movieId
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!movieId) return
    setLoading(true)
    fetch(`/api/movies/${movieId}`)
      .then(res => res.json())
      .then(setMovie)
      .catch(() => setMovie(null))
      .finally(() => setLoading(false))
  }, [movieId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--surface-base)' }}>
        <div className="animate-spin-slow w-10 h-10 border-2 border-[var(--color-primary)] border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--surface-base)' }}>
        <div className="text-center">
          <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[16px]">Film not found</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'var(--surface-base)' }}>
      <FilmBackdropHero movie={movie} />
      <div className="max-w-[1440px] mx-auto px-6 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SynopsisProgram movie={movie} />
            <CastArc cast={movie.credits?.cast || []} />
          </div>
          <div>
            <RelatedPlaybills movies={movie.similar?.results?.slice(0, 6) || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
