interface StarIconProps {
  size?: number
  fill?: string
  stroke?: string
  strokeWidth?: number
  className?: string
}

export default function StarIcon({ size = 18, fill = 'var(--color-primary)', stroke = 'none', strokeWidth = 0, className}: StarIconProps) {
  return (
    <svg width={size} className={className} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
