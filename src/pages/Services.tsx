import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Scale, Target, Shield, Home, Crown, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Services = () => {
  // Handle scrolling to specific sections when page loads
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for the page to load, then scroll to the section
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          
          // Remove the hash from URL after scrolling to allow free scrolling
          setTimeout(() => {
            window.history.replaceState(null, null, window.location.pathname);
          }, 1000);
        }
      }, 100);
    } else {
      // If no hash, scroll to top when page loads
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const sections = [
    {
      id: "service-1",
      title: "Law Firms",
      subtitle: "Building Trust Through Premium Web Development",
      icon: Scale,
      color: "from-slate-900 to-slate-800",
      accentColor: "bg-slate-100",
      textColor: "text-slate-900",
      why: "In today's digital-first world, potential clients research attorneys online before making contact. Your website is often the first impression that determines whether a client chooses your firm or your competitor. As experienced web developers, we understand the unique needs of legal professionals.",
      what: "Professional attorney profiles, secure client portals, case study showcases, advanced SEO optimization, mobile-responsive design, and integration with legal case management systems. We specialize in criminal defense websites, personal injury lawyer sites, corporate law firm websites, family law attorney sites, and estate planning lawyer websites across Johannesburg, Cape Town, Durban, and Pretoria.",
      how: "We begin by conducting comprehensive research into your practice areas and target clients. Our web development team creates sophisticated, professional layouts that reflect the gravitas of your legal practice while maintaining modern usability standards and cutting-edge technology."
    },
    {
      id: "service-2",
      title: "Consulting Agencies",
      subtitle: "Establishing Thought Leadership Through Digital Excellence",
      icon: Target,
      color: "from-slate-900 to-slate-800",
      accentColor: "bg-slate-100",
      textColor: "text-slate-900",
      why: "Consulting agencies live and die by their reputation for expertise and results. Your website is the primary platform where potential clients evaluate your capabilities and decide whether to engage your services. Our web development agency specializes in creating powerful digital platforms for consulting professionals.",
      what: "Thought leadership content platforms, client showcase systems, advanced lead generation, professional team profiles, interactive tools, and CRM integration for seamless lead management. We create business consulting websites, management consulting sites, IT consulting websites, marketing consulting platforms, and strategy consulting websites for agencies in Sandton, Rosebank, Fourways, and Midrand.",
      how: "We analyze your consulting expertise and target market to create a website strategy that positions your agency as the premium choice. Our web developers create sophisticated layouts that reflect the quality of your consulting services with advanced functionality and seamless user experience."
    },
    {
      id: "service-3",
      title: "Financial Services",
      subtitle: "Building Trust Through Secure, Compliant Web Solutions",
      icon: Shield,
      color: "from-slate-900 to-slate-800",
      accentColor: "bg-slate-100",
      textColor: "text-slate-900",
      why: "Financial services operate in a highly regulated environment where trust and security are paramount. Your website must not only look professional but also meet strict compliance requirements and security standards. As professional web developers, we understand the critical importance of security in financial web development.",
      what: "Secure client portals with bank-level encryption, compliance features meeting FINRA and SEC requirements, investment tools and calculators, professional advisor profiles, and advanced security measures. We develop investment firm websites, financial advisor sites, insurance company websites, accounting firm platforms, and wealth management websites for professionals in Bedfordview, Boksburg, Germiston, and Benoni.",
      how: "We conduct comprehensive compliance audits to ensure your website meets all regulatory requirements. Our web development team creates sophisticated, trustworthy layouts that reflect the premium nature of financial services with enterprise-grade security and compliance features."
    },
    {
      id: "service-4",
      title: "Real Estate Agencies",
      subtitle: "Showcasing Properties and Capturing Premium Leads",
      icon: Home,
      color: "from-slate-900 to-slate-800",
      accentColor: "bg-slate-100",
      textColor: "text-slate-900",
      why: "Real estate is a visual and information-intensive industry where first impressions matter tremendously. Your website must showcase properties beautifully while providing comprehensive information that helps buyers make decisions. Our web development agency specializes in creating stunning property showcase platforms.",
      what: "Advanced property showcase systems with virtual tours, MLS integration for real-time updates, lead capture systems, agent profiles with testimonials, market analysis tools, and mobile optimization. We create real estate agency websites, interior design websites, interior decorator websites, construction company websites, property development sites, and home staging websites for businesses in Kempton Park, Edenvale, Modderfontein, and Greenstone.",
      how: "We analyze your local market and target clients to create a website strategy that positions your agency as the premium choice. Our web developers create sophisticated, visually appealing layouts that showcase properties beautifully with advanced search functionality and mobile optimization."
    },
    {
      id: "service-5",
      title: "Luxury Websites",
      subtitle: "Creating Exclusive Digital Experiences That Reflect Premium Positioning",
      icon: Crown,
      color: "from-slate-900 to-slate-800",
      accentColor: "bg-slate-100",
      textColor: "text-slate-900",
      why: "Luxury websites operate in a world where every detail matters. Your website must reflect the same level of sophistication, quality, and attention to detail that your products or services represent. Our web development agency creates exclusive digital experiences for premium brands.",
      what: "Sophisticated brand storytelling platforms, exclusive member portals with VIP access, high-end e-commerce platforms, immersive product showcases, personalization features, and luxury CRM integration. We develop luxury e-commerce websites, Shopify websites, Wix websites, WooCommerce stores, Magento platforms, and custom online stores for premium brands in Hyde Park, Sandton City, Melrose Arch, and Umhlanga.",
      how: "We conduct comprehensive brand analysis to understand your luxury positioning and target clients. Our web developers create sophisticated, visually stunning layouts that reflect the quality and exclusivity of your brand with premium e-commerce functionality and personalized user experiences."
    },
    {
      id: "service-6",
      title: "Growth Partnership",
      subtitle: "Long-term Digital Partnership for Continuous Success",
      icon: TrendingUp,
      color: "from-slate-900 to-slate-800",
      accentColor: "bg-slate-100",
      textColor: "text-slate-900",
      why: "Digital success requires ongoing optimization, monitoring, and strategic adjustments. A one-time website launch is just the beginning of your digital journey, not the end. Our web development agency provides long-term partnerships for sustainable growth.",
      what: "Comprehensive analytics and reporting systems, continuous A/B testing and optimization, strategic consulting sessions, regular content updates, performance monitoring, and market analysis. We provide ongoing digital marketing support, SEO optimization, social media integration, and growth strategies for businesses across all industries in Port Elizabeth, Bloemfontein, Nelspruit, and Polokwane.",
      how: "We establish comprehensive performance baselines and growth metrics that align with your business objectives. Our web development team conducts regular performance audits and optimization reviews to drive sustainable growth with continuous technical improvements and strategic enhancements."
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden no-snap">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-no-repeat opacity-20 services-bg-mobile md:bg-center"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759895652/mick-haupt-m0iXio5FF7M-unsplash_dda9xm.jpg')"
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
          <Link 
            to="/" 
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
          </Link>
          
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="text-sm text-slate-300 tracking-widest uppercase">Our Services</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                Professional Web Development Services
                <span className="block text-slate-300 font-extralight">for Premium Businesses</span>
          </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Discover our comprehensive web development services that transform businesses across 
                law firms, consulting agencies, financial services, real estate, and luxury websites. 
                We are professional web developers specializing in custom solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto space-y-32">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative scroll-mt-24"
              >
                {/* Section Header */}
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-4 mb-8">
                    <div className={`w-20 h-20 ${section.accentColor} rounded-3xl flex items-center justify-center shadow-lg`}>
                      <section.icon className={`w-10 h-10 ${section.textColor}`} />
                    </div>
                    <div className="text-left">
                      <h2 className="text-4xl lg:text-5xl font-light text-slate-900 mb-2">
                        {section.title}
                      </h2>
                      <p className="text-xl text-slate-600 font-light">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {/* WHY */}
                  <div className="group">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-xl">?</span>
                        </div>
                        <h3 className="text-2xl font-light text-slate-900">WHY</h3>
                      </div>
                      <p className="text-slate-700 leading-relaxed text-lg">
                        {section.why}
                      </p>
                    </div>
                  </div>

                  {/* WHAT */}
                  <div className="group">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-xl">!</span>
                        </div>
                        <h3 className="text-2xl font-light text-slate-900">WHAT</h3>
                      </div>
                      <p className="text-slate-700 leading-relaxed text-lg">
                        {section.what}
                      </p>
                    </div>
                  </div>

                  {/* HOW */}
                  <div className="group">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 h-full">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-xl">→</span>
                        </div>
                        <h3 className="text-2xl font-light text-slate-900">HOW</h3>
                      </div>
                      <p className="text-slate-700 leading-relaxed text-lg">
                        {section.how}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Media Section for Law Firms */}
                {section.id === "service-1" && (
                  <div className="mt-16 max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Video */}
                      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                        <h4 className="text-xl font-semibold text-slate-900 mb-6">See Our Work in Action</h4>
                        <div className="relative rounded-2xl overflow-hidden shadow-lg">
                          <video
                            className="w-full h-auto"
                            autoPlay
                            muted
                            loop
                            playsInline
                          >
                            <source src="https://res.cloudinary.com/dnnwvmh3n/video/upload/v1759831424/198890-909564521_tiny_uvgqby.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                        <h4 className="text-xl font-semibold text-slate-900 mb-6">Professional Excellence</h4>
                        <div className="relative rounded-2xl overflow-hidden shadow-lg">
                          <img
                            src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759687614/conny-schneider-3hkKv6WzjcE-unsplash_rkior5.jpg"
                            alt="Professional law firm office"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                        <p className="text-slate-600 mt-4 text-sm leading-relaxed">
                          Our premium web development creates the same level of professionalism and trust that your physical office conveys to clients.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Media Section for Consulting Agencies */}
                {section.id === "service-2" && (
                  <div className="mt-16 max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
                      <h4 className="text-lg font-semibold text-slate-900 mb-4 text-center">Strategic Consulting Excellence</h4>
                      <div className="relative rounded-xl overflow-hidden shadow-md max-w-md mx-auto">
                        <video
                          className="w-full h-auto"
                          autoPlay
                          muted
                          loop
                          playsInline
                        >
                          <source src="https://res.cloudinary.com/dnnwvmh3n/video/upload/v1759833633/224245_tiny_wz1o9m.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <p className="text-slate-600 mt-4 text-sm leading-relaxed text-center max-w-lg mx-auto">
                        Our premium web development solutions help consulting agencies establish thought leadership and attract high-value clients.
                      </p>
                    </div>
                  </div>
                )}

                {/* Media Section for Financial Services */}
                {section.id === "service-3" && (
                  <div className="mt-16 max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
                      <h4 className="text-lg font-semibold text-slate-900 mb-4 text-center">Secure Financial Solutions</h4>
                      <div className="relative rounded-xl overflow-hidden shadow-md max-w-md mx-auto">
                        <video
                          className="w-full h-auto"
                          autoPlay
                          muted
                          loop
                          playsInline
                        >
                          <source src="https://res.cloudinary.com/dnnwvmh3n/video/upload/v1759834376/204306-923909642_tiny_zhltik.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <p className="text-slate-600 mt-4 text-sm leading-relaxed text-center max-w-lg mx-auto">
                        Our secure web development solutions help financial service providers build trust and meet strict compliance requirements while protecting client data.
                      </p>
                    </div>
                  </div>
                )}

                {/* Media Section for Real Estate Agencies */}
                {section.id === "service-4" && (
                  <div className="mt-16 max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
                      <h4 className="text-lg font-semibold text-slate-900 mb-4 text-center">Property Showcase Excellence</h4>
                      <div className="relative rounded-xl overflow-hidden shadow-md max-w-md mx-auto">
                        <video
                          className="w-full h-auto"
                          autoPlay
                          muted
                          loop
                          playsInline
                        >
                          <source src="https://res.cloudinary.com/dnnwvmh3n/video/upload/v1759834930/247754_small_swindg.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <p className="text-slate-600 mt-4 text-sm leading-relaxed text-center max-w-lg mx-auto">
                        Our dynamic web development solutions help real estate agencies showcase properties beautifully and capture qualified leads through sophisticated digital experiences.
                      </p>
                    </div>
                  </div>
                )}

                {/* Media Section for Luxury Websites */}
                {section.id === "service-5" && (
                  <div className="mt-16 max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
                      <h4 className="text-lg font-semibold text-slate-900 mb-4 text-center">Luxury Digital Excellence</h4>
                      <div className="relative rounded-xl overflow-hidden shadow-md max-w-md mx-auto">
                        <video
                          className="w-full h-auto"
                          autoPlay
                          muted
                          loop
                          playsInline
                        >
                          <source src="https://res.cloudinary.com/dnnwvmh3n/video/upload/v1759833516/3122-166335826_small_bywwtg.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <p className="text-slate-600 mt-4 text-sm leading-relaxed text-center max-w-lg mx-auto">
                        Our sophisticated web development creates exclusive digital experiences that reflect your luxury brand's premium positioning and exclusivity.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-light text-white">
                Ready to Transform Your Business with Our Web Development Services?
            </h2>
              <p className="text-xl text-slate-300">
                Let's discuss how our web development services can elevate your brand, attract premium clients, and drive measurable growth for your business. 
                Contact our professional web developers today for a consultation.
            </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                  className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-8 py-6 font-medium rounded-2xl"
                asChild
              >
                  <Link to="/contact">Get Started Today</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                  className="border-white text-white bg-black/20 backdrop-blur-sm hover:bg-white hover:text-slate-900 text-lg px-8 py-6 font-medium rounded-2xl"
                asChild
              >
                  <Link to="/#why-choose-us">Why Choose Us</Link>
              </Button>
            </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-6 text-center text-slate-600 space-y-2">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <p>© {new Date().getFullYear()} Lunexweb. All rights reserved.</p>
            <span className="text-slate-400">•</span>
            <a 
              href="/dashboard" 
              className="text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              Lunex Team Dashboard
            </a>
          </div>
          <p className="text-sm">
            Professional Web Development Agency - Custom Websites & Digital Solutions
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Services;