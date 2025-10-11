-- Fix Missing Tables - Run this to create all missing tables
-- This addresses the 404 errors you're seeing

-- 1. Create communications table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.communications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    communication_type VARCHAR(50) NOT NULL CHECK (communication_type IN ('email', 'phone', 'meeting', 'note')),
    subject VARCHAR(255),
    content TEXT,
    direction VARCHAR(20) DEFAULT 'outbound' CHECK (direction IN ('inbound', 'outbound')),
    status VARCHAR(50) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create blog_comments table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.blog_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
    author_name VARCHAR(255) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    author_website VARCHAR(500),
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT blog_comments_content_check CHECK (length(content) >= 3)
);

-- 3. Create blog_posts table (if it doesn't exist)
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
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT blog_posts_slug_check CHECK (slug ~ '^[a-z0-9-]+$'),
    CONSTRAINT blog_posts_title_check CHECK (length(title) >= 3)
);

-- 4. Create blog_categories table (if it doesn't exist)
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

-- 5. Create blog_views table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.blog_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create blog_likes table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.blog_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    ip_address INET,
    user_agent TEXT,
    liked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, ip_address)
);

-- 7. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_communications_lead_id ON public.communications(lead_id);
CREATE INDEX IF NOT EXISTS idx_communications_created_at ON public.communications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_communications_type ON public.communications(communication_type);

CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON public.blog_categories(slug);
CREATE INDEX IF NOT EXISTS idx_blog_categories_active ON public.blog_categories(is_active);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON public.blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_blog_comments_post ON public.blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON public.blog_comments(status);

CREATE INDEX IF NOT EXISTS idx_blog_views_post ON public.blog_views(post_id);

-- 8. Enable RLS
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;

-- 9. Create permissive RLS policies
DROP POLICY IF EXISTS "communications_select_policy" ON communications;
DROP POLICY IF EXISTS "communications_insert_policy" ON communications;
DROP POLICY IF EXISTS "communications_update_policy" ON communications;
DROP POLICY IF EXISTS "communications_delete_policy" ON communications;

CREATE POLICY "communications_select_policy" ON communications FOR SELECT USING (true);
CREATE POLICY "communications_insert_policy" ON communications FOR INSERT WITH CHECK (true);
CREATE POLICY "communications_update_policy" ON communications FOR UPDATE USING (true);
CREATE POLICY "communications_delete_policy" ON communications FOR DELETE USING (true);

DROP POLICY IF EXISTS "blog_categories_select_policy" ON blog_categories;
DROP POLICY IF EXISTS "blog_categories_insert_policy" ON blog_categories;
DROP POLICY IF EXISTS "blog_categories_update_policy" ON blog_categories;
DROP POLICY IF EXISTS "blog_categories_delete_policy" ON blog_categories;

CREATE POLICY "blog_categories_select_policy" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "blog_categories_insert_policy" ON blog_categories FOR INSERT WITH CHECK (true);
CREATE POLICY "blog_categories_update_policy" ON blog_categories FOR UPDATE USING (true);
CREATE POLICY "blog_categories_delete_policy" ON blog_categories FOR DELETE USING (true);

DROP POLICY IF EXISTS "blog_posts_select_policy" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_insert_policy" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_update_policy" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_delete_policy" ON blog_posts;

CREATE POLICY "blog_posts_select_policy" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "blog_posts_insert_policy" ON blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "blog_posts_update_policy" ON blog_posts FOR UPDATE USING (true);
CREATE POLICY "blog_posts_delete_policy" ON blog_posts FOR DELETE USING (true);

DROP POLICY IF EXISTS "blog_comments_select_policy" ON blog_comments;
DROP POLICY IF EXISTS "blog_comments_insert_policy" ON blog_comments;
DROP POLICY IF EXISTS "blog_comments_update_policy" ON blog_comments;
DROP POLICY IF EXISTS "blog_comments_delete_policy" ON blog_comments;

CREATE POLICY "blog_comments_select_policy" ON blog_comments FOR SELECT USING (true);
CREATE POLICY "blog_comments_insert_policy" ON blog_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "blog_comments_update_policy" ON blog_comments FOR UPDATE USING (true);
CREATE POLICY "blog_comments_delete_policy" ON blog_comments FOR DELETE USING (true);

DROP POLICY IF EXISTS "blog_views_select_policy" ON blog_views;
DROP POLICY IF EXISTS "blog_views_insert_policy" ON blog_views;

CREATE POLICY "blog_views_select_policy" ON blog_views FOR SELECT USING (true);
CREATE POLICY "blog_views_insert_policy" ON blog_views FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "blog_likes_select_policy" ON blog_likes;
DROP POLICY IF EXISTS "blog_likes_insert_policy" ON blog_likes;

CREATE POLICY "blog_likes_select_policy" ON blog_likes FOR SELECT USING (true);
CREATE POLICY "blog_likes_insert_policy" ON blog_likes FOR INSERT WITH CHECK (true);

-- 10. Insert sample data if tables are empty
INSERT INTO blog_categories (name, slug, description, color, icon, sort_order) VALUES
('Web Development', 'web-development', 'Articles about web development, programming, and technical topics', '#3B82F6', 'code', 1),
('Business', 'business', 'Business insights, strategies, and entrepreneurship', '#10B981', 'trending-up', 2),
('Design', 'design', 'UI/UX design, branding, and creative topics', '#F59E0B', 'palette', 3),
('Marketing', 'marketing', 'Digital marketing, SEO, and growth strategies', '#EF4444', 'megaphone', 4),
('Technology', 'technology', 'Latest technology trends and innovations', '#8B5CF6', 'cpu', 5)
ON CONFLICT (slug) DO NOTHING;

-- 11. Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 12. Create triggers for updated_at
CREATE TRIGGER update_communications_updated_at BEFORE UPDATE ON communications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_categories_updated_at BEFORE UPDATE ON blog_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_comments_updated_at BEFORE UPDATE ON blog_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 13. Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

SELECT 'All missing tables created successfully!' as status;
