'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  index: number
}

export default function ServiceCard({ icon: Icon, title, description, features, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
              className="bg-primary-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 w-full max-w-full relative overflow-hidden group"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-black rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-gray-800 transition-colors duration-300"
      >
        <Icon size={24} className="text-primary-white sm:w-8 sm:h-8 group-hover:scale-110 transition-transform duration-300" />
      </motion.div>

      {/* Title */}
      <h3 className="card-title text-primary-black mb-3 sm:mb-4">{title}</h3>

      {/* Description */}
      <p className="card-description text-gray-600 mb-4 sm:mb-6 leading-relaxed">{description}</p>

      {/* Features */}
      <ul className="space-y-2 sm:space-y-3">
        {features.map((feature, featureIndex) => (
          <motion.li
            key={featureIndex}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.1) }}
            className="flex items-center space-x-2 sm:space-x-3"
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-black rounded-full flex-shrink-0" />
            <span className="text-gray-700 text-sm sm:text-base break-words">{feature}</span>
          </motion.li>
        ))}
      </ul>

      {/* Hover Effect Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-primary-black/5 to-transparent rounded-lg pointer-events-none"
      />
      
      {/* Animated Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-primary-black origin-left"
      />
    </motion.div>
  )
} 