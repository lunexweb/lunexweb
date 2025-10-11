import React, { useState, useEffect } from 'react'
import { type Lead, type DashboardStats, db } from '@/lib/supabase'
import { supabase } from '@/lib/supabaseClient'
import { useToast } from '@/hooks/use-toast'
import { BlogManager } from './BlogManager'
import { PortfolioManager } from './PortfolioManager'
import { ProjectManagement } from './ProjectManagement'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { 
  Users, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Search,
  Eye,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  RefreshCw,
  Download,
  Settings,
  Plus,
  MessageSquare,
  Star,
  Target,
  Activity,
  FileText,
  Briefcase,
  LogOut,
  User,
  Building,
  MapPin,
  Globe,
  DollarSign as DollarIcon,
  ChevronDown,
  ExternalLink
} from 'lucide-react'

// Dashboard protection flag - prevents accidental modifications
const DASHBOARD_LOCKED = true

interface DashboardData {
  // Lead metrics
  newLeadsToday: number
  newLeadsYesterday: number
  revenueThisMonth: number
  revenueToday: number
  avgResponseTime: number
  conversionRate: number
  closedThisMonth: number
  
  // Lead status breakdown
  newLeads: number
  inProgressLeads: number
  convertedLeads: number
  
  // Recent activity
  todaysCommunications: number
  averageLeadScore: number
  totalPipeline: number
  
  // Portfolio metrics
  totalProjects: number
  portfolioViews: number
  featuredProjects: number
  
  // Blog metrics
  totalPosts: number
  blogViews: number
  publishedPosts: number
}

const CEODashboard = () => {
  const { toast } = useToast()
  
  // Helper functions for toast notifications
  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
    })
  }
  
  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    })
  }
  
  const showWarning = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
    })
  }
  
  const [leads, setLeads] = useState<Lead[]>([])
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    newLeadsToday: 0,
    newLeadsYesterday: 0,
    revenueThisMonth: 0,
    revenueToday: 0,
    avgResponseTime: 120,
    conversionRate: 75,
    closedThisMonth: 3,
    newLeads: 0,
    inProgressLeads: 1,
    convertedLeads: 3,
    todaysCommunications: 0,
    averageLeadScore: 19,
    totalPipeline: 4,
    totalProjects: 0,
    portfolioViews: 0,
    featuredProjects: 0,
    totalPosts: 0,
    blogViews: 0,
    publishedPosts: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Check if supabase is available
      if (!supabase) {
        throw new Error('Supabase client not initialized')
      }

      console.log('Loading dashboard data...')

      // Load all data in parallel
      const [
        leadsData,
        leadStats,
        communicationsData,
        portfolioStats,
        blogStats
      ] = await Promise.all([
        db.getLeads({ limit: 50 }),
        loadLeadStats(),
        loadCommunicationsStats(),
        loadPortfolioStats(),
        loadBlogStats()
      ])

      console.log('Leads loaded:', leadsData?.length || 0, 'leads')
      console.log('Sample lead:', leadsData?.[0])

      setLeads(leadsData || [])
      setDashboardData({
        ...leadStats,
        ...communicationsData,
        ...portfolioStats,
        ...blogStats
      })
    } catch (err: any) {
      console.showError('Error loading dashboard data:', err)
      setError(err.message || 'Failed to load dashboard data')
      setLeads([])
    } finally {
      setLoading(false)
    }
  }


  const loadLeadStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      const thisMonth = new Date().toISOString().substring(0, 7)

      // Get leads data
      const allLeads = await db.getLeads()

      // Calculate metrics
      const newLeadsToday = allLeads?.filter(lead => 
        lead.created_at?.startsWith(today)
      ).length || 0

      const newLeadsYesterday = allLeads?.filter(lead => 
        lead.created_at?.startsWith(yesterday)
      ).length || 0

      const newLeads = allLeads?.filter(lead => lead.status === 'new').length || 0
      const inProgressLeads = allLeads?.filter(lead => 
        ['contacted', 'qualified', 'proposal_sent', 'negotiating'].includes(lead.status)
      ).length || 0
      const convertedLeads = allLeads?.filter(lead => 
        ['closed_won', 'converted'].includes(lead.status)
      ).length || 0

      const closedThisMonth = allLeads?.filter(lead => 
        lead.status === 'closed_won' && lead.created_at?.startsWith(thisMonth)
      ).length || 0

      const totalPipeline = newLeads + inProgressLeads

      const revenueThisMonth = allLeads?.filter(lead => 
        lead.status === 'closed_won' && lead.created_at?.startsWith(thisMonth)
      ).reduce((sum, lead) => sum + (lead.estimated_value || 0), 0) || 0

      const revenueToday = allLeads?.filter(lead => 
        lead.status === 'closed_won' && lead.created_at?.startsWith(today)
      ).reduce((sum, lead) => sum + (lead.estimated_value || 0), 0) || 0

      const totalLeads = allLeads?.length || 0
      const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0

      const averageLeadScore = allLeads?.length > 0 
        ? Math.round(allLeads.reduce((sum, lead) => sum + (lead.lead_score || 0), 0) / allLeads.length)
        : 0

      return {
        newLeadsToday,
        newLeadsYesterday,
        revenueThisMonth,
        revenueToday,
        avgResponseTime: 120, // Mock data - would calculate from communications
        conversionRate,
        closedThisMonth,
        newLeads,
        inProgressLeads,
        convertedLeads,
        totalPipeline,
        averageLeadScore
      }
    } catch (err) {
      console.showError('Error loading lead stats:', err)
      return {}
    }
  }

  const loadCommunicationsStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      
      const communications = await db.getCommunications()

      return {
        todaysCommunications: communications?.filter(comm => 
          comm.created_at?.startsWith(today)
        ).length || 0
      }
    } catch (err) {
      console.showError('Error loading communications stats:', err)
      return {}
    }
  }

  const loadPortfolioStats = async () => {
    try {
      const [
        { data: projects, error: projectsError },
        { data: views, error: viewsError },
        { data: featured, error: featuredError }
      ] = await Promise.all([
        supabase.from('portfolio_projects').select('*').eq('is_published', true),
        supabase.from('portfolio_views').select('*'),
        supabase.from('portfolio_projects').select('*').eq('is_featured', true).eq('is_published', true)
      ])

      if (projectsError || viewsError || featuredError) {
        throw new Error('Error loading portfolio data')
      }

      return {
        totalProjects: projects?.length || 0,
        portfolioViews: views?.length || 0,
        featuredProjects: featured?.length || 0
      }
    } catch (err) {
      console.showError('Error loading portfolio stats:', err)
      return {}
    }
  }

  const loadBlogStats = async () => {
    try {
      const [
        { data: posts, error: postsError },
        { data: views, error: viewsError },
        { data: published, error: publishedError }
      ] = await Promise.all([
        supabase.from('blog_posts').select('*'),
        supabase.from('blog_views').select('*'),
        supabase.from('blog_posts').select('*').eq('status', 'published')
      ])

      if (postsError || viewsError || publishedError) {
        throw new Error('Error loading blog data')
      }

      return {
        totalPosts: posts?.length || 0,
        blogViews: views?.length || 0,
        publishedPosts: published?.length || 0
      }
    } catch (err) {
      console.showError('Error loading blog stats:', err)
      return {}
    }
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.service_type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'qualified': return 'bg-green-100 text-green-800'
      case 'proposal_sent': return 'bg-purple-100 text-purple-800'
      case 'negotiating': return 'bg-orange-100 text-orange-800'
      case 'closed_won': return 'bg-green-100 text-green-800'
      case 'closed_lost': return 'bg-red-100 text-red-800'
      case 'nurturing': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'Not specified'
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadDashboardData} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CEO Dashboard</h1>
                <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-GB', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Navigation Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="min-w-[120px]">
                    <Globe className="w-4 h-4 mr-2" />
                    Navigate
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 max-h-96 overflow-y-auto" align="end">
                  <div className="px-2 py-1.5">
                    <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Main Pages
                    </DropdownMenuLabel>
                  </div>
                  <div className="grid grid-cols-2 gap-1 px-2 py-1">
                    <DropdownMenuItem 
                      onClick={() => window.open('/', '_blank')}
                      className="flex items-center justify-start p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                      <span className="text-sm font-medium">Home</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => window.open('/services', '_blank')}
                      className="flex items-center justify-start p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                      <span className="text-sm font-medium">Services</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => window.open('/portfolio', '_blank')}
                      className="flex items-center justify-start p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                      <span className="text-sm font-medium">Portfolio</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => window.open('/blog', '_blank')}
                      className="flex items-center justify-start p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                      <span className="text-sm font-medium">Blog</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => window.open('/packages', '_blank')}
                      className="flex items-center justify-start p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                      <span className="text-sm font-medium">Packages</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => window.open('/about', '_blank')}
                      className="flex items-center justify-start p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                      <span className="text-sm font-medium">About</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => window.open('/contact', '_blank')}
                      className="flex items-center justify-start p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                      <span className="text-sm font-medium">Contact</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => window.open('/faq', '_blank')}
                      className="flex items-center justify-start p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                      <span className="text-sm font-medium">FAQ</span>
                    </DropdownMenuItem>
                  </div>
                  
                  <DropdownMenuSeparator className="my-2" />
                  
                  <div className="px-2 py-1.5">
                    <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Location Pages
                    </DropdownMenuLabel>
                  </div>
                  <div className="grid grid-cols-1 gap-1 px-2 py-1">
                    <DropdownMenuItem 
                      onClick={() => window.open('/cape-town', '_blank')}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                        <span className="text-sm font-medium">Cape Town</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => window.open('/johannesburg', '_blank')}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                        <span className="text-sm font-medium">Johannesburg</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => window.open('/durban', '_blank')}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                        <span className="text-sm font-medium">Durban</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => window.open('/pretoria', '_blank')}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                        <span className="text-sm font-medium">Pretoria</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => window.open('/sandton', '_blank')}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                        <span className="text-sm font-medium">Sandton</span>
                      </div>
                    </DropdownMenuItem>
                  </div>
                  
                  <DropdownMenuSeparator className="my-2" />
                  
                  <div className="px-2 py-1.5">
                    <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      System Pages
                    </DropdownMenuLabel>
                  </div>
                  <div className="px-2 py-1">
                    <DropdownMenuItem 
                      onClick={() => window.open('/test-supabase', '_blank')}
                      className="flex items-center justify-start p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                      <span className="text-sm font-medium">Test Supabase</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => window.open('/simple-test', '_blank')}
                      className="flex items-center justify-start p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 text-gray-400" />
                      <span className="text-sm font-medium">Simple Test</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" size="sm" onClick={loadDashboardData}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Top Row - Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">{dashboardData.newLeadsToday}</div>
                      <div className="text-sm text-blue-600">
                        {dashboardData.newLeadsYesterday > 0 && (
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {dashboardData.newLeadsYesterday} yesterday
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-900">New Leads Today</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">
                        {formatCurrency(dashboardData.revenueThisMonth)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatCurrency(dashboardData.revenueToday)} today
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-900">Revenue This Month</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-purple-600">{dashboardData.avgResponseTime}m</div>
                      <div className="text-sm text-gray-500">Target: As soon as possible</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-900">Avg Response Time</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Target className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-orange-600">{dashboardData.conversionRate}%</div>
                      <div className="text-sm text-gray-500">{dashboardData.closedThisMonth} closed this month</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-900">Conversion Rate</h3>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Second Row - Lead Status Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <AlertTriangle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">{dashboardData.newLeads}</div>
                      <div className="text-sm text-blue-600 flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        Awaiting first contact
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-900">New Leads</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-orange-600">{dashboardData.inProgressLeads}</div>
                      <div className="text-sm text-orange-600 flex items-center gap-1">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        Being nurtured
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-900">In Progress</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">{dashboardData.convertedLeads}</div>
                      <div className="text-sm text-green-600 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        Closed won
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-900">Converted</h3>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{dashboardData.todaysCommunications}</div>
                      <div className="text-sm text-gray-600">Today's Communications</div>
                      <div className="text-xs text-gray-500">Total interactions</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Star className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{dashboardData.averageLeadScore}</div>
                      <div className="text-sm text-gray-600">Average Lead Score</div>
                      <div className="text-xs text-gray-500">Quality indicator</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{dashboardData.totalPipeline}</div>
                      <div className="text-sm text-gray-600">Total Pipeline</div>
                      <div className="text-xs text-gray-500">Active leads</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-green-600" />
                    Lead Queue
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      {filteredLeads.length} leads
                    </Badge>
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={loadDashboardData}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search leads by name, email, company, or service..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                      <SelectItem value="negotiating">Negotiating</SelectItem>
                      <SelectItem value="closed_won">Closed Won</SelectItem>
                      <SelectItem value="closed_lost">Closed Lost</SelectItem>
                      <SelectItem value="nurturing">Nurturing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No leads in queue</h3>
                    <p className="text-gray-500">All caught up! Great work team.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredLeads.map((lead) => (
                      <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors w-full">
                        {/* Header with name, badges, and date */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <h3 className="font-semibold text-gray-900 text-lg">{lead.name}</h3>
                            <div className="flex flex-wrap gap-2">
                              <Badge className={getStatusColor(lead.status)}>
                                {lead.status.replace('_', ' ')}
                              </Badge>
                              <Badge className={getPriorityColor(lead.priority)}>
                                {lead.priority}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            {formatDate(lead.created_at)}
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 break-words">{lead.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{lead.phone || 'No phone'}</span>
                          </div>
                        </div>

                        {/* Lead Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-4">
                          <div>
                            <span className="font-medium text-gray-700">Company:</span>
                            <p className="text-gray-600 break-words">{lead.company || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Service:</span>
                            <p className="text-gray-600 break-words">{lead.service_type}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Budget:</span>
                            <p className="text-gray-600">{lead.budget_range || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Remote Work:</span>
                            <p className="text-gray-600 break-words">
                              {lead.remote_work ? 
                                (lead.remote_work === 'other' ? lead.remote_work_details : lead.remote_work) : 
                                'Not specified'}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Value:</span>
                            <p className="text-gray-600">{formatCurrency(lead.estimated_value)}</p>
                          </div>
                        </div>

                        {/* Message Preview */}
                        {lead.message && (
                          <div className="mb-4">
                            <span className="font-medium text-gray-700 text-sm">Message:</span>
                            <p className="text-gray-600 text-sm mt-1 p-2 bg-gray-50 rounded break-words">
                              {lead.message.length > 100 ? `${lead.message.substring(0, 100)}...` : lead.message}
                            </p>
                          </div>
                        )}

                        {/* Action Buttons - Now inside the card */}
                        <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-gray-200">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="flex-1 sm:flex-none"
                                onClick={() => setSelectedLead(lead)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto w-full max-w-[95vw] mx-auto">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Lead Details
                                  </DialogTitle>
                                </DialogHeader>
                                {selectedLead && (
                                  <div className="space-y-6 w-full max-w-full">
                                    {/* Header */}
                                    <div className="flex items-start justify-between w-full">
                                      <div className="w-full min-w-0">
                                        <h2 className="text-2xl font-bold text-gray-900 break-words">{selectedLead.name}</h2>
                                        <div className="flex flex-wrap items-center gap-2 mt-2 w-full">
                                          <Badge className={getStatusColor(selectedLead.status)}>
                                            {selectedLead.status.replace('_', ' ')}
                                          </Badge>
                                          <Badge className={getPriorityColor(selectedLead.priority)}>
                                            {selectedLead.priority}
                                          </Badge>
                                          <span className="text-sm text-gray-500 break-words">
                                            Score: {selectedLead.lead_score}/100
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                          <Mail className="h-4 w-4 text-gray-400" />
                                          <div>
                                            <p className="text-sm font-medium text-gray-500">Email</p>
                                            <button 
                                              className="text-blue-600 hover:underline cursor-pointer text-left"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                console.log('Email link clicked:', selectedLead.email);
                                                // Validate email format before opening
                                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                                if (!emailRegex.test(selectedLead.email)) {
                                                  console.warn('Invalid email format');
                                                  showError('Invalid Email', 'Please check the email format and try again.');
                                                  return;
                                                }
                                                // Open email client
                                                window.location.href = `mailto:${selectedLead.email}`;
                                                success('Email Opened', `Opening email client for ${selectedLead.email}`);
                                              }}
                                            >
                                              {selectedLead.email}
                                            </button>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Phone className="h-4 w-4 text-gray-400" />
                                          <div>
                                            <p className="text-sm font-medium text-gray-500">Phone</p>
                                            {selectedLead.phone ? (
                                              <button 
                                                className="text-blue-600 hover:underline cursor-pointer text-left"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  e.stopPropagation();
                                                  console.log('Phone link clicked:', selectedLead.phone);
                                                  // Ensure phone number is properly formatted
                                                  const phoneNumber = selectedLead.phone.replace(/\D/g, '');
                                                  if (phoneNumber.length >= 10) {
                                                    console.log('Calling:', phoneNumber);
                                                    window.location.href = `tel:${phoneNumber}`;
                                                    success('Call Initiated', `Calling ${selectedLead.phone}`);
                                                  } else {
                                                    console.warn('Invalid phone number format');
                                                    showError('Invalid Phone Number', 'Please check the phone number format and try again.');
                                                  }
                                                }}
                                              >
                                                {selectedLead.phone}
                                              </button>
                                            ) : (
                                              <span className="text-gray-400">Not provided</span>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Building className="h-4 w-4 text-gray-400" />
                                          <div>
                                            <p className="text-sm font-medium text-gray-500">Company</p>
                                            <p className="text-gray-900">{selectedLead.company || 'Not provided'}</p>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                          <Target className="h-4 w-4 text-gray-400" />
                                          <div>
                                            <p className="text-sm font-medium text-gray-500">Service Type</p>
                                            <p className="text-gray-900">{selectedLead.service_type}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <DollarIcon className="h-4 w-4 text-gray-400" />
                                          <div>
                                            <p className="text-sm font-medium text-gray-500">Budget Range</p>
                                            <p className="text-gray-900">{selectedLead.budget_range || 'Not specified'}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <MapPin className="h-4 w-4 text-gray-400" />
                                          <div>
                                            <p className="text-sm font-medium text-gray-500">Location</p>
                                            <p className="text-gray-900">{selectedLead.location || 'Not specified'}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Remote Work Preference */}
                                    {selectedLead.remote_work && (
                                      <div className="border-t pt-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Remote Work Preference</h3>
                                        <div className="flex items-center gap-3">
                                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                          <span className="text-gray-900">
                                            {selectedLead.remote_work === 'other' ? selectedLead.remote_work_details : selectedLead.remote_work}
                                          </span>
                                        </div>
                                      </div>
                                    )}

                                    {/* Message */}
                                    {selectedLead.message && (
                                      <div className="border-t pt-4 w-full">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 break-words">Message</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg w-full overflow-hidden">
                                          <div className="w-full overflow-auto max-h-40 message-content">
                                            <p className="text-gray-700">{selectedLead.message}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {/* Metadata */}
                                    <div className="border-t pt-4 w-full">
                                      <h3 className="text-lg font-semibold text-gray-900 mb-3 break-words">Lead Information</h3>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm w-full">
                                        <div className="w-full min-w-0">
                                          <p className="text-gray-500 break-words">Source</p>
                                          <p className="text-gray-900 break-words">{selectedLead.source}</p>
                                        </div>
                                        <div className="w-full min-w-0">
                                          <p className="text-gray-500 break-words">Created</p>
                                          <p className="text-gray-900 break-words">{formatDate(selectedLead.created_at)}</p>
                                        </div>
                                        <div className="w-full min-w-0">
                                          <p className="text-gray-500 break-words">Last Updated</p>
                                          <p className="text-gray-900 break-words">{formatDate(selectedLead.updated_at)}</p>
                                        </div>
                                        {selectedLead.website_url && (
                                          <div className="w-full min-w-0">
                                            <p className="text-gray-500 break-words">Website</p>
                                            <a href={selectedLead.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all overflow-wrap-anywhere">
                                              {selectedLead.website_url}
                                            </a>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="border-t pt-4 flex gap-3">
                                      <Button 
                                        className="flex-1 bg-black hover:bg-gray-800 text-white"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          console.log('Call Lead button clicked');
                                          if (selectedLead.phone) {
                                            const phoneNumber = selectedLead.phone.replace(/\D/g, '');
                                            if (phoneNumber.length >= 10) {
                                              console.log('Calling:', phoneNumber);
                                              window.location.href = `tel:${phoneNumber}`;
                                              success('Call Initiated', `Calling ${selectedLead.phone}`);
                                            } else {
                                              showError('Invalid Phone Number', 'Please check the phone number format and try again.');
                                            }
                                          } else {
                                            warning('No Phone Number', 'This lead has not provided a phone number.');
                                          }
                                        }}
                                        type="button"
                                      >
                                        <Phone className="h-4 w-4 mr-2" />
                                        Call Lead
                                      </Button>
                                      <Button 
                                        variant="outline" 
                                        className="flex-1 border border-gray-300 hover:bg-gray-50"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          console.log('Send Email button clicked');
                                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                          if (emailRegex.test(selectedLead.email)) {
                                            console.log('Opening email for:', selectedLead.email);
                                            window.location.href = `mailto:${selectedLead.email}`;
                                            success('Email Opened', `Opening email client for ${selectedLead.email}`);
                                          } else {
                                            showError('Invalid Email', 'Please check the email format and try again.');
                                          }
                                        }}
                                        type="button"
                                      >
                                        <Mail className="h-4 w-4 mr-2" />
                                        Send Email
                                      </Button>
                                      <Button 
                                        variant="outline" 
                                        className="flex-1 border border-gray-300 hover:bg-gray-50"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          console.log('Add Note button clicked');
                                          // For now, just show an alert. In a real app, this would open a note modal
                                          const note = prompt('Add a note for this lead:');
                                          if (note && note.trim()) {
                                            console.log(`Note added for ${selectedLead.name}: ${note}`);
                                            success('Note Added', 'Your note has been saved successfully!');
                                          }
                                        }}
                                        type="button"
                                      >
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Add Note
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          
                          {/* Quick Action Buttons */}
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1 sm:flex-none"
                            onClick={() => {
                              if (lead.phone) {
                                const phoneNumber = lead.phone.replace(/\D/g, '');
                                if (phoneNumber.length >= 10) {
                                  window.location.href = `tel:${phoneNumber}`;
                                  success('Call Initiated', `Calling ${lead.phone}`);
                                } else {
                                  showError('Invalid Phone Number', 'Please check the phone number format and try again.');
                                }
                              } else {
                                warning('No Phone Number', 'This lead has not provided a phone number.');
                              }
                            }}
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1 sm:flex-none"
                            onClick={() => {
                              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                              if (emailRegex.test(lead.email)) {
                                window.location.href = `mailto:${lead.email}`;
                                success('Email Opened', `Opening email client for ${lead.email}`);
                              } else {
                                showError('Invalid Email', 'Please check the email format and try again.');
                              }
                            }}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

           {/* Portfolio Tab */}
           <TabsContent value="portfolio">
             <div className="space-y-6">
               {/* Portfolio Stats */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <Card className="bg-blue-50 border-blue-200">
                   <CardContent className="p-6">
                     <div className="flex items-center justify-between">
                       <div className="bg-blue-100 p-3 rounded-lg">
                         <Briefcase className="w-6 h-6 text-blue-600" />
                       </div>
                       <div className="text-right">
                         <div className="text-3xl font-bold text-blue-600">{dashboardData.totalProjects}</div>
                         <div className="text-sm text-blue-600">Total Projects</div>
                       </div>
                     </div>
                     <div className="mt-4">
                       <h3 className="font-semibold text-gray-900">Published Projects</h3>
                     </div>
                   </CardContent>
                 </Card>

                 <Card className="bg-green-50 border-green-200">
                   <CardContent className="p-6">
                     <div className="flex items-center justify-between">
                       <div className="bg-green-100 p-3 rounded-lg">
                         <Eye className="w-6 h-6 text-green-600" />
                       </div>
                       <div className="text-right">
                         <div className="text-3xl font-bold text-green-600">{dashboardData.portfolioViews}</div>
                         <div className="text-sm text-green-600">Total Views</div>
                       </div>
                     </div>
                     <div className="mt-4">
                       <h3 className="font-semibold text-gray-900">Portfolio Views</h3>
                     </div>
                   </CardContent>
                 </Card>

                 <Card className="bg-purple-50 border-purple-200">
                   <CardContent className="p-6">
                     <div className="flex items-center justify-between">
                       <div className="bg-purple-100 p-3 rounded-lg">
                         <Star className="w-6 h-6 text-purple-600" />
                       </div>
                       <div className="text-right">
                         <div className="text-3xl font-bold text-purple-600">{dashboardData.featuredProjects}</div>
                         <div className="text-sm text-purple-600">Featured</div>
                       </div>
                     </div>
                     <div className="mt-4">
                       <h3 className="font-semibold text-gray-900">Featured Projects</h3>
                     </div>
                   </CardContent>
                 </Card>
               </div>

               {/* Portfolio Management */}
               <Card>
                 <CardHeader>
                   <CardTitle className="flex items-center gap-3">
                     <Briefcase className="w-5 h-5 text-green-600" />
                     Portfolio Management
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <PortfolioManager />
                 </CardContent>
               </Card>
             </div>
           </TabsContent>

           {/* Blog Tab */}
           <TabsContent value="blog">
             <div className="space-y-6">
               {/* Blog Stats */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <Card className="bg-blue-50 border-blue-200">
                   <CardContent className="p-6">
                     <div className="flex items-center justify-between">
                       <div className="bg-blue-100 p-3 rounded-lg">
                         <FileText className="w-6 h-6 text-blue-600" />
                       </div>
                       <div className="text-right">
                         <div className="text-3xl font-bold text-blue-600">{dashboardData.totalPosts}</div>
                         <div className="text-sm text-blue-600">Total Posts</div>
                       </div>
                     </div>
                     <div className="mt-4">
                       <h3 className="font-semibold text-gray-900">All Blog Posts</h3>
                     </div>
                   </CardContent>
                 </Card>

                 <Card className="bg-green-50 border-green-200">
                   <CardContent className="p-6">
                     <div className="flex items-center justify-between">
                       <div className="bg-green-100 p-3 rounded-lg">
                         <Eye className="w-6 h-6 text-green-600" />
                       </div>
                       <div className="text-right">
                         <div className="text-3xl font-bold text-green-600">{dashboardData.blogViews}</div>
                         <div className="text-sm text-green-600">Total Views</div>
                       </div>
                     </div>
                     <div className="mt-4">
                       <h3 className="font-semibold text-gray-900">Blog Views</h3>
                     </div>
                   </CardContent>
                 </Card>

                 <Card className="bg-purple-50 border-purple-200">
                   <CardContent className="p-6">
                     <div className="flex items-center justify-between">
                       <div className="bg-purple-100 p-3 rounded-lg">
                         <CheckCircle className="w-6 h-6 text-purple-600" />
                       </div>
                       <div className="text-right">
                         <div className="text-3xl font-bold text-purple-600">{dashboardData.publishedPosts}</div>
                         <div className="text-sm text-purple-600">Published</div>
                       </div>
                     </div>
                     <div className="mt-4">
                       <h3 className="font-semibold text-gray-900">Published Posts</h3>
                     </div>
                   </CardContent>
                 </Card>
               </div>

               {/* Blog Management */}
               <Card>
                 <CardHeader>
                   <CardTitle className="flex items-center gap-3">
                     <FileText className="w-5 h-5 text-green-600" />
                     Blog Management
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <BlogManager />
                 </CardContent>
               </Card>
             </div>
           </TabsContent>

           {/* Projects Tab */}
           <TabsContent value="projects">
             <ProjectManagement />
           </TabsContent>
        </Tabs>
      </div>

    </div>
  )
}

export default CEODashboard