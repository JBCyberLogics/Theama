import type { Genre } from '@/types/movie'

interface GenreFilterBarProps {
  genres: Genre[]
  activeGenre: number | null
  onGenreChange: (genreId: number | null) => void
}

export default function GenreFilterBar({ genres, activeGenre, onGenreChange }: GenreFilterBarProps) {
  return (
    <div
      className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide"
      style={{ scrollSnapType: 'x mandatory' }}
    >
      <button
        onClick={() => onGenreChange(null)}
        className="flex-shrink-0 h-[34px] px-4 text-[13px] font-medium tracking-[0.05em] transition-all duration-200"
        style={{
          backgroundColor: activeGenre === null ? '#DC143C' : 'transparent',
          color: activeGenre === null ? '#FFFFFF' : '#808080',
          border: activeGenre === null ? 'none' : '1px solid #3D0000',
          borderRadius: '2px',
        }}
      >
        ALL
      </button>

      {genres.map(genre => (
        <button
          key={genre.id}
          onClick={() => onGenreChange(genre.id)}
          className="flex-shrink-0 h-[34px] px-4 text-[13px] font-medium tracking-[0.05em] whitespace-nowrap transition-all duration-200"
          style={{
            backgroundColor: activeGenre === genre.id ? '#DC143C' : 'transparent',
            color: activeGenre === genre.id ? '#FFFFFF' : '#808080',
            border: activeGenre === genre.id ? 'none' : '1px solid #3D0000',
            borderRadius: '2px',
          }}
          onMouseEnter={e => {
            if (activeGenre !== genre.id) {
              e.currentTarget.style.borderColor = '#DC143C'
              e.currentTarget.style.color = '#B3B3B3'
            }
          }}
          onMouseLeave={e => {
            if (activeGenre !== genre.id) {
              e.currentTarget.style.borderColor = '#3D0000'
              e.currentTarget.style.color = '#808080'
            }
          }}
        >
          {genre.name.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
