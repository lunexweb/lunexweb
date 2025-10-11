import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  link?: string;
}

export const ServiceCard = ({ number, title, description, image, features, link }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer h-full w-full">
        <div className="p-6 space-y-4 h-full flex flex-col w-full">
          {/* Header */}
          <div className="flex items-start justify-between w-full">
            <div className="space-y-2 w-full min-w-0">
              <div className="text-gray-400 text-xs font-mono">//</div>
              <div className="text-gray-400 text-sm font-mono">{number}</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight break-words">
                {title}
              </h3>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed flex-grow break-words">
            {description}
          </p>
          
          {/* Features - Compact List */}
          <div className="space-y-2 w-full">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-start gap-2 w-full">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600 text-xs leading-relaxed break-words flex-1">{feature}</span>
              </div>
            ))}
            {features.length > 3 && (
              <div className="text-xs text-gray-500 font-medium break-words">
                +{features.length - 3} more services
              </div>
            )}
          </div>
          
          {/* Link */}
          {link && (
            <div className="pt-3 border-t border-gray-100">
              <a 
                href={link}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group-hover:gap-2 gap-1"
              >
                Learn more
                <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
        
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
      </Card>
    </motion.div>
  );
};