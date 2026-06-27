require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const movieRoutes = require('./routes/movies')
const watchlistRoutes = require('./routes/watchlist')
const ratingRoutes = require('./routes/ratings')
const collectionRoutes = require('./routes/collections')
const userRoutes = require('./routes/users')
const { errorHandler } = require('./middleware/errorHandler')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'theama-api', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/watchlist', watchlistRoutes)
app.use('/api/ratings', ratingRoutes)
app.use('/api/collections', collectionRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`[THEAMA API] Running on port ${PORT}`)
})
