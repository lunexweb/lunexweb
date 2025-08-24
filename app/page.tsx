import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import HorizontalScroll from '@/components/HorizontalScroll'
import BudgetSection from '@/components/BudgetSection'
import LocalSEOSection from '@/components/LocalSEOSection'

export const metadata: Metadata = {
  title: 'Lunexweb – Transform Your Business with Modern Web Solutions',
  description: 'Elevate your online presence with expert web development, SEO optimization, and strategic marketing solutions. Drive results with cutting-edge digital technology.',
  keywords: 'web development, React.js, Next.js, SEO optimization, digital marketing, brand design, Johannesburg',
  openGraph: {
    title: 'Lunexweb – Transform Your Business with Modern Web Solutions',
    description: 'Elevate your online presence with expert web development, SEO optimization, and strategic marketing solutions.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Lunexweb",
      "url": "https://lunexweb.com",
      "logo": "https://lunexweb.com/Favicon.png",
      "description": "Modern web solutions and growth marketing services",
      "foundingDate": "2020",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Worldwide"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "info@lunexweb.com",
        "url": "https://lunexweb.com/contact"
      },
      "sameAs": [
        "https://linkedin.com/company/lunexweb",
        "https://twitter.com/lunexweb"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Solutions",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Modern Web Development",
              "description": "React.js, Next.js, Full-stack development"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Growth Marketing",
              "description": "SEO, social media management, advertising campaigns"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Brand Design",
              "description": "Logo design, company profile design, brand identity"
            }
          }
        ]
      }
    })
  }
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <HorizontalScroll />
      <BudgetSection />
      <LocalSEOSection />
    </>
  )
} 