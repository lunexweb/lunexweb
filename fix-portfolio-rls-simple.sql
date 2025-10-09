-- Simple fix: Allow public access to portfolio tables
-- Run this in your Supabase SQL Editor

-- Enable RLS on portfolio tables
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_views ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
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

-- Create simple policies that allow public access
CREATE POLICY "Enable all access for all users" ON portfolio_projects
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for all users" ON portfolio_categories
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for all users" ON portfolio_views
    FOR ALL USING (true) WITH CHECK (true);
