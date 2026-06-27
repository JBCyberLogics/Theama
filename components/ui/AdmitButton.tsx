import { useState, type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface AdmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost'
  loading?: boolean
  success?: boolean
  fullWidth?: boolean
  size?: 'default' | 'large'
}

export default function AdmitButton({
  children,
  variant = 'solid',
  loading = false,
  success = false,
  fullWidth = false,
  size = 'default',
  disabled,
  className,
  ...props
}: AdmitButtonProps) {
  const [hovered, setHovered] = useState(false)

  const baseStyles: React.CSSProperties = {
    height: size === 'large' ? '56px' : '52px',
    padding: size === 'large' ? '0 40px' : '0 32px',
    borderRadius: '2px',
    fontFamily: "'Playfair Display SC', serif",
    fontSize: size === 'large' ? '16px' : '14px',
    fontWeight: 700,
    letterSpacing: '0.2em',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 300ms ease-out',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: fullWidth ? '100%' : 'auto',
    textTransform: 'uppercase',
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    solid: {
      background: hovered && !disabled && !loading
        ? 'linear-gradient(135deg, #DC143C, #FF1744)'
        : 'linear-gradient(135deg, #8B0000, #DC143C)',
      color: '#FFFFFF',
      border: 'none',
      boxShadow: hovered && !disabled && !loading
        ? '0 6px 25px rgba(220,20,60,0.4)'
        : '0 4px 15px rgba(220,20,60,0.2)',
    },
    outline: {
      background: 'transparent',
      color: hovered && !disabled ? '#C9A84C' : '#C9A84C',
      border: '1px solid #C9A84C',
    },
    ghost: {
      background: 'transparent',
      color: hovered && !disabled ? '#FFFFFF' : '#B3B3B3',
      border: '1px solid transparent',
    },
  }

  const stateStyles: React.CSSProperties = {}
  if (disabled) {
    Object.assign(stateStyles, {
      background: '#3D0000',
      color: '#6B4B4B',
      boxShadow: 'none',
    })
  }
  if (loading) {
    Object.assign(stateStyles, {
      opacity: 0.7,
    })
  }
  if (success) {
    Object.assign(stateStyles, {
      background: '#0D5C2E',
    })
  }

  return (
    <button
      style={{ ...baseStyles, ...variantStyles[variant], ...stateStyles }}
      disabled={disabled || loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(className, loading && 'animate-pulse')}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          {size === 'default' ? 'ENTERING...' : 'ENTERING...'}
        </>
      ) : success ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        children
      )}
    </button>
  )
}
