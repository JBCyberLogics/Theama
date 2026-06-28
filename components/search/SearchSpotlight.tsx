import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'
import { api } from '@/lib/apiClient'
import type { Movie, MovieListResponse } from '@/types/movie'
import SearchIcon from '@/components/ui/icons/SearchIcon'

interface SearchSpotlightProps {
  placeholder?: string
  autoFocus?: boolean
}

export default function SearchSpotlight({ placeholder = 'Search for a film, actor, or director...', autoFocus = false }: SearchSpotlightProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestions([])
      return
    }
    setLoading(true)
    api.get<MovieListResponse>('/movies/search', { query: debouncedQuery })
      .then(res => setSuggestions(res.results.slice(0, 6)))
      .catch(() => setSuggestions([]))
      .finally(() => setLoading(false))
  }, [debouncedQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleSelect = (movieId: number) => {
    router.push(`/film/${movieId}`)
  }

  return (
    <div className="relative w-full max-w-[640px] mx-auto">
      <form onSubmit={handleSubmit} role="search">
        <div className="relative">
          <SearchIcon
            className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-200"
            size={18}
            stroke={focused ? 'var(--color-primary)' : 'var(--text-muted-2)'}
          />

          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder={placeholder}
            aria-label="Search films"
            style={{
              width: '100%',
              height: '56px',
              paddingLeft: '52px',
              paddingRight: '20px',
              backgroundColor: focused ? 'rgba(20,8,8,0.95)' : 'rgba(10,5,5,0.8)',
              border: focused ? '2px solid var(--color-primary)' : '1px solid var(--border-subtle)',
              borderRadius: '2px',
              color: 'var(--text-primary)',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 300ms ease-out',
              boxShadow: focused ? '0 0 20px rgba(220,20,60,0.2)' : 'none',
            }}
          />
        </div>
      </form>

      {/* Suggestions dropdown */}
      {focused && suggestions.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden"
          style={{
            backgroundColor: 'var(--surface-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: '2px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {suggestions.map(movie => (
            <button
              key={movie.id}
              onClick={() => handleSelect(movie.id)}
              className="w-full flex items-center gap-4 px-5 py-3 text-left transition-colors"

            >
              <div className="w-[36px] h-[54px] flex-shrink-0 overflow-hidden rounded-[2px] bg-[var(--surface-theater)]">
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[14px] font-medium truncate">{movie.title}</p>
                <p className="text-[var(--text-muted-3)] text-[12px] truncate mt-0.5">{movie.release_date?.slice(0, 4) || ''}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
