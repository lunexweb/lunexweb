-- Update leads table to add new fields for enhanced contact form
-- Run this SQL in your Supabase SQL Editor

-- Add new columns to the leads table
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS remote_work VARCHAR(50),
ADD COLUMN IF NOT EXISTS other_service VARCHAR(100);

-- Add comments to describe the new fields
COMMENT ON COLUMN leads.remote_work IS 'Client preference for remote work: yes, prefer-local, hybrid, no';
COMMENT ON COLUMN leads.other_service IS 'Custom service type when "other" is selected (max 30 chars)';

-- Update the service_type column to handle longer custom service names
ALTER TABLE leads 
ALTER COLUMN service_type TYPE VARCHAR(100);

-- Create an index on the new remote_work column for faster filtering
CREATE INDEX IF NOT EXISTS idx_leads_remote_work ON leads(remote_work);

-- Create an index on the other_service column for searching custom services
CREATE INDEX IF NOT EXISTS idx_leads_other_service ON leads(other_service);

-- Update the dashboard_metrics view to include the new fields
CREATE OR REPLACE VIEW dashboard_metrics AS
SELECT 
  COUNT(*) as total_leads,
  COUNT(CASE WHEN status = 'new' THEN 1 END) as new_leads,
  COUNT(CASE WHEN status = 'contacted' THEN 1 END) as contacted_leads,
  COUNT(CASE WHEN status = 'qualified' THEN 1 END) as qualified_leads,
  COUNT(CASE WHEN status = 'closed_won' THEN 1 END) as converted_leads,
  COUNT(CASE WHEN priority = 'urgent' THEN 1 END) as urgent_leads,
  COUNT(CASE WHEN priority = 'high' THEN 1 END) as high_priority_leads,
  AVG(estimated_value) as avg_lead_value,
  SUM(estimated_value) as total_pipeline_value,
  COUNT(CASE WHEN remote_work = 'yes' THEN 1 END) as remote_work_leads,
  COUNT(CASE WHEN remote_work = 'prefer-local' THEN 1 END) as prefer_local_leads,
  COUNT(CASE WHEN remote_work = 'hybrid' THEN 1 END) as hybrid_work_leads,
  COUNT(CASE WHEN remote_work = 'no' THEN 1 END) as in_person_leads
FROM leads;

-- Update RLS policies if needed (optional - only if you have RLS enabled)
-- Uncomment the following lines if you have Row Level Security enabled

-- ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- DROP POLICY IF EXISTS "Enable read access for authenticated users" ON leads;
-- CREATE POLICY "Enable read access for authenticated users" ON leads
--   FOR SELECT USING (auth.role() = 'authenticated');

-- DROP POLICY IF EXISTS "Enable insert access for all users" ON leads;
-- CREATE POLICY "Enable insert access for all users" ON leads
--   FOR INSERT WITH CHECK (true);

-- DROP POLICY IF EXISTS "Enable update access for authenticated users" ON leads;
-- CREATE POLICY "Enable update access for authenticated users" ON leads
--   FOR UPDATE USING (auth.role() = 'authenticated');

-- Test the update by inserting a sample record with the new fields
-- (Remove this after testing)
-- INSERT INTO leads (
--   name, 
--   email, 
--   phone, 
--   service_type, 
--   budget_range, 
--   timeline, 
--   message, 
--   remote_work, 
--   other_service,
--   source, 
--   location, 
--   priority, 
--   estimated_value
-- ) VALUES (
--   'Test User', 
--   'test@example.com', 
--   '+27123456789', 
--   'custom-service', 
--   '25k-50k', 
--   '1-month', 
--   'Test message for new fields', 
--   'yes', 
--   'Custom Professional Service',
--   'test', 
--   'test', 
--   'medium', 
--   37500
-- );

-- Verify the table structure
-- SELECT column_name, data_type, character_maximum_length, is_nullable
-- FROM information_schema.columns 
-- WHERE table_name = 'leads' 
-- ORDER BY ordinal_position;





