interface SearchSuggestionsProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
}

export default function SearchSuggestions({ suggestions, onSelect }: SearchSuggestionsProps) {
  if (suggestions.length === 0) return null

  return (
    <div className="mt-4">
      <p className="text-[#6B4B4B] text-[12px] tracking-[0.1em] uppercase mb-3">Suggestions</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map(suggestion => (
          <button
            key={suggestion}
            onClick={() => onSelect(suggestion)}
            className="px-4 py-2 text-[13px] transition-all duration-200"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              color: '#808080',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '2px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#DC143C'
              e.currentTarget.style.color = '#B3B3B3'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.color = '#808080'
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
