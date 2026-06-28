function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${err.message}`)

  if (err?.name === 'AbortError' || err?.message?.includes('aborted')) {
    return res.json([])
  }

  const statusCode = err.statusCode || 500
  const message = err.expose ? err.message : 'Internal server error'

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

module.exports = { errorHandler }
