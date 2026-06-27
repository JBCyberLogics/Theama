interface StatsOverviewProps {
  totalWatchlist: number
  totalWatched: number
  totalRatings: number
  avgRating: number | null
  totalCollections: number
}

export default function StatsOverview({
  totalWatchlist,
  totalWatched,
  totalRatings,
  avgRating,
  totalCollections,
}: StatsOverviewProps) {
  const items = [
    { label: 'Watchlist', value: totalWatchlist },
    { label: 'Watched', value: totalWatched },
    { label: 'Ratings', value: totalRatings },
    { label: 'Avg Rating', value: avgRating ? avgRating.toFixed(1) : '—' },
    { label: 'Collections', value: totalCollections },
  ]

  return (
    <div className="grid grid-cols-5 gap-4 mb-10">
      {items.map(item => (
        <div
          key={item.label}
          className="p-5 text-center"
          style={{
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '4px',
          }}
        >
          <p className="font-['Playfair_Display'] text-white text-[28px] font-bold">
            {item.value}
          </p>
          <p className="text-[#808080] text-[12px] tracking-[0.1em] uppercase mt-1">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  )
}
