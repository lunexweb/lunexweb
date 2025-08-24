'use client'

import React, { useEffect, useRef, createContext, useContext, useState } from 'react'
import Lenis from '@studio-freight/lenis'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

// Create context for Lenis instance
const LenisContext = createContext<Lenis | null>(null)

// Hook to use Lenis instance
export const useLenis = () => {
  const lenis = useContext(LenisContext)
  return lenis
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll with basic configuration
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Ensure Lenis is properly initialized
    const lenis = lenisRef.current
    if (lenis) {
      lenis.start()
      
      // Set the instance in state so it's available in context
      setLenisInstance(lenis)
      
      // Integrate with Framer Motion
      lenis.on('scroll', (e: any) => {
        // This ensures Framer Motion scroll animations work with Lenis
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('scroll', { detail: e }))
        }
      })
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  )
} 