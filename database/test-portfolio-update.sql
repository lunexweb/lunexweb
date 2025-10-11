-- Test Portfolio Update SQL
-- Run this in your Supabase SQL Editor to test if updates work directly

-- 1. First, let's see what data we have
SELECT 
    id,
    title,
    slug,
    is_published,
    is_featured,
    completion_date,
    estimated_value,
    technologies,
    tags
FROM portfolio_projects 
LIMIT 3;

-- 2. Test a simple update (just updating the updated_at timestamp)
UPDATE portfolio_projects 
SET updated_at = NOW() 
WHERE id = (SELECT id FROM portfolio_projects LIMIT 1)
RETURNING id, title, updated_at;

-- 3. Test updating a boolean field
UPDATE portfolio_projects 
SET is_published = true 
WHERE id = (SELECT id FROM portfolio_projects LIMIT 1)
RETURNING id, title, is_published;

-- 4. Test updating with a date field
UPDATE portfolio_projects 
SET completion_date = '2024-01-15'::date
WHERE id = (SELECT id FROM portfolio_projects LIMIT 1)
RETURNING id, title, completion_date;

-- 5. Test updating with arrays
UPDATE portfolio_projects 
SET technologies = ARRAY['React', 'TypeScript', 'Supabase']
WHERE id = (SELECT id FROM portfolio_projects LIMIT 1)
RETURNING id, title, technologies;

-- 6. Test updating with estimated_value
UPDATE portfolio_projects 
SET estimated_value = 15000.50
WHERE id = (SELECT id FROM portfolio_projects LIMIT 1)
RETURNING id, title, estimated_value;

-- 7. Check for any constraint violations
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'portfolio_projects'::regclass;

-- 8. Check RLS policies
SELECT 
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'portfolio_projects';
