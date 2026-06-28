'use client'

import { useState, useEffect } from 'react'
import SpotlightHero from '@/components/movies/SpotlightHero'
import PlaybillGrid from '@/components/movies/PlaybillGrid'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    setLoading(true)
    fetch('/api/movies/trending')
      .then(res => res.json())
      .then(data => setMovies(data.results || []))
      .finally(() => setLoading(false))
  }, [])

  if (!mounted) return null

  return (
    <>
      <SpotlightHero movies={movies} loading={loading || movies.length === 0} />
      {movies.length > 0 && (
        <div style={{ padding: 'clamp(20px, 4vw, 40px)' }}>
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(20px, 3vw, 24px)',
              color: 'var(--text-primary)',
              borderBottom: '2px solid var(--color-primary)',
              display: 'inline-block',
              paddingBottom: '8px',
              marginBottom: '20px',
            }}
          >
            Trending Now
          </h3>
          <PlaybillGrid movies={movies} loading={false} />
        </div>
      )}
    </>
  )
}
