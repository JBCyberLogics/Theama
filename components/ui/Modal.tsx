import { useEffect, useRef, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CloseIcon from '@/components/ui/icons/CloseIcon'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-[500px]"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
              boxShadow: '0 0 60px rgba(220,20,60,0.15)',
            }}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-default)]">
                <h3 className="font-['Playfair_Display'] text-[18px] text-white font-semibold">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-[var(--text-muted-2)] hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <CloseIcon size={16} stroke="currentColor" strokeWidth={2} />
                </button>
              </div>
            )}

            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
