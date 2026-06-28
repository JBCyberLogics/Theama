interface GoldenDividerProps {
  text?: string
  className?: string
}

export default function GoldenDivider({ text, className = '' }: GoldenDividerProps) {
  return (
    <div className={`golden-divider ${className}`}>
      {text && <span className="text-[var(--text-muted-2)]">{text}</span>}
    </div>
  )
}
