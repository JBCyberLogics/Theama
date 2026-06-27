export interface ApiError {
  message: string
  status: number
  code?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  total_pages: number
  total: number
  has_more: boolean
}

export interface ApiResponse<T> {
  data: T | null
  error: ApiError | null
  loading: boolean
}

export type SortOption = 'popularity' | 'vote_average' | 'release_date' | 'title'
export type SortOrder = 'asc' | 'desc'
export type TimeWindow = 'day' | 'week'
