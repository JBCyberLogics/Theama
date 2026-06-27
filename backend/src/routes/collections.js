const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const { supabase } = require('../config/database')

router.use(authenticate)

router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('*, collection_items(*)')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
    if (error) return res.status(400).json({ error: error.message })
    res.json(data)
  } catch (err) { next(err) }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, description, is_public } = req.body
    if (!name) return res.status(400).json({ error: 'Collection name is required' })
    const { data, error } = await supabase.from('collections').insert({
      user_id: req.user.id, name, description, is_public,
    }).select().single()
    if (error) return res.status(400).json({ error: error.message })
    res.status(201).json(data)
  } catch (err) { next(err) }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { name, description, is_public } = req.body
    const { data, error } = await supabase
      .from('collections')
      .update({ name, description, is_public })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select().single()
    if (error) return res.status(400).json({ error: error.message })
    res.json(data)
  } catch (err) { next(err) }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await supabase.from('collection_items').delete().eq('collection_id', req.params.id)
    const { error } = await supabase
      .from('collections')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
    if (error) return res.status(400).json({ error: error.message })
    res.json({ message: 'Collection deleted' })
  } catch (err) { next(err) }
})

router.get('/:id/items', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('collection_items')
      .select('*')
      .eq('collection_id', req.params.id)
      .order('added_at', { ascending: false })
    if (error) return res.status(400).json({ error: error.message })
    res.json(data)
  } catch (err) { next(err) }
})

router.post('/:id/items', async (req, res, next) => {
  try {
    const { movie_id, movie_title, poster_path } = req.body
    if (!movie_id || !movie_title) {
      return res.status(400).json({ error: 'movie_id and movie_title are required' })
    }
    const { data, error } = await supabase.from('collection_items').insert({
      collection_id: req.params.id,
      movie_id, movie_title, poster_path,
    }).select().single()
    if (error) return res.status(400).json({ error: error.message })
    res.status(201).json(data)
  } catch (err) { next(err) }
})

router.delete('/:id/items/:movieId', async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('collection_items')
      .delete()
      .eq('collection_id', req.params.id)
      .eq('movie_id', req.params.movieId)
    if (error) return res.status(400).json({ error: error.message })
    res.json({ message: 'Item removed from collection' })
  } catch (err) { next(err) }
})

module.exports = router
