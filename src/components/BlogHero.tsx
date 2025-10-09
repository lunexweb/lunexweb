import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BlogCard } from "./BlogCard";
import { BlogPostWithDetails } from "@/lib/supabase";
import { ArrowRight, BookOpen, TrendingUp } from "lucide-react";

interface BlogHeroProps {
  featuredPost: BlogPostWithDetails;
}

export const BlogHero = ({ featuredPost }: BlogHeroProps) => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 mb-6 lg:mb-8">
              <BookOpen className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300 font-medium">Latest Insights</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight leading-tight text-white mb-6 lg:mb-8">
              Industry News & 
              <br />
              <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent font-medium">
                Expert Insights
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8 lg:mb-12">
              Stay ahead with the latest trends in web development, law firm marketing, 
              and digital strategy for premium brands across South Africa.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 lg:gap-12 mb-12">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-slate-400">Expert Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-sm text-slate-400">Monthly Readers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-sm text-slate-400">Client Satisfaction</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                View Our Services
              </Link>
            </div>
          </motion.div>

          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.25, 0, 1] }}
            viewport={{ once: true }}
            className="mb-16 lg:mb-20"
          >
            <div className="text-center mb-8 lg:mb-12">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-4">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300 font-medium">Featured Article</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-3">
                Our Most Popular Content
              </h2>
              <p className="text-slate-300 text-lg">Handpicked insights from our experts</p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <BlogCard post={featuredPost} featured={true} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
