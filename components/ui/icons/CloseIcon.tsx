interface CloseIconProps {
  size?: number
  stroke?: string
  strokeWidth?: number
  className?: string
}

export default function CloseIcon({ size = 20, stroke = 'var(--text-primary)', strokeWidth = 1.5, className }: CloseIconProps) {
  return (
    <svg width={size} className={className} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}
