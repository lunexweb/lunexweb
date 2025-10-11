import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, MessageCircle, Zap, Award, TrendingUp, ArrowRight, Users, Building2, Star } from "lucide-react";
import { db } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface LocationPageProps {
  province: string;
  city: string;
  population: string;
  description: string;
  majorIndustries: string[];
  localCompetitors: string[];
  testimonials: Array<{
    name: string;
    company: string;
    quote: string;
    rating: number;
  }>;
  stats: {
    businesses: string;
    avgRevenue: string;
    growthRate: string;
  };
}

export const LocationPage = ({
  province,
  city,
  population,
  description,
  majorIndustries,
  localCompetitors,
  testimonials,
  stats
}: LocationPageProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    service: "",
    budget: "",
    message: "",
    remoteWork: "",
    remoteWorkDetails: ""
  });

  // SEO and structured data
  const pageTitle = `Premium Web Development in ${city}, ${province} | Lunexweb`;
  const pageDescription = `Professional web development services in ${city}, ${province}. ${description} Specializing in ecommerce, luxury websites, blogs, corporate sites, restaurants, healthcare, real estate, and more. Get premium websites that convert visitors into clients. Call +27 78 999 2503.`;
  const canonicalUrl = `https://lunexweb.co.za/${city.toLowerCase().replace(/\s+/g, '-')}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Lunexweb - ${city} Web Development`,
    "description": pageDescription,
    "url": canonicalUrl,
    "telephone": "+27789992503",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": province,
      "addressCountry": "ZA"
    },
    "areaServed": {
      "@type": "City",
      "name": city
    },
    "serviceArea": {
      "@type": "City",
      "name": city
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Law Firm Website Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Luxury Brand Websites"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Blog Website Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Corporate Website Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Real Estate Website Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Restaurant & Food Websites"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Healthcare Website Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Portfolio & Creative Websites"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Technology Company Websites"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": testimonials.length
    },
    "review": testimonials.map(testimonial => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewBody": testimonial.quote,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating
      }
    }))
  };

  useEffect(() => {
    // Update page title and meta description
    document.title = pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = pageDescription;
      document.head.appendChild(meta);
    }

    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = canonicalUrl;
      document.head.appendChild(canonical);
    }

    // Add structured data
    const existingScript = document.querySelector('#structured-data');
    if (existingScript) {
      existingScript.remove();
    }
    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [city, province, pageTitle, pageDescription, canonicalUrl, structuredData, testimonials.length]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        location: formData.location || `${city}, ${province}`,
        service_type: formData.service,
        budget_range: formData.budget,
        message: formData.message,
        remote_work: formData.remoteWork,
        remote_work_details: formData.remoteWorkDetails,
        lead_score: 50, // Default score
        status: 'new' as const,
        source: `location_page_${city.toLowerCase()}`,
        priority: 'medium' as const,
        estimated_value: null,
        notes: null,
        timeline: null,
        website_url: null,
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        assigned_to: null,
        last_contacted_at: null
      };

      await db.createLead(leadData);
      
      toast({
        title: "🎉 Thank you! We'll contact you as soon as possible",
        description: `Our ${city} team will analyze your requirements and send you a detailed proposal for your professional website project.`,
      });
      
      setFormData({ name: "", email: "", phone: "", company: "", location: "", service: "", budget: "", message: "", remoteWork: "", remoteWorkDetails: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm from ${city}, ${province} and interested in premium web development services. Can you help me create a professional website?`;
    const whatsappUrl = `https://wa.me/27789992503?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const services = [
    "Law Firm Website Development",
    "Consulting Agency Websites", 
    "Financial Services Websites",
    "Real Estate Agency Websites",
    "Luxury Brand Websites",
    "E-commerce Development",
    "Corporate Websites",
    "Professional Service Websites",
    "Blog Website Development",
    "Personal Brand Websites",
    "Restaurant & Food Websites",
    "Healthcare & Medical Websites",
    "Educational Institution Websites",
    "Non-Profit Organization Websites",
    "Technology Company Websites",
    "Manufacturing Company Websites",
    "Retail Store Websites",
    "Service Business Websites",
    "Portfolio & Creative Websites",
    "Event & Wedding Websites",
    "Travel & Tourism Websites",
    "Fitness & Wellness Websites",
    "Beauty & Spa Websites",
    "Automotive Business Websites",
    "Construction & Building Websites",
    "Architecture & Design Websites",
    "Photography & Art Websites",
    "Music & Entertainment Websites",
    "Sports & Recreation Websites",
    "Religious Organization Websites",
    "Government & Municipal Websites",
    "Startup & Tech Company Websites",
    "B2B Service Websites",
    "SaaS & Software Websites",
    "Agency & Marketing Websites",
    "Freelancer & Consultant Websites",
    "Other (Please specify)"
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`web development ${city}, website design ${city}, ${province}, professional websites, business websites, ${city} web developer, premium web design, ecommerce development ${city}, luxury websites ${city}, blog development ${city}, restaurant websites ${city}, healthcare websites ${city}, real estate websites ${city}, corporate websites ${city}, portfolio websites ${city}, technology websites ${city}, startup websites ${city}, ${city} web agency`} />
        <meta name="author" content="Lunexweb" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:site_name" content="Lunexweb" />
        <meta property="og:locale" content="en_ZA" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        
        {/* Additional SEO */}
        <meta name="geo.region" content={`ZA-${province.toUpperCase().replace(/\s+/g, '')}`} />
        <meta name="geo.placename" content={city} />
        <meta name="geo.position" content="-33.9249;18.4241" />
        <meta name="ICBM" content="-33.9249, 18.4241" />
      </Helmet>
      
      <Navigation />
      
      {/* Hero Section with Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - City specific */}
        <div className="absolute inset-0 z-0">
          {city.toLowerCase() === 'cape town' ? (
            <img
              src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1760143009/table-bay-harbour-3541607_1280_i0aska.jpg"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'johannesburg' ? (
            <img
              src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1760143661/johannesburg-4322256_1280_neqyrj.jpg"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'durban' ? (
            <img
              src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1760143774/durban-4374447_1280_zmrcvj.jpg"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'pretoria' ? (
            <img
              src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'sandton' ? (
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'port elizabeth' || city.toLowerCase() === 'port-elizabeth' ? (
            <img
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'bloemfontein' ? (
            <img
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'east london' || city.toLowerCase() === 'east-london' ? (
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'pietermaritzburg' ? (
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'nelspruit' ? (
            <img
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'polokwane' ? (
            <img
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'rustenburg' ? (
            <img
              src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'kimberley' ? (
            <img
              src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'stellenbosch' ? (
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'paarl' ? (
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'kempton park' || city.toLowerCase() === 'kempton-park' ? (
            <img
              src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1760144509/cape-town-5200293_1280_a5lc6d.jpg"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'benoni' ? (
            <img
              src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1760144509/cape-town-5200293_1280_a5lc6d.jpg"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'randburg' ? (
            <img
              src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1760144509/cape-town-5200293_1280_a5lc6d.jpg"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'centurion' ? (
            <img
              src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1760144509/cape-town-5200293_1280_a5lc6d.jpg"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : city.toLowerCase() === 'midrand' ? (
            <img
              src="https://res.cloudinary.com/dnnwvmh3n/image/upload/v1760144509/cape-town-5200293_1280_a5lc6d.jpg"
              alt={`${city}, ${province} - Premium Web Development`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          )}
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        {/* Content */}
        <div className="container mx-auto px-6 relative z-20 pt-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6 sm:mb-8"
            >
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
              <span className="text-xs sm:text-sm">Back to Home</span>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <span className="text-xs sm:text-sm text-green-100 font-medium">#1 Web Development Agency in {city}</span>
              </div>
              
              <div className="text-xs sm:text-sm text-slate-300 tracking-widest uppercase">Premium Web Development Services</div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                Premium Web Development in
                <span className="block text-green-400 font-bold">{city}, {province}</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
                {description} Premium web development including ecommerce, luxury websites, blogs, corporate sites, restaurants, healthcare, real estate, and more. 
                Professional websites that convert visitors into paying clients in {city}. Get your free strategy session today.
              </p>
              
              {/* SEO-friendly service highlights - Mobile Optimized */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mt-6 max-w-4xl mx-auto">
                <span className="px-2 sm:px-3 py-1.5 sm:py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-100 text-xs sm:text-sm text-center">
                  ✓ E-commerce
                </span>
                <span className="px-2 sm:px-3 py-1.5 sm:py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-100 text-xs sm:text-sm text-center">
                  ✓ Luxury Brands
                </span>
                <span className="px-2 sm:px-3 py-1.5 sm:py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-100 text-xs sm:text-sm text-center">
                  ✓ Blog Sites
                </span>
                <span className="px-2 sm:px-3 py-1.5 sm:py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-100 text-xs sm:text-sm text-center">
                  ✓ Restaurants
                </span>
                <span className="px-2 sm:px-3 py-1.5 sm:py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-100 text-xs sm:text-sm text-center">
                  ✓ Healthcare
                </span>
                <span className="px-2 sm:px-3 py-1.5 sm:py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-100 text-xs sm:text-sm text-center">
                  ✓ Real Estate
                </span>
                <span className="px-2 sm:px-3 py-1.5 sm:py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-100 text-xs sm:text-sm text-center">
                  ✓ SEO Optimized
                </span>
                <span className="px-2 sm:px-3 py-1.5 sm:py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-100 text-xs sm:text-sm text-center">
                  ✓ Mobile Ready
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4">Why {city} Businesses Choose Lunexweb for Web Development</h2>
              <p className="text-lg text-slate-600">Local expertise meets global standards in {city}, {province}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-light text-slate-900 mb-2">{stats.businesses}</h3>
                <p className="text-slate-600">Businesses in {city}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-light text-slate-900 mb-2">{stats.avgRevenue}</h3>
                <p className="text-slate-600">Average Revenue Increase</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-light text-slate-900 mb-2">{stats.growthRate}</h3>
                <p className="text-slate-600">Client Growth Rate</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-4">Web Development Services for {city} Industries</h2>
              <p className="text-lg text-slate-600">Specialized website development for {city}'s key business sectors in {province}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {majorIndustries.map((industry, index) => (
                <motion.div
                  key={industry}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{industry}</h3>
                      <p className="text-slate-600 text-sm">
                        Professional websites that convert visitors into qualified leads and clients
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-4">Web Development Testimonials from {city} Clients</h2>
              <p className="text-lg text-slate-600">Real results from real businesses in {city}, {province}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-700 mb-4 italic">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-semibold text-slate-900">{testimonial.name}</p>
                        <p className="text-sm text-slate-600">{testimonial.company}, {city}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4">Get Your Free Web Development Strategy Session in {city}</h2>
              <p className="text-lg text-slate-600">
                Discover how to create a professional website that converts visitors into clients in {city}, {province}. Call +27 78 999 2503 for immediate assistance.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border border-gray-200 shadow-xl">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-light mb-2 text-gray-900">Get Your Free Strategy Session</h3>
                      <p className="text-gray-600 text-sm">For businesses in {city}, {province}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Input
                            type="text"
                            placeholder="Your Name *"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full"
                          />
                        </div>
                        <div>
                          <Input
                            type="email"
                            placeholder="Your Email *"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Input
                            type="tel"
                            placeholder="Phone Number *"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            className="w-full"
                          />
                        </div>
                        <div>
                          <Input
                            type="text"
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <Input
                          type="text"
                          placeholder="Location (City, Province/State) *"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          required
                          className="w-full"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Service Needed *" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Project Budget *" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-10k">Under R10,000</SelectItem>
                              <SelectItem value="10k-25k">R10,000 - R25,000</SelectItem>
                              <SelectItem value="25k-50k">R25,000 - R50,000</SelectItem>
                              <SelectItem value="50k-100k">R50,000 - R100,000</SelectItem>
                              <SelectItem value="over-100k">Over R100,000</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Textarea
                          placeholder={`Tell us about your ${city} business and how we can help you create a professional website...`}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          rows={4}
                          className="w-full"
                        />
                      </div>

                      {/* Remote Work Question */}
                      <div className="space-y-4">
                        <Label className="text-base font-medium text-gray-900">
                          Are you interested in working remotely?
                        </Label>
                        <RadioGroup 
                          value={formData.remoteWork} 
                          onValueChange={(value) => setFormData({ ...formData, remoteWork: value, remoteWorkDetails: "" })}
                          className="flex flex-col space-y-3"
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="yes" id="remote-yes-location" />
                            <Label htmlFor="remote-yes-location" className="text-sm font-normal cursor-pointer">
                              Yes, I prefer remote work
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="no" id="remote-no-location" />
                            <Label htmlFor="remote-no-location" className="text-sm font-normal cursor-pointer">
                              No, I prefer in-person meetings
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="other" id="remote-other-location" />
                            <Label htmlFor="remote-other-location" className="text-sm font-normal cursor-pointer">
                              Other (please specify)
                            </Label>
                          </div>
                        </RadioGroup>
                        
                        {/* Conditional text input for "Other" */}
                        {formData.remoteWork === "other" && (
                          <div className="mt-3">
                            <Input
                              type="text"
                              placeholder="Please specify your preference..."
                              value={formData.remoteWorkDetails}
                              onChange={(e) => setFormData({ ...formData, remoteWorkDetails: e.target.value })}
                              className="w-full"
                              maxLength={100}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {formData.remoteWorkDetails.length}/100 characters
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full text-white text-lg py-6"
                          style={{ backgroundColor: '#22C55E' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#16A34A'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#22C55E'}
                        >
                          <Zap className="w-5 h-5 mr-2" />
                          Send to a professional
                        </Button>
                        
                        <div className="text-center">
                          <span className="text-muted-foreground text-sm font-medium">Or</span>
                        </div>
                        
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          className="w-full text-lg py-6 border-green-500 text-green-600 hover:bg-green-50"
                          onClick={handleWhatsAppClick}
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Chat on WhatsApp
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Why Choose Us */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border border-gray-200 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-light mb-6 text-gray-900">Why Choose Lunexweb in {city}?</h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Conversion Focused</h4>
                          <p className="text-gray-600 text-sm">Our premium websites are designed to convert visitors into qualified leads and clients.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Award className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Local Expertise</h4>
                          <p className="text-gray-600 text-sm">We understand {city}'s business landscape and market dynamics.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Zap className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Fast Response</h4>
                          <p className="text-gray-600 text-sm">Get responses as soon as possible with dedicated project management.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">South African Support</h4>
                          <p className="text-gray-600 text-sm">Local support with understanding of SA business culture and regulations.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-light mb-4">Get Instant Quote for {city}</h3>
                  <p className="text-green-100 mb-6 text-sm leading-relaxed">
                    Get a professional quote as soon as possible with guaranteed results and dedicated project management.
                  </p>
                    <div className="space-y-3">
                      <Button
                        size="lg"
                        className="w-full bg-white text-green-700 hover:bg-green-50 text-lg py-6"
                        onClick={() => window.open('tel:+27789992503')}
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now: +27 78 999 2503
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full border-white text-white bg-black/20 backdrop-blur-sm hover:bg-white hover:text-green-700 text-lg py-6"
                        onClick={handleWhatsAppClick}
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        WhatsApp Quote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
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
            Premium Web Development Agency - {city}, {province} | Professional Website Design | SEO Optimized | Mobile Responsive
          </p>
          <p className="text-xs text-slate-500 mt-4">
            Serving {city} and surrounding areas in {province}. Professional web development services including website design, SEO optimization, and digital marketing solutions.
          </p>
        </div>
      </footer>
    </div>
  );
};
