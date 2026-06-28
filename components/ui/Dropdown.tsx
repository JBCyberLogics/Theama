import { useState, useRef, useEffect, type ReactNode } from 'react'

interface DropdownOption {
  label: string
  value: string
  icon?: ReactNode
}

interface DropdownProps {
  trigger: ReactNode
  options: DropdownOption[]
  onSelect: (value: string) => void
  align?: 'left' | 'right'
}

export default function Dropdown({ trigger, options, onSelect, align = 'left' }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false)
  }

  return (
    <div ref={ref} className="relative inline-block" onKeyDown={handleKey}>
      <div onClick={() => setOpen(!open)}>
        {trigger}
      </div>

      {open && (
        <div
          className="absolute top-full mt-2 z-50 min-w-[160px] py-2"
          style={{
            [align]: 0,
            backgroundColor: 'var(--surface-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: '2px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onSelect(opt.value); setOpen(false) }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(220,20,60,0.05)] transition-colors text-left"
            >
              {opt.icon && <span className="w-4 h-4 flex items-center">{opt.icon}</span>}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
