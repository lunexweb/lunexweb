'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Briefcase, User, Mail } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Services', href: '/services', icon: Briefcase },
  { name: 'About', href: '/about', icon: User },
  { name: 'Contact', href: '/contact', icon: Mail },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-lg"
    >
      <div className="flex items-center justify-around px-2 py-3 sm:py-4">
        {navigation.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-16 sm:h-18 rounded-lg transition-all duration-200 relative mobile-nav-item ${
                  isActive 
                    ? 'text-black bg-gray-100' 
                    : 'text-gray-500 hover:text-black hover:bg-gray-50'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`mb-1 transition-all duration-200 ${
                    isActive ? 'text-black' : 'text-gray-500'
                  }`}
                />
                <span className={`text-xs font-medium transition-all duration-200 mobile-text-sm ${
                  isActive ? 'text-black' : 'text-gray-500'
                }`}>
                  {item.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-1 w-8 h-0.5 bg-black rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.nav>
  )
} 