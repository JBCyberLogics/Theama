'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetch('https://theama.onrender.com/api/movies/trending')
      .then(res => res.json())
      .then(data => setMovies(data.results || []))
  }, [])

  if (!mounted) return null

  return (
    <div style={{ background: '#0A0A0A', color: 'white', minHeight: '100vh', fontFamily: 'Inter, sans-serif', overflowX: 'hidden', width: '100%' }}>
      
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px clamp(16px, 4vw, 40px)', borderBottom: '1px solid #1A1A1A' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 4vw, 28px)', color: '#DC143C', margin: 0 }}>THEAMA</h1>
        <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 16px)' }}>
          <button style={{ background: 'transparent', color: 'white', border: '1px solid #C9A84C', padding: '8px clamp(12px, 2vw, 20px)', borderRadius: '4px', cursor: 'pointer', fontSize: 'clamp(12px, 2vw, 14px)', whiteSpace: 'nowrap' }}>Sign In</button>
          <button style={{ background: '#DC143C', color: 'white', border: 'none', padding: '8px clamp(12px, 2vw, 20px)', borderRadius: '4px', cursor: 'pointer', fontSize: 'clamp(12px, 2vw, 14px)', whiteSpace: 'nowrap' }}>Claim Ticket</button>
        </div>
      </nav>

      {movies[0] && (
        <div style={{ 
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movies[0].backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 'clamp(50vh, 80vh, 900px)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: 'clamp(24px, 5vw, 60px)',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, #0A0A0A 10%, transparent 60%)' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '100%', width: '600px' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 8vw, 52px)', margin: '0 0 10px', lineHeight: 1.1, wordBreak: 'break-word' }}>{movies[0].title}</h2>
            <p style={{ color: '#B38080', fontSize: 'clamp(14px, 2.5vw, 18px)', marginBottom: '20px', lineHeight: 1.5 }}>{movies[0].overview?.slice(0, 150)}...</p>
            <span style={{ color: '#DC143C', fontSize: 'clamp(16px, 3vw, 20px)' }}>⭐ {movies[0].vote_average?.toFixed(1)}</span>
          </div>
        </div>
      )}

      <div style={{ padding: 'clamp(20px, 4vw, 40px)' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(20px, 3vw, 24px)', borderBottom: '2px solid #DC143C', display: 'inline-block', paddingBottom: '8px' }}>Trending Now</h3>
        <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 16px)', overflowX: 'auto', padding: '20px 0', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
          {movies.slice(1).map(movie => (
            <div key={movie.id} style={{ minWidth: 'clamp(140px, 20vw, 200px)', cursor: 'pointer', transition: 'transform 0.3s', scrollSnapAlign: 'start' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : 'https://via.placeholder.com/200x300/1A1A1A/666?text=No+Poster'} 
                alt={movie.title}
                style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', borderRadius: '8px' }}
              />
              <p style={{ marginTop: '8px', fontWeight: 500, fontSize: 'clamp(13px, 2vw, 15px)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{movie.title}</p>
              <span style={{ color: '#DC143C', fontSize: 'clamp(12px, 2vw, 14px)' }}>⭐ {movie.vote_average?.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
