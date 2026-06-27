'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import StageLayout from '@/components/layout/StageLayout'
import SearchSpotlight from '@/components/search/SearchSpotlight'
import GenreCloud from '@/components/search/GenreCloud'
import PlaybillGrid from '@/components/movies/PlaybillGrid'
import { api } from '@/lib/apiClient'

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    setLoading(true)
    api.get('/movies/search', { query })
      .then(res => setResults(res.results || []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, [query])

  const handleGenreSelect = (genreId) => {
    router.push(`/browse?genre=${genreId}`)
  }

  return (
    <div className="min-h-screen pt-[72px]" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="font-['Playfair_Display'] text-white text-[36px] font-bold mb-3">
            Search the Archives
          </h1>
          <p className="font-['Cormorant_Garamond'] italic text-[#B38080] text-[16px] mb-8">
            Find your next obsession among thousands of films
          </p>
          <SearchSpotlight autoFocus={!!query} />
        </div>

        {query ? (
          <div>
            <p className="text-[#808080] text-[13px] tracking-[0.1em] uppercase mb-4">
              Results for &quot;{query}&quot;
            </p>
            <PlaybillGrid movies={results} loading={loading} emptyMessage="No films match your search" />
          </div>
        ) : (
          <div className="text-center mt-10">
            <p className="text-[#808080] text-[14px] mb-4">
              Or browse by genre
            </p>
            <GenreCloud onGenreSelect={handleGenreSelect} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <StageLayout transparentNav={false}>
      <Suspense fallback={
        <div className="min-h-screen pt-[72px] flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
          <p className="font-['Cormorant_Garamond'] italic text-[#B38080]">Preparing the search...</p>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </StageLayout>
  )
}
