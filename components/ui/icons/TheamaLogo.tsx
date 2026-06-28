interface TheamaLogoProps {
  size?: number
  primaryColor?: string
  goldColor?: string
  strokeColor?: string
  className?: string
}

export default function TheamaLogo({
  size = 32,
  primaryColor = 'var(--color-primary)',
  goldColor = 'var(--color-gold)',
  strokeColor = 'var(--color-primary)', className }: TheamaLogoProps) {
  return (
    <svg width={size} className={className} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" stroke={strokeColor} strokeWidth="1.5" fill="none" />
      <path d="M16 6C12 6 8 8 8 12C8 14 9 16 10 18C11 20 12 21 16 26C20 21 21 20 22 18C23 16 24 14 24 12C24 8 20 6 16 6Z" fill={primaryColor} opacity="0.8" />
      <path d="M16 10C13.5 10 12 11.5 12 13.5C12 14.8 12.8 16 14 17C14.8 17.8 15.4 18.4 16 22C16.6 18.4 17.2 17.8 18 17C19.2 16 20 14.8 20 13.5C20 11.5 18.5 10 16 10Z" fill={goldColor} opacity="0.6" />
    </svg>
  )
}
