'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StageLayout from '@/components/layout/StageLayout'
import TheaterSidebar from '@/components/layout/TheaterSidebar'
import ProfileHeader from '@/components/profile/ProfileHeader'
import StatsOverview from '@/components/profile/StatsOverview'
import PlaybillGrid from '@/components/movies/PlaybillGrid'
import GoldenDivider from '@/components/ui/GoldenDivider'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabaseClient'
import { useWatchlist } from '@/hooks/useWatchlist'

export default function ProfilePage() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading, profile } = useAuth()
  const { items: watchlist, loading: watchlistLoading } = useWatchlist()
  const [ratings, setRatings] = useState([])
  const [ratingsLoading, setRatingsLoading] = useState(true)
  const [tab, setTab] = useState('watchlist')

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/sign-in')
    }
  }, [authLoading, isAuthenticated, router])

  useEffect(() => {
    const fetchRatings = async () => {
      const { data } = await supabase
        .from('ratings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)
      setRatings(data || [])
      setRatingsLoading(false)
    }
    if (isAuthenticated) fetchRatings()
  }, [isAuthenticated])

  if (authLoading) {
    return (
      <StageLayout transparentNav={false}>
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
          <p className="font-['Cormorant_Garamond'] italic text-[#B38080]">The curtain rises...</p>
        </div>
      </StageLayout>
    )
  }

  return (
    <StageLayout transparentNav={false}>
      <TheaterSidebar />
      <div className="ml-[64px] pt-[72px] min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="pl-8 pr-8 py-8 max-w-[1200px]">
          <ProfileHeader profile={profile} />
          <StatsOverview
            totalWatchlist={watchlist.length}
            totalWatched={0}
            totalRatings={ratings.length}
            avgRating={null}
            totalCollections={0}
          />

          <GoldenDivider />

          <div className="flex gap-6 mt-6 mb-6">
            {['watchlist', 'ratings'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="text-[13px] font-medium tracking-[0.15em] uppercase pb-2 transition-colors"
                style={{
                  color: tab === t ? '#DC143C' : '#6B4B4B',
                  borderBottom: tab === t ? '2px solid #DC143C' : '2px solid transparent',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'watchlist' && (
            <PlaybillGrid
              movies={watchlist.map(w => ({
                id: w.movie_id,
                title: w.movie_title,
                poster_path: w.poster_path,
                backdrop_path: w.backdrop_path,
                vote_average: w.tmdb_rating || 0,
                release_date: w.release_date || '',
                genre_ids: w.genres || [],
              }))}
              loading={watchlistLoading}
              emptyMessage="Your watchlist is empty. Start exploring films to add."
            />
          )}

          {tab === 'ratings' && (
            <PlaybillGrid
              movies={ratings.map(r => ({
                id: r.movie_id,
                title: r.movie_title || 'Unknown Film',
                poster_path: r.poster_path || null,
                vote_average: r.rating || 0,
                release_date: '',
                genre_ids: [],
              }))}
              loading={ratingsLoading}
              emptyMessage="You haven't rated any films yet."
            />
          )}
        </div>
      </div>
    </StageLayout>
  )
}
