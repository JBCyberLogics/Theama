const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const { supabase } = require('../config/database')

router.use(authenticate)

router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('ratings')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
    if (error) return res.status(400).json({ error: error.message })
    res.json(data)
  } catch (err) { next(err) }
})

router.post('/', async (req, res, next) => {
  try {
    const { movie_id, movie_title, poster_path, rating, review } = req.body
    if (!movie_id || !rating) {
      return res.status(400).json({ error: 'movie_id and rating are required' })
    }
    if (rating < 1 || rating > 10) {
      return res.status(400).json({ error: 'Rating must be between 1 and 10' })
    }
    const { data, error } = await supabase.from('ratings').upsert({
      user_id: req.user.id,
      movie_id, movie_title, poster_path,
      rating, review,
    }, { onConflict: 'user_id,movie_id' }).select().single()
    if (error) return res.status(400).json({ error: error.message })
    res.status(201).json(data)
  } catch (err) { next(err) }
})

router.delete('/:movieId', async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('ratings')
      .delete()
      .eq('user_id', req.user.id)
      .eq('movie_id', req.params.movieId)
    if (error) return res.status(400).json({ error: error.message })
    res.json({ message: 'Rating removed' })
  } catch (err) { next(err) }
})

module.exports = router
