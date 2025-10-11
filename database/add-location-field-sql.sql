-- SQL to ensure location field is properly set up in leads table
-- This ensures the location column exists and has the right properties

-- Check if location column exists
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'leads' AND column_name = 'location';

-- If location column doesn't exist, add it (it should already exist based on your schema)
-- ALTER TABLE leads ADD COLUMN location VARCHAR(255);

-- Update existing records to have a default location if they don't have one
UPDATE leads 
SET location = 'Not specified' 
WHERE location IS NULL OR location = '';

-- Create or recreate index for location column
DROP INDEX IF EXISTS idx_leads_location;
CREATE INDEX IF NOT EXISTS idx_leads_location ON leads(location);

-- Verify the location column setup
SELECT 
    column_name, 
    data_type, 
    character_maximum_length, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'leads' AND column_name = 'location';

-- Test query to see location data
SELECT name, email, location, service_type, created_at 
FROM leads 
ORDER BY created_at DESC 
LIMIT 5;

-- Update RLS policies to ensure location field is accessible
DROP POLICY IF EXISTS "Enable read access for all users" ON leads;
DROP POLICY IF EXISTS "Enable insert access for all users" ON leads;
DROP POLICY IF EXISTS "Enable update access for all users" ON leads;
DROP POLICY IF EXISTS "Enable delete access for all users" ON leads;

-- Recreate policies
CREATE POLICY "Enable read access for all users" ON leads
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON leads
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON leads
    FOR DELETE USING (true);

-- Grant permissions
GRANT ALL ON leads TO authenticated;
GRANT ALL ON leads TO anon;

-- Verify everything is working
SELECT COUNT(*) as total_leads FROM leads;
SELECT 
    name, 
    email, 
    location, 
    service_type, 
    remote_work,
    created_at 
FROM leads 
WHERE location IS NOT NULL 
ORDER BY created_at DESC 
LIMIT 3;
