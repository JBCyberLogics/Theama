interface UserAvatarIconProps {
  size?: number
  fill?: string
  stroke?: string
  strokeWidth?: number
  className?: string
}

export default function UserAvatarIcon({ size = 20, fill = 'var(--text-muted-2)', stroke = 'none', strokeWidth = 0, className}: UserAvatarIconProps) {
  return (
    <svg width={size} className={className} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  )
}
