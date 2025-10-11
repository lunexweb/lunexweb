import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye, Calendar, Users, ArrowRight, Monitor, Smartphone, Globe } from 'lucide-react'
import { PortfolioProjectWithDetails } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface PortfolioCardProps {
  project: PortfolioProjectWithDetails
  index: number
  onViewProject: (slug: string) => void
}

export const PortfolioCard = ({ project, index, onViewProject }: PortfolioCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  const getProjectTypeColor = (type?: string) => {
    const colors: Record<string, string> = {
      'website': 'bg-blue-100 text-blue-800',
      'web-app': 'bg-purple-100 text-purple-800',
      'mobile': 'bg-green-100 text-green-800',
      'ecommerce': 'bg-orange-100 text-orange-800',
      'brand': 'bg-pink-100 text-pink-800',
      'marketing': 'bg-indigo-100 text-indigo-800'
    }
    return colors[type || 'website'] || 'bg-gray-100 text-gray-800'
  }

  const getProjectIcon = (type?: string) => {
    switch (type) {
      case 'website': return <Globe className="w-5 h-5" />
      case 'web-app': return <Monitor className="w-5 h-5" />
      case 'mobile': return <Smartphone className="w-5 h-5" />
      default: return <Monitor className="w-5 h-5" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative bg-white rounded-xl border border-gray-200 hover:border-green-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-64 md:h-72 flex flex-col md:flex-row"
    >
      {/* Image Section - Left Side */}
      <div className="relative w-full md:w-80 h-48 md:h-full flex-shrink-0">
        {project.featured_image_url ? (
          <img
            src={project.featured_image_url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🚀</div>
              <p className="text-gray-400 text-sm">Project Preview</p>
            </div>
          </div>
        )}
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {project.project_url && (
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.project_url, '_blank')
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
          {project.github_url && (
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.github_url, '_blank')
              }}
            >
              <Github className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Featured Badge */}
        {project.is_featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-green-500 text-white text-xs">Featured</Badge>
          </div>
        )}
      </div>

      {/* Content Section - Right Side */}
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
        {/* Top Section */}
        <div>
          {/* Header with Icon and Category */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white shadow-md">
              {getProjectIcon(project.project_type)}
            </div>
            <div className="flex-1">
              {project.category_name && (
                <Badge 
                  variant="outline" 
                  className="text-xs mb-1"
                  style={{ borderColor: project.category_color, color: project.category_color }}
                >
                  {project.category_name}
                </Badge>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 capitalize">{project.project_type || 'website'}</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Title & Client */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200 mb-2">
              {project.title}
            </h3>
            {project.client_name && (
              <div className="flex items-center gap-2">
                {project.client_logo_url ? (
                  <img
                    src={project.client_logo_url}
                    alt={project.client_name}
                    className="w-5 h-5 rounded object-contain"
                  />
                ) : (
                  <div className="w-5 h-5 rounded bg-gray-200 flex items-center justify-center">
                    <Users className="w-3 h-3 text-gray-500" />
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">{project.client_name}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {project.short_description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
              {project.short_description}
            </p>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 5).map((tech, techIndex) => (
                  <Badge
                    key={techIndex}
                    variant="secondary"
                    className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 5 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                    +{project.technologies.length - 5}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Project Stats */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {project.project_end_date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(project.project_end_date)}</span>
              </div>
            )}
            {project.view_count > 0 && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{project.view_count} views</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <Button
            onClick={() => onViewProject(project.slug)}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium transition-all duration-200 group px-4 w-full sm:w-auto"
            size="sm"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}