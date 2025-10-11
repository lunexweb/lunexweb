import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Tag, User, TrendingUp, Mail, ArrowRight, BookOpen, Eye } from "lucide-react";
import { BlogPostWithDetails, BlogCategory } from "@/lib/supabase";
import { useState } from "react";

interface BlogSidebarProps {
  categories: BlogCategory[];
  recentPosts: BlogPostWithDetails[];
  popularPosts: BlogPostWithDetails[];
  onCategoryFilter?: (categoryId: string | null) => void;
  selectedCategoryId?: string | null;
}

export const BlogSidebar = ({ 
  categories, 
  recentPosts, 
  popularPosts,
  onCategoryFilter,
  selectedCategoryId 
}: BlogSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <aside className="space-y-6 lg:space-y-8">
      {/* Search */}
      <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-green-600" />
          <h3 className="font-bold text-gray-900 text-lg">Search Articles</h3>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
          />
        </div>
      </Card>

      {/* Categories */}
      <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-6">
          <Tag className="w-5 h-5 text-green-600" />
          <h3 className="font-bold text-gray-900 text-lg">Categories</h3>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryFilter?.(null)}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedCategoryId === null 
                ? 'bg-green-100 text-green-700 border border-green-200 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            All Articles
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryFilter?.(category.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                selectedCategoryId === category.id 
                  ? 'bg-green-100 text-green-700 border border-green-200 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>{category.name}</span>
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                {category.name}
              </Badge>
            </button>
          ))}
        </div>
      </Card>

      {/* Recent Posts */}
      <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-green-600" />
          <h3 className="font-bold text-gray-900 text-lg">Recent Articles</h3>
        </div>
        <div className="space-y-4">
          {recentPosts.slice(0, 5).map((post) => (
            <div key={post.id} className="flex gap-4 group">
              {post.featured_image_url ? (
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-tight mb-2 group-hover:text-green-600 transition-colors">
                  <a 
                    href={`/blog/${post.slug}`}
                    className="hover:text-green-600 transition-colors"
                  >
                    {post.title}
                  </a>
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{post.published_at && formatDate(post.published_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Popular Posts */}
      <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="font-bold text-gray-900 text-lg">Most Popular</h3>
        </div>
        <div className="space-y-4">
          {popularPosts.slice(0, 5).map((post, index) => (
            <div key={post.id} className="flex gap-4 group">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                index === 0 ? 'bg-yellow-100 text-yellow-700' :
                index === 1 ? 'bg-gray-100 text-gray-700' :
                index === 2 ? 'bg-orange-100 text-orange-700' :
                'bg-green-100 text-green-700'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-tight mb-2 group-hover:text-green-600 transition-colors">
                  <a 
                    href={`/blog/${post.slug}`}
                    className="hover:text-green-600 transition-colors"
                  >
                    {post.title}
                  </a>
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Eye className="w-3 h-3" />
                  <span>{post.view_count} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Newsletter Signup */}
      <Card className="p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Stay Updated</h3>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Get the latest insights and industry news delivered to your inbox.
          </p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-white/80 backdrop-blur-sm"
            />
            <Button 
              size="sm" 
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold group"
            >
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </Card>

      {/* Author Bio */}
      <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-3">About Lunexweb</h3>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Premium web development agency specializing in law firms, consulting agencies, 
            and luxury websites across South Africa.
          </p>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-green-600 border-green-200 hover:bg-green-50 rounded-xl font-semibold"
          >
            Learn More
          </Button>
        </div>
      </Card>
    </aside>
  );
};
