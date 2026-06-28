'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PlaybillGrid from '@/components/movies/PlaybillGrid'

export default function CollectionsPage() {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/collections')
      .then(res => res.json())
      .then(data => setCollections(data.collections || []))
      .catch(() => setCollections([]))
      .finally(() => setLoading(false))
  }, [])

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
