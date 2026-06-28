import { useState, useMemo } from 'react'
import Link from 'next/link'
import AdmitButton from '@/components/ui/AdmitButton'
import TheaterInput from '@/components/ui/TheaterInput'
import GoldenDivider from '@/components/ui/GoldenDivider'
import Toast from '@/components/ui/Toast'
import { getPasswordStrength } from '@/lib/validators'
import type { TicketAuthCardProps } from '@/types/components'

export default function TicketAuthCard({ mode, loading: externalLoading, onSubmit, onSocialAuth }: TicketAuthCardProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const [formData, setFormData] = useState<Record<string, string>>({})
  const [confirmError, setConfirmError] = useState<string | null>(null)

  const isSignIn = mode === 'sign_in'
  const isSignUp = mode === 'sign_up'
  const isForgot = mode === 'forgot_password'

  const strength = useMemo(() => getPasswordStrength(formData.password || ''), [formData.password])

  const passwordsMatch = !formData.confirmPassword || formData.password === formData.confirmPassword
  const showConfirmError = !!formData.confirmPassword && !passwordsMatch

  const handleFieldChange = (id: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }))
    setError(null)
    if (id === 'password' || id === 'confirmPassword') {
      const other = id === 'password' ? formData.confirmPassword : formData.password
      if (other && value !== other) {
        setConfirmError('Passwords do not match')
      } else {
        setConfirmError(null)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setConfirmError('Passwords do not match')
        setLoading(false)
        return
      }
      const pw = getPasswordStrength(formData.password || '')
      if (pw.score < 2) {
        setError('Password is too weak. Try adding more length, numbers, or special characters.')
        setLoading(false)
        return
      }
    }

    try {
      onSubmit(formData)
        .then(() => {
          if (isSignUp) {
            setSuccess(true)
            setToast({ message: 'Ticket Claimed! Check your email.', type: 'success' })
          } else if (isSignIn) {
            setSuccess(true)
            setToast({ message: 'Welcome Back', type: 'success' })
          } else {
            setToast({ message: 'Check your email for a reset link', type: 'success' })
          }
        })
        .catch((err: Error) => {
          setError(err.message)
          setToast({ message: err.message, type: 'error' })
        })
        .finally(() => setLoading(false))
    } catch {
      setLoading(false)
    }
  }

  const fields = isSignIn
    ? [
        { id: 'email', type: 'email', label: 'Email Address', placeholder: 'your@email.com', icon: 'ticket' as const, required: true },
        { id: 'password', type: 'password', label: 'Password', placeholder: '••••••••', icon: 'lock' as const, showToggle: true, required: true },
      ]
    : isSignUp
    ? [
        { id: 'full_name', type: 'text', label: 'Full Name', placeholder: 'Your name as it appears on the ticket', icon: 'user' as const, required: true },
        { id: 'email', type: 'email', label: 'Email Address', placeholder: 'your@email.com', icon: 'ticket' as const, required: true },
        { id: 'password', type: 'password', label: 'Password', placeholder: 'Create a strong password', icon: 'lock' as const, showToggle: true, required: true },
        { id: 'confirmPassword', type: 'password', label: 'Confirm Password', placeholder: 'Re-enter your password', icon: 'lock' as const, showToggle: true, required: true },
      ]
    : [
        { id: 'email', type: 'email', label: 'Email Address', placeholder: 'your@email.com', icon: 'ticket' as const, required: true },
      ]

  return (
    <>
      <Toast
        message={toast?.message || ''}
        type={toast?.type || 'info'}
        isVisible={!!toast}
        onClose={() => setToast(null)}
      />

      <div
        className="relative w-full max-w-[440px] mx-auto"
        style={{
          backgroundColor: 'rgba(20,8,8,0.95)',
          border: error ? '2px solid var(--color-error)' : success ? '2px solid var(--color-gold)' : '2px solid var(--color-deep)',
          boxShadow: error
            ? '0 0 60px rgba(255,23,68,0.2)'
            : success
            ? '0 0 60px rgba(201,168,76,0.2)'
            : '0 0 60px rgba(220,20,60,0.15), 0 0 120px rgba(139,0,0,0.08)',
          transition: 'all 300ms ease-out',
          animation: error ? 'shake 0.3s ease-in-out' : undefined,
        }}
      >
        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
          }
        `}</style>

        {/* Perforation top */}
        <div className="flex items-center justify-center gap-2 pt-5 pb-2">
          <div className="flex-1 h-[1px] border-t border-dashed" style={{ borderColor: 'var(--color-gold)' }} />
          <span style={{ color: 'var(--color-gold)', fontSize: '10px' }}>✦</span>
          <div className="flex-1 h-[1px] border-t border-dashed" style={{ borderColor: 'var(--color-gold)' }} />
        </div>

        {/* Header */}
        <div className="px-8 pt-4 pb-6 text-center">
          <div className="flex justify-center mb-4">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="15" stroke="var(--color-gold)" strokeWidth="1.5" fill="none" />
              <path d="M16 6C12 6 8 8 8 12C8 14 9 16 10 18C11 20 12 21 16 26C20 21 21 20 22 18C23 16 24 14 24 12C24 8 20 6 16 6Z" fill="var(--color-gold)" opacity="0.8" />
              <path d="M16 10C13.5 10 12 11.5 12 13.5C12 14.8 12.8 16 14 17C14.8 17.8 15.4 18.4 16 22C16.6 18.4 17.2 17.8 18 17C19.2 16 20 14.8 20 13.5C20 11.5 18.5 10 16 10Z" fill="var(--color-gold)" opacity="0.4" />
            </svg>
          </div>

          <h1 className="font-['Playfair_Display'] text-[28px] font-bold text-white tracking-[-0.02em]">
            THEAMA<span style={{ color: 'var(--color-primary)' }}>.</span>
          </h1>

          <p className="font-['Cormorant_Garamond'] italic text-[16px] mt-1" style={{ color: 'var(--text-muted)' }}>
            {isSignIn ? 'The Spectacle Awaits' : isSignUp ? 'Claim Your Stage Pass' : 'We\'ll Send a Magic Link'}
          </p>

          {/* Tab Switch */}
          {!isForgot && (
            <div className="flex items-center justify-center gap-6 mt-6 mb-2">
              <Link
                href="/auth/sign-in"
                className="relative text-[13px] font-medium tracking-[0.15em] uppercase no-underline pb-2 transition-colors"
                style={{
                  color: isSignIn ? 'var(--color-primary)' : 'var(--text-muted-2)',
                }}
              >
                Sign In
                {isSignIn && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2"
                    style={{
                      width: '40px',
                      height: '3px',
                      backgroundColor: 'var(--color-primary)',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </Link>
              <Link
                href="/auth/sign-up"
                className="relative text-[13px] font-medium tracking-[0.15em] uppercase no-underline pb-2 transition-colors"
                style={{
                  color: isSignUp ? 'var(--color-primary)' : 'var(--text-muted-2)',
                }}
              >
                Sign Up
                {isSignUp && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2"
                    style={{
                      width: '40px',
                      height: '3px',
                      backgroundColor: 'var(--color-primary)',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </Link>
            </div>
          )}

          {/* Gold separator */}
          <div className="golden-divider mt-3" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-6 space-y-5">
          {fields.map((field, idx) => (
            <div key={field.id}>
              <TheaterInput
                id={field.id}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={handleFieldChange(field.id)}
                icon={field.icon}
                showToggle={'showToggle' in field ? field.showToggle : undefined}
                required={field.required}
                error={
                  field.id === 'confirmPassword' && showConfirmError
                    ? confirmError || undefined
                    : undefined
                }
              />

              {isSignUp && field.id === 'password' && formData.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="h-[3px] rounded-full transition-all duration-300"
                    style={{
                      width: `${((strength.score + 1) / 5) * 100}%`,
                      backgroundColor: strength.color,
                      maxWidth: '120px',
                    }}
                  />
                  {strength.label && (
                    <span className="text-[11px] font-medium" style={{ color: strength.color }}>
                      {strength.label}
                    </span>
                  )}
                </div>
              )}

              {isSignUp && field.id === 'confirmPassword' && (
                <div className="text-right mt-2">
                  <Link
                    href="/auth/forgot-password"
                    className="text-[13px] no-underline transition-colors"
                    style={{ color: 'var(--text-muted)' }}

                  >
                    Lost your ticket?
                  </Link>
                </div>
              )}
            </div>
          ))}

          {isSignIn && (
            <div className="text-right">
              <Link
                href="/auth/forgot-password"
                className="text-[13px] no-underline transition-colors hover:text-[var(--color-primary)]"
                style={{ color: 'var(--text-muted)' }}
              >
                Lost your ticket?
              </Link>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3" style={{ backgroundColor: 'rgba(255,23,68,0.1)', border: '1px solid rgba(255,23,68,0.2)', borderRadius: '2px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="text-[13px]" style={{ color: 'var(--color-error)' }}>{error}</span>
            </div>
          )}

          <AdmitButton
            type="submit"
            fullWidth
            loading={loading}
            success={success}
            disabled={externalLoading}
          >
            {isSignIn ? 'ADMIT ONE' : isSignUp ? 'CLAIM TICKET' : 'SEND NEW PASS'}
          </AdmitButton>

          {/* Social Auth */}
          {!isForgot && (
            <>
              <GoldenDivider text="or continue with" />

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => onSocialAuth?.('google')}
                  className="w-[48px] h-[48px] flex items-center justify-center transition-all duration-200"
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '2px',
                    backgroundColor: 'transparent',
                  }}

                  aria-label="Sign in with Google"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </button>
              </div>
            </>
          )}

          {/* Bottom link */}
          <div className="text-center pt-2">
            <span className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
              {isSignIn ? 'First time? ' : isSignUp ? 'Already have a ticket? ' : 'Remember your ticket? '}
            </span>
            <Link
              href={isSignIn ? '/auth/sign-up' : isSignUp ? '/auth/sign-in' : '/auth/sign-in'}
              className="text-[13px] font-medium no-underline transition-colors"
              style={{ color: 'var(--color-primary)' }}
            >
              {isSignIn ? 'Claim Your Ticket →' : isSignUp ? 'Sign In →' : 'Back to Sign In'}
            </Link>
          </div>
        </form>

        {/* Perforation bottom */}
        <div className="flex items-center justify-center gap-2 pb-5 pt-2">
          <div className="flex-1 h-[1px] border-t border-dashed" style={{ borderColor: 'var(--color-gold)' }} />
          <span style={{ color: 'var(--color-gold)', fontSize: '10px' }}>✦</span>
          <div className="flex-1 h-[1px] border-t border-dashed" style={{ borderColor: 'var(--color-gold)' }} />
        </div>
      </div>
    </>
  )
}
