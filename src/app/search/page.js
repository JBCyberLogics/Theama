'use client'

import { useState } from 'react'
import PlaybillGrid from '@/components/movies/PlaybillGrid'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    fetch(`https://theama.onrender.com/api/movies/search?query=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => setMovies(data.results || []))
      .catch(() => setMovies([]))
      .finally(() => setLoading(false))
  }

  return (
    <div className="min-h-screen pt-[72px]" style={{ backgroundColor: 'var(--surface-base)' }}>
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <h1 className="font-['Playfair_Display'] text-white text-[28px] sm:text-[36px] font-bold mb-6">
          Search Films
        </h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-[600px]">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by title, genre, or actor..."
              className="w-full h-[52px] px-5 pr-14 text-[15px] text-white bg-[var(--surface-elevated)] border border-[var(--border-default)] rounded-[2px] outline-none transition-colors focus:border-[var(--color-primary)]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-[var(--text-muted-2)] hover:text-[var(--color-primary)] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </div>
        </form>
        {query && (
          <p className="text-[var(--text-secondary)] text-[14px] mb-6">
            {loading ? 'Searching...' : `${movies.length} results for "${query}"`}
          </p>
        )}
        <PlaybillGrid movies={movies} loading={loading} emptyMessage="Search for films above" />
      </div>
    </div>
  )
}
