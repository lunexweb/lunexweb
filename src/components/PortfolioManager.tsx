import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink, Search, Filter, Save, X } from 'lucide-react'
import { PortfolioProject, PortfolioCategory, PortfolioStats } from '@/lib/supabase'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

export const PortfolioManager = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [categories, setCategories] = useState<PortfolioCategory[]>([])
  const [stats, setStats] = useState<PortfolioStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    description: '',
    client_name: '',
    project_type: 'website',
    technologies: '',
    featured_image_url: '',
    project_url: '',
    github_url: '',
    case_study_url: '',
    category_id: '',
    is_published: false,
    is_featured: false,
    completion_date: '',
    estimated_value: '',
    tags: ''
  })

  useEffect(() => {
    try {
    loadData()
    } catch (err: any) {
      console.error('Error in PortfolioManager useEffect:', err)
      setError(err.message || 'Failed to load portfolio data')
      setLoading(false)
    }
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // Test connection first
      console.log('Testing Supabase connection...')
      
      // Load projects with error handling
      const { data: projectsData, error: projectsError } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      
      if (projectsError) {
        console.error('Projects error:', projectsError)
        // Continue with empty array if table doesn't exist
      }
      
      // Load categories with error handling
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('portfolio_categories')
        .select('*')
        .order('name')
      
      if (categoriesError) {
        console.error('Categories error:', categoriesError)
        // Continue with empty array if table doesn't exist
      }
      
      // Load stats with error handling
      let publishedCount = 0
      let featuredCount = 0
      let totalCount = 0
      let totalViews = 0
      
      try {
        const { data: publishedData } = await supabase
          .from('portfolio_projects')
          .select('id', { count: 'exact' })
          .eq('is_published', true)
        publishedCount = publishedData?.[0]?.count || 0
      } catch (err) {
        console.log('Published count error:', err)
      }
      
      try {
        const { data: featuredData } = await supabase
          .from('portfolio_projects')
          .select('id', { count: 'exact' })
          .eq('is_featured', true)
        featuredCount = featuredData?.[0]?.count || 0
      } catch (err) {
        console.log('Featured count error:', err)
      }
      
      try {
        const { data: totalData } = await supabase
          .from('portfolio_projects')
          .select('id', { count: 'exact' })
        totalCount = totalData?.[0]?.count || 0
      } catch (err) {
        console.log('Total count error:', err)
      }
      
      try {
        const { data: viewsData } = await supabase
          .from('portfolio_views')
          .select('id', { count: 'exact' })
        totalViews = viewsData?.[0]?.count || 0
      } catch (err) {
        console.log('Views count error:', err)
      }
      
      setProjects(projectsData || [])
      setCategories(categoriesData || [])
      setStats({
        total_projects: totalCount,
        published_projects: publishedCount,
        featured_projects: featuredCount,
        total_views: totalViews
      })
      
      console.log('Portfolio data loaded successfully')
    } catch (error) {
      console.error('Error loading portfolio data:', error)
      // Set empty defaults on error
      setProjects([])
      setCategories([])
      setStats({
        total_projects: 0,
        published_projects: 0,
        featured_projects: 0,
        total_views: 0
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies?.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'published' && project.is_published) ||
                         (statusFilter === 'draft' && !project.is_published) ||
                         (statusFilter === 'featured' && project.is_featured)
    
    const matchesCategory = categoryFilter === 'all' || 
                           categories.find(cat => cat.slug === categoryFilter)?.id === project.category_id
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      }
      
      // Auto-generate slug when title changes
      if (field === 'title' && value) {
        newData.slug = generateSlug(value)
      }
      
      return newData
    })
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      subtitle: '',
      description: '',
      client_name: '',
      project_type: 'website',
      technologies: '',
      featured_image_url: '',
      project_url: '',
      github_url: '',
      case_study_url: '',
      category_id: '',
      is_published: false,
      is_featured: false,
      completion_date: '',
      estimated_value: '',
      tags: ''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.title.trim()) {
      alert('Please enter a project title')
      return
    }
    
    setSubmitting(true)
    
    try {
      console.log('Starting form submission...')
      console.log('Form data:', formData)
      
      // Prepare data for submission
      const projectData = {
        title: formData.title.trim(),
        slug: (formData.slug || generateSlug(formData.title)).trim(),
        subtitle: formData.subtitle?.trim() || null,
        description: formData.description?.trim() || null,
        client_name: formData.client_name?.trim() || null,
        project_type: formData.project_type,
        technologies: formData.technologies ? formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean) : [],
        featured_image_url: formData.featured_image_url?.trim() || null,
        project_url: formData.project_url?.trim() || null,
        github_url: formData.github_url?.trim() || null,
        case_study_url: formData.case_study_url?.trim() || null,
        category_id: formData.category_id || null,
        is_published: formData.is_published,
        is_featured: formData.is_featured,
        completion_date: formData.completion_date || null,
        estimated_value: formData.estimated_value ? parseFloat(formData.estimated_value) : null,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []
      }

      console.log('Processed project data:', projectData)
      console.log('Testing Supabase connection...')

      // Test connection first
      const { data: testData, error: testError } = await supabase
        .from('portfolio_projects')
        .select('id')
        .limit(1)
      
      if (testError) {
        console.error('Supabase connection test failed:', testError)
        throw new Error('Database connection failed: ' + testError.message)
      }
      
      console.log('Supabase connection test passed')

      const { data, error } = await supabase
        .from('portfolio_projects')
        .insert([projectData])
        .select()
        .single()

      if (error) {
        console.error('Supabase insert error:', error)
        throw new Error('Failed to create project: ' + error.message)
      }

      console.log('Project created successfully:', data)

      // Add the new project to the list
      setProjects(prev => [data, ...prev])
      
      // Reset form and close dialog
      resetForm()
      setIsCreateDialogOpen(false)
      
      // Reload data to update stats
      await loadData()
      
      alert('Project created successfully!')
    } catch (error: any) {
      console.error('Error creating project:', error)
      alert('Error creating project: ' + (error.message || 'Unknown error occurred'))
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const { error } = await supabase
          .from('portfolio_projects')
          .delete()
          .eq('id', projectId)

        if (error) throw error
        setProjects(projects.filter(p => p.id !== projectId))
        await loadData() // Reload to update stats
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  const handleTogglePublished = async (project: PortfolioProject) => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .update({ is_published: !project.is_published })
        .eq('id', project.id)
        .select()
        .single()

      if (error) throw error
      setProjects(projects.map(p => p.id === project.id ? data : p))
      await loadData() // Reload to update stats
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  const handleToggleFeatured = async (project: PortfolioProject) => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .update({ is_featured: !project.is_featured })
        .eq('id', project.id)
        .select()
        .single()

      if (error) throw error
      setProjects(projects.map(p => p.id === project.id ? data : p))
      await loadData() // Reload to update stats
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getProjectTypeColor = (type?: string) => {
    const colors: Record<string, string> = {
      'website': 'bg-blue-100 text-blue-800',
      'web-app': 'bg-purple-100 text-purple-800',
      'mobile': 'bg-green-100 text-green-800',
      'ecommerce': 'bg-orange-100 text-orange-800'
    }
    return colors[type || 'website'] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading portfolio data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-2">Error loading portfolio</div>
          <div className="text-gray-600 text-sm mb-4">{error}</div>
          <button 
            onClick={() => {
              setError(null)
              loadData()
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Management</h2>
          <p className="text-gray-600">Manage your project portfolio and showcase your work</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter project title"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      placeholder="project-url-slug"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-generated from title. Used for project URLs.
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={formData.subtitle}
                      onChange={(e) => handleInputChange('subtitle', e.target.value)}
                      placeholder="Brief project description"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="client_name">Client Name</Label>
                    <Input
                      id="client_name"
                      value={formData.client_name}
                      onChange={(e) => handleInputChange('client_name', e.target.value)}
                      placeholder="Client or company name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="project_type">Project Type</Label>
                    <Select value={formData.project_type} onValueChange={(value) => handleInputChange('project_type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="web-app">Web Application</SelectItem>
                        <SelectItem value="mobile">Mobile App</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="branding">Branding</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="category_id">Category</Label>
                    <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No Category</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* URLs and Media */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="featured_image_url">Featured Image URL</Label>
                    <Input
                      id="featured_image_url"
                      value={formData.featured_image_url}
                      onChange={(e) => handleInputChange('featured_image_url', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="project_url">Project URL</Label>
                    <Input
                      id="project_url"
                      value={formData.project_url}
                      onChange={(e) => handleInputChange('project_url', e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="github_url">GitHub URL</Label>
                    <Input
                      id="github_url"
                      value={formData.github_url}
                      onChange={(e) => handleInputChange('github_url', e.target.value)}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="case_study_url">Case Study URL</Label>
                    <Input
                      id="case_study_url"
                      value={formData.case_study_url}
                      onChange={(e) => handleInputChange('case_study_url', e.target.value)}
                      placeholder="Link to detailed case study"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="estimated_value">Estimated Value (ZAR)</Label>
                    <Input
                      id="estimated_value"
                      type="number"
                      value={formData.estimated_value}
                      onChange={(e) => handleInputChange('estimated_value', e.target.value)}
                      placeholder="50000"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the project, challenges, solutions, and results..."
                  rows={4}
                />
              </div>

              {/* Technologies and Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                  <Input
                    id="technologies"
                    value={formData.technologies}
                    onChange={(e) => handleInputChange('technologies', e.target.value)}
                    placeholder="React, Node.js, MongoDB, etc."
                  />
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="web-design, ecommerce, saas, etc."
                  />
                </div>
              </div>

              {/* Completion Date */}
              <div>
                <Label htmlFor="completion_date">Completion Date</Label>
                <Input
                  id="completion_date"
                  type="date"
                  value={formData.completion_date}
                  onChange={(e) => handleInputChange('completion_date', e.target.value)}
                />
              </div>

              {/* Options */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => handleInputChange('is_published', checked)}
                  />
                  <Label htmlFor="is_published">Publish immediately</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
                  />
                  <Label htmlFor="is_featured">Feature this project</Label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm()
                    setIsCreateDialogOpen(false)
                  }}
                  disabled={submitting}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} className="bg-green-600 hover:bg-green-700">
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Create Project
                    </>
                  )}
                </Button>
            </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_projects}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.published_projects}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Featured</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.featured_projects}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_views}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="grid gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Project Image */}
                <div className="w-full lg:w-48 h-32 lg:h-32 rounded-lg overflow-hidden flex-shrink-0">
                  {project.featured_image_url ? (
                    <img
                      src={project.featured_image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <div className="text-slate-400 text-2xl">💻</div>
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                        {project.is_featured && (
                          <Badge className="bg-yellow-500 text-white">Featured</Badge>
                        )}
                        {!project.is_published && (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                      </div>
                      
                      {project.subtitle && (
                        <p className="text-gray-600 mb-2">{project.subtitle}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.project_type && (
                          <Badge className={getProjectTypeColor(project.project_type)}>
                            {project.project_type}
                          </Badge>
                        )}
                        {project.technologies?.slice(0, 3).map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies && project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        {project.client_name && (
                          <span>Client: {project.client_name}</span>
                        )}
                        <span>Views: {project.view_count}</span>
                        <span>Created: {formatDate(project.created_at)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTogglePublished(project)}
                      >
                        {project.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {project.is_published ? 'Unpublish' : 'Publish'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleFeatured(project)}
                      >
                        {project.is_featured ? 'Unfeature' : 'Feature'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProject(project)}
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-sm">Try adjusting your search or filters, or create a new project.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
