'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch('https://theama.onrender.com/api/movies/trending')
      .then(res => res.json())
      .then(data => setMovies(data.results || []))
  }, [])

  return (
    <div style={{ background: '#0A0A0A', color: 'white', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #1A1A1A' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: '#DC143C', margin: 0 }}>THEAMA</h1>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button style={{ background: 'transparent', color: 'white', border: '1px solid #C9A84C', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer' }}>Sign In</button>
          <button style={{ background: '#DC143C', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer' }}>Claim Ticket</button>
        </div>
      </nav>

      {movies[0] && (
        <div style={{ 
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movies[0].backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '60px',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, #0A0A0A 10%, transparent 60%)' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '52px', margin: '0 0 10px' }}>{movies[0].title}</h2>
            <p style={{ color: '#B38080', fontSize: '18px', marginBottom: '20px' }}>{movies[0].overview?.slice(0, 150)}...</p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: '#DC143C', fontSize: '20px' }}>⭐ {movies[0].vote_average?.toFixed(1)}</span>
              <button style={{ background: 'rgba(220,20,60,0.8)', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>Enter the Spectacle</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '40px' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', borderBottom: '2px solid #DC143C', display: 'inline-block', paddingBottom: '8px' }}>Trending Now</h3>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '20px 0' }}>
          {movies.slice(1).map(movie => (
            <div key={movie.id} style={{ minWidth: '200px', cursor: 'pointer', transition: 'transform 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : 'https://via.placeholder.com/200x300/1A1A1A/666?text=No+Poster'} 
                alt={movie.title}
                style={{ width: '200px', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <p style={{ marginTop: '8px', fontWeight: 500 }}>{movie.title}</p>
              <span style={{ color: '#DC143C', fontSize: '14px' }}>⭐ {movie.vote_average?.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
