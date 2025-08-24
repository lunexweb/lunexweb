'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const featuredItems = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Modern online store with seamless user experience and powerful backend.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    category: 'Web Development',
    link: '/services'
  },
  {
    id: 2,
    title: 'Digital Marketing Campaign',
    description: 'Comprehensive marketing strategy that increased conversions by 300%.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    category: 'Digital Marketing',
    link: '/services'
  },
  {
    id: 3,
    title: 'SEO Optimization',
    description: 'Search engine optimization that improved organic traffic by 500%.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    category: 'SEO',
    link: '/services'
  },
  {
    id: 4,
    title: 'Corporate Website',
    description: 'Professional website design that reflects brand identity and values.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
    category: 'Web Development',
    link: '/services'
  },
  {
    id: 5,
    title: 'Social Media Strategy',
    description: 'Engaging social media presence that builds meaningful connections.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop',
    category: 'Digital Marketing',
    link: '/services'
  },
  {
    id: 6,
    title: 'Content Marketing',
    description: 'Strategic content creation that drives engagement and conversions.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    category: 'Content',
    link: '/services'
  }
]

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])

  return (
    <section ref={containerRef} className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-custom mb-8 sm:mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="heading-lg mb-4 sm:mb-6">What we do best</h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Discover our core services and see how we transform businesses with cutting-edge technology 
            and strategic solutions that drive real results. From web development to digital marketing, 
            we provide comprehensive solutions tailored to your business needs.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <motion.div
          style={{ x }}
          className="flex space-x-4 sm:space-x-6 md:space-x-8 px-4 sm:px-6 lg:px-8"
        >
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex-shrink-0 w-72 sm:w-80 lg:w-96"
            >
              <div className="bg-primary-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mobile-card flex flex-col h-full">
                {/* Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.title} - ${item.category} service showcasing ${item.description.toLowerCase()}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="px-2 sm:px-3 py-1 bg-primary-black text-primary-white text-xs sm:text-sm font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-primary-black">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <div className="mt-4">
                    <Link href="/services" className="inline-flex items-center text-primary-black hover:text-gray-700 font-medium text-sm transition-colors duration-200">
                      Learn more
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
      </div>
    </section>
  )
} 