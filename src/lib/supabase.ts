import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://slkdiwvawagzwmeyldcu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsa2Rpd3Zhd2FnendtZXlsZGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4Njc5MjUsImV4cCI6MjA3NTQ0MzkyNX0.fLNbMHvbcKkzKb5VG_tG2QTaVqzQd_f0sEpmUT961v8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Database types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type: string;
  budget_range?: string;
  timeline?: string;
  location?: string;
  website_url?: string;
  message?: string;
  remote_work?: string;
  other_service?: string;
  lead_score: number;
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiating' | 'closed_won' | 'closed_lost' | 'nurturing';
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  assigned_to?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimated_value?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  last_contacted_at?: string;
}

export interface Communication {
  id: string;
  lead_id: string;
  user_id?: string;
  type: 'email' | 'phone' | 'whatsapp' | 'form_submission' | 'meeting';
  direction: 'inbound' | 'outbound';
  subject?: string;
  content?: string;
  duration?: number;
  status: 'pending' | 'completed' | 'failed' | 'no_answer';
  outcome?: string;
  follow_up_required: boolean;
  follow_up_date?: string;
  created_at: string;
}

export interface Project {
  id: string;
  lead_id?: string;
  name: string;
  description?: string;
  status: 'planning' | 'design' | 'development' | 'testing' | 'launch' | 'completed' | 'on_hold' | 'cancelled';
  start_date?: string;
  end_date?: string;
  budget?: number;
  paid_amount: number;
  assigned_to?: string;
  progress: number;
  milestones?: any;
  deliverables?: any;
  client_feedback?: string;
  created_at: string;
  updated_at: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  type: 'welcome' | 'nurturing' | 'follow_up' | 'promotional';
  subject: string;
  content: string;
  sent_to_lead_id?: string;
  sent_at?: string;
  opened_at?: string;
  clicked_at?: string;
  replied_at?: string;
  bounced: boolean;
  unsubscribed: boolean;
  created_at: string;
}

export interface DashboardStats {
  total_leads: number;
  new_leads_today: number;
  qualified_leads: number;
  converted_leads: number;
  total_revenue: number;
  avg_response_time: number;
  conversion_rate: number;
  avg_lead_score: number;
}

export interface LeadQueueItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type: string;
  budget_range?: string;
  timeline?: string;
  message?: string;
  remote_work?: string;
  other_service?: string;
  lead_score: number;
  status: string;
  created_at: string;
  hours_since_created: number;
  priority: string;
}

// Database functions
export const db = {
  // Lead operations
  async createLead(leadData: Partial<Lead>) {
    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getLeads(filters?: { status?: string; limit?: number; offset?: number }) {
    let query = supabase.from('leads').select('*');
    
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async updateLead(id: string, updates: Partial<Lead>) {
    const { data, error } = await supabase
      .from('leads')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Communication operations
  async createCommunication(communicationData: Partial<Communication>) {
    const { data, error } = await supabase
      .from('communications')
      .insert([communicationData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getCommunicationHistory(leadId: string) {
    const { data, error } = await supabase
      .rpc('get_communication_history', { p_lead_id: leadId });
    
    if (error) throw error;
    return data;
  },

  // Dashboard analytics
  async getDashboardStats(startDate?: string, endDate?: string) {
    const { data, error } = await supabase
      .rpc('get_dashboard_stats', { 
        start_date: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end_date: endDate || new Date().toISOString().split('T')[0]
      });
    
    if (error) throw error;
    return data[0];
  },

  async getLeadQueue() {
    const { data, error } = await supabase
      .rpc('get_lead_queue');
    
    if (error) throw error;
    return data;
  },

  // Analytics events
  async trackEvent(eventData: {
    lead_id?: string;
    event_type: string;
    event_name: string;
    page_url?: string;
    referrer?: string;
    properties?: any;
  }) {
    const { data, error } = await supabase
      .from('analytics_events')
      .insert([{
        ...eventData,
        session_id: eventData.lead_id || 'anonymous',
      }]);
    
    if (error) throw error;
    return data;
  },

  // Real-time subscriptions
  subscribeToLeads(callback: (payload: any) => void) {
    return supabase
      .channel('leads_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'leads' }, 
        callback
      )
      .subscribe();
  },

  subscribeToCommunications(callback: (payload: any) => void) {
    return supabase
      .channel('communications_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'communications' }, 
        callback
      )
      .subscribe();
  },

  subscribeToDashboardMetrics(callback: (payload: any) => void) {
    return supabase
      .channel('dashboard_metrics')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'dashboard_metrics' }, 
        callback
      )
      .subscribe();
  }
};

// Utility functions
export const utils = {
  // Lead scoring
  calculateLeadScore(data: {
    budget_range?: string;
    timeline?: string;
    service_type: string;
    has_company: boolean;
    has_website: boolean;
    message_length: number;
  }): number {
    let score = 0;
    
    // Budget scoring (40% weight)
    const budgetScores: Record<string, number> = {
      'over-100k': 40,
      '50k-100k': 32,
      '25k-50k': 24,
      '10k-25k': 16,
      'under-10k': 8
    };
    score += budgetScores[data.budget_range || ''] || 0;
    
    // Timeline scoring (25% weight)
    const timelineScores: Record<string, number> = {
      'asap': 25,
      '1-month': 22,
      '2-months': 18,
      '3-months': 15,
      'flexible': 10
    };
    score += timelineScores[data.timeline || ''] || 0;
    
    // Service type scoring (15% weight)
    const serviceScores: Record<string, number> = {
      'law-firm': 15,
      'consulting': 14,
      'financial': 13,
      'luxury': 15,
      'real-estate': 12,
      'ecommerce': 10
    };
    score += serviceScores[data.service_type] || 7;
    
    // Company info (10% weight)
    score += data.has_company ? 10 : 5;
    
    // Website presence (5% weight)
    score += data.has_website ? 5 : 3;
    
    // Goals clarity (5% weight)
    score += data.message_length > 10 ? 5 : 2;
    
    return Math.min(score, 100);
  },

  // Format currency
  formatCurrency(amount: number, currency: string = 'ZAR'): string {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },

  // Format date
  formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  },

  // Get lead priority color
  getPriorityColor(priority: string): string {
    const colors = {
      'urgent': 'text-red-600 bg-red-100',
      'high': 'text-orange-600 bg-orange-100',
      'medium': 'text-yellow-600 bg-yellow-100',
      'low': 'text-green-600 bg-green-100'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  },

  // Get status color
  getStatusColor(status: string): string {
    const colors = {
      'new': 'text-blue-600 bg-blue-100',
      'contacted': 'text-yellow-600 bg-yellow-100',
      'qualified': 'text-green-600 bg-green-100',
      'proposal_sent': 'text-purple-600 bg-purple-100',
      'negotiating': 'text-indigo-600 bg-indigo-100',
      'closed_won': 'text-green-700 bg-green-200',
      'closed_lost': 'text-red-600 bg-red-100',
      'nurturing': 'text-gray-600 bg-gray-100'
    };
    return colors[status as keyof typeof colors] || colors.new;
  }
};
