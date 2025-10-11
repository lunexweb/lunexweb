-- Fix Blog Comments Table
-- This script ensures the blog_comments table exists with proper structure and RLS policies

-- Drop the table if it exists to recreate it properly
DROP TABLE IF EXISTS blog_comments CASCADE;

-- Create the blog_comments table
CREATE TABLE blog_comments (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    post_id uuid NOT NULL,
    parent_id uuid NULL,
    author_name character varying(255) NOT NULL,
    author_email character varying(255) NOT NULL,
    author_website character varying(500) NULL,
    content text NOT NULL,
    status character varying(50) NOT NULL DEFAULT 'pending'::character varying,
    ip_address inet NULL,
    user_agent text NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT blog_comments_pkey PRIMARY KEY (id),
    CONSTRAINT blog_comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    CONSTRAINT blog_comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES blog_comments(id) ON DELETE CASCADE,
    CONSTRAINT blog_comments_status_check CHECK (status = ANY (ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying, 'spam'::character varying])),
    CONSTRAINT blog_comments_email_check CHECK (author_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON blog_comments USING btree (post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments USING btree (status);
CREATE INDEX IF NOT EXISTS idx_blog_comments_created_at ON blog_comments USING btree (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_comments_parent_id ON blog_comments USING btree (parent_id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_blog_comments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_comments_updated_at
    BEFORE UPDATE ON blog_comments
    FOR EACH ROW
    EXECUTE FUNCTION update_blog_comments_updated_at();

-- Enable Row Level Security
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (permissive for testing)
CREATE POLICY "Enable read access for all users" ON blog_comments
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON blog_comments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON blog_comments
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON blog_comments
    FOR DELETE USING (true);

-- Grant permissions
GRANT ALL ON blog_comments TO authenticated;
GRANT ALL ON blog_comments TO anon;

-- Insert sample comment for testing
INSERT INTO blog_comments (post_id, author_name, author_email, content, status) 
SELECT 
    bp.id,
    'Test User',
    'test@example.com',
    'This is a test comment to verify the comments system is working.',
    'approved'
FROM blog_posts bp 
WHERE bp.title LIKE '%Future of Web Development%'
LIMIT 1;

-- Verify the table was created successfully
SELECT 'Blog comments table created successfully' as status;
