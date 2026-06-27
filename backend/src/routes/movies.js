const express = require('express')
const router = express.Router()
const { tmdbFetch } = require('../config/tmdb')

router.get('/trending', async (req, res, next) => {
  try {
    const timeWindow = req.query.time_window || 'week'
    const data = await tmdbFetch(`/trending/movie/${timeWindow}`)
    res.json(data)
  } catch (err) { next(err) }
})

router.get('/now-playing', async (req, res, next) => {
  try {
    const data = await tmdbFetch('/movie/now_playing', { page: req.query.page || 1 })
    res.json(data)
  } catch (err) { next(err) }
})

router.get('/top-rated', async (req, res, next) => {
  try {
    const data = await tmdbFetch('/movie/top_rated', { page: req.query.page || 1 })
    res.json(data)
  } catch (err) { next(err) }
})

router.get('/upcoming', async (req, res, next) => {
  try {
    const data = await tmdbFetch('/movie/upcoming', { page: req.query.page || 1 })
    res.json(data)
  } catch (err) { next(err) }
})

router.get('/discover', async (req, res, next) => {
  try {
    const params = { page: req.query.page || 1 }
    if (req.query.sort_by) params.sort_by = req.query.sort_by
    if (req.query.with_genres) params.with_genres = req.query.with_genres
    if (req.query['vote_count.gte']) params['vote_count.gte'] = req.query['vote_count.gte']
    const data = await tmdbFetch('/discover/movie', params)
    res.json(data)
  } catch (err) { next(err) }
})

router.get('/search', async (req, res, next) => {
  try {
    const query = req.query.query
    if (!query) return res.status(400).json({ error: 'Query parameter is required' })
    const data = await tmdbFetch('/search/movie', {
      query,
      page: req.query.page || 1,
    })
    res.json(data)
  } catch (err) { next(err) }
})

router.get('/genres', async (req, res, next) => {
  try {
    const data = await tmdbFetch('/genre/movie/list')
    res.json(data)
  } catch (err) { next(err) }
})

router.get('/:movieId', async (req, res, next) => {
  try {
    const append = req.query.append_to_response || 'credits,videos,similar'
    const data = await tmdbFetch(`/movie/${req.params.movieId}`, {
      append_to_response: append,
    })
    res.json(data)
  } catch (err) { next(err) }
})

module.exports = router
