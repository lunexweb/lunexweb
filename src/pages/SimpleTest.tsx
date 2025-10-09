const SimpleTest = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ✅ App is Working!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          If you can see this page, the React app is loading correctly.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Environment Check:</h2>
          <div className="space-y-2 text-left">
            <div>
              <strong>VITE_SUPABASE_URL:</strong> 
              <span className="ml-2 text-green-600">
                {import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Not Set'}
              </span>
            </div>
            <div>
              <strong>VITE_SUPABASE_ANON_KEY:</strong> 
              <span className="ml-2 text-green-600">
                {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not Set'}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <a 
              href="/test-supabase" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Test Supabase Connection
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleTest
