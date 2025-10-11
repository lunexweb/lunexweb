-- Setup Missing Tables for Lunexweb Application
-- This fixes the 404 errors you're seeing by creating all required tables

-- 1. Create page_views table (for analytics tracking)
CREATE TABLE IF NOT EXISTS public.page_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_title VARCHAR(255) NOT NULL,
    page_url TEXT NOT NULL,
    page_type VARCHAR(100),
    location VARCHAR(255),
    referrer TEXT,
    user_agent TEXT,
    session_id VARCHAR(255),
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create leads table (for contact forms)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service_type VARCHAR(255) NOT NULL,
    budget_range VARCHAR(100),
    message TEXT,
    remote_work VARCHAR(20) CHECK (remote_work IN ('yes', 'no', 'other')),
    remote_work_details VARCHAR(255),
    lead_score INTEGER DEFAULT 50 CHECK (lead_score >= 0 AND lead_score <= 100),
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN (
        'new', 'contacted', 'qualified', 'proposal_sent', 
        'negotiating', 'closed_won', 'closed_lost', 'nurturing'
    )),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    source VARCHAR(100) NOT NULL DEFAULT 'website_contact_form',
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    location VARCHAR(255),
    website_url VARCHAR(500),
    timeline VARCHAR(100),
    estimated_value DECIMAL(12,2),
    notes TEXT,
    assigned_to UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_contacted_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT leads_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- 3. Create analytics_events table (for general analytics)
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    properties JSONB,
    user_id UUID,
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    page_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create lead_analytics table (for lead tracking)
CREATE TABLE IF NOT EXISTS public.lead_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    source VARCHAR(100),
    page_visited TEXT,
    location VARCHAR(255),
    service_type VARCHAR(255),
    budget_range VARCHAR(100),
    conversion_value DECIMAL(12,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create contact_tracking table (for contact method tracking)
CREATE TABLE IF NOT EXISTS public.contact_tracking (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contact_method VARCHAR(50) NOT NULL,
    page_location TEXT,
    service_type VARCHAR(255),
    location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create service_analytics table (for service tracking)
CREATE TABLE IF NOT EXISTS public.service_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_type VARCHAR(255) NOT NULL,
    page_location TEXT,
    interest_level VARCHAR(50),
    location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create user_journey table (for user behavior tracking)
CREATE TABLE IF NOT EXISTS public.user_journey (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    step_name VARCHAR(255) NOT NULL,
    page_location TEXT,
    location VARCHAR(255),
    data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create portfolio_analytics table (for portfolio tracking)
CREATE TABLE IF NOT EXISTS public.portfolio_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID,
    view_type VARCHAR(100),
    location VARCHAR(255),
    referrer TEXT,
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Create blog_analytics table (for blog tracking)
CREATE TABLE IF NOT EXISTS public.blog_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID,
    view_type VARCHAR(100),
    location VARCHAR(255),
    referrer TEXT,
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON public.page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page_type ON public.page_views(page_type);

CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON public.leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_service_type ON public.leads(service_type);

CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON public.analytics_events(event_type);

CREATE INDEX IF NOT EXISTS idx_lead_analytics_lead_id ON public.lead_analytics(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_analytics_source ON public.lead_analytics(source);

CREATE INDEX IF NOT EXISTS idx_contact_tracking_method ON public.contact_tracking(contact_method);
CREATE INDEX IF NOT EXISTS idx_contact_tracking_created_at ON public.contact_tracking(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_service_analytics_service_type ON public.service_analytics(service_type);
CREATE INDEX IF NOT EXISTS idx_service_analytics_created_at ON public.service_analytics(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_journey_session_id ON public.user_journey(session_id);
CREATE INDEX IF NOT EXISTS idx_user_journey_step_name ON public.user_journey(step_name);

CREATE INDEX IF NOT EXISTS idx_portfolio_analytics_project_id ON public.portfolio_analytics(project_id);
CREATE INDEX IF NOT EXISTS idx_blog_analytics_post_id ON public.blog_analytics(post_id);

-- 11. Enable Row Level Security (RLS) for all tables
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_journey ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_analytics ENABLE ROW LEVEL SECURITY;

-- 12. Create permissive RLS policies (allow all operations for now)
-- Page Views
CREATE POLICY "Allow all page_views operations" ON public.page_views FOR ALL USING (true);

-- Leads
CREATE POLICY "Allow all leads operations" ON public.leads FOR ALL USING (true);

-- Analytics Events
CREATE POLICY "Allow all analytics_events operations" ON public.analytics_events FOR ALL USING (true);

-- Lead Analytics
CREATE POLICY "Allow all lead_analytics operations" ON public.lead_analytics FOR ALL USING (true);

-- Contact Tracking
CREATE POLICY "Allow all contact_tracking operations" ON public.contact_tracking FOR ALL USING (true);

-- Service Analytics
CREATE POLICY "Allow all service_analytics operations" ON public.service_analytics FOR ALL USING (true);

-- User Journey
CREATE POLICY "Allow all user_journey operations" ON public.user_journey FOR ALL USING (true);

-- Portfolio Analytics
CREATE POLICY "Allow all portfolio_analytics operations" ON public.portfolio_analytics FOR ALL USING (true);

-- Blog Analytics
CREATE POLICY "Allow all blog_analytics operations" ON public.blog_analytics FOR ALL USING (true);

-- 13. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 14. Create triggers for updated_at
CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON public.leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 15. Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Grant anonymous access for contact forms
GRANT SELECT, INSERT ON public.page_views TO anon;
GRANT SELECT, INSERT ON public.leads TO anon;
GRANT SELECT, INSERT ON public.analytics_events TO anon;
GRANT SELECT, INSERT ON public.lead_analytics TO anon;
GRANT SELECT, INSERT ON public.contact_tracking TO anon;
GRANT SELECT, INSERT ON public.service_analytics TO anon;
GRANT SELECT, INSERT ON public.user_journey TO anon;
GRANT SELECT, INSERT ON public.portfolio_analytics TO anon;
GRANT SELECT, INSERT ON public.blog_analytics TO anon;

-- 16. Insert sample data for testing
INSERT INTO public.leads (
    name, email, phone, company, service_type, budget_range, message,
    remote_work, remote_work_details, lead_score, status, priority, source, location
) VALUES 
(
    'John Smith', 'john@example.com', '+27123456789', 'Smith & Associates',
    'Law Firm Website Development', 'R30,000 - R50,000', 
    'We need a professional website for our law firm specializing in corporate law.',
    'no', null, 75, 'new', 'high', 'website_contact_form', 'Johannesburg, Gauteng'
),
(
    'Sarah Johnson', 'sarah@consulting.com', '+27987654321', 'Johnson Consulting',
    'Consulting Agency Websites', 'R50,000 - R100,000',
    'Looking for a sophisticated website to showcase our consulting services.',
    'yes', null, 80, 'contacted', 'high', 'website_contact_form', 'Cape Town, Western Cape'
)
ON CONFLICT DO NOTHING;

SELECT 'All missing tables created successfully! Your application should now work without 404 errors.' as status;
