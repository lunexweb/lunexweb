-- Check if leads table exists and create it if needed
-- Run this in your Supabase SQL Editor

-- First, check if the leads table exists
SELECT 
    table_name, 
    table_schema 
FROM information_schema.tables 
WHERE table_name = 'leads' AND table_schema = 'public';

-- If the table doesn't exist, create it with the complete schema
CREATE TABLE IF NOT EXISTS leads (
    -- Primary key
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Contact information (from forms)
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    
    -- Service details (from forms)
    service_type VARCHAR(255) NOT NULL,
    budget_range VARCHAR(100),
    message TEXT,
    
    -- Remote work preferences (new fields)
    remote_work VARCHAR(20) CHECK (remote_work IN ('yes', 'no', 'other')),
    remote_work_details VARCHAR(255),
    
    -- Lead management
    lead_score INTEGER DEFAULT 50 CHECK (lead_score >= 0 AND lead_score <= 100),
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN (
        'new', 'contacted', 'qualified', 'proposal_sent', 
        'negotiating', 'closed_won', 'closed_lost', 'nurturing'
    )),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    
    -- Source tracking
    source VARCHAR(100) NOT NULL DEFAULT 'website_contact_form',
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    
    -- Additional details
    location VARCHAR(255),
    website_url VARCHAR(500),
    timeline VARCHAR(100),
    estimated_value DECIMAL(12,2),
    notes TEXT,
    assigned_to UUID,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_contacted_at TIMESTAMP WITH TIME ZONE,
    
    -- Constraints
    CONSTRAINT leads_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT leads_phone_check CHECK (phone ~* '^[\+]?[0-9\s\-\(\)]{10,}$' OR phone IS NULL)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_service_type ON leads(service_type);
CREATE INDEX IF NOT EXISTS idx_leads_location ON leads(location);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS (Row Level Security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies for access control
DROP POLICY IF EXISTS "Authenticated users can view all leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can insert leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can update leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can delete leads" ON leads;
DROP POLICY IF EXISTS "Allow anonymous lead creation" ON leads;

CREATE POLICY "Authenticated users can view all leads" ON leads
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert leads" ON leads
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update leads" ON leads
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete leads" ON leads
    FOR DELETE USING (auth.role() = 'authenticated');

-- Allow anonymous inserts for contact forms
CREATE POLICY "Allow anonymous lead creation" ON leads
    FOR INSERT WITH CHECK (true);

-- Grant permissions
GRANT ALL ON leads TO authenticated;
GRANT SELECT, INSERT ON leads TO anon;

-- Insert test data
INSERT INTO leads (
    name, email, phone, company, service_type, budget_range, message,
    remote_work, remote_work_details, lead_score, status, priority, source, location
) VALUES 
(
    'Test User', 'test@example.com', '+27123456789', 'Test Company',
    'Law Firm Website Development', 'R30,000 - R50,000', 
    'This is a test lead to verify the dashboard is working.',
    'yes', null, 75, 'new', 'high', 'website_contact_form', 'Johannesburg, Gauteng'
) ON CONFLICT (id) DO NOTHING;

-- Verify the table and data
SELECT COUNT(*) as total_leads FROM leads;
SELECT * FROM leads ORDER BY created_at DESC LIMIT 5;
