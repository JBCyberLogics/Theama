export interface Movie {
  id: number
  title: string
  original_title?: string
  overview: string
  tagline?: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  runtime?: number
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: number[]
  genres?: Genre[]
  original_language: string
  adult: boolean
  video: boolean
  media_type?: string
}

export interface Genre {
  id: number
  name: string
}

export interface MovieCredits {
  id: number
  cast: CastMember[]
  crew: CrewMember[]
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
  known_for_department: string
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface MovieVideo {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

export interface MovieImages {
  id: number
  backdrops: ImageAsset[]
  posters: ImageAsset[]
  logos: ImageAsset[]
}

export interface ImageAsset {
  file_path: string
  width: number
  height: number
  aspect_ratio: number
  vote_average: number
  vote_count: number
}

export interface MovieListResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
