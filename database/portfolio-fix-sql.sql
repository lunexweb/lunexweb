-- Portfolio Database Fix SQL
-- Run this in your Supabase SQL Editor to fix common issues

-- 1. Check current portfolio_projects table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_name = 'portfolio_projects' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Check for any constraint violations
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    tc.constraint_type,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
    LEFT JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'portfolio_projects'
AND tc.table_schema = 'public';

-- 3. Check sample data to see what might be causing issues
SELECT 
    id,
    title,
    is_published,
    is_featured,
    estimated_value,
    technologies,
    tags,
    created_at
FROM portfolio_projects 
LIMIT 3;

-- 4. Fix potential data type issues
-- Update any NULL estimated_value to 0 for numeric fields
UPDATE portfolio_projects 
SET estimated_value = 0 
WHERE estimated_value IS NULL;

-- Ensure technologies and tags are proper arrays
UPDATE portfolio_projects 
SET technologies = '{}'::text[] 
WHERE technologies IS NULL;

UPDATE portfolio_projects 
SET tags = '{}'::text[] 
WHERE tags IS NULL;

-- Ensure boolean fields are properly set
UPDATE portfolio_projects 
SET is_published = false 
WHERE is_published IS NULL;

UPDATE portfolio_projects 
SET is_featured = false 
WHERE is_featured IS NULL;

-- 5. Check RLS policies
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual 
FROM pg_policies 
WHERE tablename = 'portfolio_projects';

-- 6. Test a simple update to verify it works
-- This will help identify if the basic update functionality works
UPDATE portfolio_projects 
SET updated_at = NOW() 
WHERE id = (SELECT id FROM portfolio_projects LIMIT 1)
RETURNING id, title, updated_at;

-- 7. If the above works, test updating a boolean field
UPDATE portfolio_projects 
SET is_published = true 
WHERE id = (SELECT id FROM portfolio_projects LIMIT 1)
RETURNING id, title, is_published;
