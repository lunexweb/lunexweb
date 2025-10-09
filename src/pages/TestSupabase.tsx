import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function TestSupabase() {
  const [status, setStatus] = useState('Connecting...')
  const [details, setDetails] = useState<string>('')

  useEffect(() => {
    async function testConnection() {
      try {
        // Test all main tables
        const [leadsResult, portfolioResult, blogsResult, usersResult] = await Promise.all([
          supabase.from('leads').select('*').limit(1),
          supabase.from('portfolio_projects').select('*').limit(1),
          supabase.from('blog_posts').select('*').limit(1),
          supabase.from('users').select('*').limit(1)
        ])

        const errors = []
        if (leadsResult.error) errors.push(`Leads: ${leadsResult.error.message}`)
        if (portfolioResult.error) errors.push(`Portfolio: ${portfolioResult.error.message}`)
        if (blogsResult.error) errors.push(`Blogs: ${blogsResult.error.message}`)
        if (usersResult.error) errors.push(`Users: ${usersResult.error.message}`)

        if (errors.length > 0) {
          throw new Error(`Table errors: ${errors.join(', ')}`)
        }

        const results = {
          leads: leadsResult.data?.length || 0,
          portfolio: portfolioResult.data?.length || 0,
          blogs: blogsResult.data?.length || 0,
          users: usersResult.data?.length || 0
        }

        setStatus('✅ Supabase connection and tables working!')
        setDetails(`Tables tested: Leads (${results.leads}), Portfolio (${results.portfolio}), Blogs (${results.blogs}), Users (${results.users})`)
      } catch (err: any) {
        console.error(err)
        setStatus('❌ Supabase connection failed')
        setDetails(err.message || 'Unknown error occurred')
      }
    }
    testConnection()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-8">
      <div className="text-2xl font-bold mb-4">{status}</div>
      {details && (
        <div className="text-lg text-gray-600 max-w-2xl">
          {details}
        </div>
      )}
    </div>
  )
}
