'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const TMDB_GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
]

export default function GenresPage() {
  return (
    <div className="min-h-screen pt-[72px]" style={{ backgroundColor: 'var(--surface-base)' }}>
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <h1 className="font-['Playfair_Display'] text-white text-[28px] sm:text-[36px] font-bold mb-2">
          Genres
        </h1>
        <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[16px] mb-8">
          Browse by category
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {TMDB_GENRES.map(genre => (
            <Link
              key={genre.id}
              href={`/browse?filter=&genre=${genre.id}`}
              className="group p-6 border border-[var(--border-default)] rounded-[2px] hover:border-[var(--color-primary)] hover:bg-[rgba(220,20,60,0.05)] transition-all duration-200 no-underline"
            >
              <h3 className="font-['Playfair_Display'] text-white text-[16px] font-semibold group-hover:text-[var(--color-primary)] transition-colors">
                {genre.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
