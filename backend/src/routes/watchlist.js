const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const { supabase } = require('../config/database')

router.use(authenticate)

router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('watchlists')
      .select('*')
      .eq('user_id', req.user.id)
      .order('added_at', { ascending: false })
    if (error) return res.status(400).json({ error: error.message })
    res.json(data)
  } catch (err) { next(err) }
})

router.post('/', async (req, res, next) => {
  try {
    const { movie_id, movie_title, poster_path, backdrop_path, tmdb_rating, release_date, genres } = req.body
    if (!movie_id || !movie_title) {
      return res.status(400).json({ error: 'movie_id and movie_title are required' })
    }
    const { data, error } = await supabase.from('watchlists').insert({
      user_id: req.user.id,
      movie_id, movie_title, poster_path, backdrop_path,
      tmdb_rating, release_date, genres,
    }).select().single()
    if (error) return res.status(400).json({ error: error.message })
    res.status(201).json(data)
  } catch (err) { next(err) }
})

router.delete('/:movieId', async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('watchlists')
      .delete()
      .eq('user_id', req.user.id)
      .eq('movie_id', req.params.movieId)
    if (error) return res.status(400).json({ error: error.message })
    res.json({ message: 'Removed from watchlist' })
  } catch (err) { next(err) }
})

router.patch('/:movieId', async (req, res, next) => {
  try {
    const { watched, tmdb_rating } = req.body
    const updates = {}
    if (watched !== undefined) updates.watched = watched
    if (tmdb_rating !== undefined) updates.tmdb_rating = tmdb_rating

    const { data, error } = await supabase
      .from('watchlists')
      .update(updates)
      .eq('user_id', req.user.id)
      .eq('movie_id', req.params.movieId)
      .select().single()
    if (error) return res.status(400).json({ error: error.message })
    res.json(data)
  } catch (err) { next(err) }
})

router.get('/check/:movieId', async (req, res, next) => {
  try {
    const { data } = await supabase
      .from('watchlists')
      .select('id')
      .eq('user_id', req.user.id)
      .eq('movie_id', req.params.movieId)
      .maybeSingle()
    res.json({ inWatchlist: !!data })
  } catch (err) { next(err) }
})

module.exports = router
