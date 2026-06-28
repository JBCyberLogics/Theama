import type { Genre } from '@/types/movie'

interface GenreFilterBarProps {
  genres: Genre[]
  activeGenre: number | null
  onGenreChange: (genreId: number | null) => void
}

export default function GenreFilterBar({ genres, activeGenre, onGenreChange }: GenreFilterBarProps) {
  return (
    <div
      className="flex gap-2.5 overflow-x-auto pb-2 pl-1 scrollbar-hide"
      style={{ scrollSnapType: 'x mandatory' }}
    >
      <button
        onClick={() => onGenreChange(null)}
        className="flex-shrink-0 min-h-[44px] px-4 text-[13px] font-medium tracking-[0.05em] transition-all duration-200"
        style={{
          backgroundColor: activeGenre === null ? 'var(--color-primary)' : 'transparent',
          color: activeGenre === null ? 'var(--text-primary)' : 'var(--text-muted-3)',
          border: activeGenre === null ? 'none' : '1px solid var(--border-subtle)',
          borderRadius: '2px',
        }}
      >
        ALL
      </button>

      {genres.map(genre => (
        <button
          key={genre.id}
          onClick={() => onGenreChange(genre.id)}
          className="flex-shrink-0 min-h-[44px] px-4 text-[13px] font-medium tracking-[0.05em] whitespace-nowrap transition-all duration-200"
          style={{
            backgroundColor: activeGenre === genre.id ? 'var(--color-primary)' : 'transparent',
            color: activeGenre === genre.id ? 'var(--text-primary)' : 'var(--text-muted-3)',
            border: activeGenre === genre.id ? 'none' : '1px solid var(--border-subtle)',
            borderRadius: '2px',
          }}

        >
          {genre.name.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
