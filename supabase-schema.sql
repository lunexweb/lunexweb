-- Lunexweb CEO Dashboard Database Schema
-- This file contains all the SQL needed to set up the database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create custom types
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiating', 'closed_won', 'closed_lost', 'nurturing');
CREATE TYPE communication_type AS ENUM ('email', 'phone', 'whatsapp', 'form_submission', 'meeting');
CREATE TYPE project_status AS ENUM ('planning', 'design', 'development', 'testing', 'launch', 'completed', 'on_hold', 'cancelled');
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'developer', 'sales');

-- Create users table for team members
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role user_role DEFAULT 'sales',
    phone TEXT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service_type TEXT NOT NULL,
    budget_range TEXT,
    timeline TEXT,
    location TEXT,
    website_url TEXT,
    message TEXT,
    lead_score INTEGER DEFAULT 0 CHECK (lead_score >= 0 AND lead_score <= 100),
    status lead_status DEFAULT 'new',
    source TEXT NOT NULL,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    assigned_to UUID REFERENCES users(id),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    estimated_value DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_contacted_at TIMESTAMP WITH TIME ZONE
);

-- Create communications table
CREATE TABLE communications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    type communication_type NOT NULL,
    direction TEXT CHECK (direction IN ('inbound', 'outbound')),
    subject TEXT,
    content TEXT,
    duration INTEGER, -- in seconds for calls
    status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'no_answer')),
    outcome TEXT,
    follow_up_required BOOLEAN DEFAULT false,
    follow_up_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create email_campaigns table
CREATE TABLE email_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('welcome', 'nurturing', 'follow_up', 'promotional')),
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    sent_to_lead_id UUID REFERENCES leads(id),
    sent_at TIMESTAMP WITH TIME ZONE,
    opened_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,
    replied_at TIMESTAMP WITH TIME ZONE,
    bounced BOOLEAN DEFAULT false,
    unsubscribed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id),
    name TEXT NOT NULL,
    description TEXT,
    status project_status DEFAULT 'planning',
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10,2),
    paid_amount DECIMAL(10,2) DEFAULT 0,
    assigned_to UUID REFERENCES users(id),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    milestones JSONB,
    deliverables JSONB,
    client_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics_events table
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id),
    event_type TEXT NOT NULL,
    event_name TEXT NOT NULL,
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    session_id TEXT,
    properties JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table for dashboard configuration
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_lead_score ON leads(lead_score);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_leads_source ON leads(source);

CREATE INDEX idx_communications_lead_id ON communications(lead_id);
CREATE INDEX idx_communications_created_at ON communications(created_at);
CREATE INDEX idx_communications_type ON communications(type);

CREATE INDEX idx_email_campaigns_sent_to_lead_id ON email_campaigns(sent_to_lead_id);
CREATE INDEX idx_email_campaigns_sent_at ON email_campaigns(sent_at);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_assigned_to ON projects(assigned_to);

CREATE INDEX idx_analytics_events_lead_id ON analytics_events(lead_id);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);

-- Create functions for dashboard analytics
CREATE OR REPLACE FUNCTION get_dashboard_stats(start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days', end_date DATE DEFAULT CURRENT_DATE)
RETURNS TABLE (
    total_leads INTEGER,
    new_leads_today INTEGER,
    qualified_leads INTEGER,
    converted_leads INTEGER,
    total_revenue DECIMAL(10,2),
    avg_response_time NUMERIC,
    conversion_rate NUMERIC,
    avg_lead_score NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*)::INTEGER FROM leads WHERE created_at >= start_date AND created_at <= end_date) as total_leads,
        (SELECT COUNT(*)::INTEGER FROM leads WHERE DATE(created_at) = CURRENT_DATE) as new_leads_today,
        (SELECT COUNT(*)::INTEGER FROM leads WHERE status IN ('qualified', 'proposal_sent', 'negotiating') AND created_at >= start_date AND created_at <= end_date) as qualified_leads,
        (SELECT COUNT(*)::INTEGER FROM leads WHERE status = 'closed_won' AND created_at >= start_date AND created_at <= end_date) as converted_leads,
        (SELECT COALESCE(SUM(paid_amount), 0) FROM projects WHERE created_at >= start_date AND created_at <= end_date) as total_revenue,
        (SELECT AVG(EXTRACT(EPOCH FROM (last_contacted_at - created_at))/60) FROM leads WHERE last_contacted_at IS NOT NULL AND created_at >= start_date AND created_at <= end_date) as avg_response_time,
        (SELECT ROUND((COUNT(*) FILTER (WHERE status = 'closed_won')::NUMERIC / NULLIF(COUNT(*), 0)) * 100, 2) FROM leads WHERE created_at >= start_date AND created_at <= end_date) as conversion_rate,
        (SELECT ROUND(AVG(lead_score), 1) FROM leads WHERE created_at >= start_date AND created_at <= end_date) as avg_lead_score;
END;
$$ LANGUAGE plpgsql;

-- Function to get lead queue
CREATE OR REPLACE FUNCTION get_lead_queue()
RETURNS TABLE (
    id UUID,
    name TEXT,
    email TEXT,
    phone TEXT,
    company TEXT,
    service_type TEXT,
    lead_score INTEGER,
    status lead_status,
    created_at TIMESTAMP WITH TIME ZONE,
    hours_since_created NUMERIC,
    priority TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        l.id,
        l.name,
        l.email,
        l.phone,
        l.company,
        l.service_type,
        l.lead_score,
        l.status,
        l.created_at,
        EXTRACT(EPOCH FROM (NOW() - l.created_at))/3600 as hours_since_created,
        l.priority
    FROM leads l
    WHERE l.status IN ('new', 'contacted', 'qualified')
    ORDER BY 
        CASE l.priority 
            WHEN 'urgent' THEN 1
            WHEN 'high' THEN 2
            WHEN 'medium' THEN 3
            WHEN 'low' THEN 4
        END,
        l.lead_score DESC,
        l.created_at ASC;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate lead score
CREATE OR REPLACE FUNCTION calculate_lead_score(
    p_budget_range TEXT,
    p_timeline TEXT,
    p_service_type TEXT,
    p_has_company BOOLEAN,
    p_has_website BOOLEAN,
    p_message_length INTEGER
)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
BEGIN
    -- Budget scoring (40% weight)
    CASE p_budget_range
        WHEN 'over-100k' THEN score := score + 40;
        WHEN '50k-100k' THEN score := score + 32;
        WHEN '25k-50k' THEN score := score + 24;
        WHEN '10k-25k' THEN score := score + 16;
        WHEN 'under-10k' THEN score := score + 8;
        ELSE score := score + 0;
    END CASE;
    
    -- Timeline scoring (25% weight)
    CASE p_timeline
        WHEN 'asap' THEN score := score + 25;
        WHEN '1-month' THEN score := score + 22;
        WHEN '2-months' THEN score := score + 18;
        WHEN '3-months' THEN score := score + 15;
        WHEN 'flexible' THEN score := score + 10;
        ELSE score := score + 0;
    END CASE;
    
    -- Service type scoring (15% weight)
    CASE p_service_type
        WHEN 'law-firm' THEN score := score + 15;
        WHEN 'consulting' THEN score := score + 14;
        WHEN 'financial' THEN score := score + 13;
        WHEN 'luxury' THEN score := score + 15;
        WHEN 'real-estate' THEN score := score + 12;
        WHEN 'ecommerce' THEN score := score + 10;
        ELSE score := score + 7;
    END CASE;
    
    -- Company info (10% weight)
    IF p_has_company THEN
        score := score + 10;
    ELSE
        score := score + 5;
    END IF;
    
    -- Website presence (5% weight)
    IF p_has_website THEN
        score := score + 5;
    ELSE
        score := score + 3;
    END IF;
    
    -- Goals clarity (5% weight)
    IF p_message_length > 10 THEN
        score := score + 5;
    ELSE
        score := score + 2;
    END IF;
    
    RETURN LEAST(score, 100);
END;
$$ LANGUAGE plpgsql;

-- Function to update lead score automatically
CREATE OR REPLACE FUNCTION update_lead_score()
RETURNS TRIGGER AS $$
BEGIN
    NEW.lead_score := calculate_lead_score(
        NEW.budget_range,
        NEW.timeline,
        NEW.service_type,
        (NEW.company IS NOT NULL AND NEW.company != ''),
        (NEW.website_url IS NOT NULL AND NEW.website_url != ''),
        LENGTH(COALESCE(NEW.message, ''))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-calculate lead score
CREATE TRIGGER trigger_update_lead_score
    BEFORE INSERT OR UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_lead_score();

-- Function to get communication history
CREATE OR REPLACE FUNCTION get_communication_history(p_lead_id UUID)
RETURNS TABLE (
    id UUID,
    type communication_type,
    direction TEXT,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    user_name TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.type,
        c.direction,
        c.content,
        c.created_at,
        u.name as user_name
    FROM communications c
    LEFT JOIN users u ON c.user_id = u.id
    WHERE c.lead_id = p_lead_id
    ORDER BY c.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to track response time
CREATE OR REPLACE FUNCTION track_response_time()
RETURNS TRIGGER AS $$
BEGIN
    -- Update last_contacted_at when a communication is added
    UPDATE leads 
    SET last_contacted_at = NEW.created_at,
        updated_at = NOW()
    WHERE id = NEW.lead_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to track response time
CREATE TRIGGER trigger_track_response_time
    AFTER INSERT ON communications
    FOR EACH ROW
    EXECUTE FUNCTION track_response_time();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow all for now - can be restricted later)
CREATE POLICY "Allow all for users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all for leads" ON leads FOR ALL USING (true);
CREATE POLICY "Allow all for communications" ON communications FOR ALL USING (true);
CREATE POLICY "Allow all for email_campaigns" ON email_campaigns FOR ALL USING (true);
CREATE POLICY "Allow all for projects" ON projects FOR ALL USING (true);
CREATE POLICY "Allow all for analytics_events" ON analytics_events FOR ALL USING (true);
CREATE POLICY "Allow all for settings" ON settings FOR ALL USING (true);

-- Insert default admin user
INSERT INTO users (email, name, role) VALUES ('admin@lunexweb.com', 'Admin User', 'admin');

-- Insert default settings
INSERT INTO settings (key, value, description) VALUES 
('dashboard_config', '{"theme": "light", "currency": "ZAR", "timezone": "Africa/Johannesburg"}', 'Dashboard configuration'),
('lead_scoring', '{"hot_threshold": 70, "warm_threshold": 40, "cold_threshold": 0}', 'Lead scoring thresholds'),
('notifications', '{"email": true, "sms": false, "whatsapp": true}', 'Notification preferences'),
('business_hours', '{"start": "08:00", "end": "17:00", "timezone": "Africa/Johannesburg"}', 'Business hours configuration');

-- Enable real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE leads;
ALTER PUBLICATION supabase_realtime ADD TABLE communications;
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE email_campaigns;

-- Create view for dashboard metrics
CREATE VIEW dashboard_metrics AS
SELECT 
    (SELECT COUNT(*) FROM leads WHERE status = 'new') as new_leads,
    (SELECT COUNT(*) FROM leads WHERE status = 'contacted') as contacted_leads,
    (SELECT COUNT(*) FROM leads WHERE status = 'qualified') as qualified_leads,
    (SELECT COUNT(*) FROM leads WHERE status = 'closed_won') as won_leads,
    (SELECT COUNT(*) FROM leads WHERE DATE(created_at) = CURRENT_DATE) as today_leads,
    (SELECT COUNT(*) FROM leads WHERE DATE(created_at) = CURRENT_DATE - INTERVAL '1 day') as yesterday_leads,
    (SELECT COALESCE(SUM(paid_amount), 0) FROM projects WHERE DATE(created_at) = CURRENT_DATE) as today_revenue,
    (SELECT COALESCE(SUM(paid_amount), 0) FROM projects WHERE DATE(created_at) >= CURRENT_DATE - INTERVAL '30 days') as monthly_revenue,
    (SELECT AVG(lead_score) FROM leads WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as avg_lead_score,
    (SELECT COUNT(*) FROM communications WHERE DATE(created_at) = CURRENT_DATE) as today_communications;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;



