-- Clean fix for portfolio RLS policies
-- Run this in your Supabase SQL Editor

-- Drop ALL existing policies first (using CASCADE to handle dependencies)
DROP POLICY IF EXISTS "Enable all access for all users" ON portfolio_projects CASCADE;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON portfolio_projects CASCADE;
DROP POLICY IF EXISTS "Enable read access for all users" ON portfolio_projects CASCADE;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON portfolio_projects CASCADE;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON portfolio_projects CASCADE;

DROP POLICY IF EXISTS "Enable all access for all users" ON portfolio_categories CASCADE;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON portfolio_categories CASCADE;
DROP POLICY IF EXISTS "Enable read access for all users" ON portfolio_categories CASCADE;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON portfolio_categories CASCADE;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON portfolio_categories CASCADE;

DROP POLICY IF EXISTS "Enable all access for all users" ON portfolio_views CASCADE;
DROP POLICY IF EXISTS "Enable insert for all users" ON portfolio_views CASCADE;
DROP POLICY IF EXISTS "Enable read access for all users" ON portfolio_views CASCADE;

-- Create new simple policies
CREATE POLICY "portfolio_projects_all_access" ON portfolio_projects
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "portfolio_categories_all_access" ON portfolio_categories
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "portfolio_views_all_access" ON portfolio_views
    FOR ALL USING (true) WITH CHECK (true);
