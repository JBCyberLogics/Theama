interface SearchIconProps {
  size?: number
  stroke?: string
  strokeWidth?: number
  className?: string
}

export default function SearchIcon({ size = 20, stroke = 'var(--text-muted-2)', strokeWidth = 1.5, className }: SearchIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}
