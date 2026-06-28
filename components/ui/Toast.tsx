import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({ message, type = 'info', isVisible, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const colors = {
    success: { bg: 'rgba(201,168,76,0.1)', border: 'var(--color-gold)', icon: 'var(--color-gold)' },
    error: { bg: 'rgba(255,23,68,0.1)', border: 'var(--color-error)', icon: 'var(--color-error)' },
    info: { bg: 'rgba(220,20,60,0.1)', border: 'var(--color-primary)', icon: 'var(--color-primary)' },
  }

  const c = colors[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -20, x: '-50%' }}
          transition={{ duration: 0.2 }}
          className="fixed top-24 left-1/2 z-[200] flex items-center gap-3 px-5 py-3"
          style={{
            backgroundColor: c.bg,
            border: `1px solid ${c.border}`,
            borderRadius: '2px',
            backdropFilter: 'blur(12px)',
          }}
        >
          {type === 'success' && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.icon} strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {type === 'error' && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.icon} strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
          <span className="text-[14px] text-white">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
