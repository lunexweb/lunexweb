'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock } from 'lucide-react'
import { useLenis } from './SmoothScrollProvider'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Hero() {
  const lenis = useLenis()
  const [currentTime, setCurrentTime] = useState('')
  const [isClient, setIsClient] = useState(false)
  const { scrollY } = useScroll()
  
  // Transform scroll progress to horizontal movement
  const titleX = useTransform(scrollY, [0, 1000], [0, 200])
  const subtitleX = useTransform(scrollY, [0, 1000], [0, -150])

  useEffect(() => {
    setIsClient(true)
    
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
      const dateString = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
      setCurrentTime(`${timeString} | ${dateString}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const scrollToNextSection = () => {
    if (lenis) {
      lenis.scrollTo('section:nth-of-type(2)', {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    } else {
      // Fallback to native smooth scroll if Lenis is not available
      const nextSection = document.querySelector('section:nth-of-type(2)')
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1755818079/marius-masalar-UCETKvFMBC4-unsplash_odrnxb.jpg"
          alt="Modern technology and business solutions background"
          fill
          priority
          quality={75}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="container-custom text-center relative z-10 px-4 sm:px-6 flex flex-col justify-center h-full">
        <motion.div
          initial={isClient ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
          animate={isClient ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Main Heading */}
          <motion.h1
            initial={isClient ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            animate={isClient ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={isClient ? { x: titleX } : {}}
            className="hero-title mb-4 sm:mb-6 md:mb-8 text-readable-light whitespace-nowrap overflow-hidden"
          >
            <motion.span
              initial={isClient ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
              animate={isClient ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Lunexweb–
            </motion.span>{' '}
            <motion.span
              initial={isClient ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }}
              animate={isClient ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gradient"
            >
              Modern
            </motion.span>{' '}
            <motion.span
              initial={isClient ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 }}
              animate={isClient ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Solutions & Growth Marketing
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={isClient ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            animate={isClient ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={isClient ? { x: subtitleX } : {}}
            className="hero-subtitle text-gray-200 mb-8 sm:mb-12 max-w-3xl mx-auto text-balance px-2 sm:px-0"
          >
            We build powerful online experiences and drive business growth through cutting-edge technology. From modern applications and search optimization to social media campaigns and brand identity, we transform ideas into results that elevate your business. Based in Johannesburg, South Africa, we serve clients worldwide with local expertise and global reach, from South African businesses to international companies across Africa, Europe, North America, and beyond.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={isClient ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            animate={isClient ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-8 sm:mb-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            <div tabIndex={0}>
              <Link href="/contact" className="btn-primary group">
                <span className="btn-text">Start Your Project</span>
                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <div tabIndex={0}>
              <Link href="/services" className="btn-secondary group">
                <span className="btn-text">View Our Services</span>
                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Location and Time */}
      <motion.div
        initial={isClient ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 }}
        animate={isClient ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-24 sm:bottom-8 left-4 sm:left-8 z-10"
      >
        <div className="text-white/80 text-sm font-medium">
          Johannesburg • {currentTime}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={isClient ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        animate={isClient ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-36 sm:bottom-20 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
        onClick={scrollToNextSection}
      >
        <motion.div
          animate={isClient ? { y: [0, 10, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center hover:border-gray-300 transition-colors"
        >
          <motion.div
            animate={isClient ? { y: [0, 10, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
} 