interface PasswordStrengthMeterProps {
  password: string
}

function getStrength(password: string): { score: number; label: string; color: string } {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score: 1, label: 'Weak', color: '#FF1744' }
  if (score <= 2) return { score: 2, label: 'Fair', color: '#D4890F' }
  if (score <= 4) return { score: 3, label: 'Good', color: '#C9A84C' }
  return { score: 4, label: 'Strong', color: '#2ECC40' }
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  if (!password) return null
  const { score, label, color } = getStrength(password)

  return (
    <div className="mt-2">
      <div className="flex gap-1.5 mb-1.5">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="h-[3px] flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i <= score ? color : 'rgba(255,255,255,0.06)',
            }}
          />
        ))}
      </div>
      <span className="text-[11px] font-medium tracking-[0.1em]" style={{ color }}>
        {label}
      </span>
    </div>
  )
}
