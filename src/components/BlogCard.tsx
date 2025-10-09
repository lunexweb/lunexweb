import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, Eye, User, ArrowRight, BookOpen } from "lucide-react";
import { BlogPostWithDetails } from "@/lib/supabase";

interface BlogCardProps {
  post: BlogPostWithDetails;
  featured?: boolean;
  className?: string;
}

export const BlogCard = ({ post, featured = false, className = "" }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: featured ? 1.02 : 1.01 }}
      transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1], type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      <Link to={`/blog/${post.slug}`}>
        <Card className="group cursor-pointer h-full overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 relative">
          {/* Featured Image */}
          {post.featured_image_url ? (
            <div className={`relative overflow-hidden ${featured ? 'h-72 lg:h-80' : 'h-56 lg:h-64'}`}>
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Featured Badge */}
              {post.is_featured && (
                <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600 text-white shadow-lg">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}

              {/* Category Badge */}
              {post.category_name && (
                <Badge 
                  variant="secondary"
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white border-0 shadow-lg"
                >
                  {post.category_name}
                </Badge>
              )}
            </div>
          ) : (
            <div className={`relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 ${featured ? 'h-72 lg:h-80' : 'h-56 lg:h-64'} flex items-center justify-center`}>
              <BookOpen className="w-16 h-16 text-slate-400" />
              
              {/* Category Badge */}
              {post.category_name && (
                <Badge 
                  variant="secondary"
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white border-0 shadow-lg"
                >
                  {post.category_name}
                </Badge>
              )}
            </div>
          )}

          <div className="p-6 lg:p-8 space-y-4 h-full flex flex-col">
            {/* Title */}
            <h3 className={`font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-tight line-clamp-2 ${
              featured ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'
            }`}>
              {post.title}
            </h3>
            
            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed flex-grow line-clamp-3">
                {post.excerpt}
              </p>
            )}
            
            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4 text-xs lg:text-sm text-gray-500">
                {post.author_name && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{post.author_name}</span>
                  </div>
                )}
                
                {post.published_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-xs lg:text-sm text-gray-500">
                {post.read_time_minutes && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.read_time_minutes}m read</span>
                  </div>
                )}
                
                {post.view_count > 0 && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.view_count}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-green-50 text-green-700 hover:bg-green-100">
                    #{tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                    +{post.tags.length - 3} more
                  </Badge>
                )}
              </div>
            )}

            {/* Read More Button */}
            <div className="pt-4">
              <div className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-sm transition-colors group-hover:gap-2 gap-1">
                Read More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
          
          {/* Hover Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"></div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
