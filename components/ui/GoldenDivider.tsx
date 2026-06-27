interface GoldenDividerProps {
  text?: string
  className?: string
}

export default function GoldenDivider({ text, className = '' }: GoldenDividerProps) {
  return (
    <div className={`golden-divider ${className}`}>
      {text && <span className="text-[#6B4B4B]">{text}</span>}
    </div>
  )
}
