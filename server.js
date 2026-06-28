require('dotenv').config()
const express = require('express')
const cors = require('cors')
const supabase = require('./src/config/supabase')
const { fetchFromTMDB, getImageUrl } = require('./src/config/tmdb')

const app = express()
const PORT = process.env.PORT || 10000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'theama-api', timestamp: new Date().toISOString() })
})

app.get('/api/movies/trending', async (req, res) => {
  try {
    const data = await fetchFromTMDB('/trending/movie/week')
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/movies/popular', async (req, res) => {
  try {
    const data = await fetchFromTMDB('/movie/popular')
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/movies/search', async (req, res) => {
  try {
    const { query } = req.query
    if (!query) return res.json([])
    const data = await fetchFromTMDB('/search/movie', { query })
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`[THEAMA API] Running on port ${PORT}`)
})
