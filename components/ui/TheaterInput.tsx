import { useState, useId } from 'react'

interface TheaterInputProps {
  label: string
  id?: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  icon?: 'ticket' | 'lock' | 'user'
  showToggle?: boolean
  required?: boolean
  autoComplete?: string
}

const ICON_PATHS: Record<string, React.ReactNode> = {
  ticket: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M10 12c0 1.1.9 2 2 2s2-.9 2-2" />
    </svg>
  ),
  lock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  user: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  ),
}

export default function TheaterInput({
  label,
  id: externalId,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  showToggle,
  required,
  autoComplete,
}: TheaterInputProps) {
  const generatedId = useId()
  const inputId = externalId || generatedId
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = showToggle && type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-[12px] font-medium tracking-[0.1em] uppercase"
        style={{ color: focused ? '#DC143C' : '#808080' }}
      >
        {label}
        {required && <span className="text-[#DC143C] ml-1">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: error ? '#FF1744' : focused ? '#DC143C' : '#8B0000' }}>
            {ICON_PATHS[icon]}
          </div>
        )}

        <input
          id={inputId}
          type={inputType}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          style={{
            width: '100%',
            height: '52px',
            paddingLeft: icon ? '48px' : '16px',
            paddingRight: showToggle ? '48px' : '16px',
            backgroundColor: 'rgba(10,5,5,0.8)',
            border: error
              ? '2px solid #FF1744'
              : focused
              ? '2px solid #DC143C'
              : '1px solid #3D0000',
            borderRadius: '2px',
            color: '#FFFFFF',
            fontSize: '15px',
            outline: 'none',
            transition: 'all 300ms ease-out',
            boxShadow: focused ? '0 0 15px rgba(220,20,60,0.3)' : 'none',
          }}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B4B4B] hover:text-[#B3B3B3]"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {showPassword ? (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              ) : (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              )}
            </svg>
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 mt-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF1744" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span className="text-[12px]" style={{ color: '#FF1744' }}>{error}</span>
        </div>
      )}
    </div>
  )
}
