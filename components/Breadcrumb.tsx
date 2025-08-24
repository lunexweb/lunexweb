'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { motion } from 'framer-motion'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  variant?: 'default' | 'dark' | 'minimal'
}

export default function Breadcrumb({ items, variant = 'default' }: BreadcrumbProps) {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    ...items
  ]

  const variantStyles = {
    default: {
      nav: "text-gray-600 border-b border-gray-100",
      link: "hover:text-primary-black",
      current: "text-primary-black font-semibold",
      chevron: "text-gray-300",
      homeIcon: "group-hover:scale-110 group-hover:rotate-12",
      underline: "decoration-gray-300 group-hover:decoration-primary-black",
      container: "hover:bg-gray-50/50 rounded-lg px-2 py-1 -mx-2 transition-colors duration-200"
    },
    dark: {
      nav: "text-white/90",
      link: "hover:text-white",
      current: "text-white font-semibold",
      chevron: "text-white/50",
      homeIcon: "group-hover:scale-110 group-hover:rotate-12",
      underline: "decoration-white/50 group-hover:decoration-white",
      container: "hover:bg-white/10 rounded-lg px-2 py-1 -mx-2 transition-colors duration-200"
    },
    minimal: {
      nav: "text-gray-600",
      link: "hover:text-primary-black",
      current: "text-primary-black font-semibold",
      chevron: "text-gray-300",
      homeIcon: "group-hover:scale-110 group-hover:rotate-12",
      underline: "decoration-gray-300 group-hover:decoration-primary-black",
      container: "hover:bg-gray-50/50 rounded-lg px-2 py-1 -mx-2 transition-colors duration-200"
    }
  }

  const styles = variantStyles[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <nav 
        className={`flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base py-4 sm:py-6 ${styles.nav}`}
        aria-label="Breadcrumb"
      >
        {breadcrumbItems.map((item, index) => (
          <motion.div 
            key={item.label} 
            className="flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {index > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 + 0.1 }}
              >
                <ChevronRight 
                  size={16} 
                  className={`mx-1 sm:mx-2 flex-shrink-0 ${styles.chevron}`}
                />
              </motion.div>
            )}
            {item.href && index < breadcrumbItems.length - 1 ? (
              <Link
                href={item.href}
                className={`transition-all duration-200 flex items-center group ${styles.link} ${styles.container}`}
              >
                {index === 0 && (
                  <Home 
                    size={16} 
                    className={`mr-1 sm:mr-2 flex-shrink-0 transition-all duration-200 ${styles.homeIcon}`}
                  />
                )}
                <span className={`hover:underline decoration-2 underline-offset-2 transition-all duration-200 ${styles.underline}`}>
                  {item.label}
                </span>
              </Link>
            ) : (
              <span className={`flex items-center ${styles.current}`}>
                {index === 0 && (
                  <Home 
                    size={16} 
                    className="mr-1 sm:mr-2 flex-shrink-0" 
                  />
                )}
                {item.label}
              </span>
            )}
          </motion.div>
        ))}
      </nav>
      
      {/* Structured Data for Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.label,
              "item": item.href ? `https://lunexweb.com${item.href}` : undefined
            }))
          })
        }}
      />
    </motion.div>
  )
} 