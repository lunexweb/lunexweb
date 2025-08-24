import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modern Web Solutions & Growth Marketing Services | Lunexweb',
  description: 'Elevate your business with cutting-edge web applications and strategic marketing solutions. Expert React.js, Next.js, UI/UX design, HTML, CSS, JavaScript, SEO, social media management, logo design, and brand development services.',
  keywords: 'modern web solutions, growth marketing, React.js development, Next.js applications, UI/UX design, HTML CSS JavaScript, SEO optimization, social media management, logo design, brand development, website creation, e-commerce platforms, Johannesburg web development, South Africa digital services',
  openGraph: {
    title: 'Modern Web Solutions & Growth Marketing Services | Lunexweb',
    description: 'Elevate your business with cutting-edge web applications and strategic marketing solutions. Expert React.js, Next.js, UI/UX design, HTML, CSS, JavaScript, social media management, logo design, and brand development.',
    type: 'website',
    url: 'https://lunexweb.com/services',
    siteName: 'Lunexweb',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Web Solutions & Growth Marketing Services | Lunexweb',
    description: 'Elevate your business with cutting-edge web applications and strategic marketing solutions. Expert React.js, Next.js, UI/UX design, HTML, CSS, JavaScript, social media management, logo design, and brand development.',
  },
  alternates: {
    canonical: 'https://lunexweb.com/services',
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
        "@type": "Service",
        "name": "Modern Web Solutions & Growth Marketing Services",
        "description": "Elevate your business with cutting-edge web applications and strategic marketing solutions. Expert React.js, Next.js, UI/UX design, HTML, CSS, JavaScript, social media management, logo design, and brand development services.",
        "provider": {
          "@type": "Organization",
          "name": "Lunexweb",
          "url": "https://lunexweb.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Johannesburg",
            "addressCountry": "South Africa"
          }
        },
        "serviceType": ["Modern Web Development", "UI/UX Design", "Growth Marketing", "SEO Optimization", "Social Media Management", "Brand Design"],
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Solutions",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Full Stack Web Development",
                "description": "Complete web development solutions using React.js and Next.js"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "UI/UX Design & Development",
                "description": "User-centered design and development using modern technologies"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "SEO Optimization",
                "description": "Expert search engine optimization to improve website visibility"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Social Media Management",
                "description": "Comprehensive social media management across all platforms"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Logo Design Services",
                "description": "Professional logo design and brand identity development"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Digital Marketing",
                "description": "YouTube, Instagram, TikTok, Google Ads, and Facebook advertising"
              }
            }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What web development technologies do you specialize in?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We specialize in React.js, Next.js, TypeScript, JavaScript, Tailwind CSS, and Node.js. Our expertise includes full-stack development, AI web applications, Progressive Web Apps, and custom backend solutions."
            }
          },
          {
            "@type": "Question",
            "name": "What digital marketing services do you offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our digital marketing services include SEO specialist services, YouTube advertising, Instagram ads, TikTok campaigns, Google Ads, Facebook advertising, social media management, and performance marketing strategies."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a typical web development project take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex React/Next.js applications can take 2-3 months. E-commerce platforms and custom web applications may require 3-6 months depending on features."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide ongoing support and maintenance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer comprehensive ongoing support and maintenance packages to ensure your website and digital marketing campaigns continue performing optimally after launch. This includes updates, security monitoring, and performance optimization."
            }
          },
          {
            "@type": "Question",
            "name": "What is your pricing structure for web development?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide custom quotes based on your specific project requirements. Pricing depends on complexity, features, and timeline. Contact us via email for a detailed proposal tailored to your web development needs."
            }
          },
          {
            "@type": "Question",
            "name": "What types of websites do you develop?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We develop corporate websites, e-commerce platforms, business websites, portfolio sites, web applications, mobile applications, and custom software solutions tailored to specific business needs."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide SEO services for existing websites?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer comprehensive SEO services for existing websites including technical SEO optimization, on-page SEO strategies, local SEO services, keyword research, and content optimization to improve search rankings."
            }
          },
          {
            "@type": "Question",
            "name": "What social media platforms do you manage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We manage all major social media platforms including YouTube, Instagram, TikTok, Facebook, Twitter, LinkedIn, and emerging platforms. Our services include content creation, community management, and advertising campaigns."
            }
          }
        ]
      }
    ])
  }
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 