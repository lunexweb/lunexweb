'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Our Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)        
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-black/20 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
              className={`text-xl sm:text-2xl font-bold cursor-pointer tracking-tight relative ${
                isScrolled ? 'text-black' : 'text-white drop-shadow-lg'
              }`}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
              Lunexweb
              </motion.span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                  isScrolled ? 'bg-black' : 'bg-white'
                }`}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className={`group relative nav-text transition-all duration-300 tracking-wide ${
                    isScrolled 
                      ? pathname === item.href 
                        ? 'text-black font-semibold' 
                        : 'text-gray-700 hover:text-black'
                      : pathname === item.href 
                        ? 'text-white font-semibold' 
                        : 'text-white/90 hover:text-white drop-shadow-sm'
                  }`}
                >
                  <span className="relative inline-block">
                    {item.name}
                    <motion.span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 ease-out ${
                        isScrolled ? 'bg-black' : 'bg-white'
                      }`}
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{
                        background: isScrolled ? 'linear-gradient(90deg, transparent, #000, transparent)' : 'linear-gradient(90deg, transparent, #fff, transparent)'
                      }}
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>


        </div>
      </div>


    </motion.header>
  )
} 