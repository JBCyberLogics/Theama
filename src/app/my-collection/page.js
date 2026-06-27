'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StageLayout from '@/components/layout/StageLayout'
import TheaterSidebar from '@/components/layout/TheaterSidebar'
import PlaybillGrid from '@/components/movies/PlaybillGrid'
import GoldenDivider from '@/components/ui/GoldenDivider'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabaseClient'

export default function MyCollectionPage() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [collections, setCollections] = useState([])
  const [activeCollection, setActiveCollection] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/sign-in')
    }
  }, [authLoading, isAuthenticated, router])

  useEffect(() => {
    if (!isAuthenticated) return
    const fetchCollections = async () => {
      const { data } = await supabase
        .from('collections')
        .select('*, collection_items(*)')
        .order('created_at', { ascending: false })
      setCollections(data || [])
      setLoading(false)
    }
    fetchCollections()
  }, [isAuthenticated])

  useEffect(() => {
    if (activeCollection) {
      const coll = collections.find(c => c.id === activeCollection)
      setItems(coll?.collection_items?.map(i => ({
        id: i.movie_id,
        title: i.movie_title,
        poster_path: i.poster_path,
        vote_average: 0,
        release_date: '',
        genre_ids: [],
      })) || [])
    } else {
      const all = collections.flatMap(c => c.collection_items || []).map(i => ({
        id: i.movie_id,
        title: i.movie_title,
        poster_path: i.poster_path,
        vote_average: 0,
        release_date: '',
        genre_ids: [],
      }))
      setItems(all)
    }
  }, [activeCollection, collections])

  if (authLoading || loading) {
    return (
      <StageLayout transparentNav={false}>
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
          <p className="font-['Cormorant_Garamond'] italic text-[#B38080]">Loading your collections...</p>
        </div>
      </StageLayout>
    )
  }

  return (
    <StageLayout transparentNav={false}>
      <TheaterSidebar />
      <div className="ml-[64px] pt-[72px] min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="pl-8 pr-8 py-8 max-w-[1200px]">
          <h1 className="font-['Playfair_Display'] text-white text-[32px] font-bold mb-2">
            My Collection
          </h1>
          <p className="font-['Cormorant_Garamond'] italic text-[#B38080] text-[16px] mb-6">
            Curated playbills from your personal archive
          </p>

          <GoldenDivider />

          {collections.length > 0 && (
            <div className="flex gap-2.5 overflow-x-auto mt-6 mb-8">
              <button
                onClick={() => setActiveCollection(null)}
                className="flex-shrink-0 h-[34px] px-4 text-[13px] font-medium tracking-[0.05em] transition-all duration-200"
                style={{
                  backgroundColor: activeCollection === null ? '#DC143C' : 'transparent',
                  color: activeCollection === null ? '#FFFFFF' : '#808080',
                  border: activeCollection === null ? 'none' : '1px solid #3D0000',
                  borderRadius: '2px',
                }}
              >
                ALL
              </button>
              {collections.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveCollection(c.id)}
                  className="flex-shrink-0 h-[34px] px-4 text-[13px] font-medium tracking-[0.05em] transition-all duration-200"
                  style={{
                    backgroundColor: activeCollection === c.id ? '#DC143C' : 'transparent',
                    color: activeCollection === c.id ? '#FFFFFF' : '#808080',
                    border: activeCollection === c.id ? 'none' : '1px solid #3D0000',
                    borderRadius: '2px',
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}

          <PlaybillGrid
            movies={items}
            loading={false}
            emptyMessage={
              collections.length === 0
                ? 'No collections yet. Create one from a film page.'
                : 'This collection is empty.'
            }
          />
        </div>
      </div>
    </StageLayout>
  )
}
