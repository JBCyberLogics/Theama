import StarIcon from '@/components/ui/icons/StarIcon'
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
            <StarIcon
              size={pixelSize}
              fill={filled ? 'var(--color-primary)' : 'none'}
              stroke={filled ? 'var(--color-primary)' : 'var(--border-subtle)'}
              strokeWidth={1.5}
            />
          </button>
        )
      })}
    </div>
  )
}
