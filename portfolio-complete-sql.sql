-- Complete Portfolio SQL Schema with Sample Data
-- This creates all portfolio tables and adds sample projects

-- =====================================================
-- 1. CREATE PORTFOLIO CATEGORIES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS portfolio_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6', -- Hex color for UI
    icon VARCHAR(50), -- Icon name for UI
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. CREATE PORTFOLIO PROJECTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS portfolio_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    subtitle TEXT,
    description TEXT,
    short_description VARCHAR(500),
    featured_image_url TEXT,
    gallery_images TEXT[], -- Array of image URLs
    video_url TEXT,
    category_id UUID REFERENCES portfolio_categories(id),
    client_name VARCHAR(255),
    client_logo_url TEXT,
    project_url TEXT,
    github_url TEXT,
    case_study_url TEXT,
    technologies TEXT[], -- Array of technology names
    project_type VARCHAR(100) DEFAULT 'website',
    industry VARCHAR(100),
    timeline VARCHAR(100),
    budget_range VARCHAR(100),
    team_size INTEGER,
    project_size VARCHAR(50),
    results TEXT,
    testimonial TEXT,
    testimonial_author VARCHAR(255),
    testimonial_author_title VARCHAR(255),
    testimonial_author_company VARCHAR(255),
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    project_start_date DATE,
    project_end_date DATE,
    completion_date DATE,
    estimated_value DECIMAL(12,2),
    tags TEXT[], -- Array of tag names
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT portfolio_projects_title_check CHECK (LENGTH(title) >= 3),
    CONSTRAINT portfolio_projects_slug_check CHECK (slug ~* '^[a-z0-9-]+$'),
    CONSTRAINT portfolio_projects_estimated_value_check CHECK (estimated_value >= 0)
);

-- =====================================================
-- 3. CREATE PORTFOLIO VIEWS TABLE (for analytics)
-- =====================================================

CREATE TABLE IF NOT EXISTS portfolio_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Portfolio Categories Indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_categories_slug ON portfolio_categories(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_categories_sort_order ON portfolio_categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_categories_active ON portfolio_categories(is_active);

-- Portfolio Projects Indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_slug ON portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_category ON portfolio_projects(category_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_featured ON portfolio_projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_published ON portfolio_projects(is_published);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_sort_order ON portfolio_projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_created_at ON portfolio_projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_industry ON portfolio_projects(industry);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_project_type ON portfolio_projects(project_type);

-- Portfolio Views Indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_views_project ON portfolio_views(project_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_views_viewed_at ON portfolio_views(viewed_at DESC);

-- =====================================================
-- 5. CREATE TRIGGERS FOR UPDATED_AT
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_portfolio_categories_updated_at 
    BEFORE UPDATE ON portfolio_categories 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_projects_updated_at 
    BEFORE UPDATE ON portfolio_projects 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 6. ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE portfolio_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_views ENABLE ROW LEVEL SECURITY;

-- RLS Policies for portfolio_categories
DROP POLICY IF EXISTS "Enable read access for all users" ON portfolio_categories;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON portfolio_categories;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON portfolio_categories;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON portfolio_categories;

CREATE POLICY "Enable read access for all users" ON portfolio_categories
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON portfolio_categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users" ON portfolio_categories
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete access for authenticated users" ON portfolio_categories
    FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for portfolio_projects
DROP POLICY IF EXISTS "Enable read access for all users" ON portfolio_projects;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON portfolio_projects;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON portfolio_projects;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON portfolio_projects;

CREATE POLICY "Enable read access for all users" ON portfolio_projects
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON portfolio_projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users" ON portfolio_projects
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete access for authenticated users" ON portfolio_projects
    FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for portfolio_views
DROP POLICY IF EXISTS "Enable insert access for all users" ON portfolio_views;

CREATE POLICY "Enable insert access for all users" ON portfolio_views
    FOR INSERT WITH CHECK (true);

-- =====================================================
-- 7. GRANT PERMISSIONS
-- =====================================================

-- Grant permissions to authenticated users
GRANT ALL ON portfolio_categories TO authenticated;
GRANT ALL ON portfolio_projects TO authenticated;
GRANT ALL ON portfolio_views TO authenticated;

-- Grant permissions to anonymous users (for public portfolio viewing)
GRANT SELECT ON portfolio_categories TO anon;
GRANT SELECT ON portfolio_projects TO anon;
GRANT INSERT ON portfolio_views TO anon;

-- =====================================================
-- 8. INSERT SAMPLE CATEGORIES
-- =====================================================

INSERT INTO portfolio_categories (name, slug, description, color, icon, sort_order) VALUES
('Law Firms', 'law-firms', 'Professional websites for legal practices', '#1E40AF', 'scale', 1),
('Consulting', 'consulting', 'Strategic consulting agency websites', '#7C3AED', 'target', 2),
('Financial Services', 'financial-services', 'Banking and financial institution websites', '#059669', 'dollar-sign', 3),
('Real Estate', 'real-estate', 'Property and real estate agency websites', '#DC2626', 'home', 4),
('Luxury Brands', 'luxury-brands', 'High-end brand and luxury service websites', '#B45309', 'crown', 5),
('E-commerce', 'ecommerce', 'Online stores and e-commerce platforms', '#0891B2', 'shopping-cart', 6)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 9. INSERT SAMPLE PORTFOLIO PROJECTS
-- =====================================================

-- Get category IDs for foreign key references
DO $$
DECLARE
    law_firms_id UUID;
    consulting_id UUID;
    financial_id UUID;
    real_estate_id UUID;
    luxury_id UUID;
    ecommerce_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO law_firms_id FROM portfolio_categories WHERE slug = 'law-firms';
    SELECT id INTO consulting_id FROM portfolio_categories WHERE slug = 'consulting';
    SELECT id INTO financial_id FROM portfolio_categories WHERE slug = 'financial-services';
    SELECT id INTO real_estate_id FROM portfolio_categories WHERE slug = 'real-estate';
    SELECT id INTO luxury_id FROM portfolio_categories WHERE slug = 'luxury-brands';
    SELECT id INTO ecommerce_id FROM portfolio_categories WHERE slug = 'ecommerce';

    -- Insert sample projects
    INSERT INTO portfolio_projects (
        title, slug, subtitle, description, short_description, featured_image_url,
        category_id, client_name, project_url, github_url, technologies,
        project_type, industry, timeline, budget_range, team_size, project_size,
        results, testimonial, testimonial_author, testimonial_author_title, testimonial_author_company,
        is_featured, is_published, sort_order, estimated_value, tags
    ) VALUES
    (
        'Smith & Associates Law Firm',
        'smith-associates-law-firm',
        'Modern Legal Practice Website',
        'A sophisticated website for a leading law firm specializing in corporate law. The site features secure client portals, case management integration, and advanced SEO optimization to attract high-value clients.',
        'Professional law firm website with client portal and case management integration.',
        'https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759838000/pexels-rodnae-productions-8293778_abc123.jpg',
        law_firms_id,
        'Smith & Associates',
        'https://smithassociates.co.za',
        'https://github.com/lunexweb/smith-associates',
        ARRAY['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
        'website',
        'Legal Services',
        '6 weeks',
        'R75,000 - R100,000',
        3,
        'Large',
        'Increased client inquiries by 150% and improved case management efficiency by 40%.',
        'Lunexweb transformed our digital presence. The new website has significantly improved our client acquisition and case management processes.',
        'Sarah Mitchell',
        'Managing Partner',
        'Smith & Associates',
        true,
        true,
        1,
        85000.00,
        ARRAY['legal', 'corporate', 'portal', 'seo']
    ),
    (
        'Johnson Consulting Group',
        'johnson-consulting-group',
        'Strategic Consulting Platform',
        'A comprehensive digital platform for a management consulting firm. Features thought leadership content, client case studies, and automated lead nurturing systems.',
        'Management consulting website with thought leadership platform and lead generation.',
        'https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759838046/pexels-lusterpix-32301952_zfmsac.jpg',
        consulting_id,
        'Johnson Consulting Group',
        'https://johnsonconsulting.co.za',
        'https://github.com/lunexweb/johnson-consulting',
        ARRAY['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe'],
        'website',
        'Management Consulting',
        '8 weeks',
        'R100,000 - R150,000',
        4,
        'Enterprise',
        'Generated 200% more qualified leads and established thought leadership in the industry.',
        'The new platform has positioned us as industry leaders and significantly improved our lead quality.',
        'Michael Johnson',
        'Founder & CEO',
        'Johnson Consulting Group',
        true,
        true,
        2,
        125000.00,
        ARRAY['consulting', 'strategy', 'thought-leadership', 'lead-generation']
    ),
    (
        'Premier Financial Services',
        'premier-financial-services',
        'Secure Banking Platform',
        'A secure, compliant website for a financial services company. Features advanced security measures, client portal integration, and investment tracking tools.',
        'Secure financial services website with client portal and investment tools.',
        'https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759838227/pexels-tinchflicks-29054615_napowl.jpg',
        financial_id,
        'Premier Financial Services',
        'https://premierfinancial.co.za',
        'https://github.com/lunexweb/premier-financial',
        ARRAY['Vue.js', 'Node.js', 'MongoDB', 'JWT', 'Encryption'],
        'website',
        'Financial Services',
        '10 weeks',
        'R150,000 - R200,000',
        5,
        'Enterprise',
        'Achieved 99.9% uptime and increased client satisfaction by 60%.',
        'The platform exceeded our security requirements and provides an excellent client experience.',
        'David Thompson',
        'CTO',
        'Premier Financial Services',
        true,
        true,
        3,
        175000.00,
        ARRAY['finance', 'security', 'compliance', 'portal']
    ),
    (
        'Elite Properties Real Estate',
        'elite-properties-real-estate',
        'Premium Property Showcase',
        'A dynamic real estate website featuring virtual tours, MLS integration, and advanced property search functionality. Designed to attract high-end buyers and sellers.',
        'Premium real estate website with virtual tours and MLS integration.',
        'https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759838000/pexels-rodnae-productions-8293778_abc123.jpg',
        real_estate_id,
        'Elite Properties',
        'https://eliteproperties.co.za',
        'https://github.com/lunexweb/elite-properties',
        ARRAY['React', 'GraphQL', 'AWS', '3D Tours', 'MLS API'],
        'website',
        'Real Estate',
        '7 weeks',
        'R80,000 - R120,000',
        4,
        'Large',
        'Increased property inquiries by 180% and reduced time-to-sale by 25%.',
        'The virtual tours and search functionality have revolutionized how we showcase properties.',
        'Jennifer Martinez',
        'Sales Director',
        'Elite Properties',
        true,
        true,
        4,
        100000.00,
        ARRAY['real-estate', 'virtual-tours', 'mls', 'premium']
    ),
    (
        'Luxury Diamond Collection',
        'luxury-diamond-collection',
        'Exclusive Jewelry E-commerce',
        'A sophisticated e-commerce platform for luxury jewelry. Features high-end product galleries, secure payment processing, and personalized shopping experiences.',
        'Luxury jewelry e-commerce platform with personalized shopping experience.',
        'https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759838227/pexels-tinchflicks-29054615_napowl.jpg',
        luxury_id,
        'Luxury Diamond Collection',
        'https://luxurydiamonds.co.za',
        'https://github.com/lunexweb/luxury-diamonds',
        ARRAY['Shopify Plus', 'Liquid', 'JavaScript', 'Stripe', '3D Models'],
        'ecommerce',
        'Luxury Retail',
        '9 weeks',
        'R120,000 - R180,000',
        5,
        'Enterprise',
        'Increased online sales by 250% and improved customer engagement by 90%.',
        'The platform perfectly captures the luxury of our brand while providing seamless shopping.',
        'Alexander Windsor',
        'Brand Director',
        'Luxury Diamond Collection',
        true,
        true,
        5,
        150000.00,
        ARRAY['luxury', 'ecommerce', 'jewelry', 'premium']
    ),
    (
        'TechStart Solutions',
        'techstart-solutions',
        'SaaS Platform Development',
        'A comprehensive SaaS platform for tech startups. Features user management, subscription billing, analytics dashboard, and API integrations.',
        'Complete SaaS platform for tech startups with subscription billing and analytics.',
        'https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759838046/pexels-lusterpix-32301952_zfmsac.jpg',
        ecommerce_id,
        'TechStart Solutions',
        'https://techstartsolutions.co.za',
        'https://github.com/lunexweb/techstart-solutions',
        ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'],
        'saas',
        'Technology',
        '12 weeks',
        'R200,000 - R300,000',
        6,
        'Enterprise',
        'Successfully launched with 1,000+ active users in first month.',
        'Lunexweb delivered a robust platform that exceeded our technical requirements.',
        'Rachel Chen',
        'Founder',
        'TechStart Solutions',
        true,
        true,
        6,
        250000.00,
        ARRAY['saas', 'startup', 'billing', 'analytics']
    );

END $$;

-- =====================================================
-- 10. INSERT SAMPLE PORTFOLIO VIEWS (for analytics)
-- =====================================================

-- Add some sample views for analytics
DO $$
DECLARE
    project_ids UUID[];
    i INTEGER;
    project_id UUID;
BEGIN
    -- Get all project IDs
    SELECT ARRAY_AGG(id) INTO project_ids FROM portfolio_projects;
    
    -- Add random views for each project
    FOR i IN 1..ARRAY_LENGTH(project_ids, 1) LOOP
        project_id := project_ids[i];
        
        -- Add 10-50 random views per project
        FOR j IN 1..(RANDOM() * 40 + 10)::INTEGER LOOP
            INSERT INTO portfolio_views (project_id, viewed_at)
            VALUES (
                project_id,
                NOW() - (RANDOM() * INTERVAL '30 days')
            );
        END LOOP;
    END LOOP;
END $$;

-- =====================================================
-- 11. VERIFICATION QUERIES
-- =====================================================

-- Verify tables were created
SELECT 
    table_name, 
    table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'portfolio%'
ORDER BY table_name;

-- Verify categories were inserted
SELECT 
    name, 
    slug, 
    color, 
    icon, 
    is_active 
FROM portfolio_categories 
ORDER BY sort_order;

-- Verify projects were inserted
SELECT 
    p.title,
    p.slug,
    p.client_name,
    c.name as category,
    p.project_type,
    p.budget_range,
    p.estimated_value,
    p.is_featured,
    p.is_published
FROM portfolio_projects p
JOIN portfolio_categories c ON p.category_id = c.id
ORDER BY p.sort_order;

-- Verify view counts
SELECT 
    p.title,
    COUNT(pv.id) as view_count
FROM portfolio_projects p
LEFT JOIN portfolio_views pv ON p.id = pv.project_id
GROUP BY p.id, p.title
ORDER BY view_count DESC;

-- Check total records
SELECT 
    'Categories' as table_name, COUNT(*) as record_count FROM portfolio_categories
UNION ALL
SELECT 
    'Projects' as table_name, COUNT(*) as record_count FROM portfolio_projects
UNION ALL
SELECT 
    'Views' as table_name, COUNT(*) as record_count FROM portfolio_views;
