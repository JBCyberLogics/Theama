import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let supabase: ReturnType<typeof createBrowserClient>

try {
  supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
} catch {
  supabase = createBrowserClient(
    'https://placeholder.supabase.co',
    'placeholder-key'
  )
}

export { supabase }
