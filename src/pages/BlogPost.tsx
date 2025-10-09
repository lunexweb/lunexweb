import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { BlogCard } from "@/components/BlogCard";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Clock, Eye, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { db, BlogPostWithDetails, BlogCategory } from "@/lib/supabase";
import { motion } from "framer-motion";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostWithDetails | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostWithDetails[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      loadPostData();
      trackView();
    }
  }, [slug]);

  const loadPostData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [postData, categoriesData] = await Promise.all([
        db.getBlogPostBySlug(slug!),
        db.getBlogCategories()
      ]);

      setPost(postData);
      setCategories(categoriesData);

      // Load related posts from the same category
      if (postData.category_id) {
        const related = await db.getBlogPosts({
          categoryId: postData.category_id,
          limit: 3
        });
        setRelatedPosts(related.filter(p => p.id !== postData.id));
      }
    } catch (err) {
      console.error('Error loading post:', err);
      setError('Post not found');
    } finally {
      setLoading(false);
    }
  };

  const trackView = async () => {
    try {
      await db.incrementBlogView(slug!);
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-green-600" />
            <span className="text-gray-600">Loading article...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/blog')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Breadcrumb */}
      <section className="py-6 bg-slate-50 border-b">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <a href="/" className="hover:text-green-600 transition-colors">Home</a>
              <span>/</span>
              <a href="/blog" className="hover:text-green-600 transition-colors">Blog</a>
              {post.category_name && (
                <>
                  <span>/</span>
                  <span>{post.category_name}</span>
                </>
              )}
              <span>/</span>
              <span className="text-gray-900">{post.title}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
              viewport={{ once: true }}
              className="text-center mb-12 lg:mb-16"
            >
              {/* Category Badge */}
              {post.category_name && (
                <Badge className="mb-6 lg:mb-8 bg-green-100 text-green-700 hover:bg-green-200 text-sm font-semibold px-4 py-2 rounded-full">
                  {post.category_name}
                </Badge>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-slate-900 mb-6 lg:mb-8">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto mb-8 lg:mb-12">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-sm lg:text-base text-gray-500 mb-8 lg:mb-12">
                {post.author_name && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="font-medium">{post.author_name}</span>
                  </div>
                )}
                
                {post.published_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                )}

                {post.read_time_minutes && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>{post.read_time_minutes} min read</span>
                  </div>
                )}

                {post.view_count > 0 && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>{post.view_count} views</span>
                  </div>
                )}
              </div>

              {/* Social Share */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <span className="text-sm lg:text-base text-gray-500 font-medium">Share:</span>
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => sharePost('facebook')}
                    className="p-3 rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
                  >
                    <Facebook className="w-4 h-4 lg:w-5 lg:h-5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => sharePost('twitter')}
                    className="p-3 rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
                  >
                    <Twitter className="w-4 h-4 lg:w-5 lg:h-5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => sharePost('linkedin')}
                    className="p-3 rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 lg:w-5 lg:h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image_url && (
        <section className="pb-12 lg:pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
                viewport={{ once: true }}
                className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-64 sm:h-80 lg:h-96 xl:h-[28rem] object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
                  viewport={{ once: true }}
                  className="prose prose-lg lg:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-green-600 prose-code:bg-green-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-green-500 prose-blockquote:bg-green-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-xl"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="lg:sticky lg:top-24">
                  <BlogSidebar
                    categories={categories}
                    recentPosts={relatedPosts}
                    popularPosts={[post]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
                viewport={{ once: true }}
                className="text-center mb-12 lg:mb-16"
              >
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 mb-4 lg:mb-6">Related Articles</h2>
                <p className="text-base lg:text-lg text-slate-600 max-w-2xl mx-auto">Continue exploring similar topics and expand your knowledge</p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <p>© {new Date().getFullYear()} Lunexweb. All rights reserved.</p>
            <span className="text-muted-foreground/50">•</span>
            <a 
              href="/dashboard" 
              className="text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              Lunex Team Dashboard
            </a>
          </div>
          <p className="text-xs text-muted-foreground/70">
            Premium Web Development Agency
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
