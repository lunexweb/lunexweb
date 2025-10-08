import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedSection, AnimatedText } from '@/components/AnimatedSection';
import { Navigation } from '@/components/Navigation';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const faqData: FAQItem[] = [
  // Web Development General
  {
    id: 'web-dev-1',
    question: 'How long does it take to build a professional website?',
    answer: 'Most professional websites take 4-8 weeks to complete, depending on complexity. Simple business websites typically take 2-4 weeks, while complex e-commerce or custom applications can take 6-12 weeks. We provide detailed timelines during our initial consultation.',
    category: 'Web Development',
    tags: ['timeline', 'website', 'development']
  },
  {
    id: 'web-dev-2',
    question: 'What technologies do you use for web development?',
    answer: 'We use modern, industry-standard technologies including React, Next.js, TypeScript, Tailwind CSS, Node.js, and various databases. For content management, we work with WordPress, Strapi, or custom solutions. All our websites are mobile-responsive and optimized for performance.',
    category: 'Web Development',
    tags: ['technology', 'react', 'modern']
  },
  {
    id: 'web-dev-3',
    question: 'Do you provide ongoing website maintenance?',
    answer: 'Yes! We offer comprehensive maintenance packages including security updates, content updates, performance monitoring, and technical support. Our maintenance plans ensure your website stays secure, fast, and up-to-date.',
    category: 'Web Development',
    tags: ['maintenance', 'support', 'updates']
  },

  // Law Firms
  {
    id: 'law-1',
    question: 'What makes a great law firm website?',
    answer: 'A great law firm website builds trust through professional design, showcases expertise with case studies, makes it easy for clients to contact you, includes client testimonials, and is optimized for local SEO. It should clearly communicate your practice areas and establish credibility.',
    category: 'Law Firms',
    tags: ['law firm', 'trust', 'credibility']
  },
  {
    id: 'law-2',
    question: 'How can a website help my law practice attract more clients?',
    answer: 'A professional website increases your online visibility, allows potential clients to research your expertise 24/7, builds trust before the first consultation, enables easy contact and appointment booking, and helps establish you as an authority in your practice areas.',
    category: 'Law Firms',
    tags: ['clients', 'visibility', 'authority']
  },
  {
    id: 'law-3',
    question: 'Do you understand legal industry compliance requirements?',
    answer: 'Yes, we work with many law firms and understand the importance of legal disclaimers, attorney advertising rules, client confidentiality, and professional responsibility guidelines. We ensure your website meets all relevant compliance requirements.',
    category: 'Law Firms',
    tags: ['compliance', 'legal', 'disclaimers']
  },

  // Consulting Agencies
  {
    id: 'consulting-1',
    question: 'How can a website showcase my consulting expertise?',
    answer: 'We create websites that highlight your methodology, showcase case studies and results, include client testimonials, demonstrate thought leadership through content, and make it easy for prospects to understand your unique value proposition.',
    category: 'Consulting',
    tags: ['expertise', 'methodology', 'case studies']
  },
  {
    id: 'consulting-2',
    question: 'What features should a consulting agency website have?',
    answer: 'Essential features include service pages, team profiles, case studies, client testimonials, contact forms, blog/content section, downloadable resources, and client portal access. We also integrate tools for lead generation and client management.',
    category: 'Consulting',
    tags: ['features', 'services', 'portal']
  },

  // Financial Services
  {
    id: 'financial-1',
    question: 'How do you ensure financial website security?',
    answer: 'We implement enterprise-grade security including SSL certificates, secure hosting, regular security audits, compliance with financial regulations, encrypted data transmission, and secure client portals. Security is our top priority for financial services websites.',
    category: 'Financial Services',
    tags: ['security', 'compliance', 'encryption']
  },
  {
    id: 'financial-2',
    question: 'Can you integrate financial tools and calculators?',
    answer: 'Absolutely! We can integrate mortgage calculators, investment calculators, retirement planning tools, loan calculators, and other financial planning tools. These interactive features help engage visitors and demonstrate your expertise.',
    category: 'Financial Services',
    tags: ['calculators', 'tools', 'interactive']
  },

  // Real Estate
  {
    id: 'real-estate-1',
    question: 'Do you integrate with property listing systems?',
    answer: 'Yes, we integrate with major MLS systems, property management platforms, and real estate CRM systems. We can also create custom property search functionality and automated listing feeds to keep your website updated with the latest properties.',
    category: 'Real Estate',
    tags: ['MLS', 'listings', 'CRM']
  },
  {
    id: 'real-estate-2',
    question: 'How can a website help real estate agents generate leads?',
    answer: 'A real estate website can generate leads through property search functionality, virtual tours, market reports, neighborhood guides, mortgage calculators, and lead capture forms. We optimize for local SEO to help you rank for location-based searches.',
    category: 'Real Estate',
    tags: ['leads', 'property search', 'local SEO']
  },

  // Pricing & Process
  {
    id: 'pricing-1',
    question: 'What are your website development prices?',
    answer: 'Our pricing varies based on project complexity and requirements. Simple business websites start from R15,000, while complex e-commerce or custom applications can range from R50,000 to R150,000+. We provide detailed quotes after understanding your specific needs.',
    category: 'Pricing',
    tags: ['pricing', 'cost', 'budget']
  },
  {
    id: 'pricing-2',
    question: 'Do you offer payment plans?',
    answer: 'Yes, we offer flexible payment plans including 50% upfront and 50% on completion, or monthly payment options for larger projects. We also offer maintenance packages with monthly billing to spread costs over time.',
    category: 'Pricing',
    tags: ['payment', 'plans', 'flexible']
  },
  {
    id: 'pricing-3',
    question: 'What\'s included in your website packages?',
    answer: 'Our packages include custom design, responsive development, SEO optimization, content management system, contact forms, Google Analytics setup, SSL certificate, hosting setup, and 30 days of post-launch support. Additional features can be added based on your needs.',
    category: 'Pricing',
    tags: ['packages', 'included', 'features']
  },

  // Technical
  {
    id: 'tech-1',
    question: 'Will my website work on mobile devices?',
    answer: 'Absolutely! All our websites are fully responsive and optimized for mobile devices. We test across various screen sizes and devices to ensure perfect functionality on smartphones, tablets, and desktops.',
    category: 'Technical',
    tags: ['mobile', 'responsive', 'devices']
  },
  {
    id: 'tech-2',
    question: 'How fast will my website load?',
    answer: 'We optimize all websites for speed, typically achieving load times under 3 seconds. We use image optimization, code minification, caching, and performance monitoring to ensure your website loads quickly and provides an excellent user experience.',
    category: 'Technical',
    tags: ['speed', 'performance', 'optimization']
  },
  {
    id: 'tech-3',
    question: 'Do you provide website hosting?',
    answer: 'Yes, we provide reliable hosting services with 99.9% uptime guarantee, SSL certificates, regular backups, and technical support. We can also help you migrate existing websites to our hosting or work with your preferred hosting provider.',
    category: 'Technical',
    tags: ['hosting', 'uptime', 'backups']
  },

  // SEO & Marketing
  {
    id: 'seo-1',
    question: 'Will my website rank well on Google?',
    answer: 'We build SEO-friendly websites with proper structure, fast loading times, mobile optimization, and clean code. We also provide ongoing SEO services to help improve your search rankings and drive organic traffic to your website.',
    category: 'SEO & Marketing',
    tags: ['SEO', 'Google', 'rankings']
  },
  {
    id: 'seo-2',
    question: 'How can I track my website\'s performance?',
    answer: 'We set up Google Analytics and Google Search Console to track visitor behavior, traffic sources, conversion rates, and search performance. We also provide regular reports and recommendations for improvement.',
    category: 'SEO & Marketing',
    tags: ['analytics', 'tracking', 'reports']
  },

  // Support
  {
    id: 'support-1',
    question: 'What kind of support do you provide?',
    answer: 'We provide comprehensive support including technical assistance, content updates, security monitoring, performance optimization, and training on how to manage your website. Our support team is available to help with any questions or issues.',
    category: 'Support',
    tags: ['support', 'help', 'assistance']
  },
  {
    id: 'support-2',
    question: 'Can I update my website content myself?',
    answer: 'Yes! We provide user-friendly content management systems that allow you to easily update text, images, and other content. We also offer training sessions to teach you how to manage your website effectively.',
    category: 'Support',
    tags: ['CMS', 'updates', 'training']
  }
];

const categories = ['All', 'Web Development', 'Law Firms', 'Consulting', 'Financial Services', 'Real Estate', 'Pricing', 'Technical', 'SEO & Marketing', 'Support'];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      {/* Navigation */}
      <Navigation />
      
      {/* Header */}
      <section 
        className="pt-20 pb-20 text-white relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759913632/pexels-ann-h-45017-11022636_sczprl.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-5xl mx-auto px-4">
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-green-500/20 backdrop-blur-sm rounded-2xl mr-4">
                  <HelpCircle className="w-8 h-8 text-green-400" />
                </div>
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30 px-4 py-2">
                  Frequently Asked Questions
                </Badge>
              </div>
              
              <AnimatedText className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                <h1>Everything You Need to Know</h1>
              </AnimatedText>
              
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto px-4">
                Get answers to common questions about our web development services, 
                pricing, process, and how we can help your business succeed online.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="flex-1 w-full">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 sm:h-14 bg-white border-2 border-slate-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl text-base sm:text-lg"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Showing {filteredFAQs.length} of {faqData.length} questions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <HelpCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">No FAQs Found</h3>
                  <p className="text-slate-600">
                    Try adjusting your search terms or category filter.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleExpanded(faq.id)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs mr-3">
                                {faq.category}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 pr-4">
                              {faq.question}
                            </h3>
                          </div>
                          <div className="flex-shrink-0">
                            {expandedItems.includes(faq.id) ? (
                              <ChevronUp className="w-5 h-5 text-slate-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-500" />
                            )}
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {expandedItems.includes(faq.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6">
                                <div className="border-t border-slate-200 pt-4">
                                  <p className="text-slate-700 leading-relaxed">
                                    {faq.answer}
                                  </p>
                                  <div className="flex flex-wrap gap-2 mt-4">
                                    {faq.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                                      >
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Our team is here to help. Get in touch for a personalized consultation 
              about your web development needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-colors shadow-lg"
              >
                Contact Us
              </motion.a>
              <motion.a
                href="tel:+27789992503"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500/20 text-white font-semibold rounded-xl hover:bg-green-500/30 transition-colors border border-green-400/30"
              >
                Call +27 78 999 2503
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
