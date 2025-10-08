import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, MessageCircle, Zap, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedText } from "./AnimatedSection";
import { 
  trackLeadSubmission, 
  trackWhatsAppClick, 
  trackPhoneClick, 
  trackEmailClick,
  trackFormStart,
  trackFormAbandon,
  trackConversion
} from "@/lib/analytics";
import { db } from "@/lib/supabase";

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    remote_work: "",
    other_service: ""
  });
  const [formStarted, setFormStarted] = useState(false);
  
  // Track form start when user begins filling
  useEffect(() => {
    if (!formStarted && (formData.name || formData.email || formData.phone)) {
      setFormStarted(true);
      trackFormStart('main_contact_form', 'home');
    }
  }, [formData, formStarted]);

  // Track form abandonment
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (formStarted && (formData.name || formData.email || formData.phone)) {
        trackFormAbandon('main_contact_form', 'home', 'incomplete');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formStarted, formData]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save to Supabase database
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        service_type: formData.service === 'other' ? formData.other_service || 'other' : formData.service || 'general',
        budget_range: formData.budget || null,
        timeline: formData.timeline || null,
        message: formData.message || null,
        remote_work: formData.remote_work || null,
        source: 'contact_form',
        location: 'home',
        priority: formData.budget === 'over-100k' ? 'high' : 
                  formData.budget === '50k-100k' ? 'high' :
                  formData.budget === '25k-50k' ? 'medium' : 'low',
        estimated_value: getBudgetValue(formData.budget)
      };

      await db.createLead(leadData);
      
      // Track successful lead submission
      trackLeadSubmission({
        serviceType: formData.service || 'general',
        location: 'home',
        budgetRange: formData.budget || 'not_specified',
        leadSource: 'organic',
        formType: 'main_contact_form'
      });

      // Track conversion
      trackConversion('lead_submission', {
        service_type: formData.service,
        budget_range: formData.budget,
        lead_value: getBudgetValue(formData.budget)
      });

      toast({
        title: "🎉 Thank you! We'll contact you as soon as possible",
        description: "Our team will analyze your requirements and send you a detailed proposal for your professional website project.",
      });
      setFormData({ name: "", email: "", phone: "", company: "", service: "", budget: "", timeline: "", message: "", remote_work: "", other_service: "" });
      setFormStarted(false);
    } catch (error) {
      console.error('Error saving lead:', error);
      toast({
        title: "Thank you for your interest!",
        description: "We'll contact you as soon as possible with a detailed proposal.",
      });
    }
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('home', formData.service);
    const message = `Hi! I'm interested in premium web development services. Can you help me create a professional website?`;
    const whatsappUrl = `https://wa.me/27789992503?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneClick = () => {
    trackPhoneClick('home', formData.service);
  };

  const handleEmailClick = () => {
    trackEmailClick('home', formData.service);
  };

  // Helper function to get budget value for conversion tracking
  const getBudgetValue = (budgetRange: string): number => {
    const budgetMap: Record<string, number> = {
      'under-10k': 5000,
      '10k-25k': 17500,
      '25k-50k': 37500,
      '50k-100k': 75000,
      'over-100k': 150000
    };
    return budgetMap[budgetRange] || 0;
  };

  return (
    <section id="contact" className="py-20 bg-card overflow-x-hidden" style={{ maxWidth: '100vw' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <AnimatedSection>
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                Premium Web Development Services
              </div>
              <div className="text-sm text-muted-foreground tracking-widest uppercase">Free Consultation</div>
              <AnimatedText className="text-3xl md:text-4xl font-light">
                <h2>Ready to Transform Your Online Presence?</h2>
              </AnimatedText>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Join 150+ premium brands who chose professional web development. 
                Get your free strategy session and discover how to create a website that converts visitors into clients.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border border-gray-200 shadow-xl">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-light mb-2 text-gray-900 leading-tight">Get Your Free Strategy Session</h3>
                    <p className="text-gray-600 text-sm">Discover how to create a website that converts visitors into clients</p>
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
                            <SelectItem value="law-firm">Law Firm Website</SelectItem>
                            <SelectItem value="consulting">Consulting Agency</SelectItem>
                            <SelectItem value="financial">Financial Services</SelectItem>
                            <SelectItem value="real-estate">Real Estate</SelectItem>
                            <SelectItem value="luxury">Luxury Brand</SelectItem>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="other">Other Professional Service</SelectItem>
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
                      
                      {/* Other Service Input - Shows when "other" is selected */}
                      {formData.service === 'other' && (
                        <div className="mt-4">
                          <Input
                            type="text"
                            placeholder="Please specify your service type (up to 30 characters)"
                            value={formData.other_service}
                            onChange={(e) => setFormData({ ...formData, other_service: e.target.value.slice(0, 30) })}
                            maxLength={30}
                            className="w-full"
                          />
                          <p className="text-xs text-slate-500 mt-1">{formData.other_service.length}/30 characters</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="When do you need this completed? *" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">ASAP (Within 2 weeks)</SelectItem>
                            <SelectItem value="1-month">Within 1 month</SelectItem>
                            <SelectItem value="2-months">Within 2 months</SelectItem>
                            <SelectItem value="3-months">Within 3 months</SelectItem>
                            <SelectItem value="flexible">I'm flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Select value={formData.remote_work} onValueChange={(value) => setFormData({ ...formData, remote_work: value })}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Remote work OK? *" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes, remote work is fine</SelectItem>
                            <SelectItem value="prefer-local">Prefer local meetings</SelectItem>
                            <SelectItem value="hybrid">Mix of remote and in-person</SelectItem>
                            <SelectItem value="no">No, must be in-person</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Textarea
                        placeholder="Tell us about your project goals and how we can help you create a professional website..."
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

            {/* Contact Information */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border border-gray-200 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl sm:text-2xl font-light mb-6 text-gray-900 leading-tight">Why Choose Lunexweb?</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Conversion Focused</h4>
                        <p className="text-gray-600 text-sm sm:text-base">Our premium websites are designed to convert visitors into qualified leads and paying clients.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Premium Quality</h4>
                        <p className="text-gray-600 text-sm sm:text-base">Professional web development with ongoing support and maintenance.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Zap className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Fast Response</h4>
                        <p className="text-gray-600 text-sm sm:text-base">Get responses as soon as possible with dedicated project management.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Local Support</h4>
                        <p className="text-gray-600 text-sm sm:text-base">Based in South Africa with local understanding and support.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl sm:text-2xl font-light mb-4 leading-tight">Get Instant Quote</h3>
                  <p className="text-green-100 mb-6 text-sm sm:text-base leading-relaxed">
                    Get a professional quote as soon as possible with guaranteed results and dedicated project management.
                  </p>
                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full bg-white text-green-700 hover:bg-green-50 text-lg py-6"
                      onClick={handlePhoneClick}
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

              <Card className="bg-slate-900 text-white shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl sm:text-2xl font-light mb-4 leading-tight">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-green-400" />
                      <a href="tel:+27789992503" className="text-gray-300 hover:text-white transition-colors" onClick={handlePhoneClick}>+27 78 999 2503</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <a href="mailto:info@lunexweb.com" className="text-gray-300 hover:text-white transition-colors break-all" onClick={handleEmailClick}>info@lunexweb.com</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-red-400" />
                      <span className="text-gray-300">Kempton Park, Johannesburg, SA</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">Mon-Fri: 8AM-5PM SAST</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};