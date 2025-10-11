import { motion } from 'framer-motion'
import { ArrowRight, Star, Award, Users, TrendingUp } from 'lucide-react'
import { PortfolioProjectWithDetails } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

interface PortfolioHeroProps {
  featuredProject?: PortfolioProjectWithDetails
}

export const PortfolioHero = ({ featuredProject }: PortfolioHeroProps) => {
  const navigate = useNavigate()
  
  const stats = [
    { label: 'Premium Quality', value: 'Always', icon: Star },
    { label: 'Client Focus', value: '100%', icon: Users },
    { label: 'Innovation', value: 'Constant', icon: TrendingUp },
    { label: 'Excellence', value: 'Guaranteed', icon: Award }
  ]

  const handleViewProject = () => {
    if (featuredProject) {
      navigate(`/portfolio/${featuredProject.slug}`)
    }
  }

  return (
    <section 
      className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      style={{ 
        paddingTop: '120px' // Add padding to account for fixed navigation
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
      >
        <source src="https://res.cloudinary.com/dnnwvmh3n/video/upload/v1760022256/270448_small_vbfzvu.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 z-10" />
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30 z-20"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Our Work
              <span className="block bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Speaks for Itself
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Premium web solutions that drive results. From concept to launch, we create digital experiences that convert visitors into customers.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold"
                onClick={() => navigate('/contact')}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg font-semibold bg-white/10 backdrop-blur-sm"
                onClick={() => navigate('/portfolio')}
              >
                View Case Studies
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center px-2">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-base lg:text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Featured Project */}
          {featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                {/* Project Image */}
                <div className="flex-1">
                  {featuredProject.featured_image_url ? (
                    <div className="relative rounded-2xl overflow-hidden">
                      <img
                        src={featuredProject.featured_image_url}
                        alt={featuredProject.title}
                        className="w-full h-64 md:h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  ) : (
                    <div className="w-full h-64 md:h-80 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center">
                      <div className="text-slate-400 text-6xl">💻</div>
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="flex-1 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-green-500 text-white">Featured Project</Badge>
                    {featuredProject.category_name && (
                      <Badge 
                        variant="outline" 
                        className="border-white/30 text-white"
                        style={{ borderColor: featuredProject.category_color }}
                      >
                        {featuredProject.category_name}
                      </Badge>
                    )}
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {featuredProject.title}
                  </h2>
                  
                  {featuredProject.subtitle && (
                    <p className="text-xl text-gray-300 mb-4">
                      {featuredProject.subtitle}
                    </p>
                  )}
                  
                  {featuredProject.short_description && (
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {featuredProject.short_description}
                    </p>
                  )}

                  {/* Technologies */}
                  {featuredProject.technologies && featuredProject.technologies.length > 0 && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {featuredProject.technologies.slice(0, 4).map((tech, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-white/20 text-white border-white/30"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {featuredProject.technologies.length > 4 && (
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            +{featuredProject.technologies.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Project Info */}
                  <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-6">
                    {featuredProject.client_name && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{featuredProject.client_name}</span>
                      </div>
                    )}
                    {featuredProject.project_end_date && (
                      <div className="flex items-center gap-2">
                        <span>Completed {new Date(featuredProject.project_end_date).getFullYear()}</span>
                      </div>
                    )}
                    {featuredProject.view_count > 0 && (
                      <div className="flex items-center gap-2">
                        <span>{featuredProject.view_count} views</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={handleViewProject}
                    >
                      View Project Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    {featuredProject.project_url && (
                      <Button 
                        variant="outline"
                        size="lg"
                        className="border-white/30 text-white hover:bg-white hover:text-slate-900 bg-transparent"
                        onClick={() => window.open(featuredProject.project_url, '_blank')}
                      >
                        Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}