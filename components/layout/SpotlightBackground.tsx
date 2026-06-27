import type { ReactNode } from 'react'

interface SpotlightBackgroundProps {
  children: ReactNode
  intensity?: number
  color?: string
  size?: string
}

export default function SpotlightBackground({
  children,
  intensity = 0.06,
  color = 'rgba(220,20,60,0.06)',
  size = '60vw',
}: SpotlightBackgroundProps) {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#0A0505' }}>
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-spotlight-fade"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
          opacity: intensity * 10,
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(201,168,76,0.02) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(220,20,60,0.02) 0%, transparent 50%)
          `,
        }}
      />
      {children}
    </div>
  )
}
