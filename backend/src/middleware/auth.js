const { supabase } = require('../config/database')

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    req.user = user
    next()
  } catch {
    return res.status(401).json({ error: 'Authentication failed' })
  }
}

async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    req.user = null
    return next()
  }

  const token = authHeader.split(' ')[1]

  try {
    const { data: { user } } = await supabase.auth.getUser(token)
    req.user = user || null
  } catch {
    req.user = null
  }

  next()
}

module.exports = { authenticate, optionalAuth }
