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
            color: 'var(--text-muted-3)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '2px',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '16px',
          }}

        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}
