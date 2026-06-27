'use client'

import StageLayout from '@/components/layout/StageLayout'
import SpotlightHero from '@/components/movies/SpotlightHero'
import CuratedReveal from '@/components/movies/CuratedReveal'
import TheaterCTA from '@/components/movies/TheaterCTA'
import { useTrending, useTopRated, useNowPlaying } from '@/hooks/useMovies'

export default function HomePage() {
  const { movies: trending, loading: trendingLoading } = useTrending('week')
  const { movies: topRated, loading: topRatedLoading } = useTopRated()
  const { movies: nowPlaying, loading: nowPlayingLoading } = useNowPlaying()

  return (
    <StageLayout transparentNav>
      <SpotlightHero movies={trending} loading={trendingLoading} />

      <CuratedReveal
        title="Now Playing"
        subtitle="Currently showing in theaters near you"
        movies={nowPlaying}
        seeAllLink="/browse?filter=now_playing"
        loading={nowPlayingLoading}
      />

      <CuratedReveal
        title="Top Rated"
        subtitle="The greatest films of all time, as voted by our audience"
        movies={topRated}
        seeAllLink="/browse?filter=top_rated"
        loading={topRatedLoading}
      />

      <CuratedReveal
        title="Trending This Week"
        subtitle="What everyone's talking about"
        movies={trending}
        seeAllLink="/browse"
        loading={trendingLoading}
      />

      <TheaterCTA />
    </StageLayout>
  )
}
