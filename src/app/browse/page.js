'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import PlaybillGrid from '@/components/movies/PlaybillGrid'

const TMDB_GENRES = [
  { id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }, { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' }, { id: 10751, name: 'Family' }, { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' }, { id: 27, name: 'Horror' }, { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' }, { id: 10749, name: 'Romance' }, { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' }, { id: 53, name: 'Thriller' }, { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
]

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
  const genre = searchParams.get('genre')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const activeFilter = FILTERS[filter] || FILTERS.trending
  const activeGenre = genre ? TMDB_GENRES.find(g => String(g.id) === genre) : null

  useEffect(() => {
    setLoading(true)
    const url = activeGenre
      ? `/api/movies/discover?with_genres=${activeGenre.id}&sort_by=popularity.desc&vote_count.gte=50`
      : `/api${activeFilter.endpoint}`
    fetch(url)
      .then(res => res.json())
      .then(data => setMovies(data.results || []))
      .catch(() => setMovies([]))
      .finally(() => setLoading(false))
  }, [filter, genre])

  const pageTitle = activeGenre ? activeGenre.name : activeFilter.label

  return (
    <>
      <h1 className="font-['Playfair_Display'] text-white text-[28px] sm:text-[36px] font-bold mb-2">
        {pageTitle}
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
