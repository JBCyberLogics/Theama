import { useState, useEffect, useCallback } from 'react'
import type { Movie, MovieListResponse, Genre } from '@/types/movie'
import { api } from '@/lib/apiClient'

export function useTrending(timeWindow: 'day' | 'week' = 'week') {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get<MovieListResponse>('/movies/trending', { time_window: timeWindow })
      .then(res => setMovies(res.results))
      .catch(() => setMovies([]))
      .finally(() => setLoading(false))
  }, [timeWindow])

  return { movies, loading }
}

export function useNowPlaying() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<MovieListResponse>('/movies/now-playing')
      .then(res => setMovies(res.results))
      .catch(() => setMovies([]))
      .finally(() => setLoading(false))
  }, [])

  return { movies, loading }
}

export function useTopRated() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<MovieListResponse>('/movies/top-rated')
      .then(res => setMovies(res.results))
      .catch(() => setMovies([]))
      .finally(() => setLoading(false))
  }, [])

  return { movies, loading }
}

export function useUpcoming() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<MovieListResponse>('/movies/upcoming')
      .then(res => setMovies(res.results))
      .catch(() => setMovies([]))
      .finally(() => setLoading(false))
  }, [])

  return { movies, loading }
}

export function useDiscover(params?: Record<string, string | number | boolean | undefined>) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return
    setPage(p => p + 1)
  }, [hasMore, loading])

  useEffect(() => {
    setLoading(true)
    api.get<MovieListResponse>('/movies/discover', { ...params, page })
      .then(res => {
        setMovies(prev => page === 1 ? res.results : [...prev, ...res.results])
        setHasMore(res.page < res.total_pages)
      })
      .catch(() => setMovies([]))
      .finally(() => setLoading(false))
  }, [page, params])

  return { movies, loading, hasMore, loadMore }
}

export function useMovieDetail(movieId: number) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!movieId) return
    setLoading(true)
    api.get<Movie>(`/movies/${movieId}`, { append_to_response: 'credits,videos,similar' })
      .then(setMovie)
      .catch(() => setMovie(null))
      .finally(() => setLoading(false))
  }, [movieId])

  return { movie, loading }
}

export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<{ genres: Genre[] }>('/movies/genres')
      .then(res => setGenres(res.genres))
      .catch(() => setGenres([]))
      .finally(() => setLoading(false))
  }, [])

  return { genres, loading }
}

export function useSearch(query: string, page = 1) {
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    setLoading(true)
    const timer = setTimeout(() => {
      api.get<MovieListResponse>('/movies/search', { query, page })
        .then(res => {
          setResults(res.results)
          setTotalPages(res.total_pages)
        })
        .catch(() => setResults([]))
        .finally(() => setLoading(false))
    }, 300)
    return () => clearTimeout(timer)
  }, [query, page])

  return { results, loading, totalPages }
}
