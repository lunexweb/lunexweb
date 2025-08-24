'use client'

import { motion } from 'framer-motion'
import ServiceCard from '@/components/ServiceCard'
import AutoScrollCarousel from '@/components/AutoScrollCarousel'
import BreadcrumbSection from '@/components/BreadcrumbSection'
import { Code, TrendingUp, Search, Smartphone, Users, BarChart3, Globe, Zap, Target, Palette, Database, Cpu, Instagram, Facebook, Youtube, Twitter, Linkedin, Mail, FileText, Camera, ShoppingCart, Building, Briefcase, Monitor, Smartphone as MobileIcon, Shield, DollarSign, Clock } from 'lucide-react'
import Image from 'next/image'
import { LucideIcon } from 'lucide-react'

// TypeScript Interfaces
interface Service {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

interface WebsiteType {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

interface FAQ {
  question: string
  answer: string
}

interface BreadcrumbItem {
  label: string
}

// SVG Icons for Social Media Platforms
const YouTubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#E4405F"/>
  </svg>
)

const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#000000"/>
  </svg>
)

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
  </svg>
)

const services: Service[] = [
  {
    icon: Code,
    title: 'Full Stack Web Development',
    description: 'Complete web development solutions using modern technologies including React, Next.js, and advanced backend systems.',
    features: [
      'React.js and Next.js applications',
      'Full stack development services',
      'Custom backend API development',
      'Database design and optimization',
      'Progressive Web Applications (PWA)',
      'E-commerce platform development'
    ]
  },
  {
    icon: Globe,
    title: 'Frontend Development',
    description: 'Modern, responsive frontend development with React, Next.js, and cutting-edge web technologies.',
    features: [
      'React.js component development',
      'Next.js server-side rendering',
      'Responsive web design',
      'Interactive user interfaces',
      'Performance optimization',
      'Cross-browser compatibility'
    ]
  },
  {
    icon: Palette,
    title: 'UI/UX Design & Development',
    description: 'User-centered design and development using HTML, CSS, and JavaScript to create intuitive, engaging web experiences.',
    features: [
      'User interface design and prototyping',
      'HTML5 semantic markup development',
      'CSS3 styling and animations',
      'JavaScript interactive functionality',
      'User experience optimization',
      'Responsive design implementation'
    ]
  },
  {
    icon: Database,
    title: 'Backend Development',
          description: 'Robust backend solutions with custom APIs and scalable database architecture.',
      features: [
        'Custom API development',
      'Custom API development',
      'Server-side logic implementation',
      'Database design and management',
      'Authentication and authorization',
      'Data security and encryption'
    ]
  },
  {
    icon: Cpu,
    title: 'AI Web Development',
    description: 'Intelligent web applications powered by artificial intelligence and machine learning technologies.',
    features: [
      'AI-powered chatbots',
      'Machine learning integration',
      'Predictive analytics',
      'Natural language processing',
      'Computer vision applications',
      'Automated content generation'
    ]
  },
  {
    icon: Search,
    title: 'SEO Specialist Services',
    description: 'Expert search engine optimization to improve your website\'s visibility and organic search rankings.',
    features: [
      'Technical SEO optimization',
      'On-page SEO strategies',
      'Local SEO services',
      'Keyword research and analysis',
      'SEO performance tracking',
      'Content optimization for search'
    ]
  },
  {
    icon: Instagram,
    title: 'Social Media Management',
    description: 'Comprehensive social media management services across all major platforms to build your brand presence.',
    features: [
      'Content creation and curation',
      'Social media strategy development',
      'Community management',
      'Brand voice and messaging',
      'Social media advertising',
      'Performance analytics and reporting'
    ]
  },
  {
    icon: FileText,
    title: 'Logo Design Services',
    description: 'Professional logo design that captures your brand identity and creates lasting visual impact.',
    features: [
      'Custom logo design',
      'Brand identity development',
      'Logo variations and formats',
      'Brand style guidelines',
      'Logo animation and motion',
      'Print and digital optimization'
    ]
  },
  {
    icon: Building,
    title: 'Company Profile Design',
    description: 'Professional company profile design that showcases your business and builds credibility.',
    features: [
      'Corporate profile design',
      'Business presentation design',
      'Company brochure design',
      'Professional portfolio design',
      'Brand collateral design',
      'Print and digital formats'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies including social media advertising and performance marketing.',
    features: [
      'YouTube advertising campaigns',
      'Instagram marketing solutions',
      'TikTok advertising strategies',
      'Google Ads management',
      'Facebook advertising campaigns',
      'Marketing automation systems'
    ]
  },
  {
    icon: Target,
    title: 'Social Media Advertising',
    description: 'Targeted advertising campaigns across major social media platforms to reach your ideal audience.',
    features: [
      'YouTube video advertising',
      'Instagram story and feed ads',
      'TikTok promotional campaigns',
      'Facebook business advertising',
      'Audience targeting and retargeting',
      'Ad performance optimization'
    ]
  },
  {
    icon: Zap,
    title: 'Performance Marketing',
    description: 'Data-driven marketing campaigns focused on measurable results and return on investment.',
    features: [
      'Google Ads campaign management',
      'Facebook Ads optimization',
      'Conversion rate optimization',
      'A/B testing and experimentation',
      'ROI tracking and analysis',
      'Marketing budget optimization'
    ]
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Development',
    description: 'Mobile-optimized web applications and responsive design for all devices and platforms.',
    features: [
      'Mobile-responsive design',
      'Progressive Web Applications',
      'Mobile app development',
      'Touch-friendly interfaces',
      'Mobile performance optimization',
      'App store optimization'
    ]
  },
  {
    icon: Users,
    title: 'Web Application Development',
    description: 'Custom web applications and software solutions tailored to your business requirements.',
    features: [
      'Custom web applications',
      'Business software solutions',
      'Dashboard and admin panels',
      'Integration with third-party services',
      'Scalable architecture design',
      'Maintenance and support'
    ]
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Comprehensive analytics and reporting solutions to track performance and optimize results.',
    features: [
      'Google Analytics implementation',
      'Custom reporting dashboards',
      'Conversion tracking setup',
      'Performance monitoring',
      'Data visualization',
      'ROI analysis and insights'
    ]
  }
]

const websiteTypes: WebsiteType[] = [
  {
    icon: Building,
    title: 'Corporate Websites',
    description: 'Professional corporate websites that establish credibility and showcase your business expertise.',
    features: ['Company information and services', 'Team profiles and leadership', 'Corporate news and updates', 'Contact information and locations', 'Professional branding', 'SEO optimization']
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Websites',
    description: 'Full-featured online stores with secure payment processing and inventory management.',
    features: ['Product catalog and categories', 'Secure payment gateways', 'Inventory management system', 'Order tracking and fulfillment', 'Customer account management', 'Mobile shopping experience']
  },
  {
    icon: Briefcase,
    title: 'Business Websites',
    description: 'Comprehensive business websites that drive leads and convert visitors into customers.',
    features: ['Service showcase and pricing', 'Lead generation forms', 'Customer testimonials', 'Case studies and portfolio', 'Blog and content marketing', 'Contact and inquiry forms']
  },
  {
    icon: Monitor,
    title: 'Portfolio Websites',
    description: 'Creative portfolio websites that showcase your work and attract new clients.',
    features: ['Project galleries and showcases', 'Creative work presentation', 'Client testimonials', 'About and bio sections', 'Contact and inquiry forms', 'Social media integration']
  },
  {
    icon: MobileIcon,
    title: 'Mobile Applications',
    description: 'Native and cross-platform mobile applications for iOS and Android devices.',
    features: ['Native iOS development', 'Android app development', 'Cross-platform solutions', 'App store optimization', 'Push notifications', 'Offline functionality']
  },
  {
    icon: Users,
    title: 'Web Applications',
    description: 'Custom web applications and software solutions for specific business needs.',
    features: ['Custom functionality development', 'User authentication systems', 'Database integration', 'API development', 'Real-time features', 'Scalable architecture']
  }
]

const faqs: FAQ[] = [
  {
    question: 'What web development technologies do you specialize in?',
          answer: 'We specialize in React, Next.js, TypeScript, JavaScript, Tailwind CSS, and Node.js. Our expertise includes full-stack development, AI web applications, Progressive Web Apps, and custom backend solutions.'
  },
  {
    question: 'What digital marketing services do you offer?',
    answer: 'Our digital marketing services include SEO optimization, YouTube advertising, Instagram ads, TikTok campaigns, Google Ads, Facebook advertising, social media management, and performance marketing strategies.'
  },
  {
    question: 'How long does a typical web development project take?',
    answer: 'Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex React/Next.js applications can take 2-3 months. E-commerce platforms and custom web applications may require 3-6 months depending on features.'
  },
  {
    question: 'Do you provide ongoing support and maintenance?',
    answer: 'Yes, we offer comprehensive ongoing support and maintenance packages to ensure your website and digital marketing campaigns continue performing optimally after launch. This includes updates, security monitoring, and performance optimization.'
  },
  {
    question: 'What is your pricing structure for web development?',
    answer: 'We provide custom quotes based on your specific project requirements. Pricing depends on complexity, features, and timeline. Contact us via email for a detailed proposal tailored to your web development needs.'
  },
  {
    question: 'What types of websites do you develop?',
    answer: 'We develop corporate websites, e-commerce platforms, business websites, portfolio sites, web applications, mobile applications, and custom software solutions tailored to specific business needs.'
  },
  {
    question: 'Do you provide SEO services for existing websites?',
    answer: 'Yes, we offer comprehensive SEO services for existing websites including technical SEO optimization, on-page SEO strategies, local SEO services, keyword research, and content optimization to improve search rankings.'
  },
  {
    question: 'What social media platforms do you manage?',
    answer: 'We manage all major social media platforms including YouTube, Instagram, TikTok, Facebook, Twitter, LinkedIn, and emerging platforms. Our services include content creation, community management, and advertising campaigns.'
  },
  {
    question: 'How do you ensure website security and performance?',
    answer: 'We implement industry-standard security measures, regular updates, SSL certificates, and performance optimization techniques. Our development process includes rigorous testing and quality assurance protocols.'
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes, we serve clients worldwide and accommodate different time zones. Our team is experienced in working with international businesses and can provide consultations in various time zones.'
  },
  {
    question: 'What design services do you offer?',
    answer: 'Our design services include professional logo design, company profile design, brand identity development, UI/UX design, and visual design for web applications and marketing materials.'
  },
  {
    question: 'What makes Lunexweb different from other web development agencies?',
    answer: 'Lunexweb combines cutting-edge technology expertise with strategic marketing insights. We specialize in modern frameworks and AI-powered solutions while providing comprehensive growth marketing services. Our Johannesburg-based team offers local market knowledge combined with global best practices, ensuring personalized solutions that drive measurable results for businesses in South Africa, Africa, Europe, North America, and worldwide.'
  }
]

export default function ServicesPage() {
  return (
    <div className="pt-20 w-full max-w-full overflow-x-hidden">
      {/* Breadcrumb */}
      <BreadcrumbSection items={[{ label: 'Services' }] as BreadcrumbItem[]} />

      {/* Hero Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl mb-3 sm:mb-4">Modern Web Solutions & Growth Marketing Services</h1>
            <p className="text-body text-gray-600 max-w-4xl mx-auto px-4 sm:px-0">
              Lunexweb delivers cutting-edge web applications and strategic marketing solutions globally. 
              Our expertise spans modern technologies, AI solutions, search optimization, social media management, 
              logo design, and brand development. We create powerful digital experiences that drive business growth 
              and establish strong online presence across all platforms. Based in Johannesburg, South Africa, 
              we combine local market knowledge with international best practices to deliver exceptional results 
              for businesses in South Africa, Africa, Europe, North America, and worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visual Section with Image */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-lg mb-3 sm:mb-4">Delivering Excellence in Digital Solutions</h2>
              <p className="text-body text-gray-600 mb-3 sm:mb-4">
                Our team combines technical expertise with creative innovation to deliver exceptional 
                web applications and strategic marketing solutions. We work with cutting-edge technologies 
                including React and Next.js to create powerful, scalable applications that 
                drive business growth and establish strong brand presence.
              </p>
              <p className="text-body text-gray-600">
                From AI-powered web applications to targeted social media advertising campaigns, 
                comprehensive SEO services, professional logo design, and brand development, 
                we provide complete digital solutions that help businesses thrive in the modern 
                digital landscape worldwide. Our Johannesburg-based team understands the unique 
                challenges and opportunities in both local and international markets, while our global 
                perspective ensures we deliver solutions that compete on the world stage for clients 
                across South Africa, Africa, Europe, North America, and beyond.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1754776156/courtney-cook-h7aVq-7FfPw-unsplash_bhftmk.jpg"
                alt="Modern web solutions and growth marketing services"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits of Coded Websites Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="heading-lg mb-3 sm:mb-4">Benefits of Custom Coded Websites</h2>
            <p className="text-body text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Custom coded websites offer significant advantages over template-based solutions, providing 
              superior performance, flexibility, and scalability for your business needs.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-50 p-4 sm:p-6 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <Zap className="w-6 h-6 text-primary-black mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black">Superior Performance</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Custom code eliminates unnecessary bloat, resulting in faster loading times, better SEO rankings, 
                and improved user experience. Our optimized code ensures your website performs at peak efficiency.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 p-4 sm:p-6 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <Palette className="w-6 h-6 text-primary-black mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black">Complete Customization</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Full control over design, functionality, and user experience. No limitations from pre-built templates - 
                your website is built exactly to your specifications and brand requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-50 p-4 sm:p-6 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <Search className="w-6 h-6 text-primary-black mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black">Better SEO Control</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Clean, semantic code structure improves search engine optimization. Custom meta tags, 
                structured data, and optimized content architecture boost your search rankings.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-50 p-4 sm:p-6 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <Shield className="w-6 h-6 text-primary-black mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black">Enhanced Security</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Custom code allows for tailored security measures. We implement industry-standard security protocols, 
                regular updates, and custom authentication systems to protect your data and users.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-50 p-4 sm:p-6 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <TrendingUp className="w-6 h-6 text-primary-black mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black">Scalability</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Built to grow with your business. Custom architecture allows for easy feature additions, 
                performance scaling, and integration with new technologies as your needs evolve.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-50 p-4 sm:p-6 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <Smartphone className="w-6 h-6 text-primary-black mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black">Mobile Optimization</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Custom responsive design ensures perfect functionality across all devices. 
                Mobile-first development approach guarantees optimal user experience on smartphones and tablets.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits of Digital Marketing Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="heading-lg mb-3 sm:mb-4">Benefits of Digital Marketing</h2>
            <p className="text-body text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Digital marketing provides measurable results, targeted reach, and cost-effective strategies 
              that drive business growth and increase brand visibility in today&apos;s competitive online landscape.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-primary-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <BarChart3 className="w-6 h-6 text-primary-black mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black">Measurable Results</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Track performance in real-time with detailed analytics. Monitor conversions, engagement rates, 
                ROI, and other key metrics to optimize your marketing strategies for maximum effectiveness.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-primary-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <Target className="w-6 h-6 text-primary-black mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black">Precise Targeting</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Reach your ideal audience with precision targeting. Demographic, geographic, and behavioral 
                targeting ensures your marketing budget is spent on prospects most likely to convert.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-primary-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <DollarSign className="w-6 h-6 text-primary-black mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black">Cost-Effective</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Lower costs compared to traditional marketing. Pay-per-click models, social media advertising, 
                and content marketing provide excellent ROI with flexible budget allocation options.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-primary-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <Globe className="w-6 h-6 text-primary-black mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black">Global Reach</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Expand your market beyond geographical boundaries. Digital marketing allows you to reach 
                customers worldwide, opening new opportunities for business growth and market expansion.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-primary-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <Clock className="w-6 h-6 text-primary-black mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black">24/7 Availability</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Your marketing campaigns work around the clock. Automated systems, social media presence, 
                and online content continuously engage potential customers without time restrictions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-primary-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <Users className="w-6 h-6 text-primary-black mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black">Customer Engagement</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Build meaningful relationships with your audience. Social media, email marketing, and 
                interactive content create two-way communication that fosters brand loyalty and trust.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Web Development Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="heading-lg mb-3 sm:mb-4">Modern Web Development Services</h2>
            <p className="text-body text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              We build modern, scalable web applications using the latest technologies including React, Next.js, 
              and modern backend technologies. Our development services cover everything from frontend interfaces to backend systems 
              and AI-powered features, ensuring your digital presence stands out in today&apos;s competitive market.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-full">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SEO Video Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="heading-lg mb-3 sm:mb-4">SEO Optimization in Action</h2>
            <p className="text-body text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              See how our SEO strategies drive organic traffic and improve search rankings for businesses across various industries.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-4xl">
              <video
                className="w-full h-auto rounded-lg shadow-lg"
                controls
                preload="metadata"
                poster=""
                autoPlay
                muted
                loop
              >
                <source 
                  src="https://res.cloudinary.com/dnnwvmh3n/video/upload/v1755723137/35215-405157494_tiny_zuxtsx.mp4" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Website Types Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="heading-lg mb-3 sm:mb-4">Types of Websites We Develop</h2>
            <p className="text-body text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              We specialize in creating various types of websites tailored to different business needs and objectives. 
              From corporate websites to e-commerce platforms, our expertise covers all aspects of modern web development.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-full">
            {websiteTypes.map((website, index) => (
              <ServiceCard
                key={website.title}
                icon={website.icon}
                title={website.title}
                description={website.description}
                features={website.features}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Growth Marketing Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="heading-lg mb-3 sm:mb-4">Growth Marketing & Brand Design Services</h2>
            <p className="text-body text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Our growth marketing expertise includes SEO optimization, social media management, advertising campaigns, 
              and professional design services. We specialize in YouTube ads, Instagram ads, TikTok ads, Google ads, 
              Facebook advertising, logo design, and brand development.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-full">
            {services.slice(6, 14).map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="heading-lg mb-3 sm:mb-4">Our Technology Stack</h2>
            <p className="text-body text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              We leverage cutting-edge technologies to deliver high-performance web applications and growth 
              marketing solutions that drive results for businesses worldwide.
            </p>
          </motion.div>
          
          <AutoScrollCarousel 
            items={[
              'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Node.js'
            ]}
            speed={5}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-8 md:mb-10"
          >
            <h2 className="heading-lg mb-3 sm:mb-4">Frequently Asked Questions</h2>
            <p className="text-body text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Have questions about our modern web applications or growth marketing services? Here are comprehensive answers 
              to help you understand our offerings and process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full max-w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-primary-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-50 transition-all duration-200 mobile-card"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-primary-black mb-3 sm:mb-4">{faq.question}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-black text-primary-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-lg mb-3 sm:mb-4">Ready to Transform Your Digital Presence?</h2>
            <p className="text-body text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto px-4 sm:px-0">
              Let&apos;s discuss your project and create a custom solution that drives results for your business. 
              From modern web development to growth marketing, SEO optimization, social media management, logo design, 
              and brand development, we have the expertise to help you succeed globally.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a
                href="/contact"
                className="btn-primary bg-primary-white text-primary-black hover:bg-gray-100"
              >
                Start Your Project
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 