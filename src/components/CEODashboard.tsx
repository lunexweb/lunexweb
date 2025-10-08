import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Phone, 
  Mail, 
  MessageCircle,
  Eye,
  Target,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Settings,
  Bell,
  User,
  Calendar,
  BarChart3,
  PieChart,
  MapPin,
  Star,
  Home,
  MoreVertical,
  Edit,
  Trash2,
  Save,
  Copy,
  ExternalLink,
  FileText,
  Building,
  Globe,
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { supabase, db, utils, type DashboardStats, type LeadQueueItem } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface DashboardMetrics {
  new_leads: number;
  contacted_leads: number;
  qualified_leads: number;
  won_leads: number;
  today_leads: number;
  yesterday_leads: number;
  today_revenue: number;
  monthly_revenue: number;
  avg_lead_score: number;
  today_communications: number;
}

const CEODashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leadQueue, setLeadQueue] = useState<LeadQueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedLead, setSelectedLead] = useState<LeadQueueItem | null>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [editingLead, setEditingLead] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>({});
  const [allLeads, setAllLeads] = useState<LeadQueueItem[]>([]);
  const [viewMode, setViewMode] = useState<'queue' | 'in_progress' | 'converted' | 'all'>('queue');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all leads directly from the leads table
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (leadsError) {
        console.error('Error fetching leads:', leadsError);
        return;
      }

      // Calculate metrics from the leads data
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const metricsData = {
        new_leads: leadsData?.filter(lead => lead.status === 'new').length || 0,
        contacted_leads: leadsData?.filter(lead => lead.status === 'contacted').length || 0,
        qualified_leads: leadsData?.filter(lead => lead.status === 'qualified').length || 0,
        won_leads: leadsData?.filter(lead => lead.status === 'closed_won').length || 0,
        today_leads: leadsData?.filter(lead => new Date(lead.created_at) >= today).length || 0,
        yesterday_leads: leadsData?.filter(lead => {
          const leadDate = new Date(lead.created_at);
          return leadDate >= yesterday && leadDate < today;
        }).length || 0,
        today_revenue: leadsData?.filter(lead => new Date(lead.created_at) >= today)
          .reduce((sum, lead) => sum + (lead.estimated_value || 0), 0) || 0,
        monthly_revenue: leadsData?.filter(lead => new Date(lead.created_at) >= thisMonth)
          .reduce((sum, lead) => sum + (lead.estimated_value || 0), 0) || 0,
        avg_lead_score: leadsData?.length > 0 
          ? Math.round(leadsData.reduce((sum, lead) => sum + (lead.lead_score || 0), 0) / leadsData.length)
          : 0,
        today_communications: 0 // This would need to be calculated from communications table
      };

      // Create stats data
      const statsData = {
        total_leads: leadsData?.length || 0,
        avg_response_time: 120, // Placeholder - would need communications data
        conversion_rate: leadsData?.length > 0 
          ? Math.round(((metricsData.won_leads / leadsData.length) * 100))
          : 0,
        converted_leads: metricsData.won_leads
      };

      // Create lead queue (new leads with priority sorting)
      const queueData = leadsData
        ?.filter(lead => lead.status === 'new')
        ?.sort((a, b) => {
          // Sort by priority first, then by created_at
          const priorityOrder = { 'urgent': 4, 'high': 3, 'medium': 2, 'low': 1 };
          const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
          const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
          
          if (aPriority !== bPriority) {
            return bPriority - aPriority;
          }
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        })
        ?.slice(0, 10) || [];

      // Add calculated fields for display
      const enrichedQueueData = queueData.map(lead => ({
        ...lead,
        hours_since_created: Math.round((now.getTime() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60))
      }));

      // Add calculated fields for all leads
      const enrichedAllLeads = leadsData.map(lead => ({
        ...lead,
        hours_since_created: Math.round((now.getTime() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60))
      }));

      setMetrics(metricsData);
      setStats(statsData);
      setLeadQueue(enrichedQueueData);
      setAllLeads(enrichedAllLeads);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    fetchDashboardData();

    // Subscribe to real-time updates
    const leadsSubscription = supabase
      .channel('leads_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'leads' }, 
        () => {
          fetchDashboardData();
        }
      )
      .subscribe();

    const communicationsSubscription = supabase
      .channel('communications_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'communications' }, 
        () => {
          fetchDashboardData();
        }
      )
      .subscribe();

    // Refresh data every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);

    return () => {
      leadsSubscription.unsubscribe();
      communicationsSubscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  // Handle lead actions
  const handleLeadAction = async (leadId: string, action: string) => {
    try {
      switch (action) {
        case 'contact':
          await db.updateLead(leadId, { 
            status: 'contacted',
            last_contacted_at: new Date().toISOString()
          });
          await db.createCommunication({
            lead_id: leadId,
            type: 'phone',
            direction: 'outbound',
            status: 'completed',
            content: 'Initial contact made'
          });
          break;
        case 'qualify':
          await db.updateLead(leadId, { status: 'qualified' });
          break;
        case 'proposal':
          await db.updateLead(leadId, { status: 'proposal_sent' });
          break;
      }
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  // Handle lead status update
  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      await db.updateLead(leadId, { 
        status: newStatus,
        updated_at: new Date().toISOString()
      });
      fetchDashboardData(); // Refresh the data
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  // Delete lead
  const handleDeleteLead = async (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      try {
        const { error } = await supabase
          .from('leads')
          .delete()
          .eq('id', leadId);
        
        if (error) throw error;
        fetchDashboardData(); // Refresh the data
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  };

  // View lead details
  const handleViewLead = (lead: LeadQueueItem) => {
    setSelectedLead(lead);
    setShowLeadModal(true);
  };

  // Toggle lead expansion
  const toggleLeadExpansion = (leadId: string) => {
    setExpandedLead(expandedLead === leadId ? null : leadId);
  };

  // Start editing lead
  const startEditingLead = (lead: LeadQueueItem) => {
    setEditingLead(lead.id);
    setEditFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || '',
      company: lead.company || '',
      service_type: lead.service_type || '',
      budget_range: lead.budget_range || '',
      timeline: lead.timeline || '',
      priority: lead.priority,
      status: lead.status,
      message: lead.message || ''
    });
  };

  // Save lead edits
  const saveLeadEdits = async (leadId: string) => {
    try {
      await db.updateLead(leadId, {
        ...editFormData,
        updated_at: new Date().toISOString()
      });
      setEditingLead(null);
      setEditFormData({});
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingLead(null);
    setEditFormData({});
  };

  // Copy lead info to clipboard
  const copyLeadInfo = (lead: LeadQueueItem) => {
    const formatBudgetRange = (range: string) => {
      switch (range) {
        case 'under-10k': return 'Under R10,000';
        case '10k-25k': return 'R10,000 - R25,000';
        case '25k-50k': return 'R25,000 - R50,000';
        case '50k-100k': return 'R50,000 - R100,000';
        case 'over-100k': return 'Over R100,000';
        default: return range || 'N/A';
      }
    };
    
    const formatRemoteWork = (remote: string) => {
      switch (remote) {
        case 'yes': return 'Yes, remote work is fine';
        case 'prefer-local': return 'Prefer local meetings';
        case 'hybrid': return 'Mix of remote and in-person';
        case 'no': return 'No, must be in-person';
        default: return remote || 'N/A';
      }
    };
    
    const info = `Name: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone || 'N/A'}\nCompany: ${lead.company || 'N/A'}\nService: ${lead.service_type || 'N/A'}\nBudget: ${formatBudgetRange(lead.budget_range || '')}\nTimeline: ${lead.timeline || 'N/A'}\nRemote Work: ${formatRemoteWork(lead.remote_work || '')}\n${lead.other_service ? `Custom Service: ${lead.other_service}\n` : ''}Message: ${lead.message || 'N/A'}`;
    navigator.clipboard.writeText(info);
  };

  // Format time ago
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.round(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    const diffInWeeks = Math.round(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  // Filter leads based on current filters and view mode
  const getFilteredLeads = () => {
    let filtered = allLeads;

    // Filter by view mode
    switch (viewMode) {
      case 'queue':
        filtered = filtered.filter(lead => lead.status === 'new');
        break;
      case 'in_progress':
        filtered = filtered.filter(lead => ['contacted', 'qualified', 'proposal_sent', 'negotiating'].includes(lead.status));
        break;
      case 'converted':
        filtered = filtered.filter(lead => lead.status === 'closed_won');
        break;
      case 'all':
        // No additional filtering
        break;
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(lead => lead.status === filterStatus);
    }

    // Filter by priority
    if (filterPriority !== 'all') {
      filtered = filtered.filter(lead => lead.priority === filterPriority);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.service_type && lead.service_type.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort by priority and date
    return filtered.sort((a, b) => {
      const priorityOrder = { 'urgent': 4, 'high': 3, 'medium': 2, 'low': 1 };
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
  };

  // Get view title
  const getViewTitle = () => {
    switch (viewMode) {
      case 'queue': return 'Lead Queue';
      case 'in_progress': return 'In Progress Leads';
      case 'converted': return 'Converted Leads';
      case 'all': return 'All Leads';
      default: return 'Leads';
    }
  };

  if (loading && !metrics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    CEO Dashboard
                  </h1>
                   <p className="text-sm text-slate-700 flex items-center space-x-2">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     <span>Last updated: {utils.formatDate(lastUpdated)}</span>
                   </p>
                </div>
              </div>
            </div>
             <div className="flex items-center space-x-3">
               <Link to="/">
                 <Button
                   variant="outline"
                   size="sm"
                   className="bg-white/80 hover:bg-green-50 border-slate-200 hover:border-green-300 text-slate-700 hover:text-green-700"
                 >
                   <Home className="w-4 h-4 mr-2" />
                   Home
                 </Button>
               </Link>
               <Button
                 variant="outline"
                 size="sm"
                 onClick={fetchDashboardData}
                 disabled={loading}
                 className="bg-white/80 hover:bg-green-50 border-slate-200 hover:border-green-300 text-slate-700 hover:text-green-700"
               >
                 <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                 Refresh
               </Button>
               <Button 
                 variant="outline" 
                 size="sm"
                 className="bg-white/80 hover:bg-blue-50 border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700"
               >
                 <Download className="w-4 h-4 mr-2" />
                 Export
               </Button>
               <Button 
                 size="sm"
                 className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
               >
                 <Settings className="w-4 h-4 mr-2" />
                 Settings
               </Button>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full -translate-y-16 translate-x-16"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-1">New Leads Today</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      {metrics?.today_leads || 0}
                    </p>
                     <p className="text-xs text-slate-700 mt-2 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                        {metrics?.yesterday_leads || 0} yesterday
                      </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-full -translate-y-16 translate-x-16"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-1">Revenue This Month</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                      {utils.formatCurrency(metrics?.monthly_revenue || 0)}
                    </p>
                     <p className="text-xs text-slate-700 mt-2 flex items-center">
                        <DollarSign className="w-3 h-3 mr-1 text-green-500" />
                        {utils.formatCurrency(metrics?.today_revenue || 0)} today
                      </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
                    <DollarSign className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-full -translate-y-16 translate-x-16"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-1">Avg Response Time</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                      {stats?.avg_response_time ? `${Math.round(stats.avg_response_time)}m` : 'N/A'}
                    </p>
                     <p className="text-xs text-slate-700 mt-2 flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-purple-500" />
                        Target: As soon as possible
                      </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-full -translate-y-16 translate-x-16"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-1">Conversion Rate</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                      {stats?.conversion_rate ? `${stats.conversion_rate}%` : '0%'}
                    </p>
                     <p className="text-xs text-slate-700 mt-2 flex items-center">
                        <Target className="w-3 h-3 mr-1 text-orange-500" />
                        {stats?.converted_leads || 0} closed this month
                      </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Lead Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-slate-800">
                  <div className="p-2 bg-blue-500 rounded-lg mr-3">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  New Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
                  {metrics?.new_leads || 0}
                </div>
                <p className="text-sm text-slate-600 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  Awaiting first contact
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-slate-800">
                  <div className="p-2 bg-yellow-500 rounded-lg mr-3">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent mb-2">
                  {(metrics?.contacted_leads || 0) + (metrics?.qualified_leads || 0)}
                </div>
                <p className="text-sm text-slate-600 flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  Being nurtured
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-slate-800">
                  <div className="p-2 bg-green-500 rounded-lg mr-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  Converted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
                  {metrics?.won_leads || 0}
                </div>
                <p className="text-sm text-slate-600 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Closed won
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

         {/* Comprehensive Lead Management */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8 }}
         >
           <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
             <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-t-lg border-b border-slate-200/50">
               <CardTitle className="flex items-center justify-between">
                 <div className="flex items-center">
                   <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg mr-3">
                     <Users className="w-5 h-5 text-white" />
                   </div>
                   <span className="text-xl font-bold text-slate-800">{getViewTitle()}</span>
                 </div>
                 <div className="flex items-center space-x-3">
                   <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 px-3 py-1">
                     {getFilteredLeads().length} leads
                   </Badge>
                   <Button
                     size="sm"
                     variant="outline"
                     onClick={fetchDashboardData}
                     className="bg-white hover:bg-green-50 border-slate-300 hover:border-green-400 text-slate-700 hover:text-green-700"
                   >
                     <RefreshCw className="w-4 h-4 mr-2" />
                     Refresh
                   </Button>
                 </div>
               </CardTitle>
             </CardHeader>
             
             {/* View Mode Toggle */}
             <div className="px-4 sm:px-6 pb-4">
               <div className="flex items-center justify-between">
                 <div className="flex items-center bg-slate-100 rounded-lg p-1 w-full sm:w-auto overflow-x-auto">
                   <div className="flex items-center space-x-1 min-w-max">
                     <Button
                       variant={viewMode === 'queue' ? 'default' : 'ghost'}
                       size="sm"
                       onClick={() => setViewMode('queue')}
                       className={`${viewMode === 'queue' ? 'bg-white shadow-sm text-slate-900' : 'hover:bg-slate-200 text-slate-700'} whitespace-nowrap text-xs sm:text-sm px-2 sm:px-3`}
                     >
                       Queue
                     </Button>
                     <Button
                       variant={viewMode === 'in_progress' ? 'default' : 'ghost'}
                       size="sm"
                       onClick={() => setViewMode('in_progress')}
                       className={`${viewMode === 'in_progress' ? 'bg-white shadow-sm text-slate-900' : 'hover:bg-slate-200 text-slate-700'} whitespace-nowrap text-xs sm:text-sm px-2 sm:px-3`}
                     >
                       In Progress
                     </Button>
                     <Button
                       variant={viewMode === 'converted' ? 'default' : 'ghost'}
                       size="sm"
                       onClick={() => setViewMode('converted')}
                       className={`${viewMode === 'converted' ? 'bg-white shadow-sm text-slate-900' : 'hover:bg-slate-200 text-slate-700'} whitespace-nowrap text-xs sm:text-sm px-2 sm:px-3`}
                     >
                       Converted
                     </Button>
                     <Button
                       variant={viewMode === 'all' ? 'default' : 'ghost'}
                       size="sm"
                       onClick={() => setViewMode('all')}
                       className={`${viewMode === 'all' ? 'bg-white shadow-sm text-slate-900' : 'hover:bg-slate-200 text-slate-700'} whitespace-nowrap text-xs sm:text-sm px-2 sm:px-3`}
                     >
                       All Leads
                     </Button>
                   </div>
                 </div>
               </div>
             </div>

             {/* Search and Filters */}
             <div className="px-4 sm:px-6 pb-4">
               <div className="flex flex-col lg:flex-row gap-4 items-center">
                 {/* Search */}
                 <div className="flex-1 w-full">
                   <div className="relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-600" />
                     <Input
                       placeholder="Search leads by name, email, company, or service..."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="pl-10 bg-white border-slate-300 focus:border-green-500 text-slate-900 placeholder:text-slate-500 text-sm sm:text-base"
                     />
                   </div>
                 </div>

                 {/* Filters */}
                 <div className="flex gap-2 sm:gap-3 w-full lg:w-auto">
                   <Select value={filterStatus} onValueChange={setFilterStatus}>
                     <SelectTrigger className="w-24 sm:w-32 bg-white border-slate-300 text-slate-900 text-xs sm:text-sm">
                       <SelectValue placeholder="Status" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="all">All Status</SelectItem>
                       <SelectItem value="new">New</SelectItem>
                       <SelectItem value="contacted">Contacted</SelectItem>
                       <SelectItem value="qualified">Qualified</SelectItem>
                       <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                       <SelectItem value="closed_won">Won</SelectItem>
                       <SelectItem value="closed_lost">Lost</SelectItem>
                     </SelectContent>
                   </Select>

                   <Select value={filterPriority} onValueChange={setFilterPriority}>
                     <SelectTrigger className="w-24 sm:w-32 bg-white border-slate-300 text-slate-900 text-xs sm:text-sm">
                       <SelectValue placeholder="Priority" />
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
               </div>
             </div>

             <CardContent className="p-6 pt-0">
               {getFilteredLeads().length === 0 ? (
                 <div className="text-center py-12">
                   <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                     <Users className="w-8 h-8 text-slate-600" />
                   </div>
                   <p className="text-slate-700 text-lg font-medium">
                     {viewMode === 'queue' ? 'No leads in queue' :
                      viewMode === 'in_progress' ? 'No leads in progress' :
                      viewMode === 'converted' ? 'No converted leads' :
                      'No leads found'}
                   </p>
                   <p className="text-slate-600 text-sm mt-1">
                     {viewMode === 'queue' ? 'All caught up! Great work team.' :
                      viewMode === 'in_progress' ? 'No active leads being worked on.' :
                      viewMode === 'converted' ? 'No successful conversions yet.' :
                      'Try adjusting your filters or search terms.'}
                   </p>
                 </div>
               ) : (
                 <div className="space-y-4">
                   {getFilteredLeads().map((lead, index) => (
                     <motion.div
                       key={lead.id}
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: 0.1 * index }}
                       className="bg-gradient-to-r from-white to-slate-50/50 border border-slate-200 rounded-xl hover:shadow-lg hover:border-green-200 transition-all duration-300"
                     >
                       {/* Lead Header */}
                       <div className="p-4 sm:p-5">
                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                           <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                             <div className="flex-shrink-0">
                               <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                                 {lead.name.charAt(0).toUpperCase()}
                               </div>
                             </div>
                             <div className="min-w-0 flex-1">
                               <h4 className="font-bold text-slate-900 text-base sm:text-lg truncate">{lead.name}</h4>
                               <p className="text-xs sm:text-sm text-slate-600 font-medium truncate">{lead.company || lead.email}</p>
                               <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2">
                                 <Badge className={`${utils.getStatusColor(lead.status)} text-xs`}>
                                   {lead.status}
                                 </Badge>
                                 <Badge className={`${utils.getPriorityColor(lead.priority)} text-xs`}>
                                   {lead.priority}
                                 </Badge>
                                 <span className="text-xs text-slate-700 bg-slate-100 px-2 py-1 rounded font-medium">
                                   Score: {lead.lead_score}
                                 </span>
                               </div>
                             </div>
                           </div>
                           
                           <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                             <div className="text-left sm:text-right">
                               <p className="text-xs sm:text-sm text-slate-700 font-medium truncate">{lead.service_type}</p>
                               <p className="text-xs text-slate-700 bg-slate-100 px-2 py-1 rounded font-medium inline-block">
                                 {formatTimeAgo(lead.created_at)}
                               </p>
                             </div>
                           
                           {/* Action Buttons */}
                           <div className="flex items-center space-x-0.5 sm:space-x-2 overflow-x-auto">
                             {/* Quick Actions */}
                             {lead.phone && (
                               <Button 
                                 size="sm" 
                                 variant="outline"
                                 onClick={() => window.open(`tel:${lead.phone}`, '_self')}
                                 className="bg-white hover:bg-blue-50 border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-700 p-1.5 sm:p-2 flex-shrink-0"
                                 title="Call"
                               >
                                 <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                               </Button>
                             )}
                             <Button 
                               size="sm" 
                               variant="outline"
                               onClick={() => window.open(`mailto:${lead.email}`, '_self')}
                               className="bg-white hover:bg-purple-50 border-slate-300 hover:border-purple-400 text-slate-700 hover:text-purple-700 p-1.5 sm:p-2 flex-shrink-0"
                               title="Email"
                             >
                               <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                             </Button>
                             {lead.phone && (
                               <Button 
                                 size="sm" 
                                 variant="outline"
                                 onClick={() => window.open(`https://wa.me/${lead.phone}?text=${encodeURIComponent(`Hi ${lead.name}, I saw your inquiry on Lunexweb. How can I help you with your ${lead.service_type} project?`)}`, '_blank')}
                                 className="bg-white hover:bg-green-50 border-slate-300 hover:border-green-400 text-slate-700 hover:text-green-700 p-1.5 sm:p-2 flex-shrink-0"
                                 title="WhatsApp"
                               >
                                 <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                               </Button>
                             )}
                             
                             {/* Management Actions */}
                             <div className="flex items-center space-x-0.5 sm:space-x-1">
                               <Button 
                                 size="sm" 
                                 onClick={() => handleViewLead(lead)}
                                 className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg p-1.5 sm:p-2 flex-shrink-0"
                                 title="View Details"
                               >
                                 <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                               </Button>
                               <Button 
                                 size="sm" 
                                 variant="outline"
                                 onClick={() => startEditingLead(lead)}
                                 className="bg-white hover:bg-yellow-50 border-slate-300 hover:border-yellow-400 text-slate-700 hover:text-yellow-700 p-1.5 sm:p-2 flex-shrink-0"
                                 title="Edit"
                               >
                                 <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                               </Button>
                               <Button 
                                 size="sm" 
                                 variant="outline"
                                 onClick={() => copyLeadInfo(lead)}
                                 className="bg-white hover:bg-indigo-50 border-slate-300 hover:border-indigo-400 text-slate-700 hover:text-indigo-700 p-1.5 sm:p-2 flex-shrink-0"
                                 title="Copy Info"
                               >
                                 <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                               </Button>
                               <Button 
                                 size="sm" 
                                 variant="outline"
                                 onClick={() => toggleLeadExpansion(lead.id)}
                                 className="bg-white hover:bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-800 p-1.5 sm:p-2 flex-shrink-0"
                                 title="Expand/Collapse"
                               >
                                 {expandedLead === lead.id ? <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                               </Button>
                             </div>
                           </div>
                         </div>
                         </div>
                       </div>

                       {/* Expanded Lead Details */}
                       <AnimatePresence>
                         {expandedLead === lead.id && (
                           <motion.div
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: 'auto', opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             transition={{ duration: 0.3 }}
                             className="border-t border-slate-200 bg-slate-50/50"
                           >
                             <div className="p-4 sm:p-5">
                               {/* Contact Information */}
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div>
                                   <h5 className="font-semibold text-slate-800 mb-3 flex items-center">
                                     <User className="w-4 h-4 mr-2" />
                                     Contact Information
                                   </h5>
                                   <div className="space-y-2">
                                     <div className="flex items-start space-x-3">
                                       <Mail className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                       <div className="min-w-0 flex-1">
                                         <span className="text-sm text-slate-700 break-all">{lead.email}</span>
                                       </div>
                                       <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(lead.email)} className="flex-shrink-0">
                                         <Copy className="w-3 h-3" />
                                       </Button>
                                     </div>
                                     {lead.phone && (
                                       <div className="flex items-start space-x-3">
                                         <Phone className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                         <div className="min-w-0 flex-1">
                                           <span className="text-sm text-slate-700 break-all">{lead.phone}</span>
                                         </div>
                                         <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(lead.phone || '')} className="flex-shrink-0">
                                           <Copy className="w-3 h-3" />
                                         </Button>
                                       </div>
                                     )}
                                     {lead.company && (
                                       <div className="flex items-start space-x-3">
                                         <Building className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                         <div className="min-w-0 flex-1">
                                           <span className="text-sm text-slate-700 break-all">{lead.company}</span>
                                         </div>
                                       </div>
                                     )}
                                   </div>
                                 </div>

                                 <div>
                                   <h5 className="font-semibold text-slate-800 mb-3 flex items-center">
                                     <Target className="w-4 h-4 mr-2" />
                                     Project Details
                                   </h5>
                                   <div className="space-y-2">
                                     <div className="flex items-start space-x-3">
                                       <FileText className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                       <div className="min-w-0 flex-1">
                                         <span className="text-sm text-slate-700 break-words">{lead.service_type}</span>
                                       </div>
                                     </div>
                                     {lead.budget_range && (
                                       <div className="flex items-start space-x-3">
                                         <DollarSign className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                         <div className="min-w-0 flex-1">
                                           <span className="text-sm text-slate-700 font-medium break-words">
                                             {lead.budget_range === 'under-10k' ? 'Under R10,000' :
                                              lead.budget_range === '10k-25k' ? 'R10,000 - R25,000' :
                                              lead.budget_range === '25k-50k' ? 'R25,000 - R50,000' :
                                              lead.budget_range === '50k-100k' ? 'R50,000 - R100,000' :
                                              lead.budget_range === 'over-100k' ? 'Over R100,000' :
                                              lead.budget_range}
                                           </span>
                                         </div>
                                       </div>
                                     )}
                                     {lead.timeline && (
                                       <div className="flex items-start space-x-3">
                                         <Clock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                         <div className="min-w-0 flex-1">
                                           <span className="text-sm text-slate-700 break-words">{lead.timeline}</span>
                                         </div>
                                       </div>
                                     )}
                                     {lead.remote_work && (
                                       <div className="flex items-start space-x-3">
                                         <Globe className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                         <div className="min-w-0 flex-1">
                                           <span className="text-sm text-slate-700 break-words">
                                             Remote: {lead.remote_work === 'yes' ? 'Yes' :
                                                     lead.remote_work === 'prefer-local' ? 'Prefer Local' :
                                                     lead.remote_work === 'hybrid' ? 'Hybrid' :
                                                     lead.remote_work === 'no' ? 'In-Person Only' :
                                                     lead.remote_work}
                                           </span>
                                         </div>
                                       </div>
                                     )}
                                     {lead.other_service && (
                                       <div className="flex items-start space-x-3">
                                         <FileText className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                         <div className="min-w-0 flex-1">
                                           <span className="text-sm text-slate-700 break-words">Custom: {lead.other_service}</span>
                                         </div>
                                       </div>
                                     )}
                                   </div>
                                 </div>
                               </div>

                               {/* Full Message */}
                               {lead.message && (
                                 <div className="mt-6">
                                   <h5 className="font-semibold text-slate-800 mb-3 flex items-center">
                                     <FileText className="w-4 h-4 mr-2" />
                                     Message
                                   </h5>
                                   <div className="bg-white p-4 rounded-lg border border-slate-200">
                                     <p className="text-sm text-slate-700 whitespace-pre-wrap">{lead.message}</p>
                                   </div>
                                 </div>
                               )}

                               {/* Quick Actions */}
                               <div className="mt-6 flex flex-wrap gap-2">
                                 {lead.status === 'new' && (
                                   <>
                                     <Button 
                                       size="sm" 
                                       onClick={() => handleUpdateLeadStatus(lead.id, 'contacted')}
                                       className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
                                     >
                                       <CheckCircle className="w-4 h-4 mr-2" />
                                       Mark as Contacted
                                     </Button>
                                     <Button 
                                       size="sm" 
                                       variant="outline"
                                       onClick={() => handleUpdateLeadStatus(lead.id, 'qualified')}
                                       className="bg-white hover:bg-blue-50 border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-700"
                                     >
                                       <Target className="w-4 h-4 mr-2" />
                                       Mark as Qualified
                                     </Button>
                                   </>
                                 )}
                                 
                                 {['contacted', 'qualified', 'proposal_sent'].includes(lead.status) && (
                                   <>
                                     <Button 
                                       size="sm" 
                                       variant="outline"
                                       onClick={() => handleUpdateLeadStatus(lead.id, 'proposal_sent')}
                                       className="bg-white hover:bg-purple-50 border-slate-300 hover:border-purple-400 text-slate-700 hover:text-purple-700"
                                     >
                                       <FileText className="w-4 h-4 mr-2" />
                                       Send Proposal
                                     </Button>
                                     <Button 
                                       size="sm" 
                                       onClick={() => handleUpdateLeadStatus(lead.id, 'closed_won')}
                                       className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
                                     >
                                       <CheckCircle className="w-4 h-4 mr-2" />
                                       Mark as Won
                                     </Button>
                                   </>
                                 )}
                                 
                                 {lead.status !== 'closed_won' && lead.status !== 'closed_lost' && (
                                   <Button 
                                     size="sm" 
                                     variant="outline"
                                     onClick={() => handleUpdateLeadStatus(lead.id, 'closed_lost')}
                                     className="bg-white hover:bg-red-50 border-slate-300 hover:border-red-400 text-red-600 hover:text-red-700"
                                   >
                                     <XCircle className="w-4 h-4 mr-2" />
                                     Mark as Lost
                                   </Button>
                                 )}
                                 
                                 <Button 
                                   size="sm" 
                                   variant="outline"
                                   onClick={() => handleDeleteLead(lead.id)}
                                   className="bg-white hover:bg-red-50 border-slate-300 hover:border-red-400 text-red-600 hover:text-red-700"
                                 >
                                   <Trash2 className="w-4 h-4 mr-2" />
                                   Delete Lead
                                 </Button>
                               </div>
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </motion.div>
                   ))}
                 </div>
               )}
             </CardContent>
           </Card>
         </motion.div>

         {/* Recent Activity */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.9 }}
           className="mt-8"
         >
           <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
             <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-t-lg border-b border-slate-200/50">
               <CardTitle className="flex items-center text-slate-800">
                 <div className="p-2 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg mr-3">
                   <BarChart3 className="w-5 h-5 text-white" />
                 </div>
                 <span className="text-xl font-bold">Recent Activity</span>
               </CardTitle>
             </CardHeader>
             <CardContent className="p-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="text-center">
                   <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                     <MessageCircle className="w-8 h-8 text-blue-600" />
                   </div>
                   <h4 className="font-bold text-slate-800 text-lg mb-2">Today's Communications</h4>
                   <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
                     {metrics?.today_communications || 0}
                   </div>
                   <p className="text-sm text-slate-600 font-medium">Total interactions</p>
                 </div>
                 <div className="text-center">
                   <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                     <Star className="w-8 h-8 text-green-600" />
                   </div>
                   <h4 className="font-bold text-slate-800 text-lg mb-2">Average Lead Score</h4>
                   <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
                     {Math.round(metrics?.avg_lead_score || 0)}
                   </div>
                   <p className="text-sm text-slate-600 font-medium">Quality indicator</p>
                 </div>
                 <div className="text-center">
                   <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                     <Users className="w-8 h-8 text-purple-600" />
                   </div>
                   <h4 className="font-bold text-slate-800 text-lg mb-2">Total Pipeline</h4>
                   <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-2">
                     {stats?.total_leads || 0}
                   </div>
                   <p className="text-sm text-slate-600 font-medium">Active leads</p>
                 </div>
               </div>
             </CardContent>
           </Card>
         </motion.div>
      </div>
    </div>
  );
};

export default CEODashboard;
