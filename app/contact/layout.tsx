import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Lunexweb - Modern Web Solutions & Growth Marketing Services',
  description: 'Get in touch with Lunexweb for modern web applications, React.js, Next.js, SEO, social media management, logo design, and growth marketing services. Contact us via email or schedule a consultation meeting.',
  keywords: 'contact Lunexweb, modern web solutions contact, growth marketing services, React.js development, Next.js experts, SEO consultation, social media management contact, Johannesburg web development contact, South Africa digital agency contact',
  openGraph: {
    title: 'Contact Lunexweb - Modern Web Solutions & Growth Marketing Services',
    description: 'Get in touch with Lunexweb for modern web applications, React.js, Next.js, SEO, social media management, logo design, and growth marketing services.',
    type: 'website',
    url: 'https://lunexweb.com/contact',
    siteName: 'Lunexweb',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Lunexweb - Modern Web Solutions & Growth Marketing Services',
    description: 'Get in touch with Lunexweb for modern web applications, React.js, Next.js, SEO, social media management, logo design, and growth marketing services.',
  },
  alternates: {
    canonical: 'https://lunexweb.com/contact',
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
        "@type": "ContactPage",
        "name": "Contact Lunexweb",
        "description": "Contact page for modern web solutions and growth marketing services",
        "url": "https://lunexweb.com/contact",
        "mainEntity": {
          "@type": "Organization",
          "name": "Lunexweb",
          "url": "https://lunexweb.com",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "info@lunexweb.com",
            "availableLanguage": "English"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Johannesburg",
            "addressCountry": "South Africa"
          }
        }
      },

    ])
  }
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 