'use client'

import { useEffect, useState } from 'react'

export default function PWARegister() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installable, setInstallable] = useState(false)
  const [installed, setInstalled] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {})
      })
    }

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    window.addEventListener('appinstalled', () => {
      setInstallable(false)
      setInstalled(true)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setInstalled(true)
    }
    setDeferredPrompt(null)
    setInstallable(false)
  }

  const handleDismiss = () => {
    setDismissed(true)
    setInstallable(false)
  }

  if (!installable || dismissed || installed) return null

  return (
    <div
      className="fixed bottom-20 left-4 right-4 z-[200] md:bottom-6 md:left-auto md:right-6 md:w-[360px]"
    >
      <div
        className="relative p-4 flex items-center gap-3 shadow-lg"
        style={{
          backgroundColor: '#141414',
          border: '1px solid #1A1A1A',
          borderRadius: '4px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded-[2px]">
          <img src="/icons/icon-192x192.png" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-white text-[13px] font-medium">Install THEAMA</p>
          <p className="text-[#808080] text-[11px] truncate">Add to your home screen for the full experience</p>
        </div>

        <button
          onClick={handleInstall}
          className="h-[34px] px-4 text-[12px] font-semibold tracking-[0.05em] text-white transition-all duration-200 flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #8B0000, #DC143C)',
            borderRadius: '2px',
          }}
        >
          INSTALL
        </button>

        <button
          onClick={handleDismiss}
          className="w-6 h-6 flex items-center justify-center text-[#6B4B4B] hover:text-white transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
