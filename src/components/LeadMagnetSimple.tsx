import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Search, TrendingUp, Calculator, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface SimpleLeadMagnetProps {
  title: string;
  description: string;
  className?: string;
  onDownload?: () => void;
  icon?: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  badge?: string;
}

export const SimpleLeadMagnet = ({ 
  title, 
  description, 
  className = "", 
  onDownload, 
  icon,
  gradientFrom = "from-slate-900",
  gradientTo = "to-slate-800",
  badge
}: SimpleLeadMagnetProps) => {
  const handleClick = () => {
    if (onDownload) {
      onDownload();
    } else {
      // Default action - scroll to contact section
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card 
        className={`h-[300px] sm:h-[350px] md:h-[400px] bg-gradient-to-br ${gradientFrom} ${gradientTo} cursor-pointer hover:from-slate-700 hover:to-slate-600 transition-all duration-300 hover:shadow-2xl border border-slate-600 hover:border-slate-500 relative overflow-hidden ${className}`}
        onClick={handleClick}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-16 h-16 border border-white rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border border-white rounded-full"></div>
        </div>
        
        {badge && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {badge}
          </div>
        )}
        
        <CardContent className="p-6 h-full flex flex-col justify-between text-center relative z-10">
          <div className="flex-1 flex flex-col justify-center">
            {icon && (
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  {icon}
                </div>
              </div>
            )}
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
          </div>
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Get Free Access
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const SimpleWebsiteAuditMagnet = ({ className }: { className?: string }) => (
  <SimpleLeadMagnet
    title="Free Website Audit"
    description="Get a comprehensive analysis of your current website with actionable recommendations."
    className={className}
    icon={<Search className="w-6 h-6 text-white" />}
    gradientFrom="from-blue-900"
    gradientTo="to-blue-800"
    badge="Boost SEO!"
  />
);

export const SimpleLeadGenerationGuide = ({ className }: { className?: string }) => (
  <SimpleLeadMagnet
    title="Website Conversion Guide"
    description="Download our exclusive 47-page guide with proven strategies."
    className={className}
    icon={<TrendingUp className="w-6 h-6 text-white" />}
    gradientFrom="from-purple-900"
    gradientTo="to-purple-800"
    badge="Increase Sales!"
  />
);

export const SimpleROICalculator = ({ className }: { className?: string }) => (
  <SimpleLeadMagnet
    title="ROI Calculator"
    description="Calculate exactly how much revenue a professional website will generate."
    className={className}
    icon={<Calculator className="w-6 h-6 text-white" />}
    gradientFrom="from-green-900"
    gradientTo="to-green-800"
    badge="Predict Growth!"
  />
);

export const SimpleWebsiteTemplate = ({ className }: { className?: string }) => (
  <SimpleLeadMagnet
    title="Professional Template"
    description="Get our premium website template designed specifically for professional service businesses."
    className={className}
    icon={<FileText className="w-6 h-6 text-white" />}
    gradientFrom="from-orange-900"
    gradientTo="to-orange-800"
    badge="Launch Faster!"
  />
);



