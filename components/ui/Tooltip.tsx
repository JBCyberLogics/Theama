import { useState, useRef, type ReactNode } from 'react'

interface TooltipProps {
  children: ReactNode
  content: string
}

export default function Tooltip({ children, content }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 whitespace-nowrap z-50 pointer-events-none"
          style={{
            backgroundColor: 'var(--surface-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: '2px',
            fontSize: '12px',
            color: 'var(--text-primary)',
          }}
        >
          {content}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2"
            style={{
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid var(--border-default)',
            }}
          />
        </div>
      )}
    </div>
  )
}
