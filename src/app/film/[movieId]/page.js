'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import FilmBackdropHero from '@/components/movies/FilmBackdropHero'
import CastArc from '@/components/movies/CastArc'
import SynopsisProgram from '@/components/movies/SynopsisProgram'
import RelatedPlaybills from '@/components/movies/RelatedPlaybills'
import TrailerModal from '@/components/ui/TrailerModal'

export default function FilmPage() {
  const params = useParams()
  const movieId = params.movieId
  const { session } = useAuth()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [trailerKey, setTrailerKey] = useState(null)
  const [inWatchlist, setInWatchlist] = useState(false)
  const [watchlistLoading, setWatchlistLoading] = useState(false)

  const accessToken = session?.access_token

  useEffect(() => {
    if (!movieId) return
    setLoading(true)
    fetch(`https://theama.onrender.com/api/movies/${movieId}`)
      .then(res => res.json())
      .then(setMovie)
      .catch(() => setMovie(null))
      .finally(() => setLoading(false))
  }, [movieId])

  useEffect(() => {
    if (!movieId || !accessToken) return
    fetch(`https://theama.onrender.com/api/watchlist/check/${movieId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(res => res.json())
      .then(data => setInWatchlist(!!data.inWatchlist))
      .catch(() => {})
  }, [movieId, accessToken])

  const handlePlay = useCallback(() => {
    if (!movie?.videos?.results) return
    const trailer = movie.videos.results.find(
      v => v.site === 'YouTube' && v.type === 'Trailer'
    ) || movie.videos.results.find(
      v => v.site === 'YouTube' && v.type === 'Teaser'
    )
    if (trailer) setTrailerKey(trailer.key)
  }, [movie])

  const handleToggleWatchlist = useCallback(async () => {
    if (!accessToken) return
    setWatchlistLoading(true)
    try {
      if (inWatchlist) {
        await fetch(`https://theama.onrender.com/api/watchlist/${movieId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        setInWatchlist(false)
      } else {
        await fetch('https://theama.onrender.com/api/watchlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            movie_id: movie.id,
            movie_title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            tmdb_rating: movie.vote_average,
            release_date: movie.release_date,
            genres: movie.genres?.map(g => g.name).join(',') || null,
          }),
        })
        setInWatchlist(true)
      }
    } catch {
    } finally {
      setWatchlistLoading(false)
    }
  }, [accessToken, inWatchlist, movie, movieId])

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
      <FilmBackdropHero
        movie={movie}
        onPlay={handlePlay}
        onAddToWatchlist={handleToggleWatchlist}
        inWatchlist={inWatchlist}
        watchlistLoading={watchlistLoading}
      />
      <div className="max-w-[1440px] mx-auto px-6 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SynopsisProgram overview={movie.overview} tagline={movie.tagline} />
            <CastArc cast={movie.credits?.cast || []} />
          </div>
          <div>
            <RelatedPlaybills movies={movie.similar?.results?.slice(0, 6) || []} />
          </div>
        </div>
      </div>

      {trailerKey && (
        <TrailerModal
          videoKey={trailerKey}
          title={movie.title}
          onClose={() => setTrailerKey(null)}
        />
      )}
    </div>
  )
}
