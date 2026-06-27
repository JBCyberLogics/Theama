export interface UserProfile {
  id: string
  full_name: string
  avatar_url: string | null
  bio: string | null
  favorite_genres: number[] | null
  notification_preferences: NotificationPreferences
  created_at: string
  updated_at: string
}

export interface NotificationPreferences {
  new_releases: boolean
  recommendations: boolean
  newsletter: boolean
}

export interface WatchlistItem {
  id: string
  user_id: string
  movie_id: number
  movie_title: string
  poster_path: string | null
  backdrop_path: string | null
  tmdb_rating: number | null
  release_date: string | null
  genres: number[] | null
  added_at: string
  watched: boolean
  watched_at: string | null
  user_notes: string | null
  is_favorite: boolean
}

export interface UserRating {
  id: string
  user_id: string
  movie_id: number
  movie_title: string
  poster_path: string | null
  score: number
  review: string | null
  contains_spoilers: boolean
  created_at: string
  updated_at: string
}

export interface ViewingHistoryItem {
  id: string
  user_id: string
  movie_id: number
  viewed_at: string
  view_count: number
  last_viewed_at: string
}

export interface Collection {
  id: string
  user_id: string
  name: string
  description: string | null
  is_public: boolean
  cover_movie_id: number | null
  created_at: string
  updated_at: string
  items?: CollectionItem[]
  _count?: { items: number }
}

export interface CollectionItem {
  id: string
  collection_id: string
  movie_id: number
  movie_title: string
  poster_path: string | null
  added_at: string
  sort_order: number
}

export interface UserStats {
  total_watchlist: number
  total_watched: number
  total_ratings: number
  avg_rating: number | null
  total_collections: number
}
