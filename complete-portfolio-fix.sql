-- Complete Portfolio Fix SQL
-- Run this ENTIRE script in your Supabase SQL Editor

-- 1. First, let's check the current state
SELECT 'Current RLS Status:' as info;
SELECT 
    schemaname, 
    tablename, 
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename LIKE 'portfolio%';

-- 2. Check existing policies
SELECT 'Current Policies:' as info;
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

-- 3. DISABLE RLS temporarily to allow updates (if needed)
-- Uncomment the next lines if RLS is causing issues
-- ALTER TABLE portfolio_projects DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE portfolio_categories DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE portfolio_views DISABLE ROW LEVEL SECURITY;

-- 4. Drop ALL existing policies
DROP POLICY IF EXISTS "portfolio_projects_select_policy" ON portfolio_projects;
DROP POLICY IF EXISTS "portfolio_projects_insert_policy" ON portfolio_projects;
DROP POLICY IF EXISTS "portfolio_projects_update_policy" ON portfolio_projects;
DROP POLICY IF EXISTS "portfolio_projects_delete_policy" ON portfolio_projects;

DROP POLICY IF EXISTS "portfolio_categories_select_policy" ON portfolio_categories;
DROP POLICY IF EXISTS "portfolio_categories_insert_policy" ON portfolio_categories;
DROP POLICY IF EXISTS "portfolio_categories_update_policy" ON portfolio_categories;
DROP POLICY IF EXISTS "portfolio_categories_delete_policy" ON portfolio_categories;

DROP POLICY IF EXISTS "portfolio_views_select_policy" ON portfolio_views;
DROP POLICY IF EXISTS "portfolio_views_insert_policy" ON portfolio_views;
DROP POLICY IF EXISTS "portfolio_views_update_policy" ON portfolio_views;
DROP POLICY IF EXISTS "portfolio_views_delete_policy" ON portfolio_views;

-- 5. Create permissive policies for portfolio_projects
CREATE POLICY "portfolio_projects_select_policy" ON portfolio_projects
    FOR SELECT USING (true);

CREATE POLICY "portfolio_projects_insert_policy" ON portfolio_projects
    FOR INSERT WITH CHECK (true);

CREATE POLICY "portfolio_projects_update_policy" ON portfolio_projects
    FOR UPDATE USING (true);

CREATE POLICY "portfolio_projects_delete_policy" ON portfolio_projects
    FOR DELETE USING (true);

-- 6. Create permissive policies for portfolio_categories
CREATE POLICY "portfolio_categories_select_policy" ON portfolio_categories
    FOR SELECT USING (true);

CREATE POLICY "portfolio_categories_insert_policy" ON portfolio_categories
    FOR INSERT WITH CHECK (true);

CREATE POLICY "portfolio_categories_update_policy" ON portfolio_categories
    FOR UPDATE USING (true);

CREATE POLICY "portfolio_categories_delete_policy" ON portfolio_categories
    FOR DELETE USING (true);

-- 7. Create permissive policies for portfolio_views
CREATE POLICY "portfolio_views_select_policy" ON portfolio_views
    FOR SELECT USING (true);

CREATE POLICY "portfolio_views_insert_policy" ON portfolio_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "portfolio_views_update_policy" ON portfolio_views
    FOR UPDATE USING (true);

CREATE POLICY "portfolio_views_delete_policy" ON portfolio_views
    FOR DELETE USING (true);

-- 8. Verify the policies were created
SELECT 'New Policies Created:' as info;
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

-- 9. Test a simple update to verify it works
SELECT 'Testing Update:' as info;
UPDATE portfolio_projects 
SET updated_at = NOW() 
WHERE id = (SELECT id FROM portfolio_projects LIMIT 1)
RETURNING id, title, updated_at;

-- 10. Test updating a boolean field
SELECT 'Testing Boolean Update:' as info;
UPDATE portfolio_projects 
SET is_published = NOT is_published
WHERE id = (SELECT id FROM portfolio_projects LIMIT 1)
RETURNING id, title, is_published;

-- 11. Revert the test change
UPDATE portfolio_projects 
SET is_published = NOT is_published
WHERE id = (SELECT id FROM portfolio_projects LIMIT 1)
RETURNING id, title, is_published;

-- 12. Check for any constraint violations
SELECT 'Checking Constraints:' as info;
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'portfolio_projects'::regclass;

-- 13. Final verification
SELECT 'Final Verification:' as info;
SELECT 
    COUNT(*) as total_projects,
    COUNT(*) FILTER (WHERE is_published = true) as published_projects,
    COUNT(*) FILTER (WHERE is_featured = true) as featured_projects
FROM portfolio_projects;
