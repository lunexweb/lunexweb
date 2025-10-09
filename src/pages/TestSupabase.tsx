import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react'

export default function TestSupabase() {
  const [status, setStatus] = useState('Connecting...')

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from('profiles').select('*').limit(1)
        if (error) throw error
        setStatus('✅ Connected to Supabase')
      } catch (err) {
        console.error(err)
        setStatus('❌ Failed to connect to Supabase')
      }
    }
    testConnection()
  }, [])

  return (
    <div className="flex items-center justify-center h-screen text-2xl font-bold">
      {status}
    </div>
  )
}
