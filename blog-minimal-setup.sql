-- Minimal Blog Setup - Run this if you want a quick fix
-- This creates the essential tables without sample data

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS public.blog_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    icon VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    subtitle TEXT,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image_url TEXT,
    category_id UUID REFERENCES blog_categories(id),
    author_name VARCHAR(255) DEFAULT 'Lunexweb Team',
    author_email VARCHAR(255),
    author_avatar_url TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT[],
    tags TEXT[],
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    reading_time INTEGER,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_views table
CREATE TABLE IF NOT EXISTS public.blog_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_views ENABLE ROW LEVEL SECURITY;

-- Create permissive RLS policies
CREATE POLICY "blog_categories_select_policy" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "blog_categories_insert_policy" ON blog_categories FOR INSERT WITH CHECK (true);
CREATE POLICY "blog_categories_update_policy" ON blog_categories FOR UPDATE USING (true);
CREATE POLICY "blog_categories_delete_policy" ON blog_categories FOR DELETE USING (true);

CREATE POLICY "blog_posts_select_policy" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "blog_posts_insert_policy" ON blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "blog_posts_update_policy" ON blog_posts FOR UPDATE USING (true);
CREATE POLICY "blog_posts_delete_policy" ON blog_posts FOR DELETE USING (true);

CREATE POLICY "blog_views_select_policy" ON blog_views FOR SELECT USING (true);
CREATE POLICY "blog_views_insert_policy" ON blog_views FOR INSERT WITH CHECK (true);

-- Insert a sample category
INSERT INTO blog_categories (name, slug, description, color, icon, sort_order) 
VALUES ('Web Development', 'web-development', 'Articles about web development and programming', '#3B82F6', 'code', 1)
ON CONFLICT (slug) DO NOTHING;

SELECT 'Blog tables created successfully!' as status;
