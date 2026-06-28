'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import PlaybillGrid from '@/components/movies/PlaybillGrid'

export default function CollectionsPage() {
  const { session } = useAuth()
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)

  const accessToken = session?.access_token

  useEffect(() => {
    if (!accessToken) {
      setLoading(false)
      return
    }
    fetch('https://theama.onrender.com/api/collections', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        const cols = Array.isArray(data) ? data : []
        setCollections(cols.map(col => ({
          ...col,
          movies: (col.collection_items || []).map(item => ({
            id: item.movie_id,
            title: item.movie_title,
            poster_path: item.poster_path,
            backdrop_path: null,
            vote_average: 0,
            release_date: '',
            overview: '',
            genre_ids: [],
            original_language: '',
            adult: false,
            video: false,
            popularity: 0,
            vote_count: 0,
          })),
        })))
      })
      .catch(() => setCollections([]))
      .finally(() => setLoading(false))
  }, [accessToken])

  return (
    <div className="min-h-screen pt-[72px]" style={{ backgroundColor: 'var(--surface-base)' }}>
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <h1 className="font-['Playfair_Display'] text-white text-[28px] sm:text-[36px] font-bold mb-2">
          Collections
        </h1>
        <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[16px] mb-8">
          Curated film selections
        </p>
        {loading ? (
          <div className="text-[var(--text-muted)] text-[14px]">Loading collections...</div>
        ) : collections.length === 0 ? (
          <div className="text-center py-20">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--border-subtle)" strokeWidth="1" className="mx-auto mb-4">
              <path d="M4 4v16l8-4 8 4V4l-8 4-8-4z" />
            </svg>
            <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[16px]">
              No collections yet. Sign in to create one.
            </p>
            <Link href="/auth/sign-in" className="inline-block mt-4 px-6 py-3 text-[14px] font-medium tracking-[0.1em] text-white bg-gradient-to-r from-[var(--color-deep)] to-[var(--color-primary)] no-underline rounded-[2px]">
              SIGN IN
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {collections.map(col => (
              <div key={col.id}>
                <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-4">{col.name}</h2>
                <PlaybillGrid movies={col.movies || []} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
