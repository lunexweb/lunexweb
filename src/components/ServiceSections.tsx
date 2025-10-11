import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ExpandableItem = ({ title, content, isExpanded, onToggle }: { 
  title: string; 
  content: string; 
  isExpanded: boolean; 
  onToggle: () => void; 
}) => {
  return (
    <div className="border-b border-slate-200 pb-1">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left hover:text-slate-900 transition-colors group py-1"
      >
        <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.15 }}
          className="text-slate-500 group-hover:text-slate-700 flex-shrink-0 ml-2"
        >
          <Plus className="w-3 h-3" />
        </motion.div>
      </button>
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 4 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-xs text-slate-600 leading-tight pb-1">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ServiceSections = () => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const toggleExpanded = (itemKey: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const services = [
    {
      id: "service-1",
      number: "01",
      title: "Law Firms",
      description: "Modern, high-performing websites that enhance credibility, attract premium clients, and streamline case management for law firms.",
      ctaText: "Learn more",
      expandableItems: [
        {
          title: "Client Portal Development",
          content: "Secure portals for case management and document sharing with encryption."
        },
        {
          title: "Case Management Integration",
          content: "Integration with existing systems, calendar scheduling, and workflow automation."
        },
        {
          title: "Legal Content Management",
          content: "Specialized CMS for legal content, attorney profiles, and SEO optimization."
        }
      ]
    },
    {
      id: "service-2",
      number: "02",
      title: "Consulting Agencies",
      description: "Professional digital platforms that showcase expertise, generate leads, and establish thought leadership for consulting agencies.",
      ctaText: "Learn more",
      expandableItems: [
        {
          title: "Thought Leadership Platform",
          content: "Blog systems, whitepaper downloads, and content marketing tools for industry authority."
        },
        {
          title: "Client Showcase Systems",
          content: "Case study presentations, testimonials, and portfolio management systems."
        },
        {
          title: "Lead Generation Systems",
          content: "Advanced lead magnets, consultation booking, and automated nurturing sequences."
        }
      ]
    },
    {
      id: "service-3",
      number: "03",
      title: "Financial Service Providers",
      description: "Secure, compliant websites that build trust, attract high-net-worth clients, and streamline financial services delivery.",
      ctaText: "Learn more",
      expandableItems: [
        {
          title: "Compliance & Security",
          content: "FINRA-compliant hosting, SOC 2 certification, and regular security audits."
        },
        {
          title: "Client Portal Integration",
          content: "Secure portals for account access and document management with bank-level encryption."
        },
        {
          title: "Investment Tools",
          content: "Interactive calculators, portfolio analysis tools, and market data integration."
        }
      ]
    },
    {
      id: "service-4",
      number: "04",
      title: "Real Estate Agencies",
      description: "Dynamic property showcase platforms that drive listings, attract buyers, and streamline the real estate transaction process.",
      ctaText: "Learn more",
      expandableItems: [
        {
          title: "Property Management Tools",
          content: "Advanced listing systems, virtual tour integration, and automated lead distribution."
        },
        {
          title: "MLS Integration",
          content: "Seamless MLS data synchronization and real-time listing management."
        },
        {
          title: "Lead Capture Systems",
          content: "Property inquiry forms, buyer registration, and automated follow-up sequences."
        }
      ]
    },
    {
      id: "service-5",
      number: "05",
      title: "Luxury Websites",
      description: "Sophisticated digital experiences that embody exclusivity, drive premium sales, and create memorable brand interactions.",
      ctaText: "Learn more",
      expandableItems: [
        {
          title: "Brand Storytelling",
          content: "Immersive brand narratives, heritage showcases, and exclusive content experiences."
        },
        {
          title: "Exclusive Member Access",
          content: "VIP portal systems, exclusive product previews, and member-only experiences."
        },
        {
          title: "High-End E-commerce",
          content: "Luxury e-commerce platforms with premium checkout and concierge integration."
        }
      ]
    },
    {
      id: "service-6",
      number: "06",
      title: "Growth Partnership",
      description: "Long-term digital partnership focused on continuous optimization, performance monitoring, and strategic growth for all target markets.",
      ctaText: "Learn more",
      expandableItems: [
        {
          title: "Performance Analytics",
          content: "Comprehensive analytics dashboard with conversion tracking and ROI measurement."
        },
        {
          title: "Continuous Optimization",
          content: "A/B testing frameworks and data-driven improvements for maximum performance."
        },
        {
          title: "Strategic Consulting",
          content: "Monthly strategy sessions, market analysis, and growth planning alignment."
        }
      ]
    }
  ];

  return (
    <>
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className="service-section bg-white overflow-x-hidden"
          style={{ 
            paddingTop: '80px'
          }}
        >
          {/* Section Number Indicator */}
          <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-30">
            <div className="text-lg sm:text-2xl font-bold text-slate-300 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-lg shadow-sm">
              {service.number}
            </div>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center min-h-[calc(100vh-80px)] py-8 sm:py-12">
              
              {/* Left Column - Section Number and Graphic */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-center lg:items-start space-y-6 sm:space-y-8"
              >
                {/* Section Number */}
                <div className="text-sm text-slate-500 font-mono text-center lg:text-left w-full">
                  // {service.number}
                </div>
                
                {/* Graphic - Hammer for Law Firms, Geometric for others */}
                <div className="w-full max-w-sm sm:max-w-md mx-auto lg:mx-0">
                  <div className="relative w-full h-64 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden">
                    {service.id === "service-1" ? (
                      // Hammer image for Law Firms
                      <img
                        src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759698672/hammer-802298_1280_sctxpn.jpg"
                        alt="Legal justice scale"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : service.id === "service-2" ? (
                      // Consulting image for Consulting Agencies
                      <img
                        src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759837510/moein-ghezelbash-J0uTfdQ_Qnc-unsplash_xptyma.jpg"
                        alt="Professional consulting"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : service.id === "service-3" ? (
                      // Financial services image for Financial Service Providers
                      <img
                        src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759837882/pexels-artempodrez-6779716_xxx1ti.jpg"
                        alt="Financial services"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : service.id === "service-4" ? (
                      // Real estate image for Real Estate Agencies
                      <img
                        src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759838046/pexels-lusterpix-32301952_zfmsac.jpg"
                        alt="Real estate"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : service.id === "service-5" ? (
                      // Luxury websites image for Luxury Websites
                      <img
                        src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759838227/pexels-tinchflicks-29054615_napowl.jpg"
                        alt="Luxury websites"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : service.id === "service-6" ? (
                      // Growth partnership image for Growth Partnership
                      <img
                        src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759838318/pexels-fauxels-3184438_xjw5pd.jpg"
                        alt="Growth partnership"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      // Geometric Shapes for other sections
                      <div className="relative w-48 h-32">
                        {/* Seesaw base */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-300 rounded-full"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-slate-300"></div>
                        
                        {/* Left side shapes */}
                        <div className="absolute bottom-8 left-8 w-6 h-6 bg-slate-400 rounded-full shadow-sm"></div>
                        <div className="absolute bottom-12 left-4 w-4 h-4 bg-slate-500 rounded shadow-sm"></div>
                        
                        {/* Right side shapes */}
                        <div className="absolute bottom-10 right-8 w-5 h-5 bg-slate-400 rounded shadow-sm"></div>
                        <div className="absolute bottom-14 right-4 w-3 h-3 bg-slate-500 rounded-full shadow-sm"></div>
                        <div className="absolute bottom-16 right-12 w-4 h-4 bg-slate-400 rounded shadow-sm"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Website Types */}
                  <div className="text-sm text-slate-500 space-y-2 mt-4 text-center lg:text-left">
                    {service.id === "service-1" && (
                      <>
                        <p className="leading-relaxed">• Attorneys websites • Law Firms websites • Legal practice websites</p>
                        <p className="leading-relaxed">• Personal injury websites • Corporate law websites • Family law websites</p>
                      </>
                    )}
                    {service.id === "service-2" && (
                      <>
                        <p className="leading-relaxed">• Consulting agency websites • Business consulting websites</p>
                        <p className="leading-relaxed">• Management consulting websites • Strategy consulting websites</p>
                      </>
                    )}
                    {service.id === "service-3" && (
                      <>
                        <p className="leading-relaxed">• Financial advisor websites • Investment firm websites</p>
                        <p className="leading-relaxed">• Wealth management websites • Financial planning websites</p>
                      </>
                    )}
                    {service.id === "service-4" && (
                      <>
                        <p className="leading-relaxed">• Real estate agent websites • Property portfolio websites</p>
                        <p className="leading-relaxed">• Construction company websites • Interior design websites</p>
                        <p className="leading-relaxed">• Interior decorator websites • Property development websites</p>
                      </>
                    )}
                    {service.id === "service-5" && (
                      <>
                        <p className="leading-relaxed">• Luxury brand websites • E-commerce websites • Shopify websites</p>
                        <p className="leading-relaxed">• Wix websites • Premium retail websites • High-end fashion websites</p>
                      </>
                    )}
                    {service.id === "service-6" && (
                      <>
                        <p className="leading-relaxed">• Growth partnership websites • Business development websites</p>
                        <p className="leading-relaxed">• Strategic partnership websites • Long-term growth websites</p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
              
              {/* Right Column - Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col justify-center space-y-6 sm:space-y-8 text-center lg:text-left"
              >
                {/* Main Title */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                  {service.title}
                </h2>
                
                {/* Description */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {service.description}
                </p>
                
                {/* CTA Button */}
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <Button
                    size="lg"
                    className="text-white px-8 py-3 text-base font-medium rounded-lg"
                    style={{ backgroundColor: '#22C55E' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#16A34A'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#22C55E'}
                    asChild
                  >
                    <Link to={`/services#${service.id}`}>
                      {service.ctaText}
                    </Link>
                  </Button>
                </div>
                
                {/* Expandable Items */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="space-y-1 mt-4 text-center lg:text-left"
                >
                  {service.expandableItems.map((item, itemIndex) => (
                    <ExpandableItem
                      key={`${service.id}-${itemIndex}`}
                      title={item.title}
                      content={item.content}
                      isExpanded={expandedItems[`${service.id}-${itemIndex}`] || false}
                      onToggle={() => toggleExpanded(`${service.id}-${itemIndex}`)}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Section Divider (except for last section) */}
          {index < services.length - 1 && (
            <motion.div
              className="section-divider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                delay: 0.3, 
                duration: 0.5,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
            />
          )}
          
        </section>
      ))}
    </>
  );
};
