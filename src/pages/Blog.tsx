import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { BlogCard } from "@/components/BlogCard";
import { BlogHero } from "@/components/BlogHero";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Button } from "@/components/ui/button";
import { Loader2, BookOpen } from "lucide-react";
import { db, BlogPostWithDetails, BlogCategory } from "@/lib/supabase";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPostWithDetails[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPostWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const postsPerPage = 9;

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedCategoryId !== null) {
      loadPosts(true);
    }
  }, [selectedCategoryId]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // Load featured post, categories, and initial posts in parallel
      const [featuredResult, categoriesResult, postsResult] = await Promise.all([
        db.getFeaturedBlogPosts(1),
        db.getBlogCategories(),
        db.getBlogPosts({ limit: postsPerPage, offset: 0 })
      ]);

      setFeaturedPost(featuredResult[0] || null);
      setCategories(categoriesResult);
      setPosts(postsResult);
      setOffset(postsPerPage);
      setHasMore(postsResult.length === postsPerPage);
    } catch (error) {
      console.error('Error loading blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
        setOffset(0);
      } else {
        setLoadingMore(true);
      }

      const currentOffset = reset ? 0 : offset;
      const result = await db.getBlogPosts({
        categoryId: selectedCategoryId || undefined,
        limit: postsPerPage,
        offset: currentOffset
      });

      if (reset) {
        setPosts(result);
        setOffset(postsPerPage);
      } else {
        setPosts(prev => [...prev, ...result]);
        setOffset(prev => prev + postsPerPage);
      }

      setHasMore(result.length === postsPerPage);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };

  const handleLoadMore = () => {
    loadPosts(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-green-600" />
            <span className="text-gray-600">Loading articles...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      {featuredPost && (
        <BlogHero featuredPost={featuredPost} />
      )}

      {/* Main Content */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Blog Posts */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                {/* Section Header */}
                <div className="mb-8 lg:mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
                      {selectedCategoryId ? 
                        `Articles in ${categories.find(c => c.id === selectedCategoryId)?.name}` : 
                        'All Articles'
                      }
                    </h2>
                  </div>
                  <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
                    Discover insights, tips, and strategies to grow your business with premium web development.
                  </p>
                </div>

                {/* Posts Grid */}
                {posts.length > 0 ? (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-12">
                    {posts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 lg:py-24">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">No articles found</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Try selecting a different category or check back later for new content.
                    </p>
                  </div>
                )}

                {/* Load More Button */}
                {hasMore && posts.length > 0 && (
                  <div className="text-center">
                    <Button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      variant="outline"
                      size="lg"
                      className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 rounded-xl font-semibold px-8 py-3"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Loading...
                        </>
                      ) : (
                        'Load More Articles'
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="lg:sticky lg:top-24">
                  <BlogSidebar
                    categories={categories}
                    recentPosts={posts.slice(0, 5)}
                    popularPosts={posts.sort((a, b) => (b.view_count || 0) - (a.view_count || 0))}
                    onCategoryFilter={handleCategoryFilter}
                    selectedCategoryId={selectedCategoryId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-slate-50">
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

export default Blog;
