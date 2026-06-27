'use client'

import { useState } from 'react'
import RoseRating from '@/components/ui/RoseRating'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

interface UserActionsBarProps {
  movieId: number
  movieTitle: string
  posterPath?: string | null
  userRating?: number | null
  isInWatchlist?: boolean
  onWatchlistToggle?: () => void
}

export default function UserActionsBar({
  movieId,
  movieTitle,
  posterPath,
  userRating,
  isInWatchlist = false,
  onWatchlistToggle,
}: UserActionsBarProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [rating, setRating] = useState(userRating || 0)
  const [ratingOpen, setRatingOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleRate = async (value: number) => {
    if (!user) { router.push('/auth/sign-in'); return }
    setSaving(true)
    setRating(value)
    try {
      await supabase.from('ratings').upsert({
        user_id: user.id,
        movie_id: movieId,
        movie_title: movieTitle,
        poster_path: posterPath,
        rating: value,
      }, { onConflict: 'user_id,movie_id' })
    } catch {
      setRating(userRating || 0)
    }
    setSaving(false)
    setRatingOpen(false)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button
          onClick={() => {
            if (!user) { router.push('/auth/sign-in'); return }
            setRatingOpen(!ratingOpen)
          }}
          className="h-[38px] px-4 inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.05em] transition-all duration-200"
          style={{
            color: rating > 0 ? '#C9A84C' : '#808080',
            border: rating > 0 ? '1px solid rgba(201,168,76,0.3)' : '1px solid #3D0000',
            borderRadius: '2px',
            backgroundColor: rating > 0 ? 'rgba(201,168,76,0.05)' : 'transparent',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={rating > 0 ? '#C9A84C' : 'none'} stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {rating > 0 ? `${(rating / 2).toFixed(1)}` : 'RATE'}
        </button>

        {ratingOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setRatingOpen(false)} />
            <div
              className="absolute bottom-full left-0 mb-2 z-50 p-4"
              style={{
                backgroundColor: '#141414',
                border: '1px solid #1A1A1A',
                borderRadius: '2px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              <RoseRating
                value={rating ? Math.round(rating / 2) : 0}
                size="lg"
                interactive
                onChange={(v) => handleRate(v * 2)}
              />
              {saving && (
                <div className="text-center mt-2">
                  <span className="text-[#808080] text-[11px]">Saving...</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => {
          if (!user) { router.push('/auth/sign-in'); return }
          onWatchlistToggle?.()
        }}
        className="h-[38px] px-4 inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.05em] transition-all duration-200"
        style={{
          color: isInWatchlist ? '#DC143C' : '#808080',
          border: isInWatchlist ? '1px solid rgba(220,20,60,0.3)' : '1px solid #3D0000',
          borderRadius: '2px',
          backgroundColor: isInWatchlist ? 'rgba(220,20,60,0.05)' : 'transparent',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill={isInWatchlist ? '#DC143C' : 'none'} stroke="currentColor" strokeWidth="1.5">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        {isInWatchlist ? 'SAVED' : 'SAVE'}
      </button>
    </div>
  )
}
