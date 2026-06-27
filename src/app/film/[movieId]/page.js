'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import StageLayout from '@/components/layout/StageLayout'
import FilmBackdropHero from '@/components/movies/FilmBackdropHero'
import CastArc from '@/components/movies/CastArc'
import SynopsisProgram from '@/components/movies/SynopsisProgram'
import RelatedPlaybills from '@/components/movies/RelatedPlaybills'
import Modal from '@/components/ui/Modal'
import GoldenDivider from '@/components/ui/GoldenDivider'
import { useMovieDetail } from '@/hooks/useMovies'
import { useWatchlist } from '@/hooks/useWatchlist'

export default function FilmDetailPage() {
  const params = useParams()
  const router = useRouter()
  const movieId = Number(params.movieId)
  const { movie, loading } = useMovieDetail(movieId)
  const { isInWatchlist, addToWatchlist } = useWatchlist()
  const [trailerOpen, setTrailerOpen] = useState(false)

  if (loading) {
    return (
      <StageLayout transparentNav={false}>
        <div className="pt-[72px] min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin-slow w-48 h-48 border-2 border-[#DC143C] border-t-transparent rounded-full" />
            <p className="font-['Cormorant_Garamond'] italic text-[#B38080] text-[16px]">
              Preparing the stage...
            </p>
          </div>
        </div>
      </StageLayout>
    )
  }

  if (!movie) {
    return (
      <StageLayout transparentNav={false}>
        <div className="pt-[72px] min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="text-center">
            <p className="font-['Playfair_Display'] text-white text-[32px] font-bold mb-2">
              Film Not Found
            </p>
            <p className="font-['Cormorant_Garamond'] italic text-[#B38080] text-[16px] mb-6">
              This film is not currently in our program.
            </p>
            <button
              onClick={() => router.push('/browse')}
              className="h-[48px] px-7 text-[14px] font-medium tracking-[0.1em] text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #8B0000, #DC143C)',
                borderRadius: '2px',
              }}
            >
              BROWSE FILMS
            </button>
          </div>
        </div>
      </StageLayout>
    )
  }

  const trailer = movie.videos?.results?.find(
    v => v.type === 'Trailer' && v.site === 'YouTube'
  )

  const handlePlayTrailer = () => {
    if (trailer) setTrailerOpen(true)
  }

  const handleAddToWatchlist = async () => {
    if (!isInWatchlist(movie.id)) {
      await addToWatchlist({
        movie_id: movie.id,
        movie_title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        tmdb_rating: movie.vote_average,
        release_date: movie.release_date,
        genres: movie.genres?.map(g => g.id),
      })
    }
  }

  return (
    <StageLayout transparentNav={false}>
      <FilmBackdropHero
        movie={movie}
        onPlay={handlePlayTrailer}
        onAddToWatchlist={handleAddToWatchlist}
      />

      <div className="max-w-[1440px] mx-auto px-8 md:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <SynopsisProgram overview={movie.overview} tagline={movie.tagline} />
            <GoldenDivider />
            <CastArc cast={movie.credits?.cast || []} />
          </div>

          <div>
            <div className="p-6 mt-10" style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: '4px',
            }}>
              <h4 className="font-['Playfair_Display'] text-white text-[16px] font-semibold mb-4">
                Program Notes
              </h4>
              <dl className="space-y-3">
                {movie.release_date && (
                  <div className="flex justify-between">
                    <dt className="text-[#808080] text-[13px]">Released</dt>
                    <dd className="text-white text-[13px]">{movie.release_date}</dd>
                  </div>
                )}
                {movie.runtime && (
                  <div className="flex justify-between">
                    <dt className="text-[#808080] text-[13px]">Runtime</dt>
                    <dd className="text-white text-[13px]">{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</dd>
                  </div>
                )}
                {movie.budget > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-[#808080] text-[13px]">Budget</dt>
                    <dd className="text-white text-[13px]">${(movie.budget / 1_000_000).toFixed(0)}M</dd>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-[#808080] text-[13px]">Box Office</dt>
                    <dd className="text-white text-[13px]">${(movie.revenue / 1_000_000).toFixed(0)}M</dd>
                  </div>
                )}
                {movie.vote_count > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-[#808080] text-[13px]">Votes</dt>
                    <dd className="text-white text-[13px]">{movie.vote_count.toLocaleString()}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        <GoldenDivider />
        <RelatedPlaybills movies={movie.similar?.results || []} />
      </div>

      {trailer && (
        <Modal isOpen={trailerOpen} onClose={() => setTrailerOpen(false)} title="Trailer">
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Modal>
      )}
    </StageLayout>
  )
}
