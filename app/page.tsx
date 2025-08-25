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
    description: 'Elevate your online presence with expert web development, SEO optimization, and strategic marketing solutions. Drive results with cutting-edge digital technology.',
    type: 'website',
    locale: 'en_US',
    url: 'https://lunexweb.com',
    siteName: 'Lunexweb',
    images: [
      {
        url: 'https://lunexweb.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lunexweb - Modern Web Solutions & Growth Marketing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lunexweb – Modern Web Solutions & Growth Marketing',
    description: 'Transform your business with cutting-edge web applications and strategic marketing solutions. We deliver modern technology and comprehensive digital services.',
    images: ['https://lunexweb.com/og-image.png'],
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
    'application/ld+json': JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Lunexweb",
        "url": "https://lunexweb.com",
        "logo": "https://lunexweb.com/Favicon.png",
        "image": "https://lunexweb.com/og-image.png",
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
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Lunexweb",
        "url": "https://lunexweb.com",
        "description": "Modern web solutions and growth marketing services",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://lunexweb.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "url": "https://lunexweb.com",
              "description": "Transform your business with modern web solutions and growth marketing"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Our Services",
              "url": "https://lunexweb.com/services",
              "description": "Web development, SEO optimization, digital marketing, and brand design services"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "About",
              "url": "https://lunexweb.com/about",
              "description": "Learn about Lunexweb's expertise in modern technology and business growth"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Contact",
              "url": "https://lunexweb.com/contact",
              "description": "Get in touch for your web development and digital marketing projects"
            }
          ]
        }
      }
    ])
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