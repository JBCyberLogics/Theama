'use client'

export default function PlaybillGrid({ movies, loading }) {
  if (loading) return <p style={{ color: '#B38080' }}>Loading...</p>
  if (!movies?.length) return <p style={{ color: '#B38080' }}>No films found.</p>

  return (
    <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '20px 0' }}>
      {movies.map(movie => (
        <div key={movie.id} style={{ minWidth: '200px', cursor: 'pointer', transition: 'transform 0.3s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <img 
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : 'https://via.placeholder.com/200x300/1A1A1A/666?text=No+Poster'} 
            alt={movie.title}
            style={{ width: '200px', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <p style={{ marginTop: '8px', fontWeight: 500, color: 'white' }}>{movie.title}</p>
          <span style={{ color: '#DC143C', fontSize: '14px' }}>⭐ {movie.vote_average?.toFixed(1)}</span>
        </div>
      ))}
    </div>
  )
}
