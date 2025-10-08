import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, Zap, Award, TrendingUp, ArrowRight, Users, Building2, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
    service: "",
    budget: "",
    message: ""
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "🎉 Thank you! We'll contact you as soon as possible",
      description: `Our ${city} team will analyze your requirements and send you a detailed proposal for your professional website project.`,
    });
    setFormData({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" });
  };


  const services = [
    "Law Firm Website Development",
    "Consulting Agency Websites", 
    "Financial Services Websites",
    "Real Estate Agency Websites",
    "Luxury Brand Websites",
    "E-commerce Development",
    "Corporate Websites",
    "Professional Service Websites"
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759871118/pexels-pixabay-33478_chzxf0.jpg')"
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span className="text-sm">Back to Home</span>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-100 font-medium">#1 Web Development Agency in {city}</span>
              </div>
              
              <div className="text-sm text-slate-300 tracking-widest uppercase">Premium Web Development Services</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                Premium Web Development in
                <span className="block text-green-400 font-bold">{city}, {province}</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                {description} Premium web development that converts visitors into paying clients. 
                Professional websites for businesses in {city}.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4">Why {city} Businesses Choose Lunexweb</h2>
              <p className="text-lg text-slate-600">Local expertise meets global standards</p>
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
              <h2 className="text-3xl font-light text-slate-900 mb-4">Major Industries We Serve in {city}</h2>
              <p className="text-lg text-slate-600">Specialized web development for {city}'s key business sectors</p>
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
              <h2 className="text-3xl font-light text-slate-900 mb-4">What {city} Businesses Say About Us</h2>
              <p className="text-lg text-slate-600">Real results from real businesses in {city}</p>
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
              <h2 className="text-3xl font-light text-slate-900 mb-4">Get Your Free Strategy Session for {city}</h2>
              <p className="text-lg text-slate-600">
                Discover how to create a professional website that converts visitors into clients in {city}, {province}
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
                          Get My Free Strategy Session
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
            Premium Web Development Agency - {city}, {province} | Professional Website Design
          </p>
        </div>
      </footer>
    </div>
  );
};
