interface SynopsisProgramProps {
  overview: string
  tagline?: string | null
}

export default function SynopsisProgram({ overview, tagline }: SynopsisProgramProps) {
  if (!overview) return null

  return (
    <section className="py-10 max-w-[800px]">
      <h3 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-4 tracking-[0.02em]">
        The Program
      </h3>

      {tagline && (
        <p className="font-['Cormorant_Garamond'] italic text-[#C9A84C] text-[18px] mb-4 leading-relaxed">
          "{tagline}"
        </p>
      )}

      <div className="flex gap-4">
        <span
          className="font-['Playfair_Display'] text-[48px] font-bold leading-none"
          style={{ color: '#C9A84C', float: 'left', lineHeight: 0.8, marginTop: '4px' }}
        >
          {overview.charAt(0)}
        </span>
        <p
          className="font-['Cormorant_Garamond'] text-[17px] leading-relaxed"
          style={{ color: '#B3B3B3' }}
        >
          {overview.slice(1)}
        </p>
      </div>
    </section>
  )
}
