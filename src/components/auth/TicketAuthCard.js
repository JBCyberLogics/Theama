'use client'

import { useState } from 'react'

export default function TicketAuthCard({ mode, onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit({ email, password })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: 'rgba(20,8,8,0.95)', border: '2px solid #8B0000', padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '16px', background: '#1A0808', border: '1px solid #3D0000', color: 'white', borderRadius: '4px' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '24px', background: '#1A0808', border: '1px solid #3D0000', color: 'white', borderRadius: '4px' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '14px', background: loading ? '#3D0000' : '#DC143C', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600 }}
        >
          {loading ? 'Please wait...' : mode === 'sign_in' ? 'ADMIT ONE' : 'CLAIM TICKET'}
        </button>
      </form>
    </div>
  )
}
