'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StageLayout from '@/components/layout/StageLayout'
import TheaterSidebar from '@/components/layout/TheaterSidebar'
import PlaybillGrid from '@/components/movies/PlaybillGrid'
import GoldenDivider from '@/components/ui/GoldenDivider'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabaseClient'

export default function CollectionsPage() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [collections, setCollections] = useState([])
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

  if (authLoading || loading) {
    return (
      <StageLayout transparentNav={false}>
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
          <p className="font-['Cormorant_Garamond'] italic text-[#B38080]">Loading collections...</p>
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
            Collections
          </h1>
          <p className="font-['Cormorant_Garamond'] italic text-[#B38080] text-[16px] mb-6">
            Your curated film archives
          </p>

          <GoldenDivider />

          {collections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-['Cormorant_Garamond'] italic text-[#B38080] text-[18px]">
                No collections yet. Create one from a film page.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {collections.map(c => (
                <div
                  key={c.id}
                  className="p-6 cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: '4px',
                  }}
                  onClick={() => router.push(`/my-collection`)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#DC143C' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)' }}
                >
                  <h3 className="font-['Playfair_Display'] text-white text-[18px] font-semibold mb-1">
                    {c.name}
                  </h3>
                  {c.description && (
                    <p className="text-[#808080] text-[13px] mb-3">{c.description}</p>
                  )}
                  <p className="text-[#6B4B4B] text-[12px]">
                    {(c.collection_items?.length || 0)} films
                  </p>
                  {c.collection_items?.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {c.collection_items.slice(0, 4).map((item, i) => (
                        <div
                          key={i}
                          className="w-[40px] h-[60px] overflow-hidden rounded-[2px]"
                          style={{ backgroundColor: '#1A0808' }}
                        >
                          {item.poster_path && (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </StageLayout>
  )
}
