import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/context/AuthContext'

interface RatingItem {
  id?: number
  movie_id: number
  movie_title: string
  poster_path?: string | null
  backdrop_path?: string | null
  rating: number
  created_at?: string
}

export function useRatings() {
  const { user } = useAuth()
  const [ratings, setRatings] = useState<RatingItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRatings = useCallback(async () => {
    if (!user) {
      setRatings([])
      setLoading(false)
      return
    }
    const { data } = await supabase
      .from('ratings')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setRatings(data as RatingItem[] || [])
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchRatings()
  }, [fetchRatings])

  const rateMovie = async (movieId: number, rating: number, metadata?: {
    movie_title?: string
    poster_path?: string | null
  }) => {
    if (!user) return { error: 'Not authenticated' }
    const { error } = await supabase.from('ratings').upsert({
      user_id: user.id,
      movie_id: movieId,
      movie_title: metadata?.movie_title,
      poster_path: metadata?.poster_path,
      rating,
    }, { onConflict: 'user_id,movie_id' })
    if (!error) await fetchRatings()
    return { error: error?.message || null }
  }

  const removeRating = async (movieId: number) => {
    if (!user) return
    await supabase
      .from('ratings')
      .delete()
      .eq('user_id', user.id)
      .eq('movie_id', movieId)
    await fetchRatings()
  }

  const getUserRating = (movieId: number): number | null => {
    return ratings.find(r => r.movie_id === movieId)?.rating || null
  }

  return { ratings, loading, rateMovie, removeRating, getUserRating, refetch: fetchRatings }
}
