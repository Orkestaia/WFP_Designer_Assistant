import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Production debugging
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase env vars missing!', {
        urlExists: !!supabaseUrl,
        keyExists: !!supabaseAnonKey,
        url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'undefined',
        env: process.env.NODE_ENV
    })
    throw new Error('Missing Supabase environment variables')
}

console.log('✅ Supabase initialized:', {
    url: `${supabaseUrl.substring(0, 30)}...`,
    env: process.env.NODE_ENV
})

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
