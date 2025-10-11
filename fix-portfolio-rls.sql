-- Fix Portfolio RLS Policies
-- Run this in your Supabase SQL Editor to ensure RLS policies allow updates

-- 1. Check current RLS status
SELECT 
    schemaname, 
    tablename, 
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename LIKE 'portfolio%';

-- 2. Check existing policies
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual, 
    with_check
FROM pg_policies 
WHERE tablename LIKE 'portfolio%'
ORDER BY tablename, policyname;

-- 3. Drop existing restrictive policies (if any)
DROP POLICY IF EXISTS "portfolio_projects_select_policy" ON portfolio_projects;
DROP POLICY IF EXISTS "portfolio_projects_insert_policy" ON portfolio_projects;
DROP POLICY IF EXISTS "portfolio_projects_update_policy" ON portfolio_projects;
DROP POLICY IF EXISTS "portfolio_projects_delete_policy" ON portfolio_projects;

-- 4. Create permissive policies for portfolio_projects
-- Allow all operations for authenticated users (you can make this more restrictive later)
CREATE POLICY "portfolio_projects_select_policy" ON portfolio_projects
    FOR SELECT USING (true);

CREATE POLICY "portfolio_projects_insert_policy" ON portfolio_projects
    FOR INSERT WITH CHECK (true);

CREATE POLICY "portfolio_projects_update_policy" ON portfolio_projects
    FOR UPDATE USING (true);

CREATE POLICY "portfolio_projects_delete_policy" ON portfolio_projects
    FOR DELETE USING (true);

-- 5. Create policies for portfolio_categories
DROP POLICY IF EXISTS "portfolio_categories_select_policy" ON portfolio_categories;
DROP POLICY IF EXISTS "portfolio_categories_insert_policy" ON portfolio_categories;
DROP POLICY IF EXISTS "portfolio_categories_update_policy" ON portfolio_categories;
DROP POLICY IF EXISTS "portfolio_categories_delete_policy" ON portfolio_categories;

CREATE POLICY "portfolio_categories_select_policy" ON portfolio_categories
    FOR SELECT USING (true);

CREATE POLICY "portfolio_categories_insert_policy" ON portfolio_categories
    FOR INSERT WITH CHECK (true);

CREATE POLICY "portfolio_categories_update_policy" ON portfolio_categories
    FOR UPDATE USING (true);

CREATE POLICY "portfolio_categories_delete_policy" ON portfolio_categories
    FOR DELETE USING (true);

-- 6. Create policies for portfolio_views
DROP POLICY IF EXISTS "portfolio_views_select_policy" ON portfolio_views;
DROP POLICY IF EXISTS "portfolio_views_insert_policy" ON portfolio_views;
DROP POLICY IF EXISTS "portfolio_views_update_policy" ON portfolio_views;
DROP POLICY IF EXISTS "portfolio_views_delete_policy" ON portfolio_views;

CREATE POLICY "portfolio_views_select_policy" ON portfolio_views
    FOR SELECT USING (true);

CREATE POLICY "portfolio_views_insert_policy" ON portfolio_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "portfolio_views_update_policy" ON portfolio_views
    FOR UPDATE USING (true);

CREATE POLICY "portfolio_views_delete_policy" ON portfolio_views
    FOR DELETE USING (true);

-- 7. Verify the policies were created
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd
FROM pg_policies 
WHERE tablename LIKE 'portfolio%'
ORDER BY tablename, policyname;

-- 8. Test a simple update to verify it works
UPDATE portfolio_projects 
SET updated_at = NOW() 
WHERE id = (SELECT id FROM portfolio_projects LIMIT 1)
RETURNING id, title, updated_at;
