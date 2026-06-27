const express = require('express')
const router = express.Router()
const { supabase } = require('../config/database')

router.post('/sign-up', async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } },
    })
    if (error) return res.status(400).json({ error: error.message })
    res.status(201).json({ user: data.user, session: data.session })
  } catch (err) { next(err) }
})

router.post('/sign-in', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return res.status(401).json({ error: error.message })
    res.json({ user: data.user, session: data.session })
  } catch (err) { next(err) }
})

router.post('/sign-out', async (req, res, next) => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) return res.status(400).json({ error: error.message })
    res.json({ message: 'Signed out successfully' })
  } catch (err) { next(err) }
})

router.post('/reset-password', async (req, res, next) => {
  try {
    const { email, redirectTo } = req.body
    if (!email) return res.status(400).json({ error: 'Email is required' })
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo || `${req.protocol}://${req.get('host')}/auth/callback`,
    })
    if (error) return res.status(400).json({ error: error.message })
    res.json({ message: 'Password reset email sent' })
  } catch (err) { next(err) }
})

router.get('/session', async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Not authenticated' })
    }
    const token = authHeader.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) return res.status(401).json({ error: 'Invalid token' })
    res.json({ user })
  } catch (err) { next(err) }
})

module.exports = router
