import { createClient } from '@supabase/supabase-js'

// Fallback values in case environment variables aren't loaded
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://slkdiwvawagzwmeyldcu.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsa2Rpd3Zhd2FnendtZXlsZGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4Njc5MjUsImV4cCI6MjA3NTQ0MzkyNX0.fLNbMHvbcKkzKb5VG_tG2QTaVqzQd_f0sEpmUT961v8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
