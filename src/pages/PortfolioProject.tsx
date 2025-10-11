import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Share2,
  Eye,
  MessageCircle
} from 'lucide-react'
import { PortfolioProjectWithDetails, PortfolioProjectWithDetails as Project, db } from '@/lib/supabase'
import { PortfolioSidebar } from '@/components/PortfolioSidebar'
import { PortfolioCategory } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function PortfolioProject() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<PortfolioProjectWithDetails | null>(null)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<PortfolioCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (slug) {
      loadProject(slug)
    }
  }, [slug])

  const loadProject = async (projectSlug: string) => {
    try {
      setLoading(true)
      const [projectData, categoriesData] = await Promise.all([
        db.getPortfolioProjectBySlug(projectSlug),
        db.getPortfolioCategories()
      ])
      
      setProject(projectData)
      setCategories(categoriesData)
      
      // Load related projects
      const related = await db.getPortfolioProjects({
        category_id: projectData.category_id,
        limit: 3
      })
      setRelatedProjects(related.filter(p => p.slug !== projectSlug))

      // Track view
      await db.incrementPortfolioView(projectData.id, {
        ip_address: undefined, // Will be handled by Supabase
        user_agent: navigator.userAgent,
        referrer: document.referrer
      })
    } catch (error) {
      console.error('Error loading project:', error)
      navigate('/portfolio')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }

  const formatDuration = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return null
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `${diffDays} days`
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.title,
          text: project?.short_description,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  const nextImage = () => {
    if (project?.gallery_images && project.gallery_images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === project.gallery_images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (project?.gallery_images && project.gallery_images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.gallery_images.length - 1 : prev - 1
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Button onClick={() => navigate('/portfolio')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => navigate('/portfolio')}
                className="text-gray-500 hover:text-gray-700"
              >
                Portfolio
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{project.title}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Project Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Project Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      {project.category_name && (
                        <Badge 
                          variant="outline"
                          style={{ borderColor: project.category_color, color: project.category_color }}
                        >
                          {project.category_name}
                        </Badge>
                      )}
                      {project.is_featured && (
                        <Badge className="bg-yellow-500 text-white">Featured</Badge>
                      )}
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      {project.title}
                    </h1>

                    {project.subtitle && (
                      <p className="text-xl text-gray-600 mb-6">
                        {project.subtitle}
                      </p>
                    )}

                    {/* Project Meta */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {project.client_name && (
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Client</p>
                            <p className="font-medium text-gray-900">{project.client_name}</p>
                          </div>
                        </div>
                      )}
                      {project.project_end_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Completed</p>
                            <p className="font-medium text-gray-900">{formatDate(project.project_end_date)}</p>
                          </div>
                        </div>
                      )}
                      {project.timeline && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Timeline</p>
                            <p className="font-medium text-gray-900">{project.timeline}</p>
                          </div>
                        </div>
                      )}
                      {project.view_count > 0 && (
                        <div className="flex items-center gap-2">
                          <Eye className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Views</p>
                            <p className="font-medium text-gray-900">{project.view_count}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      {project.project_url && (
                        <Button
                          onClick={() => window.open(project.project_url, '_blank')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live Site
                        </Button>
                      )}
                      {project.github_url && (
                        <Button
                          variant="outline"
                          onClick={() => window.open(project.github_url, '_blank')}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        onClick={handleShare}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Client Logo */}
                  {project.client_logo_url && (
                    <div className="lg:w-32 flex-shrink-0">
                      <img
                        src={project.client_logo_url}
                        alt={`${project.client_name} logo`}
                        className="w-full h-32 object-contain"
                      />
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Featured Image */}
              {project.featured_image_url && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src={project.featured_image_url}
                      alt={project.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </motion.div>
              )}

              {/* Gallery */}
              {project.gallery_images && project.gallery_images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="relative">
                    <img
                      src={project.gallery_images[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-96 object-cover rounded-2xl"
                    />
                    
                    {project.gallery_images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                          <div className="flex gap-2">
                            {project.gallery_images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Project Description */}
              {project.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
                  <div 
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </motion.div>
              )}

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Technologies Used</h2>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm bg-gray-100 text-gray-700 px-4 py-2"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Results & Impact */}
              {project.results && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    Results & Impact
                  </h2>
                  <div 
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ __html: project.results }}
                  />
                </motion.div>
              )}

              {/* Testimonial */}
              {project.testimonial && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 mb-8 text-white"
                >
                  <div className="flex items-start gap-4">
                    <MessageCircle className="w-8 h-8 text-green-200 flex-shrink-0 mt-1" />
                    <div>
                      <blockquote className="text-lg italic mb-4">
                        "{project.testimonial}"
                      </blockquote>
                      <div>
                        <p className="font-semibold">{project.testimonial_author}</p>
                        {project.testimonial_author_title && (
                          <p className="text-green-200">{project.testimonial_author_title}</p>
                        )}
                        {project.testimonial_author_company && (
                          <p className="text-green-200">{project.testimonial_author_company}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedProjects.map((relatedProject) => (
                      <Card key={relatedProject.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          {relatedProject.featured_image_url ? (
                            <img
                              src={relatedProject.featured_image_url}
                              alt={relatedProject.title}
                              className="w-full h-48 object-cover"
                            />
                          ) : (
                            <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                              <div className="text-slate-400 text-3xl">💻</div>
                            </div>
                          )}
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">{relatedProject.title}</h3>
                            {relatedProject.short_description && (
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {relatedProject.short_description}
                              </p>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/portfolio/${relatedProject.slug}`)}
                              className="w-full"
                            >
                              View Project
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <PortfolioSidebar
                categories={categories}
                recentProjects={[]}
                popularProjects={[]}
                selectedCategory={null}
                onCategorySelect={() => {}}
                onSearch={() => {}}
                searchQuery=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
