import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, Search, Calendar, User, Eye, ArrowRight, Tag, Clock } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { db } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface BlogPost {
  id: string
  title: string
  slug: string
  subtitle?: string
  content: string
  excerpt?: string
  featured_image_url?: string
  category_id?: string
  author_name?: string
  author_email?: string
  author_avatar_url?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string[]
  tags?: string[]
  status: string
  is_featured: boolean
  is_pinned: boolean
  view_count: number
  like_count: number
  comment_count: number
  reading_time?: number
  published_at?: string
  created_at: string
  updated_at: string
  category?: {
    name: string
    slug: string
    color: string
    icon: string
  }
}

interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  icon?: string
  sort_order: number
  is_active: boolean
}

export default function Blog() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const postsPerPage = 12

  useEffect(() => {
    loadInitialData()
  }, [])

  useEffect(() => {
    loadPosts()
  }, [selectedCategory, currentPage])

  const loadInitialData = async () => {
    try {
      setLoading(true)

      // Load categories
      const categoriesData = await db.getBlogCategories()

      // Load featured posts
      const featuredData = await db.getFeaturedBlogPosts(3)

      setCategories(categoriesData || [])
      setFeaturedPosts(featuredData || [])
    } catch (error) {
      console.error('Error loading initial data:', error)
      setCategories([])
      setFeaturedPosts([])
    } finally {
      setLoading(false)
    }
  }

  const loadPosts = async () => {
    try {
      let query = {
        status: 'published',
        limit: postsPerPage,
        offset: (currentPage - 1) * postsPerPage
      }

      if (selectedCategory) {
        const categoryId = categories.find(cat => cat.slug === selectedCategory)?.id
        if (categoryId) {
          query.category_id = categoryId
        }
      }

      const postsData = await db.getBlogPosts(query)

      if (currentPage === 1) {
        setPosts(postsData || [])
      } else {
        setPosts(prev => [...prev, ...(postsData || [])])
      }

      setHasMore((postsData || []).length === postsPerPage)
    } catch (error) {
      console.error('Error loading posts:', error)
      if (currentPage === 1) {
        setPosts([])
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
    setCurrentPage(1)
  }

  const handleViewPost = (slug: string) => {
    console.log('Navigating to blog post:', slug)
    navigate(`/blog/${slug}`)
  }

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatReadingTime = (minutes?: number) => {
    return minutes ? `${minutes} min read` : '5 min read'
  }

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  const recentPosts = posts.slice(0, 5)
  const popularPosts = [...posts].sort((a, b) => b.view_count - a.view_count).slice(0, 5)

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dnnwvmh3n/image/upload/v1760132764/ian-schneider-TamMbr4okv4-unsplash_bihwp7.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Our Blog
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Insights, tips, and stories about web development, business, and technology
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300 focus:bg-white/20"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Articles</h2>
                <p className="text-gray-600">Handpicked content you don't want to miss</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group"
                          onClick={() => handleViewPost(post.slug)}>
                      <CardContent className="p-0">
                        {post.featured_image_url && (
                          <div className="relative h-48 overflow-hidden rounded-t-lg">
                            <img
                              src={post.featured_image_url}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-yellow-500 text-white">Featured</Badge>
                            </div>
                          </div>
                        )}
                        
                        <div className="p-6">
                          {post.category && (
                            <div className="flex items-center gap-2 mb-3">
                              <Tag className="w-4 h-4 text-gray-400" />
                              <Badge 
                                variant="outline" 
                                style={{ borderColor: post.category.color, color: post.category.color }}
                              >
                                {post.category.name}
                              </Badge>
                            </div>
                          )}
                          
                          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                            {post.title}
                          </h3>
                          
                          {post.subtitle && (
                            <p className="text-gray-600 mb-4">{post.subtitle}</p>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {post.author_name}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(post.published_at || post.created_at)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {formatReadingTime(post.reading_time)}
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            className="w-full group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewPost(post.slug)
                            }}
                          >
                            Read More
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="space-y-8">
                {/* Categories */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleCategorySelect(null)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCategory === null 
                            ? 'bg-green-100 text-green-700' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        All Posts
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.slug)}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            selectedCategory === category.slug 
                              ? 'bg-green-100 text-green-700' 
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: category.color }}
                            />
                            {category.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Posts */}
                {recentPosts.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
                      <div className="space-y-4">
                        {recentPosts.map((post) => (
                          <div 
                            key={post.id} 
                            className="cursor-pointer group"
                            onClick={() => handleViewPost(post.slug)}
                          >
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors mb-1">
                              {post.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {formatDate(post.published_at || post.created_at)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Popular Posts */}
                {popularPosts.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Posts</h3>
                      <div className="space-y-4">
                        {popularPosts.map((post) => (
                          <div 
                            key={post.id} 
                            className="cursor-pointer group"
                            onClick={() => handleViewPost(post.slug)}
                          >
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors mb-1">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Eye className="w-3 h-3" />
                              {post.view_count} views
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Active Filters */}
              {(searchQuery || selectedCategory) && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <Badge variant="secondary" className="gap-2">
                        Search: "{searchQuery}"
                        <button 
                          onClick={() => handleSearch('')}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    {selectedCategory && (
                      <Badge variant="secondary" className="gap-2">
                        Category: {categories.find(c => c.slug === selectedCategory)?.name}
                        <button 
                          onClick={() => handleCategorySelect(null)}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                  </div>
                </div>
              )}

                {/* Posts Grid */}
              {filteredPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group"
                              onClick={() => handleViewPost(post.slug)}>
                          <CardContent className="p-0">
                            {post.featured_image_url && (
                              <div className="relative h-48 overflow-hidden rounded-t-lg">
                                <img
                                  src={post.featured_image_url}
                                  alt={post.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {post.is_featured && (
                                  <div className="absolute top-4 left-4">
                                    <Badge className="bg-yellow-500 text-white">Featured</Badge>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            <div className="p-6">
                              {post.category && (
                                <div className="flex items-center gap-2 mb-3">
                                  <Tag className="w-4 h-4 text-gray-400" />
                                  <Badge 
                                    variant="outline" 
                                    style={{ borderColor: post.category.color, color: post.category.color }}
                                  >
                                    {post.category.name}
                                  </Badge>
                                </div>
                              )}
                              
                              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                                {post.title}
                              </h3>
                              
                              {post.subtitle && (
                                <p className="text-gray-600 mb-4">{post.subtitle}</p>
                              )}
                              
                              {post.excerpt && (
                                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                              )}
                              
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {post.author_name}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(post.published_at || post.created_at)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {formatReadingTime(post.reading_time)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {post.view_count}
                                </div>
                              </div>
                              
                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-4">
                                  {post.tags.slice(0, 3).map((tag, tagIndex) => (
                                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {post.tags.length > 3 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{post.tags.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              )}
                              
                              <Button 
                                variant="outline" 
                                className="w-full group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleViewPost(post.slug)
                                }}
                              >
                                Read More
                                <ArrowRight className="ml-2 w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
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
                          'Load More Posts'
                      )}
                    </Button>
                  </div>
                )}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery || selectedCategory
                      ? 'Try adjusting your search or filters'
                      : 'No blog posts have been published yet'
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