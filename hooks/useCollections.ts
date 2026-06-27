import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/context/AuthContext'

interface Collection {
  id?: number
  name: string
  description?: string | null
  is_public?: boolean
  created_at?: string
  user_id?: string
}

interface CollectionItem {
  id?: number
  collection_id: number
  movie_id: number
  movie_title: string
  poster_path?: string | null
  added_at?: string
}

export function useCollections() {
  const { user } = useAuth()
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCollections = useCallback(async () => {
    if (!user) {
      setCollections([])
      setLoading(false)
      return
    }
    const { data } = await supabase
      .from('collections')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setCollections(data as Collection[] || [])
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchCollections()
  }, [fetchCollections])

  const createCollection = async (name: string, description?: string) => {
    if (!user) return { error: 'Not authenticated', id: null }
    const { data, error } = await supabase.from('collections').insert({
      user_id: user.id,
      name,
      description,
    }).select().single()
    if (!error) await fetchCollections()
    return { error: error?.message || null, id: data?.id || null }
  }

  const deleteCollection = async (collectionId: number) => {
    if (!user) return
    await supabase.from('collection_items').delete().eq('collection_id', collectionId)
    await supabase.from('collections').delete().eq('id', collectionId)
    await fetchCollections()
  }

  const addToCollection = async (collectionId: number, item: {
    movie_id: number
    movie_title: string
    poster_path?: string | null
  }) => {
    if (!user) return { error: 'Not authenticated' }
    const { error } = await supabase.from('collection_items').insert({
      collection_id: collectionId,
      ...item,
    })
    return { error: error?.message || null }
  }

  const removeFromCollection = async (collectionId: number, movieId: number) => {
    if (!user) return
    await supabase
      .from('collection_items')
      .delete()
      .eq('collection_id', collectionId)
      .eq('movie_id', movieId)
  }

  return {
    collections,
    loading,
    createCollection,
    deleteCollection,
    addToCollection,
    removeFromCollection,
    refetch: fetchCollections,
  }
}
