'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import PlaybillGrid from '@/components/movies/PlaybillGrid'

const FILTERS = {
  trending: { endpoint: '/movies/trending', label: 'Trending' },
  top_rated: { endpoint: '/movies/top-rated', label: 'Top Rated' },
  popular: { endpoint: '/movies/popular', label: 'Popular' },
  now_playing: { endpoint: '/movies/now-playing', label: 'Now Playing' },
  upcoming: { endpoint: '/movies/upcoming', label: 'Upcoming' },
}

function BrowseContent() {
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter') || 'trending'
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const activeFilter = FILTERS[filter] || FILTERS.trending

  useEffect(() => {
    setLoading(true)
    fetch(`/api${activeFilter.endpoint}`)
      .then(res => res.json())
      .then(data => setMovies(data.results || []))
      .catch(() => setMovies([]))
      .finally(() => setLoading(false))
  }, [filter])

  return (
    <>
      <h1 className="font-['Playfair_Display'] text-white text-[28px] sm:text-[36px] font-bold mb-2">
        {activeFilter.label}
      </h1>
      <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[16px] mb-8">
        Discover our curated selection
      </p>
      <PlaybillGrid movies={movies} loading={loading} />
    </>
  )
}

export default function BrowsePage() {
  return (
    <div className="min-h-screen pt-[72px]" style={{ backgroundColor: 'var(--surface-base)' }}>
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <Suspense fallback={<div className="text-[var(--text-muted)] text-[14px]">Loading...</div>}>
          <BrowseContent />
        </Suspense>
      </div>
    </div>
  )
}
