'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
}

export default function Logo({ className = '', size = 'md', variant = 'dark' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl'
  }

  const colorClasses = {
    light: 'text-white',
    dark: 'text-black'
  }

  return (
    <Link href="/" className={`inline-block ${className}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
        className="relative group"
      >
        <div className={`font-bold tracking-tight ${sizeClasses[size]} ${colorClasses[variant]}`}>
          <span className="relative inline-block">
            <motion.span
              className="block"
              initial={{ opacity: 1 }}
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              Lunexweb
            </motion.span>
            
            {/* Animated underline */}
            <motion.div
              className={`absolute -bottom-1 left-0 h-0.5 ${
                variant === 'light' ? 'bg-white' : 'bg-black'
              }`}
              initial={{ width: '0%' }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            
            {/* Subtle glow effect */}
            <motion.div
              className={`absolute -bottom-1 left-0 h-0.5 opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
                variant === 'light' 
                  ? 'bg-gradient-to-r from-transparent via-white to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-black to-transparent'
              }`}
              style={{ width: '100%' }}
            />
          </span>
        </div>
        
        {/* Subtle background highlight on hover */}
        <motion.div
          className={`absolute inset-0 rounded-md opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
            variant === 'light' ? 'bg-white' : 'bg-black'
          }`}
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  )
} 