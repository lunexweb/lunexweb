import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Lunexweb – Modern Web Solutions & Growth Marketing',
    template: '%s | Lunexweb'
  },
  description: 'Transform your business with cutting-edge web applications and strategic marketing solutions. We deliver modern technology and comprehensive digital services.',
  keywords: [
    'web development', 
    'growth marketing', 
    'React.js', 
    'Next.js', 
    'SEO optimization', 
    'digital marketing',
    'website design',
    'Johannesburg',
    'South Africa',
    'Lunexweb'
  ],
  authors: [{ name: 'Lunexweb' }],
  creator: 'Lunexweb',
  publisher: 'Lunexweb',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lunexweb.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/Favicon.png',
    apple: '/Favicon.png',
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lunexweb.com',
    title: 'Lunexweb – Modern Web Solutions & Growth Marketing',
    description: 'Transform your business with cutting-edge web applications and strategic marketing solutions. We deliver modern technology and comprehensive digital services.',
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
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Lunexweb",
        "url": "https://lunexweb.com",
        "logo": "https://lunexweb.com/Favicon.png",
        "image": "https://lunexweb.com/og-image.png",
        "description": "Modern web solutions and growth marketing services",
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
      }
    ]),
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <SmoothScrollProvider>
            <div className="flex flex-col min-h-screen relative">
              <Header />
              <main className="flex-grow pb-20 md:pb-0">
                {children}
              </main>
              <Footer />
              <MobileBottomNav />
            </div>
          </SmoothScrollProvider>
        </ErrorBoundary>
        <GoogleAnalytics gaId="G-87CWXWVJM3" />
      </body>
    </html>
  )
} 