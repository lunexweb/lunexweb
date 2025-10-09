import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, Filter, Grid, List } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { PortfolioHero } from '@/components/PortfolioHero'
import { PortfolioCard } from '@/components/PortfolioCard'
import { PortfolioSidebar } from '@/components/PortfolioSidebar'
import { PortfolioProjectWithDetails, PortfolioCategory } from '@/lib/supabase'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Portfolio() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState<PortfolioProjectWithDetails[]>([])
  const [categories, setCategories] = useState<PortfolioCategory[]>([])
  const [featuredProjects, setFeaturedProjects] = useState<PortfolioProjectWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const projectsPerPage = 12

  useEffect(() => {
    loadInitialData()
  }, [])

  useEffect(() => {
    loadProjects()
  }, [selectedCategory, currentPage])

  const loadInitialData = async () => {
    try {
      setLoading(true)
      
      // Load categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('portfolio_categories')
        .select('*')
        .order('name')
      
      // Load featured projects
      const { data: featuredData, error: featuredError } = await supabase
        .from('portfolio_projects')
        .select(`
          *,
          portfolio_categories (
            id,
            name,
            slug,
            color,
            icon
          )
        `)
        .eq('is_featured', true)
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(6)
      
      if (categoriesError) console.error('Categories error:', categoriesError)
      if (featuredError) console.error('Featured projects error:', featuredError)
      
      setCategories(categoriesData || [])
      setFeaturedProjects(featuredData || [])
    } catch (error) {
      console.error('Error loading initial data:', error)
      // Set empty arrays to prevent crashes
      setCategories([])
      setFeaturedProjects([])
    } finally {
      setLoading(false)
    }
  }

  const loadProjects = async () => {
    try {
      const offset = (currentPage - 1) * projectsPerPage
      
      let query = supabase
        .from('portfolio_projects')
        .select(`
          *,
          portfolio_categories (
            id,
            name,
            slug,
            color,
            icon
          )
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + projectsPerPage - 1)
      
      if (selectedCategory) {
        const categoryId = categories.find(cat => cat.slug === selectedCategory)?.id
        if (categoryId) {
          query = query.eq('category_id', categoryId)
        }
      }
      
      const { data: projectsData, error } = await query
      
      if (error) {
        console.error('Projects loading error:', error)
        if (currentPage === 1) {
          setProjects([])
        }
        setHasMore(false)
        return
      }
      
      if (currentPage === 1) {
        setProjects(projectsData || [])
      } else {
        setProjects(prev => [...prev, ...(projectsData || [])])
      }
      
      setHasMore((projectsData || []).length === projectsPerPage)
    } catch (error) {
      console.error('Error loading projects:', error)
      // Set empty array to prevent crashes
      if (currentPage === 1) {
        setProjects([])
      }
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  const handleCategorySelect = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug)
    setCurrentPage(1)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Implement search functionality
    // For now, we'll filter locally
  }

  const handleViewProject = (slug: string) => {
    navigate(`/portfolio/${slug}`)
  }

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const filteredProjects = projects.filter(project => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      project.title.toLowerCase().includes(query) ||
      project.subtitle?.toLowerCase().includes(query) ||
      project.client_name?.toLowerCase().includes(query) ||
      project.technologies?.some(tech => tech.toLowerCase().includes(query))
    )
  })

  const recentProjects = [...projects].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ).slice(0, 3)

  const popularProjects = [...projects].sort((a, b) => b.view_count - a.view_count).slice(0, 3)

  if (loading && projects.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Hero Section */}
      <PortfolioHero featuredProject={featuredProjects[0]} />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:order-2">
              <PortfolioSidebar
                categories={categories}
                recentProjects={recentProjects}
                popularProjects={popularProjects}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
                onSearch={handleSearch}
                searchQuery={searchQuery}
              />
            </div>

            {/* Main Content */}
            <div className="lg:order-1 flex-1">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedCategory ? 
                      categories.find(cat => cat.slug === selectedCategory)?.name || 'Projects' :
                      'All Projects'
                    }
                  </h2>
                  <p className="text-gray-600">
                    {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                {/* View Controls */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden mb-6 p-4 bg-white rounded-lg border border-gray-200"
                >
                  <PortfolioSidebar
                    categories={categories}
                    recentProjects={recentProjects}
                    popularProjects={popularProjects}
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategorySelect}
                    onSearch={handleSearch}
                    searchQuery={searchQuery}
                  />
                </motion.div>
              )}

              {/* Active Filters */}
              {(selectedCategory || searchQuery) && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory && (
                      <Badge 
                        variant="secondary" 
                        className="bg-green-100 text-green-800"
                      >
                        {categories.find(cat => cat.slug === selectedCategory)?.name}
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className="ml-2 hover:text-green-600"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    {searchQuery && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Search: "{searchQuery}"
                        <button
                          onClick={() => setSearchQuery('')}
                          className="ml-2 hover:text-blue-600"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Projects Grid */}
              {filteredProjects.length > 0 ? (
                <>
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {filteredProjects.map((project, index) => (
                      <PortfolioCard
                        key={project.id}
                        project={project}
                        index={index}
                        onViewProject={handleViewProject}
                      />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMore && (
                    <div className="text-center mt-12">
                      <Button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          'Load More Projects'
                        )}
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">💻</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery || selectedCategory 
                      ? 'Try adjusting your search or filters'
                      : 'No projects have been published yet'
                    }
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory(null)
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
