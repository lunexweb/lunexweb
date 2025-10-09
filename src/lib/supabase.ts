// Re-export the supabase client from the new configuration
export { supabase } from './supabaseClient'

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
  created_at: string
  updated_at: string
}

export interface PortfolioProjectWithDetails extends PortfolioProject {
  category_name?: string
  category_slug?: string
  category_color?: string
  category_icon?: string
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
    if (error) throw error
    return data as Lead[]
  },

  async createLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single()
    
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
    const { data, error } = await supabase.rpc('get_portfolio_projects', {
      p_category_id: filters?.category_id || null,
      p_limit: filters?.limit || 12,
      p_offset: filters?.offset || 0,
      p_featured_only: filters?.featured_only || false
    })
    if (error) throw error
    return data as PortfolioProjectWithDetails[]
  },

  async getFeaturedPortfolioProjects(limit: number = 3) {
    const { data, error } = await supabase.rpc('get_featured_portfolio_projects', { p_limit: limit })
    if (error) throw error
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
    const { data, error } = await supabase
      .from('portfolio_projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
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

  // Blog functions
  async getBlogPosts(filters?: {
    status?: string
    category_id?: string
    limit?: number
    offset?: number
  }) {
    const { data, error } = await supabase.rpc('get_blog_posts', {
      p_status: filters?.status || 'published',
      p_category_id: filters?.category_id || null,
      p_limit: filters?.limit || 10,
      p_offset: filters?.offset || 0
    })
    if (error) throw error
    return data
  },

  async getFeaturedBlogPosts(limit: number = 3) {
    const { data, error } = await supabase.rpc('get_featured_blog_posts', { p_limit: limit })
    if (error) throw error
    return data
  },

  async getBlogPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:users(name),
        category:blog_categories(name, slug, color)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    
    if (error) throw error
    return data as BlogPostWithDetails
  },

  async getBlogCategories() {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data as BlogCategory[]
  },

  async createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateBlogPost(id: string, updates: Partial<BlogPost>) {
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
    const { error } = await supabase.rpc('increment_blog_view', {
      p_post_id: postId,
      p_ip_address: metadata?.ip_address || null,
      p_user_agent: metadata?.user_agent || null,
      p_referrer: metadata?.referrer || null
    })

    if (error) throw error
  }
}