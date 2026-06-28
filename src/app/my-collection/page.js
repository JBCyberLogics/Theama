'use client'

import { useState, useEffect } from 'react'
import AuthGuard from '@/components/auth/AuthGuard'
import PlaybillGrid from '@/components/movies/PlaybillGrid'
import { useAuth } from '@/context/AuthContext'

export default function MyCollectionPage() {
  const { session } = useAuth()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.access_token) return
    fetch('https://theama.onrender.com/api/watchlist', {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
      .then(res => res.json())
      .then(data => {
        const mapped = (Array.isArray(data) ? data : []).map(item => ({
          id: item.movie_id,
          title: item.movie_title,
          poster_path: item.poster_path,
          backdrop_path: item.backdrop_path,
          vote_average: item.tmdb_rating || 0,
          release_date: item.release_date,
          overview: '',
          genre_ids: [],
          original_language: '',
          adult: false,
          video: false,
          popularity: 0,
          vote_count: 0,
          genres: item.genres?.split(',').map(n => ({ id: 0, name: n.trim() })) || [],
        }))
        setMovies(mapped)
      })
      .catch(() => setMovies([]))
      .finally(() => setLoading(false))
  }, [session?.access_token])

  return (
    <AuthGuard>
      <div className="min-h-screen pt-[72px]" style={{ backgroundColor: 'var(--surface-base)' }}>
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          <h1 className="font-['Playfair_Display'] text-white text-[28px] sm:text-[36px] font-bold mb-2">
            My Collection
          </h1>
          <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[16px] mb-8">
            Films you&apos;ve saved
          </p>
          <PlaybillGrid movies={movies} loading={loading} emptyMessage="Your collection is empty. Start adding films!" />
        </div>
      </div>
    </AuthGuard>
  )
}
