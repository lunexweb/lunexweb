import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Lunexweb - Modern Web Solutions & Growth Marketing Agency',
  description: 'Discover Lunexweb, a global digital agency specializing in modern web applications, React.js, Next.js, SEO, social media management, logo design, and brand development. Learn about our mission, values, and expertise.',
  keywords: 'about Lunexweb, modern web solutions agency, growth marketing company, React.js developers, Next.js experts, SEO specialists, social media management, logo design services, Johannesburg web development, South Africa digital agency',
  openGraph: {
    title: 'About Lunexweb - Modern Web Solutions & Growth Marketing Agency',
    description: 'Discover Lunexweb, a global digital agency specializing in modern web applications, React.js, Next.js, SEO, social media management, logo design, and brand development.',
    type: 'website',
    url: 'https://lunexweb.com/about',
    siteName: 'Lunexweb',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Lunexweb - Modern Web Solutions & Growth Marketing Agency',
    description: 'Discover Lunexweb, a global digital agency specializing in modern web applications, React.js, Next.js, SEO, social media management, logo design, and brand development.',
  },
  alternates: {
    canonical: 'https://lunexweb.com/about',
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
        "description": "Global digital agency specializing in modern web solutions and growth marketing",
        "foundingDate": "2020",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Johannesburg",
          "addressCountry": "South Africa"
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
                "name": "Modern Web Development"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Growth Marketing"
              }
            }
          ]
        }
      },

    ])
  }
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 