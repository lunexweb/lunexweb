'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface AutoScrollCarouselProps {
  items: string[]
  speed?: number
}

export default function AutoScrollCarousel({ items, speed = 5 }: AutoScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = speed * 0.3 // Slower, smoother movement

    const animate = () => {
      scrollPosition += scrollSpeed
      
      // No reset - just keep scrolling infinitely
      container.style.transform = `translateX(-${scrollPosition}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [speed])

  return (
    <div className="w-full overflow-hidden">
      <div 
        ref={containerRef}
        className="flex w-full"
        style={{
          transition: 'transform 0.1s linear',
          willChange: 'transform',
          width: 'max-content'
        }}
      >
        {/* First set of items */}
        {items.map((item, index) => (
          <motion.div
            key={`first-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0 bg-gray-50 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow mx-3"
            style={{ minWidth: '140px' }}
          >
            <span className="font-semibold text-primary-black text-sm">{item}</span>
          </motion.div>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {items.map((item, index) => (
          <motion.div
            key={`second-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0 bg-gray-50 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow mx-3"
            style={{ minWidth: '140px' }}
          >
            <span className="font-semibold text-primary-black text-sm">{item}</span>
          </motion.div>
        ))}
        
        {/* Third set for extra smooth continuous rotation */}
        {items.map((item, index) => (
          <motion.div
            key={`third-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0 bg-gray-50 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow mx-3"
            style={{ minWidth: '140px' }}
          >
            <span className="font-semibold text-primary-black text-sm">{item}</span>
          </motion.div>
        ))}
        
        {/* Fourth set for perfect seamless loop */}
        {items.map((item, index) => (
          <motion.div
            key={`fourth-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0 bg-gray-50 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow mx-3"
            style={{ minWidth: '140px' }}
          >
            <span className="font-semibold text-primary-black text-sm">{item}</span>
          </motion.div>
        ))}
        
        {/* Fifth set for extra buffer */}
        {items.map((item, index) => (
          <motion.div
            key={`fifth-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0 bg-gray-50 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow mx-3"
            style={{ minWidth: '140px' }}
          >
            <span className="font-semibold text-primary-black text-sm">{item}</span>
          </motion.div>
        ))}
        
        {/* Sixth set for perfect continuity */}
        {items.map((item, index) => (
          <motion.div
            key={`sixth-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0 bg-gray-50 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow mx-3"
            style={{ minWidth: '140px' }}
          >
            <span className="font-semibold text-primary-black text-sm">{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 