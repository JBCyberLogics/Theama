const TMDB_API_KEY = process.env.TMDB_API_KEY || ''
const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3'

async function tmdbFetch(endpoint, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', TMDB_API_KEY)
  url.searchParams.set('language', 'en-US')

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value))
    }
  })

  const response = await fetch(url.toString())

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.status_message || `TMDB API error: ${response.status}`)
  }

  return response.json()
}

module.exports = { tmdbFetch, TMDB_API_KEY, TMDB_BASE_URL }
