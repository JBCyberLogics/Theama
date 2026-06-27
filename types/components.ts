import { Movie } from './movie'
import { WatchlistItem, Collection, UserRating } from './user'

export interface SpotlightHeroProps {
  movies: Movie[]
  autoCycle?: boolean
  cycleInterval?: number
}

export interface PlaybillCardProps {
  movie: Movie
  index?: number
  inWatchlist?: boolean
  watched?: boolean
  layout?: 'grid' | 'list'
}

export interface PlaybillGridProps {
  movies: Movie[]
  columns?: number
  loading?: boolean
  emptyMessage?: string
  onLoadMore?: () => void
  hasMore?: boolean
  loadingMore?: boolean
}

export interface CuratedRevealProps {
  title: string
  subtitle?: string
  movies: Movie[]
  seeAllLink?: string
  loading?: boolean
}

export interface GenreFilterBarProps {
  genres: { id: number; name: string }[]
  activeGenre: number | null
  onGenreChange: (genreId: number | null) => void
}

export interface TicketAuthCardProps {
  mode: 'sign_in' | 'sign_up' | 'forgot_password'
  loading?: boolean
  error?: string | null
  onSubmit: (data: Record<string, string>) => Promise<void>
  onSocialAuth?: (provider: string) => Promise<void>
}

export interface TheaterNavbarProps {
  transparent?: boolean
}

export interface TheaterSidebarProps {
  items?: SidebarItem[]
  activeItem?: string
}

export interface SidebarItem {
  icon: string
  label: string
  href: string
}

export interface AdmitButtonProps {
  children: React.ReactNode
  variant?: 'solid' | 'outline' | 'ghost'
  loading?: boolean
  disabled?: boolean
  success?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  fullWidth?: boolean
  size?: 'default' | 'large'
}

export interface TheaterInputProps {
  label: string
  id: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  icon?: string
  showToggle?: boolean
  required?: boolean
}

export interface RoseRatingProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (value: number) => void
}

export interface EmptyStateProps {
  type: 'watchlist' | 'search' | 'ratings' | 'collections' | 'error' | 'offline'
  ctaHref?: string
  onRetry?: () => void
}

export interface LoadingSkeletonProps {
  type?: 'card' | 'text' | 'hero' | 'circle'
  count?: number
}

export interface FilmBackdropHeroProps {
  movie: Movie
  onPlay?: () => void
  onAddToWatchlist?: () => void
}
