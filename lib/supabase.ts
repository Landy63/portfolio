import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

try {
  new URL(supabaseUrl)
} catch (error) {
  console.error("Invalid Supabase URL:", supabaseUrl)
  throw new Error("Invalid Supabase URL")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Export a function to get the Supabase instance (useful for dependency injection in tests)
export const getSupabase = () => supabase

