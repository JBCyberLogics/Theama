const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ''

let supabase

try {
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
    global: {
      fetch: (url, options = {}) => {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 5000)
        return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timeout))
      },
    },
  })
} catch {
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key')
}

module.exports = { supabase }
