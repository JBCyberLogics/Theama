const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

let supabase

try {
  supabase = createClient(supabaseUrl, supabaseKey)
} catch {
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key')
}

module.exports = { supabase }
