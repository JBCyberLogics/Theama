'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import StageLayout from '@/components/layout/StageLayout'
import TheaterSidebar from '@/components/layout/TheaterSidebar'
import GenreFilterBar from '@/components/movies/GenreFilterBar'
import PlaybillGrid from '@/components/movies/PlaybillGrid'
import { useDiscover, useGenres } from '@/hooks/useMovies'

const FILTER_OPTIONS = [
  { value: 'popular', label: 'Popular' },
  { value: 'trending', label: 'Trending' },
  { value: 'top_rated', label: 'Top Rated' },
  { value: 'now_playing', label: 'Now Playing' },
  { value: 'upcoming', label: 'Upcoming' },
]

function BrowseContent() {
  const searchParams = useSearchParams()
  const initialFilter = searchParams.get('filter') || 'popular'
  const [activeGenre, setActiveGenre] = useState(null)
  const [sortBy, setSortBy] = useState(initialFilter)

  const params = {}
  if (activeGenre) params.with_genres = activeGenre

  if (sortBy === 'top_rated') {
    params.sort_by = 'vote_average.desc'
    params['vote_count.gte'] = 200
  } else if (sortBy === 'now_playing') {
    params.sort_by = 'primary_release_date.desc'
  } else if (sortBy === 'upcoming') {
    params.sort_by = 'primary_release_date.asc'
    params['primary_release_date.gte'] = new Date().toISOString().split('T')[0]
  } else if (sortBy === 'trending') {
    params.sort_by = 'popularity.desc'
  } else {
    params.sort_by = 'popularity.desc'
  }

  const { movies, loading, hasMore, loadMore } = useDiscover(params)
  const { genres } = useGenres()

  const filterLabel = FILTER_OPTIONS.find(o => o.value === sortBy)?.label || 'Popular'

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 800) {
        if (hasMore && !loading) loadMore()
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMore, loading, loadMore])

  return (
    <div className="ml-[64px] pt-[72px] min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="pl-8 pr-8 py-8 max-w-[1440px]">
        <div className="mb-8">
          <h1 className="font-['Playfair_Display'] text-white text-[32px] font-bold mb-2">
            Browse the Marquee
          </h1>
          <p className="font-['Cormorant_Garamond'] italic text-[#B38080] text-[16px]">
            Discover films by genre, popularity, and rating
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <GenreFilterBar
            genres={genres}
            activeGenre={activeGenre}
            onGenreChange={(id) => {
              setActiveGenre(id)
              setSortBy('popular')
            }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-[34px] px-3 text-[13px] font-medium tracking-[0.05em] outline-none cursor-pointer"
            style={{
              backgroundColor: 'transparent',
              color: '#808080',
              border: '1px solid #3D0000',
              borderRadius: '2px',
            }}
          >
            {FILTER_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value} style={{ backgroundColor: '#141414' }}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <PlaybillGrid movies={movies} loading={loading && movies.length === 0} />

        {loading && movies.length > 0 && (
          <div className="flex justify-center py-8">
            <div className="animate-spin-slow w-8 h-8 border-2 border-[#DC143C] border-t-transparent rounded-full" />
          </div>
        )}
      </div>
    </div>
  )
}

export default function BrowsePage() {
  return (
    <StageLayout transparentNav={false}>
      <TheaterSidebar />
      <Suspense fallback={
        <div className="ml-[64px] pt-[72px] min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
          <p className="font-['Cormorant_Garamond'] italic text-[#B38080]">Loading the marquee...</p>
        </div>
      }>
        <BrowseContent />
      </Suspense>
    </StageLayout>
  )
}
