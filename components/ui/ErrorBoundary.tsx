'use client'

import { Component, type ReactNode, type ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div
          className="flex flex-col items-center justify-center p-10 text-center"
          style={{ minHeight: '300px', backgroundColor: 'var(--surface-base)' }}
        >
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none" className="mb-4">
            <circle cx="16" cy="16" r="15" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" opacity="0.5" />
            <path d="M16 10v6M16 20v2" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <h3 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-2">
            Something Went Wrong
          </h3>
          <p className="font-['Cormorant_Garamond'] italic text-[var(--text-muted)] text-[14px] mb-6 max-w-[400px]">
            The performance has encountered an unexpected intermission.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="h-[42px] px-6 text-[13px] font-medium tracking-[0.1em] text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--color-deep), var(--color-primary))',
              borderRadius: '2px',
            }}
          >
            TRY AGAIN
          </button>
          {this.state.error && (
            <details className="mt-4 max-w-[500px]">
              <summary className="text-[var(--text-muted-2)] text-[12px] cursor-pointer hover:text-[var(--text-muted-3)]">
                Technical details
              </summary>
              <pre className="mt-2 p-3 text-left text-[11px] overflow-auto" style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                color: 'var(--text-muted)',
                border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: '2px',
              }}>
                {this.state.error.message}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
