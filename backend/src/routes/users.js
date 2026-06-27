const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const { supabase } = require('../config/database')

router.use(authenticate)

router.get('/me', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single()
    if (error) return res.status(400).json({ error: error.message })
    res.json(data)
  } catch (err) { next(err) }
})

router.put('/me', async (req, res, next) => {
  try {
    const { full_name, username, bio, avatar_url, preferred_genres } = req.body
    const updates = {}
    if (full_name !== undefined) updates.full_name = full_name
    if (username !== undefined) updates.username = username
    if (bio !== undefined) updates.bio = bio
    if (avatar_url !== undefined) updates.avatar_url = avatar_url
    if (preferred_genres !== undefined) updates.preferred_genres = preferred_genres

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', req.user.id)
      .select()
      .single()
    if (error) return res.status(400).json({ error: error.message })
    res.json(data)
  } catch (err) { next(err) }
})

router.get('/me/stats', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .rpc('get_user_stats', { user_id: req.user.id })
    if (error) return res.status(400).json({ error: error.message })
    res.json(data?.[0] || { watchlist_count: 0, ratings_count: 0, avg_rating: 0, collections_count: 0, viewing_history_count: 0 })
  } catch (err) { next(err) }
})

module.exports = router
