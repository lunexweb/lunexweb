import { useState } from 'react'
import { Search, Filter, Award, TrendingUp, Calendar, Users } from 'lucide-react'
import { PortfolioCategory, PortfolioProjectWithDetails } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface PortfolioSidebarProps {
  categories: PortfolioCategory[]
  recentProjects: PortfolioProjectWithDetails[]
  popularProjects: PortfolioProjectWithDetails[]
  selectedCategory?: string
  onCategorySelect: (categorySlug: string | null) => void
  onSearch: (query: string) => void
  searchQuery: string
}

export const PortfolioSidebar = ({
  categories,
  recentProjects,
  popularProjects,
  selectedCategory,
  onCategorySelect,
  onSearch,
  searchQuery
}: PortfolioSidebarProps) => {
  const [isSticky, setIsSticky] = useState(false)

  const projectTypes = [
    { name: 'All Projects', slug: null, count: 0 },
    { name: 'Web Development', slug: 'web-development', count: 0 },
    { name: 'Law Firm Solutions', slug: 'law-firm-solutions', count: 0 },
    { name: 'E-commerce', slug: 'ecommerce', count: 0 },
    { name: 'Mobile Apps', slug: 'mobile-apps', count: 0 },
    { name: 'Brand Identity', slug: 'brand-identity', count: 0 }
  ]

  const industries = [
    'Law Firms',
    'Consulting',
    'Real Estate',
    'Healthcare',
    'Finance',
    'E-commerce',
    'Technology',
    'Non-profit'
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-green-600" />
          Search Projects
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by title, technology..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5 text-green-600" />
          Categories
        </h3>
        <div className="space-y-2">
          <Button
            variant={selectedCategory === null ? "default" : "ghost"}
            size="sm"
            className={`w-full justify-start ${
              selectedCategory === null 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => onCategorySelect(null)}
          >
            All Projects
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.slug ? "default" : "ghost"}
              size="sm"
              className={`w-full justify-start ${
                selectedCategory === category.slug 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => onCategorySelect(category.slug)}
            >
              <div 
                className="w-3 h-3 rounded-full mr-3" 
                style={{ backgroundColor: category.color }}
              />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Project Types */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-green-600" />
          Project Types
        </h3>
        <div className="space-y-2">
          {projectTypes.slice(1).map((type) => (
            <div key={type.slug} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{type.name}</span>
              <Badge variant="secondary" className="text-xs">
                {type.count}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Industries */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Industries
        </h3>
        <div className="space-y-2">
          {industries.map((industry) => (
            <div key={industry} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-gray-600">{industry}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-600" />
          Recent Projects
        </h3>
        <div className="space-y-4">
          {recentProjects.slice(0, 3).map((project) => (
            <div key={project.id} className="flex gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                {project.featured_image_url ? (
                  <img
                    src={project.featured_image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <div className="text-slate-400 text-lg">💻</div>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {project.title}
                </h4>
                {project.client_name && (
                  <p className="text-xs text-gray-500 truncate">
                    {project.client_name}
                  </p>
                )}
                <p className="text-xs text-gray-400">
                  {formatDate(project.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Projects */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Most Popular
        </h3>
        <div className="space-y-4">
          {popularProjects.slice(0, 3).map((project, index) => (
            <div key={project.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {project.title}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{project.view_count} views</span>
                  {project.is_featured && (
                    <Badge className="bg-green-500 text-white text-xs">Featured</Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
        <p className="text-green-100 text-sm mb-4">
          Get notified when we launch new projects and case studies.
        </p>
        <div className="space-y-3">
          <Input
            placeholder="Enter your email"
            className="bg-white/20 border-white/30 text-white placeholder:text-green-200 focus:border-white focus:ring-white"
          />
          <Button 
            className="w-full bg-white text-green-600 hover:bg-green-50"
            size="sm"
          >
            Subscribe
          </Button>
        </div>
      </div>

      {/* Author Bio */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Lunexweb Team</h3>
          <p className="text-sm text-gray-600 mb-4">
            We're a team of passionate developers and designers creating premium web solutions for businesses worldwide.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Learn More About Us
          </Button>
        </div>
      </div>
    </div>
  )
}
