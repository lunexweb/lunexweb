-- Fix Row Level Security policies for portfolio tables
-- Run this in your Supabase SQL Editor

-- Enable RLS on portfolio tables if not already enabled
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_views ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON portfolio_projects;
DROP POLICY IF EXISTS "Enable read access for all users" ON portfolio_projects;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON portfolio_projects;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON portfolio_projects;

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON portfolio_categories;
DROP POLICY IF EXISTS "Enable read access for all users" ON portfolio_categories;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON portfolio_categories;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON portfolio_categories;

DROP POLICY IF EXISTS "Enable insert for all users" ON portfolio_views;
DROP POLICY IF EXISTS "Enable read access for all users" ON portfolio_views;

-- Create new policies for portfolio_projects
CREATE POLICY "Enable insert for authenticated users only" ON portfolio_projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON portfolio_projects
    FOR SELECT USING (true);

CREATE POLICY "Enable update for authenticated users only" ON portfolio_projects
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON portfolio_projects
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create new policies for portfolio_categories
CREATE POLICY "Enable insert for authenticated users only" ON portfolio_categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON portfolio_categories
    FOR SELECT USING (true);

CREATE POLICY "Enable update for authenticated users only" ON portfolio_categories
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON portfolio_categories
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create new policies for portfolio_views (allow anonymous views)
CREATE POLICY "Enable insert for all users" ON portfolio_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON portfolio_views
    FOR SELECT USING (true);

-- Alternative: If you want to allow anonymous access to portfolio_projects
-- (uncomment these lines if you want public access without authentication)

-- DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON portfolio_projects;
-- DROP POLICY IF EXISTS "Enable update for authenticated users only" ON portfolio_projects;
-- DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON portfolio_projects;

-- CREATE POLICY "Enable insert for all users" ON portfolio_projects
--     FOR INSERT WITH CHECK (true);

-- CREATE POLICY "Enable update for all users" ON portfolio_projects
--     FOR UPDATE USING (true);

-- CREATE POLICY "Enable delete for all users" ON portfolio_projects
--     FOR DELETE USING (true);
