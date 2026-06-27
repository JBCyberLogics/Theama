import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { WatchlistItem } from '@/types/user'
import { useAuth } from '@/context/AuthContext'

export function useWatchlist() {
  const { user } = useAuth()
  const [items, setItems] = useState<WatchlistItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchWatchlist = useCallback(async () => {
    if (!user) {
      setItems([])
      setLoading(false)
      return
    }
    const { data } = await supabase
      .from('watchlists')
      .select('*')
      .eq('user_id', user.id)
      .order('added_at', { ascending: false })
    setItems(data as WatchlistItem[] || [])
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchWatchlist()
  }, [fetchWatchlist])

  const addToWatchlist = async (movie: {
    movie_id: number
    movie_title: string
    poster_path?: string | null
    backdrop_path?: string | null
    tmdb_rating?: number | null
    release_date?: string | null
    genres?: number[] | null
  }) => {
    if (!user) return { error: 'Not authenticated' }
    const { error } = await supabase.from('watchlists').insert({
      user_id: user.id,
      ...movie,
    })
    if (!error) await fetchWatchlist()
    return { error: error?.message || null }
  }

  const removeFromWatchlist = async (movieId: number) => {
    if (!user) return
    await supabase
      .from('watchlists')
      .delete()
      .eq('user_id', user.id)
      .eq('movie_id', movieId)
    await fetchWatchlist()
  }

  const updateItem = async (movieId: number, updates: Partial<WatchlistItem>) => {
    if (!user) return
    await supabase
      .from('watchlists')
      .update(updates)
      .eq('user_id', user.id)
      .eq('movie_id', movieId)
    await fetchWatchlist()
  }

  const isInWatchlist = (movieId: number) => items.some(i => i.movie_id === movieId)

  return {
    items,
    loading,
    addToWatchlist,
    removeFromWatchlist,
    updateItem,
    isInWatchlist,
    refetch: fetchWatchlist,
  }
}
