const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p'

export type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original'
export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original'
export type ProfileSize = 'w45' | 'w185' | 'h632' | 'original'
export type LogoSizes = 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original'

export function getPosterUrl(path: string | null, size: PosterSize = 'w342'): string | null {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}

export function getBackdropUrl(path: string | null, size: BackdropSize = 'w1280'): string | null {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}

export function getProfileUrl(path: string | null, size: ProfileSize = 'w185'): string | null {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}

export function getLogoUrl(path: string | null, size: LogoSizes = 'w185'): string | null {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}

export function getBackdropFallback(path: string | null): string {
  return path
    ? `https://image.tmdb.org/t/p/w1280${path}`
    : '/assets/images/empty-states/empty-backdrop.svg'
}

export function getPosterFallback(path: string | null): string {
  return path
    ? `https://image.tmdb.org/t/p/w342${path}`
    : '/assets/images/empty-states/empty-poster.svg'
}
