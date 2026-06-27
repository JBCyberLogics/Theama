interface RoseRatingProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (value: number) => void
}

export default function RoseRating({
  value,
  max = 5,
  size = 'sm',
  interactive = false,
  onChange,
}: RoseRatingProps) {
  const sizeMap = { sm: 14, md: 18, lg: 24 }
  const pixelSize = sizeMap[size]

  return (
    <div className="flex items-center gap-0.5" role={interactive ? 'radiogroup' : 'img'} aria-label={`Rating: ${value} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < value

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(i + 1)}
            className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}
            aria-label={interactive ? `${i + 1} star` : undefined}
            style={{ padding: 0, background: 'none', border: 'none', lineHeight: 0 }}
          >
            <svg
              width={pixelSize}
              height={pixelSize}
              viewBox="0 0 24 24"
              fill={filled ? '#DC143C' : 'none'}
              stroke={filled ? '#DC143C' : '#3D0000'}
              strokeWidth="1.5"
              style={{
                transition: 'all 200ms ease-out',
                filter: filled ? 'drop-shadow(0 0 4px rgba(220,20,60,0.4))' : 'none',
              }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        )
      })}
    </div>
  )
}
