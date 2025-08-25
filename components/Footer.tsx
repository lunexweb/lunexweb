'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, ArrowUp } from 'lucide-react'
import { useLenis } from './SmoothScrollProvider'
import Image from 'next/image'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Our Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/lunexweb?igsh=ZzE2OGhkNDk5d2p6',
      icon: Instagram,
    },
  ],
}

export default function Footer() {
  const lenis = useLenis()

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    } else {
      // Fallback to native smooth scroll if Lenis is not available
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-primary-black text-primary-white relative">
      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-primary-white text-primary-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10"
        aria-label="Back to top"
      >
        <ArrowUp size={16} className="sm:w-5 sm:h-5" />
      </motion.button>

      <div className="container-custom">
        <div className="section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-4 sm:mb-6">
                  <Image
                    src="/logo1.svg"
                    alt="Lunexweb Logo"
                    width={140}
                    height={56}
                    className="filter brightness-0 invert"
                  />
                </div>
                <p className="text-body-sm text-gray-300 mb-4 sm:mb-6 md:mb-8 max-w-md">
                  We create powerful online experiences and drive business growth through innovative technology. 
                  From modern applications to strategic marketing, we help businesses thrive in the digital landscape.
                  Based in Johannesburg, South Africa, we serve clients locally and globally with world-class 
                  digital solutions and local market expertise, from South African businesses to international 
                  companies across Africa, Europe, North America, and worldwide.
                </p>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="heading-sm mb-3 sm:mb-4 md:mb-6">Contact</h4>
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Mail size={16} className="text-gray-400 sm:w-5 sm:h-5 flex-shrink-0" />
                    <a 
                      href="mailto:enquiry@lunexweb.com" 
                      className="text-gray-300 hover:text-primary-white transition-colors text-sm sm:text-base"
                    >
                      enquiry@lunexweb.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Mail size={16} className="text-gray-400 sm:w-5 sm:h-5 flex-shrink-0" />
                    <a 
                      href="mailto:contact@lunexweb.com" 
                      className="text-gray-300 hover:text-primary-white transition-colors text-sm sm:text-base"
                    >
                      contact@lunexweb.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <MapPin size={16} className="text-gray-400 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm sm:text-base">
                      Johannesburg, South Africa
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="heading-sm mb-3 sm:mb-4 md:mb-6">Quick Links</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-primary-white transition-colors text-sm sm:text-base block py-1"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border-t border-gray-800 mt-6 sm:mt-8 md:mt-12 pt-4 sm:pt-6 md:pt-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left footer-text text-gray-600">
                © 2025 Lunexweb. All rights reserved.
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4 sm:space-x-6">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-primary-white transition-colors p-2 -m-2"
                    aria-label={item.name}
                  >
                    <item.icon size={18} className="sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
} 