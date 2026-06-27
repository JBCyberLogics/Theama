import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 24px',
      textAlign: 'center',
      backgroundColor: '#0A0A0A',
      color: '#FFFFFF',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ marginBottom: 40 }}>
        <svg width="80" height="80" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="15" stroke="#DC143C" strokeWidth="1.5" fill="none" />
          <path d="M16 6C12 6 8 8 8 12C8 14 9 16 10 18C11 20 12 21 16 26C20 21 21 20 22 18C23 16 24 14 24 12C24 8 20 6 16 6Z" fill="#DC143C" opacity="0.8" />
        </svg>
      </div>

      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(48px, 8vw, 120px)',
        fontWeight: 900,
        color: '#DC143C',
        margin: '0 0 8px',
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}>404</h1>

      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '20px',
        fontStyle: 'italic',
        color: '#B38080',
        margin: '0 0 8px',
      }}>
        This scene was cut from the final program
      </p>

      <p style={{
        fontSize: '14px',
        color: '#6B4B4B',
        margin: '0 0 40px',
      }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        style={{
          display: 'inline-flex',
          height: '52px',
          padding: '0 32px',
          alignItems: 'center',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.1em',
          color: '#FFFFFF',
          background: 'linear-gradient(135deg, #8B0000, #DC143C)',
          borderRadius: '2px',
          textDecoration: 'none',
          boxShadow: '0 4px 15px rgba(220,20,60,0.2)',
        }}
      >
        RETURN TO THE STAGE
      </Link>
    </div>
  )
}
