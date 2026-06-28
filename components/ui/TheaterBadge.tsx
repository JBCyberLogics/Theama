interface TheaterBadgeProps {
  text: string
  variant?: 'rating' | 'year' | 'genre' | 'gold'
}

export default function TheaterBadge({ text, variant = 'genre' }: TheaterBadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    rating: {
      backgroundColor: 'rgba(220,20,60,0.15)',
      color: 'var(--color-primary)',
      border: '1px solid rgba(220,20,60,0.3)',
      fontSize: '12px',
    },
    year: {
      backgroundColor: 'rgba(255,255,255,0.05)',
      color: 'var(--text-secondary)',
      border: '1px solid rgba(255,255,255,0.08)',
      fontSize: '12px',
    },
    genre: {
      backgroundColor: 'rgba(255,255,255,0.04)',
      color: 'var(--text-muted-3)',
      border: '1px solid rgba(255,255,255,0.06)',
      fontSize: '11px',
    },
    gold: {
      backgroundColor: 'rgba(201,168,76,0.1)',
      color: 'var(--color-gold)',
      border: '1px solid rgba(201,168,76,0.2)',
      fontSize: '11px',
    },
  }

  return (
    <span
      style={{
        ...styles[variant],
        padding: '3px 8px',
        borderRadius: '2px',
        fontWeight: 500,
        letterSpacing: '0.05em',
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 1,
      }}
    >
      {text}
    </span>
  )
}
