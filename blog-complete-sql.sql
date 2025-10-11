-- Complete Blog System SQL with RLS
-- Run this ENTIRE script in your Supabase SQL Editor

-- 1. Create blog_categories table
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

-- 2. Create blog_posts table
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
    reading_time INTEGER, -- in minutes
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT blog_posts_slug_check CHECK (slug ~ '^[a-z0-9-]+$'),
    CONSTRAINT blog_posts_title_check CHECK (length(title) >= 3)
);

-- 3. Create blog_comments table
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

-- 4. Create blog_views table for analytics
CREATE TABLE IF NOT EXISTS public.blog_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create blog_likes table
CREATE TABLE IF NOT EXISTS public.blog_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    ip_address INET,
    user_agent TEXT,
    liked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, ip_address)
);

-- 6. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON public.blog_categories(slug);
CREATE INDEX IF NOT EXISTS idx_blog_categories_active ON public.blog_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_blog_categories_sort_order ON public.blog_categories(sort_order);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON public.blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_view_count ON public.blog_posts(view_count DESC);

CREATE INDEX IF NOT EXISTS idx_blog_comments_post ON public.blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON public.blog_comments(status);
CREATE INDEX IF NOT EXISTS idx_blog_comments_created_at ON public.blog_comments(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_blog_views_post ON public.blog_views(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_views_viewed_at ON public.blog_views(viewed_at DESC);

CREATE INDEX IF NOT EXISTS idx_blog_likes_post ON public.blog_likes(post_id);

-- 7. Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. Create triggers for updated_at
CREATE TRIGGER update_blog_categories_updated_at BEFORE UPDATE ON blog_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_comments_updated_at BEFORE UPDATE ON blog_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 9. Create function to automatically set published_at
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'published' AND OLD.status != 'published' THEN
        NEW.published_at = NOW();
    ELSIF NEW.status != 'published' THEN
        NEW.published_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_blog_posts_published_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION set_published_at();

-- 10. Create function to calculate reading time
CREATE OR REPLACE FUNCTION calculate_reading_time()
RETURNS TRIGGER AS $$
BEGIN
    -- Estimate reading time based on content length (average 200 words per minute)
    NEW.reading_time = GREATEST(1, CEIL(length(NEW.content) / 1000.0));
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER calculate_blog_posts_reading_time BEFORE INSERT OR UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION calculate_reading_time();

-- 11. ENABLE ROW LEVEL SECURITY
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;

-- 12. Create RLS Policies for blog_categories
DROP POLICY IF EXISTS "blog_categories_select_policy" ON blog_categories;
DROP POLICY IF EXISTS "blog_categories_insert_policy" ON blog_categories;
DROP POLICY IF EXISTS "blog_categories_update_policy" ON blog_categories;
DROP POLICY IF EXISTS "blog_categories_delete_policy" ON blog_categories;

CREATE POLICY "blog_categories_select_policy" ON blog_categories
    FOR SELECT USING (true);

CREATE POLICY "blog_categories_insert_policy" ON blog_categories
    FOR INSERT WITH CHECK (true);

CREATE POLICY "blog_categories_update_policy" ON blog_categories
    FOR UPDATE USING (true);

CREATE POLICY "blog_categories_delete_policy" ON blog_categories
    FOR DELETE USING (true);

-- 13. Create RLS Policies for blog_posts
DROP POLICY IF EXISTS "blog_posts_select_policy" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_insert_policy" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_update_policy" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_delete_policy" ON blog_posts;

CREATE POLICY "blog_posts_select_policy" ON blog_posts
    FOR SELECT USING (true);

CREATE POLICY "blog_posts_insert_policy" ON blog_posts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "blog_posts_update_policy" ON blog_posts
    FOR UPDATE USING (true);

CREATE POLICY "blog_posts_delete_policy" ON blog_posts
    FOR DELETE USING (true);

-- 14. Create RLS Policies for blog_comments
DROP POLICY IF EXISTS "blog_comments_select_policy" ON blog_comments;
DROP POLICY IF EXISTS "blog_comments_insert_policy" ON blog_comments;
DROP POLICY IF EXISTS "blog_comments_update_policy" ON blog_comments;
DROP POLICY IF EXISTS "blog_comments_delete_policy" ON blog_comments;

CREATE POLICY "blog_comments_select_policy" ON blog_comments
    FOR SELECT USING (true);

CREATE POLICY "blog_comments_insert_policy" ON blog_comments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "blog_comments_update_policy" ON blog_comments
    FOR UPDATE USING (true);

CREATE POLICY "blog_comments_delete_policy" ON blog_comments
    FOR DELETE USING (true);

-- 15. Create RLS Policies for blog_views
DROP POLICY IF EXISTS "blog_views_select_policy" ON blog_views;
DROP POLICY IF EXISTS "blog_views_insert_policy" ON blog_views;
DROP POLICY IF EXISTS "blog_views_update_policy" ON blog_views;
DROP POLICY IF EXISTS "blog_views_delete_policy" ON blog_views;

CREATE POLICY "blog_views_select_policy" ON blog_views
    FOR SELECT USING (true);

CREATE POLICY "blog_views_insert_policy" ON blog_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "blog_views_update_policy" ON blog_views
    FOR UPDATE USING (true);

CREATE POLICY "blog_views_delete_policy" ON blog_views
    FOR DELETE USING (true);

-- 16. Create RLS Policies for blog_likes
DROP POLICY IF EXISTS "blog_likes_select_policy" ON blog_likes;
DROP POLICY IF EXISTS "blog_likes_insert_policy" ON blog_likes;
DROP POLICY IF EXISTS "blog_likes_update_policy" ON blog_likes;
DROP POLICY IF EXISTS "blog_likes_delete_policy" ON blog_likes;

CREATE POLICY "blog_likes_select_policy" ON blog_likes
    FOR SELECT USING (true);

CREATE POLICY "blog_likes_insert_policy" ON blog_likes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "blog_likes_update_policy" ON blog_likes
    FOR UPDATE USING (true);

CREATE POLICY "blog_likes_delete_policy" ON blog_likes
    FOR DELETE USING (true);

-- 17. Insert sample blog categories
INSERT INTO blog_categories (name, slug, description, color, icon, sort_order) VALUES
('Web Development', 'web-development', 'Articles about web development, programming, and technical topics', '#3B82F6', 'code', 1),
('Business', 'business', 'Business insights, strategies, and entrepreneurship', '#10B981', 'trending-up', 2),
('Design', 'design', 'UI/UX design, branding, and creative topics', '#F59E0B', 'palette', 3),
('Marketing', 'marketing', 'Digital marketing, SEO, and growth strategies', '#EF4444', 'megaphone', 4),
('Technology', 'technology', 'Latest technology trends and innovations', '#8B5CF6', 'cpu', 5)
ON CONFLICT (slug) DO NOTHING;

-- 18. Insert sample blog posts
INSERT INTO blog_posts (title, slug, subtitle, content, excerpt, category_id, author_name, author_email, tags, status, is_featured, is_pinned) VALUES
('The Future of Web Development in 2024', 'future-web-development-2024', 'Exploring emerging trends and technologies shaping the web', 
'<h2>Introduction</h2><p>The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends and technologies that will shape how we build and experience the internet.</p><h3>Key Trends to Watch</h3><ul><li>Artificial Intelligence Integration</li><li>Progressive Web Apps (PWAs)</li><li>WebAssembly (WASM)</li><li>Edge Computing</li></ul><p>These technologies are not just buzzwords; they represent fundamental shifts in how we approach web development.</p>',
'Discover the emerging trends and technologies that will define web development in 2024, from AI integration to edge computing.',
(SELECT id FROM blog_categories WHERE slug = 'web-development'),
'Lunexweb Team', 'team@lunexweb.com', ARRAY['web-development', 'technology', 'trends'], 'published', true, true),

('Building High-Converting Landing Pages', 'building-high-converting-landing-pages', 'A comprehensive guide to creating landing pages that convert visitors into customers',
'<h2>What Makes a Landing Page Convert?</h2><p>A high-converting landing page is more than just good design; it''s about understanding your audience and guiding them toward a specific action.</p><h3>Essential Elements</h3><ol><li>Clear Value Proposition</li><li>Compelling Headlines</li><li>Social Proof</li><li>Strong Call-to-Action</li></ol><p>Each element plays a crucial role in the conversion process.</p>',
'Learn the essential elements and strategies for creating landing pages that turn visitors into customers.',
(SELECT id FROM blog_categories WHERE slug = 'marketing'),
'Lunexweb Team', 'team@lunexweb.com', ARRAY['marketing', 'conversion', 'landing-pages'], 'published', false, false),

('The Psychology of Color in Web Design', 'psychology-color-web-design', 'How color choices impact user behavior and website performance',
'<h2>Understanding Color Psychology</h2><p>Colors have the power to evoke emotions, influence decisions, and create lasting impressions. In web design, understanding color psychology is crucial for creating effective user experiences.</p><h3>Color Associations</h3><ul><li>Blue: Trust and professionalism</li><li>Red: Urgency and passion</li><li>Green: Growth and harmony</li><li>Yellow: Optimism and creativity</li></ul><p>Choose your colors wisely to align with your brand message.</p>',
'Explore how color choices in web design can influence user behavior and improve website performance.',
(SELECT id FROM blog_categories WHERE slug = 'design'),
'Lunexweb Team', 'team@lunexweb.com', ARRAY['design', 'color-psychology', 'ux'], 'published', false, false)
ON CONFLICT (slug) DO NOTHING;

-- 19. Update published_at for published posts
UPDATE blog_posts SET published_at = NOW() WHERE status = 'published';

-- 20. Grant necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- 21. Final verification queries
SELECT 'Blog Categories:' as info;
SELECT id, name, slug, is_active FROM blog_categories ORDER BY sort_order;

SELECT 'Blog Posts:' as info;
SELECT id, title, slug, status, is_featured, created_at FROM blog_posts ORDER BY created_at DESC;

SELECT 'Database Setup Complete!' as status;
