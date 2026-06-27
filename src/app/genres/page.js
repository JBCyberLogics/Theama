'use client'

import { useRouter } from 'next/navigation'
import StageLayout from '@/components/layout/StageLayout'
import TheaterSidebar from '@/components/layout/TheaterSidebar'
import GenreCloud from '@/components/search/GenreCloud'

export default function GenresPage() {
  const router = useRouter()

  const handleGenreSelect = (genreId) => {
    router.push(`/browse?genre=${genreId}`)
  }

  return (
    <StageLayout transparentNav={false}>
      <TheaterSidebar />
      <div className="ml-[64px] pt-[72px] min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="pl-8 pr-8 py-8 max-w-[1200px]">
          <div className="text-center mb-10">
            <h1 className="font-['Playfair_Display'] text-white text-[32px] font-bold mb-2">
              Browse by Genre
            </h1>
            <p className="font-['Cormorant_Garamond'] italic text-[#B38080] text-[16px]">
              Select a genre to discover films tailored to your taste
            </p>
          </div>
          <GenreCloud onGenreSelect={handleGenreSelect} />
        </div>
      </div>
    </StageLayout>
  )
}
