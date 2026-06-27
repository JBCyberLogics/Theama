import { useEffect, useState } from 'react'
import { api } from '@/lib/apiClient'
import type { Genre } from '@/types/movie'

interface GenreCloudProps {
  onGenreSelect: (genreId: number) => void
}

export default function GenreCloud({ onGenreSelect }: GenreCloudProps) {
  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {
    api.get<{ genres: Genre[] }>('/movies/genres')
      .then(res => setGenres(res.genres))
      .catch(() => {})
  }, [])

  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-[600px] mx-auto mt-6">
      {genres.slice(0, 12).map(genre => (
        <button
          key={genre.id}
          onClick={() => onGenreSelect(genre.id)}
          className="px-5 py-2.5 text-[14px] transition-all duration-200"
          style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            color: '#808080',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '2px',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '16px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#DC143C'
            e.currentTarget.style.color = '#FFFFFF'
            e.currentTarget.style.backgroundColor = 'rgba(220,20,60,0.08)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
            e.currentTarget.style.color = '#808080'
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'
          }}
        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}
