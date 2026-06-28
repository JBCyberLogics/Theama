'use client'

import { useState, useEffect } from 'react'
import AuthGuard from '@/components/auth/AuthGuard'
import PlaybillGrid from '@/components/movies/PlaybillGrid'

export default function MyCollectionPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/watchlist')
      .then(res => res.json())
      .then(data => setMovies(data.results || []))
      .catch(() => setMovies([]))
      .finally(() => setLoading(false))
  }, [])

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
