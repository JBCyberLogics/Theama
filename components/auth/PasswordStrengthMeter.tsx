import { getPasswordStrength } from '@/lib/validators'

interface PasswordStrengthMeterProps {
  password: string
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  if (!password) return null
  const { score, label, color } = getPasswordStrength(password)

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
