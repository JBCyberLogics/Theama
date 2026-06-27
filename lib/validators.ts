export function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: '#3D0000' }

  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const clamped = Math.min(score, 4)

  if (clamped === 0) return { score: 0, label: 'Weak', color: '#FF1744' }
  if (clamped === 1) return { score: 1, label: 'Weak', color: '#FF1744' }
  if (clamped === 2) return { score: 2, label: 'Fair', color: '#D4890F' }
  if (clamped === 3) return { score: 3, label: 'Good', color: '#C9A84C' }
  return { score: 4, label: 'Strong', color: '#22C55E' }
}
