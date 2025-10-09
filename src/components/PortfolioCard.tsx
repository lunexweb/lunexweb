import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye, Calendar, Users } from 'lucide-react'
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        {project.featured_image_url ? (
          <img
            src={project.featured_image_url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <div className="text-slate-400 text-4xl">💻</div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        
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
            <Badge className="bg-green-500 text-white">Featured</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        {project.category_name && (
          <div className="mb-3">
            <Badge 
              variant="outline" 
              className="text-xs"
              style={{ borderColor: project.category_color, color: project.category_color }}
            >
              {project.category_name}
            </Badge>
          </div>
        )}

        {/* Title & Subtitle */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-150 mb-1">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-gray-600 text-sm">{project.subtitle}</p>
          )}
        </div>

        {/* Description */}
        {project.short_description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {project.short_description}
          </p>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                <Badge
                  key={techIndex}
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-700"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                  +{project.technologies.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Project Details */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          {project.project_type && (
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${getProjectTypeColor(project.project_type).split(' ')[0].replace('bg-', 'bg-')}`} />
              <span className="capitalize">{project.project_type}</span>
            </div>
          )}
          {project.project_end_date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(project.project_end_date)}</span>
            </div>
          )}
          {project.view_count > 0 && (
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{project.view_count}</span>
            </div>
          )}
        </div>

        {/* Client Info */}
        {project.client_name && (
          <div className="flex items-center gap-2 mb-4">
            {project.client_logo_url ? (
              <img
                src={project.client_logo_url}
                alt={project.client_name}
                className="w-6 h-6 rounded object-contain"
              />
            ) : (
              <div className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center">
                <Users className="w-3 h-3 text-gray-500" />
              </div>
            )}
            <span className="text-sm text-gray-600">{project.client_name}</span>
          </div>
        )}

        {/* View Project Button */}
        <Button
          onClick={() => onViewProject(project.slug)}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          size="sm"
        >
          View Project
        </Button>
      </div>
    </motion.div>
  )
}
