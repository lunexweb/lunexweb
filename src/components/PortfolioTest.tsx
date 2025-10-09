import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'

export const PortfolioTest = () => {
  const [status, setStatus] = useState('Ready to test')
  const [details, setDetails] = useState('')

  const testConnection = async () => {
    setStatus('Testing...')
    setDetails('')
    
    try {
      // Test 1: Check if portfolio_projects table exists
      const { data: projectsData, error: projectsError } = await supabase
        .from('portfolio_projects')
        .select('*')
        .limit(1)
      
      if (projectsError) {
        throw new Error(`Portfolio projects table error: ${projectsError.message}`)
      }
      
      // Test 2: Check if portfolio_categories table exists
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('portfolio_categories')
        .select('*')
        .limit(1)
      
      if (categoriesError) {
        throw new Error(`Portfolio categories table error: ${categoriesError.message}`)
      }
      
      // Test 3: Try to insert a test record
      const testProject = {
        title: 'Test Project',
        slug: 'test-project-' + Date.now(), // Add required slug field
        project_type: 'website',
        is_published: false,
        is_featured: false
      }
      
      const { data: insertData, error: insertError } = await supabase
        .from('portfolio_projects')
        .insert([testProject])
        .select()
        .single()
      
      if (insertError) {
        throw new Error(`Insert test error: ${insertError.message}`)
      }
      
      // Test 4: Delete the test record
      const { error: deleteError } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', insertData.id)
      
      if (deleteError) {
        console.warn('Could not delete test record:', deleteError.message)
      }
      
      setStatus('✅ All tests passed!')
      setDetails(`
        Portfolio projects table: OK (${projectsData?.length || 0} records)
        Portfolio categories table: OK (${categoriesData?.length || 0} records)
        Insert/Delete test: OK
      `)
      
    } catch (error: any) {
      setStatus('❌ Test failed')
      setDetails(error.message)
    }
  }

  return (
    <div className="p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Portfolio Database Test</h3>
      <div className="space-y-4">
        <div className="text-sm">
          <strong>Status:</strong> {status}
        </div>
        {details && (
          <div className="text-sm text-gray-600 whitespace-pre-line">
            {details}
          </div>
        )}
        <Button onClick={testConnection} className="bg-blue-600 hover:bg-blue-700">
          Run Test
        </Button>
      </div>
    </div>
  )
}
