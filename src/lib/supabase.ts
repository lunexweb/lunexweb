// Re-export the supabase client from the new configuration
import { supabase } from './supabaseClient'
export { supabase }

// Database Types
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'developer' | 'sales'
  phone?: string
  avatar_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  service_type: string
  budget_range?: string
  timeline?: string
  location?: string
  website_url?: string
  message?: string
  remote_work?: string
  remote_work_details?: string
  lead_score: number
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiating' | 'closed_won' | 'closed_lost' | 'nurturing'
  source: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  assigned_to?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  estimated_value?: number
  notes?: string
  created_at: string
  updated_at: string
  last_contacted_at?: string
}

export interface Communication {
  id: string
  lead_id: string
  type: 'email' | 'phone' | 'meeting' | 'note'
  subject?: string
  content: string
  direction: 'inbound' | 'outbound'
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'replied' | 'failed'
  created_at: string
  created_by?: string
  metadata?: any
}

export interface DashboardStats {
  total_leads: number
  avg_response_time: number
  conversion_rate: number
  converted_leads: number
}

export interface LeadQueueItem extends Lead {
  hours_since_created: number
}

// Blog Types
export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  icon?: string
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image_url?: string
  category_id: string
  author_id: string
  status: 'draft' | 'published' | 'archived'
  meta_title?: string
  meta_description?: string
  tags: string[]
  view_count: number
  is_featured: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export interface BlogPostWithDetails extends BlogPost {
  author?: { name: string }
  category?: BlogCategory
}

// Portfolio Types
export interface PortfolioCategory {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  icon?: string
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface PortfolioProject {
  id: string
  title: string
  slug: string
  subtitle?: string
  description?: string
  short_description?: string
  featured_image_url?: string
  gallery_images?: string[]
  video_url?: string
  category_id?: string
  client_name?: string
  client_logo_url?: string
  project_url?: string
  github_url?: string
  case_study_url?: string
  technologies?: string[]
  project_type?: string
  industry?: string
  timeline?: string
  budget_range?: string
  team_size?: number
  project_size?: string
  results?: string
  testimonial?: string
  testimonial_author?: string
  testimonial_author_title?: string
  testimonial_author_company?: string
  meta_title?: string
  meta_description?: string
  is_featured: boolean
  is_published: boolean
  sort_order: number
  view_count: number
  project_start_date?: string
  project_end_date?: string
  completion_date?: string
  estimated_value?: number
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface PortfolioProjectWithDetails extends PortfolioProject {
  category_name?: string
  category_slug?: string
  category_color?: string
  category_icon?: string
}

export interface PortfolioStats {
  total_projects: number
  published_projects: number
  featured_projects: number
  total_views: number
}

export interface PortfolioSkill {
  id: string
  name: string
  category?: string
  icon_url?: string
  proficiency_level: number
  years_experience?: number
  is_featured: boolean
  sort_order: number
  created_at: string
}

export interface PortfolioView {
  id: string
  project_id: string
  ip_address?: string
  user_agent?: string
  referrer?: string
  viewed_at: string
}

// Database helper functions
export const db = {
  // Lead functions
  async getLeads(filters?: {
    status?: string
    priority?: string
    limit?: number
    offset?: number
  }) {
    console.log('Getting leads with filters:', filters)
    
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.priority) {
      query = query.eq('priority', filters.priority)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query
    console.log('Leads query result:', { data: data?.length, error })
    if (error) throw error
    return data as Lead[]
  },

  async createLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) {
    console.log('Creating lead:', lead)
    
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single()
    
    console.log('Lead creation result:', { data, error })
    if (error) throw error
    return data
  },

  async updateLead(id: string, updates: Partial<Lead>) {
    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteLead(id: string) {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Communication functions
  async getCommunications(leadId?: string) {
    let query = supabase
      .from('communications')
      .select('*')
      .order('created_at', { ascending: false })

    if (leadId) {
      query = query.eq('lead_id', leadId)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Communication[]
  },

  async createCommunication(communication: Omit<Communication, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('communications')
      .insert([communication])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Analytics functions
  async getAnalyticsData(startDate?: string, endDate?: string) {
    const { data, error } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .lte('created_at', endDate || new Date().toISOString())
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async trackEvent(event: {
    event_type: string
    event_name: string
    properties?: any
    user_id?: string
    session_id?: string
  }) {
    const { error } = await supabase
      .from('analytics_events')
      .insert([{
        ...event,
        ip_address: null, // Will be handled by RLS
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
        page_url: window.location.href,
        created_at: new Date().toISOString()
      }])

    if (error) {
      console.error('Analytics tracking error:', error)
    }
  },

  // Portfolio functions
  async getPortfolioProjects(filters?: {
    category_id?: string
    limit?: number
    offset?: number
    featured_only?: boolean
  }) {
    let query = supabase
      .from('portfolio_projects')
      .select(`
        *,
        category:portfolio_categories(name, slug, color, icon)
      `)
      .order('created_at', { ascending: false })

    if (filters?.category_id) {
      query = query.eq('category_id', filters.category_id)
    }

    if (filters?.featured_only) {
      query = query.eq('is_featured', true)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 12) - 1)
    }

    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching portfolio projects:', error)
      throw error
    }
    
    return data as PortfolioProjectWithDetails[]
  },

  async getFeaturedPortfolioProjects(limit: number = 1) {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select(`
        *,
        category:portfolio_categories(name, slug, color, icon)
      `)
      .eq('is_featured', true)
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching featured portfolio projects:', error)
      throw error
    }

    return data as PortfolioProjectWithDetails[]
  },

  async getPortfolioProjectBySlug(slug: string) {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select(`
        *,
        category:portfolio_categories(name, slug, color, icon)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    
    if (error) throw error
    return data as PortfolioProjectWithDetails
  },

  async getPortfolioCategories() {
    const { data, error } = await supabase
      .from('portfolio_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
    
    if (error) throw error
    return data as PortfolioCategory[]
  },

  async getPortfolioSkills() {
    const { data, error } = await supabase
      .from('portfolio_skills')
      .select('*')
      .order('sort_order')
    
    if (error) throw error
    return data as PortfolioSkill[]
  },

  async createPortfolioProject(project: Omit<PortfolioProject, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .insert([project])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updatePortfolioProject(id: string, updates: Partial<PortfolioProject>) {
    console.log('Updating portfolio project:', id, updates)
    
    try {
      // If we're setting is_featured to true, first unfeature all other projects
      if (updates.is_featured === true) {
        await supabase
          .from('portfolio_projects')
          .update({ is_featured: false })
          .neq('id', id)
      }
      
      // Clean the updates object to remove any undefined values and ensure proper data types
      const cleanedUpdates: any = {}
      
      // Senior developer approach: Comprehensive data validation and cleaning
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined) {
          try {
            // Handle specific data type conversions
            if (key === 'estimated_value') {
              if (value === null || value === '') {
                cleanedUpdates[key] = null
              } else {
                const numValue = parseFloat(value.toString())
                if (isNaN(numValue) || numValue < 0) {
                  console.warn(`Invalid estimated_value: ${value}, setting to null`)
                  cleanedUpdates[key] = null
                } else {
                  cleanedUpdates[key] = numValue
                }
              }
            } else if (key === 'technologies' || key === 'tags' || key === 'gallery_images') {
              // Handle array fields
              if (Array.isArray(value)) {
                cleanedUpdates[key] = value.filter(item => item && item.toString().trim())
              } else if (typeof value === 'string' && value.trim()) {
                cleanedUpdates[key] = value.split(',').map(item => item.trim()).filter(Boolean)
              } else {
                cleanedUpdates[key] = []
              }
            } else if (key === 'is_published' || key === 'is_featured') {
              // Handle boolean fields
              cleanedUpdates[key] = Boolean(value)
            } else if (key === 'completion_date' || key === 'project_start_date' || key === 'project_end_date') {
              // Handle date fields with proper validation
              if (value === '' || value === null) {
                cleanedUpdates[key] = null
              } else {
                try {
                  const dateValue = new Date(value.toString())
                  if (!isNaN(dateValue.getTime())) {
                    cleanedUpdates[key] = dateValue.toISOString().split('T')[0] // YYYY-MM-DD format
                  } else {
                    console.warn(`Invalid date for ${key}: ${value}, setting to null`)
                    cleanedUpdates[key] = null
                  }
                } catch (e) {
                  console.warn(`Date parsing error for ${key}: ${value}, setting to null`)
                  cleanedUpdates[key] = null
                }
              }
            } else if (key === 'team_size') {
              if (value === null || value === '') {
                cleanedUpdates[key] = null
              } else {
                const intValue = parseInt(value.toString())
                if (isNaN(intValue) || intValue < 0) {
                  console.warn(`Invalid team_size: ${value}, setting to null`)
                  cleanedUpdates[key] = null
                } else {
                  cleanedUpdates[key] = intValue
                }
              }
            } else if (key === 'slug' && value !== null && value !== '') {
              // Ensure slug matches the database constraint pattern ^[a-z0-9-]+$
              const slugValue = value.toString()
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')
              cleanedUpdates[key] = slugValue
            } else if (key === 'category_id') {
              // Handle category_id - convert 'none' to null
              if (value === 'none' || value === '' || value === null) {
                cleanedUpdates[key] = null
              } else {
                cleanedUpdates[key] = value
              }
            } else if (value === '') {
              // Convert empty strings to null for optional fields
              cleanedUpdates[key] = null
            } else {
              // For all other fields, pass through as-is
              cleanedUpdates[key] = value
            }
          } catch (error) {
            console.error(`Error processing field ${key} with value ${value}:`, error)
            // Skip this field if there's an error processing it
          }
        }
      })
      
      console.log('Cleaned updates:', cleanedUpdates)
      
      // First, let's check if we can read the project (to verify RLS)
      const { data: existingProject, error: readError } = await supabase
        .from('portfolio_projects')
        .select('id, title')
        .eq('id', id)
        .single()
      
      if (readError) {
        console.error('Cannot read project (RLS issue?):', readError)
        throw new Error(`Cannot access project: ${readError.message}`)
      }
      
      console.log('Project exists and is readable:', existingProject)
      
      // Perform the update - REMOVE .single() to avoid coercion errors
      const { data: updatedRows, error } = await supabase
        .from('portfolio_projects')
        .update(cleanedUpdates)
        .eq('id', id)
        .select('*')
      
      if (error) {
        console.error('Error updating portfolio project:', error)
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        console.error('Data being sent:', cleanedUpdates)
        console.error('Project ID:', id)
        
        // Provide more specific error messages
        if (error.code === '23505') {
          throw new Error('A project with this slug already exists. Please choose a different title.')
        } else if (error.code === '23503') {
          throw new Error('Invalid category selected. Please choose a valid category.')
        } else if (error.code === '23514') {
          throw new Error('Invalid data provided. Please check your input and try again.')
        } else {
          throw new Error(`Database error: ${error.message}`)
        }
      }
      
      // Check if any rows were actually updated
      if (!updatedRows || updatedRows.length === 0) {
        console.error('No rows were updated. This could be due to:')
        console.error('1. Project ID not found')
        console.error('2. RLS policies preventing the update')
        console.error('3. No changes made (same data)')
        console.error('4. Database constraints preventing the update')
        console.error('Project ID:', id)
        console.error('Updates attempted:', cleanedUpdates)
        
        // Let's try to get the current project data to see what's different
        const { data: currentProject, error: currentError } = await supabase
      .from('portfolio_projects')
          .select('*')
      .eq('id', id)
          .single()
        
        if (currentError) {
          console.error('Cannot read current project data:', currentError)
          throw new Error(`Project with ID ${id} not found or not accessible.`)
        }
        
        console.log('Current project data:', currentProject)
        
        // Check if the data is actually different
        let hasChanges = false
        Object.entries(cleanedUpdates).forEach(([key, value]) => {
          if (currentProject[key] !== value) {
            console.log(`Field ${key} changed: ${currentProject[key]} -> ${value}`)
            hasChanges = true
          }
        })
        
        if (!hasChanges) {
          console.warn('No actual changes detected - all values are the same')
          throw new Error(`No changes were made to the project. All values are identical to the current data.`)
        }
        
        throw new Error(`Failed to update project. Project exists but update was blocked (likely RLS policy). Please check database permissions.`)
      }
      
      const data = updatedRows[0] // Get the first (and should be only) updated row
      console.log('Portfolio project updated successfully:', data)
      
      // If we need category info, fetch it separately
      if (data.category_id) {
        const { data: categoryData } = await supabase
          .from('portfolio_categories')
          .select('name, slug, color, icon')
          .eq('id', data.category_id)
      .single()
    
        return {
          ...data,
          category: categoryData
        }
      }
      
    return data
    } catch (error) {
      console.error('Error in updatePortfolioProject:', error)
      throw error
    }
  },

  async deletePortfolioProject(id: string) {
    const { error } = await supabase
      .from('portfolio_projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async incrementPortfolioView(projectId: string, metadata?: {
    ip_address?: string
    user_agent?: string
    referrer?: string
  }) {
    const { error } = await supabase.rpc('increment_portfolio_view', {
      p_project_id: projectId,
      p_ip_address: metadata?.ip_address || null,
      p_user_agent: metadata?.user_agent || null,
      p_referrer: metadata?.referrer || null
    })

    if (error) throw error
  },

  async getPortfolioStats() {
    const [totalResult, publishedResult, featuredResult, viewsResult] = await Promise.all([
      supabase.from('portfolio_projects').select('id', { count: 'exact' }),
      supabase.from('portfolio_projects').select('id', { count: 'exact' }).eq('is_published', true),
      supabase.from('portfolio_projects').select('id', { count: 'exact' }).eq('is_featured', true),
      supabase.from('portfolio_views').select('id', { count: 'exact' })
    ])

    return {
      total_projects: totalResult.count || 0,
      published_projects: publishedResult.count || 0,
      featured_projects: Math.min(featuredResult.count || 0, 1), // Ensure max 1 featured project
      total_views: viewsResult.count || 0
    }
  },

  // Blog functions
  async getBlogPosts(filters?: {
    status?: string
    category_id?: string
    limit?: number
    offset?: number
    featured_only?: boolean
  }) {
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(name, slug, color, icon)
      `)
      .order('created_at', { ascending: false })

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }

    if (filters?.category_id) {
      query = query.eq('category_id', filters.category_id)
    }

    if (filters?.featured_only) {
      query = query.eq('is_featured', true)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 12) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching blog posts:', error)
      throw error
    }

    return data
  },

  async getFeaturedBlogPosts(limit: number = 3) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(name, slug, color, icon)
      `)
      .eq('is_featured', true)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching featured blog posts:', error)
      throw error
    }

    return data
  },

  async getBlogPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(name, slug, color, icon)
      `)
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching blog post:', error)
      throw error
    }

    return data
  },

  async getBlogCategories() {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (error) {
      console.error('Error fetching blog categories:', error)
      throw error
    }

    return data
  },

  async createBlogPost(post: {
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
    status?: string
    is_featured?: boolean
    is_pinned?: boolean
  }) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateBlogPost(id: string, updates: Partial<{
    title: string
    slug: string
    subtitle: string
    content: string
    excerpt: string
    featured_image_url: string
    category_id: string
    author_name: string
    author_email: string
    author_avatar_url: string
    meta_title: string
    meta_description: string
    meta_keywords: string[]
    tags: string[]
    status: string
    is_featured: boolean
    is_pinned: boolean
  }>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteBlogPost(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async incrementBlogView(postId: string, metadata?: {
    ip_address?: string
    user_agent?: string
    referrer?: string
  }) {
    try {
      // Insert view record
      const { error: viewError } = await supabase
        .from('blog_views')
        .insert([{
          post_id: postId,
          ip_address: metadata?.ip_address,
          user_agent: metadata?.user_agent,
          referrer: metadata?.referrer
        }])

      if (viewError) {
        console.error('Error recording blog view:', viewError)
        // Don't return early, still try to increment view count
      }

      // Get current view count and increment it
      const { data: currentPost, error: fetchError } = await supabase
        .from('blog_posts')
        .select('view_count')
        .eq('id', postId)
        .single()

      if (fetchError) {
        console.error('Error fetching current view count:', fetchError)
        return
      }

      const newViewCount = (currentPost?.view_count || 0) + 1

      // Update view count
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ view_count: newViewCount })
        .eq('id', postId)

      if (updateError) {
        console.error('Error incrementing blog view count:', updateError)
      }
    } catch (error) {
      console.error('Error in incrementBlogView:', error)
    }
  },

  async getBlogComments(postId: string) {
    const { data, error } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('post_id', postId)
      .eq('status', 'approved')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching blog comments:', error)
      throw error
    }

    return data
  },

  async createBlogComment(comment: {
    post_id: string
    parent_id?: string
    author_name: string
    author_email: string
    author_website?: string
    content: string
  }) {
    console.log('Creating blog comment:', comment)
    
    const { data, error } = await supabase
      .from('blog_comments')
      .insert([{
        ...comment,
        ip_address: null, // Will be handled by Supabase
        user_agent: navigator.userAgent
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating blog comment:', error)
      throw new Error(`Failed to create comment: ${error.message}`)
    }
    
    console.log('Blog comment created successfully:', data)
    return data
  },

  async getBlogStats() {
    const [totalResult, publishedResult, draftResult, viewsResult, commentsResult] = await Promise.all([
      supabase.from('blog_posts').select('id', { count: 'exact' }),
      supabase.from('blog_posts').select('id', { count: 'exact' }).eq('status', 'published'),
      supabase.from('blog_posts').select('id', { count: 'exact' }).eq('status', 'draft'),
      supabase.from('blog_views').select('id', { count: 'exact' }),
      supabase.from('blog_comments').select('id', { count: 'exact' })
    ])

    return {
      total_posts: totalResult.count || 0,
      published_posts: publishedResult.count || 0,
      draft_posts: draftResult.count || 0,
      total_views: viewsResult.count || 0,
      total_comments: commentsResult.count || 0
    }
  }
}