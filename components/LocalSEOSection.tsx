'use client'

import { motion } from 'framer-motion'
import { MapPin, Globe, Users, Award, Building, Target } from 'lucide-react'
import Link from 'next/link'

const localServices = [
  {
    icon: Building,
    title: 'Johannesburg Web Development',
    description: 'Professional web development services tailored for Johannesburg businesses, from startups in Sandton to established companies in Rosebank and beyond.',
    features: ['Local market understanding', 'South African business focus', 'Johannesburg-based support', 'Global standards']
  },
  {
    icon: Target,
    title: 'South African Digital Marketing',
    description: 'Digital marketing strategies designed specifically for the South African market, including local SEO, social media, and advertising campaigns.',
    features: ['Local SEO optimization', 'South African social media', 'Local advertising platforms', 'International reach']
  },
  {
    icon: Users,
    title: 'Local Business Support',
    description: 'Comprehensive support for businesses across South Africa, from Cape Town to Durban, with special focus on Johannesburg and Gauteng.',
    features: ['Local business expertise', 'South African market knowledge', 'Regional support', 'Global partnerships']
  },
  {
    icon: Award,
    title: 'Johannesburg SEO Services',
    description: 'Search engine optimization services that help Johannesburg businesses rank higher in local and national search results.',
    features: ['Local keyword optimization', 'Google My Business', 'Local citations', 'International SEO']
  }
]

const localAreas = [
  // South Africa
  'Sandton', 'Rosebank', 'Melville', 'Parktown', 'Bryanston', 'Fourways', 
  'Midrand', 'Centurion', 'Pretoria', 'Cape Town', 'Durban', 'Port Elizabeth',
  // Kenya
  'Nairobi', 'Mombasa', 'Kisumu',
  // Nigeria
  'Lagos', 'Abuja', 'Port Harcourt',
  // International
  'London', 'New York', 'Toronto', 'Sydney', 'Berlin', 'Amsterdam'
]

export default function LocalSEOSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="heading-lg mb-4 sm:mb-6">Serving South Africa, Africa & International Clients</h2>
          <p className="text-body text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            Based in Johannesburg, South Africa, we provide comprehensive web development and digital marketing 
            services to businesses worldwide. Our local market knowledge combined with international 
            best practices ensures exceptional results for businesses in South Africa, Africa, Europe, North America, and beyond.
          </p>
        </motion.div>

        {/* Local Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
          {localServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-primary-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-50 transition-all duration-200 mobile-card"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-black rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <service.icon size={24} className="sm:w-8 sm:h-8 text-primary-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-primary-black mb-2 sm:mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-3 sm:mb-4">{service.description}</p>
              <ul className="space-y-1">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-xs text-gray-500 flex items-center">
                    <div className="w-1 h-1 bg-primary-black rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Local Areas Served */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-primary-black mb-4 sm:mb-6">
            Global Reach, Local Expertise
          </h3>
          
          {/* Mobile-optimized city grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3 mb-6 sm:mb-8 px-4 sm:px-0">
            {localAreas.map((area, index) => (
              <motion.span
                key={area}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-2 sm:px-3 py-1.5 sm:py-2 bg-primary-black text-primary-white text-xs sm:text-sm rounded-full hover:bg-gray-800 transition-colors duration-200 text-center break-words"
              >
                {area}
              </motion.span>
            ))}
          </div>
          
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4 sm:px-0">
            Whether you&apos;re in Johannesburg, Cape Town, Durban, Nairobi, Lagos, London, New York, or anywhere worldwide, 
            we&apos;re here to help your business succeed online. Our local expertise combined with 
            global standards ensures exceptional results for businesses everywhere.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link 
            href="/contact" 
            className="btn-primary group"
          >
            <MapPin size={20} className="mr-2" />
            Get Started with Your Project
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 