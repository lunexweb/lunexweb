import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Award, Users, Clock, TrendingUp, Loader2 } from "lucide-react";
import { BusinessStatsService, BusinessStats } from "@/lib/businessStatsService";

export const Hero = () => {
  const [businessStats, setBusinessStats] = useState<BusinessStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await BusinessStatsService.getAllBusinessStats();
        setBusinessStats(stats);
      } catch (error) {
        console.error('Error loading business stats:', error);
        // Fallback to default stats
        setBusinessStats({
          yearsInBusiness: 5,
          totalClients: 150,
          clientGrowthRate: 100,
          focusArea: 'Premium Web Development',
          totalProjects: 0,
          completedProjects: 0,
          totalRevenue: 0,
          averageProjectValue: 0,
          currentMonthRevenue: 0,
          previousMonthRevenue: 0,
          monthlyGrowthRate: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const stats = [
    { icon: Clock, value: "98%", label: "Project Success Rate" },
    { icon: Users, value: "150+", label: "Premium Brands Served" },
    { icon: Award, value: `${Math.round(businessStats?.projectCompletionRate || 98)}%`, label: "Client Growth Achieved" },
    { icon: Shield, value: "Premium", label: "Digital Strategy Focus" }
  ];

  return (
    <section 
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" 
      style={{ 
        paddingTop: '80px' // Add padding to account for fixed navigation
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full z-0 object-cover"
        style={{ 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
        }}
      >
        <source src="https://res.cloudinary.com/dnnwvmh3n/video/upload/v1760022358/270415_small_falzoi.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 z-10" />
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Content */}
          <div className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              <span className="text-xs sm:text-sm text-green-100 font-medium">Premium Web Development Agency</span>
            </div>

            <h1 className="text-[clamp(2.5rem,6vw,6rem)] font-light tracking-tight leading-[1.1] text-white">
              Premium Web Development
              <br />
              <span className="text-green-400">That Converts</span>
            </h1>
            
            <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] text-white/90 max-w-4xl mx-auto leading-relaxed font-light px-4">
              Professional websites that convert visitors into paying clients. 
              Premium web development for law firms, consulting agencies & luxury websites across South Africa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-6 sm:pt-8">
              <div className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="text-white text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 font-medium group w-full sm:w-auto"
                  style={{ backgroundColor: '#22C55E' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#16A34A'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#22C55E'}
                  asChild
                >
                  <Link to="/services">
                    View Our Services
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
              <div className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white bg-black/20 backdrop-blur-sm hover:bg-white hover:text-slate-900 text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 font-medium w-full sm:w-auto"
                  asChild
                >
                  <Link to="/#contact">Start Your Project</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto px-4">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="text-center space-y-2 sm:space-y-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white animate-spin" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white">
                      --
                    </div>
                    <div className="text-xs sm:text-sm text-white/80 font-medium leading-tight px-1">
                      Loading...
                    </div>
                  </div>
                </div>
              ))
            ) : (
              stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center space-y-2 sm:space-y-3"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-white/80 font-medium leading-tight px-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};