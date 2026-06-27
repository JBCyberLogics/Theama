'use client'

import { useEffect, useRef } from 'react'

interface DustParticlesProps {
  count?: number
  color?: string
  speed?: number
  className?: string
}

export default function DustParticles({
  count = 60,
  color = '#DC143C',
  speed = 0.3,
  className = '',
}: DustParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = 0
    let height = 0

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      fadeSpeed: number
    }[] = []

    const resize = () => {
      width = canvas!.width = canvas!.offsetWidth * window.devicePixelRatio
      height = canvas!.height = canvas!.offsetHeight * window.devicePixelRatio
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const init = () => {
      resize()
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas!.offsetWidth,
          y: Math.random() * canvas!.offsetHeight,
          size: Math.random() * 2.5 + 0.5,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          fadeSpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        })
      }
    }

    const animate = () => {
      ctx!.clearRect(0, 0, canvas!.offsetWidth, canvas!.offsetHeight)

      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        p.opacity += p.fadeSpeed

        if (p.opacity <= 0 || p.opacity >= 0.6) p.fadeSpeed *= -1
        if (p.x < 0) p.x = canvas!.offsetWidth
        if (p.x > canvas!.offsetWidth) p.x = 0
        if (p.y < 0) p.y = canvas!.offsetHeight
        if (p.y > canvas!.offsetHeight) p.y = 0

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = color
        ctx!.globalAlpha = p.opacity
        ctx!.fill()
      })

      ctx!.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    init()
    animate()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [count, color, speed])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
