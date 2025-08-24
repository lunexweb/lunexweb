'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Code, TrendingUp, Video, Calendar, MessageCircle, Clock, Users, Award, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import BreadcrumbSection from '@/components/BreadcrumbSection'

const contactInfo = [
  {
    icon: Mail,
    title: 'Primary Email',
    content: 'info@lunexweb.com',
    link: 'mailto:info@lunexweb.com',
    description: 'Send us your project details and requirements'
  },
  {
    icon: MapPin,
    title: 'Location',
    content: 'Johannesburg, South Africa',
    link: null,
    description: 'Serving clients worldwide'
  }
]

const meetingOptions = [
  {
    icon: Video,
    title: 'Zoom Meetings',
    content: 'Schedule a Zoom consultation',
    link: 'mailto:info@lunexweb.com?subject=Zoom Meeting Request',
    description: 'Perfect for detailed project discussions and screen sharing'
  },
  {
    icon: Video,
    title: 'Microsoft Teams',
    content: 'Book a Teams meeting',
    link: 'mailto:info@lunexweb.com?subject=Teams Meeting Request',
    description: 'Ideal for enterprise clients and collaborative sessions'
  },
  {
    icon: Calendar,
    title: 'Meeting Availability',
    content: 'Flexible scheduling',
    link: 'mailto:info@lunexweb.com?subject=Meeting Availability',
    description: 'We accommodate different time zones and schedules'
  }
]

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'React.js, Next.js, Full-stack development, AI web applications, and custom web solutions.'
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'SEO specialist services, YouTube advertising, Instagram ads, TikTok campaigns, Google Ads, and Facebook advertising.'
  },
  {
    icon: Users,
    title: 'Social Media Management',
    description: 'Comprehensive social media management, content creation, and community management across all platforms.'
  },
  {
    icon: Award,
    title: 'Design Services',
    description: 'Professional logo design, company profile design, and brand identity development services.'
  }
]



export default function ContactPage() {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dnnwvmh3n/image/upload/f_auto,q_100,w_1920,h_1080,c_fill/v1754771046/maciej-drazkiewicz-XORfEIs_LTk-unsplash_anl9b7.jpg"
            alt="Contact us background"
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 z-30">
          <BreadcrumbSection items={[{ label: 'Contact' }]} variant="dark" />
        </div>

        {/* Content */}
        <div className="container-custom text-center relative z-10 px-4 sm:px-6 w-full max-w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="heading-xl mb-4 sm:mb-6 text-white">Get in Touch</h1>
            <p className="text-body text-gray-200 mb-8 sm:mb-12 max-w-3xl mx-auto">
              Ready to start your next modern web application or growth marketing project? We&apos;d love to hear from you. 
              Contact us directly via email or schedule a meeting on Zoom or Teams to discuss your digital vision. 
              Our team is ready to help you achieve your business goals through innovative digital solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full max-w-full">
            {/* Direct Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6 md:space-y-8"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary-black mb-4 sm:mb-6">
                  Contact Us Directly
                </h2>
                            <p className="text-body text-gray-600 mb-6 sm:mb-8">
              The best way to get started is to send us an email with your project details. 
              We&apos;ll respond quickly with a personalized consultation and proposal tailored to your specific needs.
              Whether you&apos;re based in Johannesburg, Cape Town, Durban, or anywhere in South Africa, 
              Africa, Europe, North America, or worldwide, we&apos;re here to help you achieve your digital goals.
            </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-100 transition-all duration-200 mobile-card w-full group cursor-pointer"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-black rounded-lg flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 group-hover:bg-gray-800 transition-all duration-200">
                      <info.icon size={20} className="sm:w-6 sm:h-6 text-primary-white group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-primary-black mb-1 text-xs sm:text-sm md:text-base break-words">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="inline-flex items-center space-x-2 text-primary-black hover:text-gray-700 transition-all duration-200 font-semibold text-xs sm:text-sm md:text-base break-words group"
                        >
                          <span className="underline decoration-2 underline-offset-2 group-hover:decoration-primary-black decoration-gray-400">
                            {info.content}
                          </span>
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <p className="text-gray-600 font-medium text-xs sm:text-sm md:text-base break-words">{info.content}</p>
                      )}
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words leading-relaxed">{info.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Email CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-r from-primary-black to-gray-800 text-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 mobile-card"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Ready to Get Started?</h3>
                <p className="text-gray-200 mb-3 sm:mb-4 text-sm sm:text-base">
                  Send us an email with your project requirements and we&apos;ll get back to you quickly with a detailed proposal.
                </p>
                <a
                  href="mailto:info@lunexweb.com?subject=Project Inquiry"
                  className="inline-flex items-center space-x-2 bg-white text-primary-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 hover:shadow-lg transition-all duration-200 text-sm sm:text-base group"
                >
                  <Mail size={18} className="sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-110" />
                  <span>Send Email</span>
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>

            {/* Meeting Options */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 sm:space-y-6 md:space-y-8"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary-black mb-4 sm:mb-6">
                  Schedule a Meeting
                </h2>
                <p className="text-body text-gray-600 mb-6 sm:mb-8">
                  Prefer a face-to-face discussion? We&apos;re available on Zoom and Microsoft Teams 
                  for detailed consultations, project reviews, and collaborative sessions.
                </p>
              </div>

              {/* Meeting Options Cards */}
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                {meetingOptions.map((option, index) => (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-100 transition-all duration-200 mobile-card w-full group cursor-pointer"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-black rounded-lg flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 group-hover:bg-gray-800 transition-all duration-200">
                      <option.icon size={20} className="sm:w-6 sm:h-6 text-primary-white group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-primary-black mb-1 text-xs sm:text-sm md:text-base break-words">{option.title}</h3>
                      <a
                        href={option.link}
                        className="inline-flex items-center space-x-2 text-primary-black hover:text-gray-700 transition-all duration-200 font-semibold text-xs sm:text-sm md:text-base break-words group"
                      >
                        <span className="underline decoration-2 underline-offset-2 group-hover:decoration-primary-black decoration-gray-400">
                          {option.content}
                        </span>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words leading-relaxed">{option.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Meeting CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 mobile-card border border-gray-200"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black mb-3 sm:mb-4">
                  What to Expect in Our Meetings
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base">
                  <li className="flex items-start space-x-2 sm:space-x-3 group">
                    <div className="w-2 h-2 bg-primary-black rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                    <span className="group-hover:text-primary-black transition-colors duration-200">Detailed project discussion and requirements gathering</span>
                  </li>
                  <li className="flex items-start space-x-2 sm:space-x-3 group">
                    <div className="w-2 h-2 bg-primary-black rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                    <span className="group-hover:text-primary-black transition-colors duration-200">Technical consultation and architecture planning</span>
                  </li>
                  <li className="flex items-start space-x-2 sm:space-x-3 group">
                    <div className="w-2 h-2 bg-primary-black rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                    <span className="group-hover:text-primary-black transition-colors duration-200">Timeline and budget discussion</span>
                  </li>
                  <li className="flex items-start space-x-2 sm:space-x-3 group">
                    <div className="w-2 h-2 bg-primary-black rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                    <span className="group-hover:text-primary-black transition-colors duration-200">Q&A session and next steps planning</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="heading-lg mb-4 sm:mb-6">Our Comprehensive Services</h2>
            <p className="text-body text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              We offer a complete range of modern web applications and growth marketing services to help your business 
              establish a strong online presence and achieve sustainable growth. From Johannesburg to Cape Town, 
              Durban to Pretoria, and across Africa, Europe, North America, and worldwide, we serve businesses 
              with local expertise and global standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-full">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-primary-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-50 transition-all duration-200 mobile-card text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-black rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <service.icon size={24} className="sm:w-8 sm:h-8 text-primary-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
} 