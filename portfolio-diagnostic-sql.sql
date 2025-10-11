-- Portfolio Database Diagnostic SQL
-- Run this in your Supabase SQL Editor to check if everything is set up correctly

-- 1. Check if portfolio tables exist
SELECT 
    table_name, 
    table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'portfolio%'
ORDER BY table_name;

-- 2. Check portfolio_projects table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'portfolio_projects' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Check if there are any projects
SELECT COUNT(*) as total_projects FROM portfolio_projects;

-- 4. Check sample project data
SELECT 
    id, 
    title, 
    is_published, 
    is_featured, 
    created_at 
FROM portfolio_projects 
LIMIT 3;

-- 5. Check for any duplicate IDs (this could cause the JSON coercion error)
SELECT 
    id, 
    COUNT(*) as count 
FROM portfolio_projects 
GROUP BY id 
HAVING COUNT(*) > 1;

-- 6. Check RLS policies
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual 
FROM pg_policies 
WHERE tablename LIKE 'portfolio%';

-- 7. Test a simple update to see if it works
-- This will help identify if the issue is with the update query itself
SELECT 
    id, 
    title, 
    is_published 
FROM portfolio_projects 
WHERE id = (SELECT id FROM portfolio_projects LIMIT 1);

-- 8. Check if there are any foreign key constraint issues
SELECT
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
AND tc.table_name LIKE 'portfolio%';
