'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award, Users, Target, Zap, Code, TrendingUp, Globe, Database, Heart, Lightbulb, Shield, Rocket } from 'lucide-react'
import BreadcrumbSection from '@/components/BreadcrumbSection'

const stats = [
  { icon: Award, number: '50+', label: 'Projects Completed' },
  { icon: Users, number: '30+', label: 'Happy Clients' },
  { icon: Target, number: '95%', label: 'Client Satisfaction' },
  { icon: Zap, number: '24/7', label: 'Support Available' }
]

const expertise = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'React.js, Next.js, Full-stack development, AI web applications, and Progressive Web Apps.'
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'SEO specialist services, YouTube advertising, Instagram ads, TikTok campaigns, Google Ads, and Facebook advertising.'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Serving clients worldwide with comprehensive web development and digital marketing solutions.'
  },
  {
    icon: Database,
    title: 'Modern Technologies',
    description: 'Cutting-edge technologies including AI, machine learning, and advanced backend systems.'
  }
]

const values = [
  {
    icon: Heart,
    title: 'Client-Centric Approach',
    description: 'Every project begins with understanding your unique business needs and objectives. Success comes from building lasting partnerships and delivering solutions that exceed expectations.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Excellence',
    description: 'Staying ahead of technological trends with React, Next.js, AI, and emerging digital marketing strategies. Continuous learning drives exceptional results.'
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Rigorous testing and optimization ensure every website and marketing campaign performs flawlessly. Attention to detail creates digital experiences that stand out.'
  },
  {
    icon: Rocket,
    title: 'Results-Driven Focus',
    description: 'Measurable outcomes and ROI are central to our approach. Data-driven strategies and performance tracking guarantee business growth and success.'
  }
]



export default function AboutPage() {
  return (
    <div className="pt-20 w-full max-w-full overflow-x-hidden">
      {/* Breadcrumb */}
      <BreadcrumbSection items={[{ label: 'About' }]} />

      {/* Hero Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="heading-xl mb-4 sm:mb-6">About Lunexweb</h1>
            <p className="text-body text-gray-600 mb-8 sm:mb-12 px-4 sm:px-0">
              Lunexweb stands as a global digital agency delivering modern web applications and strategic marketing solutions. 
              Our expertise encompasses modern development technologies, search optimization, social media management, 
              logo design, and brand development. We empower businesses worldwide to establish powerful online presences 
              and achieve sustainable digital success through innovative technology and strategic marketing approaches.
              Based in Johannesburg, South Africa, we combine local market insights with international expertise 
              to deliver exceptional results for businesses across South Africa, Africa, Europe, North America, and worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-lg mb-4 sm:mb-6">Our Mission & Vision</h2>
              <div className="space-y-3 sm:space-y-4 text-body text-gray-600">
                <p>
                  Lunexweb emerged with a clear mission: to democratize access to cutting-edge web applications 
                  and strategic marketing solutions globally. Our vision centers on empowering businesses of all sizes with the 
                  digital tools and strategies needed to thrive in today&apos;s competitive online landscape.
                </p>
                <p>
                  The digital landscape constantly evolves, and staying ahead requires more than technical expertise. 
                  Success demands strategic thinking, creative innovation, and a deep understanding of how technology 
                  intersects with business objectives. This philosophy drives every project we undertake.
                </p>
                <p>
                  Today, Lunexweb continues pushing boundaries in modern web development and growth marketing, maintaining 
                  leadership in React, Next.js, AI technologies, and comprehensive marketing strategies. 
                  Our commitment to excellence and innovation remains unwavering as we help businesses worldwide 
                  achieve their digital transformation goals. From our Johannesburg headquarters, we serve clients 
                  across South Africa, Africa, Europe, North America, and worldwide, bringing world-class digital solutions 
                  to every project regardless of location.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration and innovation"
                width={800}
                height={600}
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="heading-lg mb-4 sm:mb-6">What Drives Us Forward</h2>
            <p className="text-body text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              These core principles guide our approach to modern web development and growth marketing, ensuring every project 
              delivers exceptional results and lasting value for our global clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-full">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg mobile-card"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-black rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <value.icon size={24} className="sm:w-8 sm:h-8 text-primary-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="heading-lg mb-4 sm:mb-6">Our Core Expertise</h2>
            <p className="text-body text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              We combine technical excellence with marketing innovation to deliver comprehensive 
              digital solutions that drive growth and success for businesses worldwide. Our Johannesburg-based 
              team brings local market knowledge and cultural understanding to every project, ensuring 
              solutions that resonate with both local and international audiences while maintaining global competitiveness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-full">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-4 sm:p-6 bg-primary-white rounded-lg mobile-card"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-black rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <item.icon size={24} className="sm:w-8 sm:h-8 text-primary-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full max-w-full">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-black rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <stat.icon size={24} className="sm:w-8 sm:h-8 text-primary-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-primary-black mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
} 