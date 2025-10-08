import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, 
  FileText, 
  Calculator, 
  CheckCircle, 
  Star,
  TrendingUp,
  Award,
  Clock,
  ArrowRight,
  Shield,
  Zap,
  Users,
  DollarSign,
  Mail,
  User,
  Building,
  Globe,
  Target,
  X,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

interface LeadMagnetProps {
  type: 'audit' | 'guide' | 'calculator' | 'template';
  title: string;
  description: string;
  icon: React.ReactNode;
  ctaText: string;
  className?: string;
}

export const LeadMagnet = ({ 
  type, 
  title, 
  description, 
  icon, 
  ctaText, 
  className = "" 
}: LeadMagnetProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    service: "",
    currentLeads: "",
    goals: ""
  });

  const getIconColor = () => {
    switch (type) {
      case 'audit': return 'text-emerald-500';
      case 'guide': return 'text-blue-500';
      case 'calculator': return 'text-purple-500';
      case 'template': return 'text-orange-500';
      default: return 'text-green-500';
    }
  };

  const getGradientBg = () => {
    switch (type) {
      case 'audit': return 'from-emerald-500 to-emerald-600';
      case 'guide': return 'from-blue-500 to-blue-600';
      case 'calculator': return 'from-purple-500 to-purple-600';
      case 'template': return 'from-orange-500 to-orange-600';
      default: return 'from-green-500 to-green-600';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track lead magnet download
    trackEvent('lead_magnet_download', {
      magnet_type: type,
      title: title,
      user_name: formData.name,
      user_email: formData.email,
      company: formData.company,
      service_interest: formData.service
    });

    toast({
      title: "🎉 Success! Your download is ready",
      description: `Check your email for the ${title}. We'll also send you exclusive tips to improve your website conversions.`,
    });

    // Simulate download
    setTimeout(() => {
      // In a real implementation, this would trigger the actual download
      console.log(`Downloading ${title} for ${formData.email}`);
    }, 1000);

    setIsOpen(false);
    setFormData({ name: "", email: "", company: "", website: "", service: "", currentLeads: "", goals: "" });
  };

  const handleOpen = () => {
    trackEvent('lead_magnet_view', {
      magnet_type: type,
      title: title
    });
    setIsOpen(true);
  };

  return (
    <>
      <motion.div
        className={`cursor-pointer group ${className}`}
        onClick={handleOpen}
        whileHover={{ scale: 1.03, y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className="h-[400px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-0 shadow-2xl group-hover:shadow-3xl transition-all duration-500 overflow-hidden relative">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardContent className="p-6 relative z-10">
            <div className="flex flex-col h-full justify-between">
              {/* Icon with animated background */}
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  className="relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${getGradientBg()} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <div className="text-white transform group-hover:scale-110 transition-transform duration-300">
                      {icon}
                    </div>
                  </div>
                  {/* Sparkle effect */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-2 h-2 text-white m-0.5" />
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center mb-4">
                <h3 className="font-bold text-xl text-white mb-3 group-hover:text-green-400 transition-colors duration-300 leading-tight">
                  {title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4 group-hover:text-white transition-colors duration-300">
                  {description}
                </p>
              </div>

              {/* CTA Button */}
              <motion.div
                className="flex items-center justify-center space-x-2 text-green-400 font-semibold group-hover:text-green-300 transition-colors duration-300 mb-3"
                whileHover={{ x: 5 }}
              >
                <span className="text-base">{ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center space-x-3 text-slate-400 text-xs">
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>Instant</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>Free</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Premium Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getGradientBg()} rounded-xl flex items-center justify-center`}>
                    <div className="text-white">
                      {icon}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{title}</h2>
                    <p className="text-slate-300 text-lg">{description}</p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Free Download</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span>Instant Access</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>100% Secure</span>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="p-8 pb-12">
                <form id="lead-magnet-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-slate-700">
                        <User className="w-4 h-4 mr-2 text-slate-500" />
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-12 border-2 border-slate-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-slate-700">
                        <Mail className="w-4 h-4 mr-2 text-slate-500" />
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12 border-2 border-slate-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-slate-700">
                        <Building className="w-4 h-4 mr-2 text-slate-500" />
                        Company Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="h-12 border-2 border-slate-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-slate-700">
                        <Globe className="w-4 h-4 mr-2 text-slate-500" />
                        Current Website
                      </label>
                      <Input
                        type="url"
                        placeholder="https://yourwebsite.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="h-12 border-2 border-slate-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-slate-700">
                      <Target className="w-4 h-4 mr-2 text-slate-500" />
                      Service Interest *
                    </label>
                    <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                      <SelectTrigger className="h-12 border-2 border-slate-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl">
                        <SelectValue placeholder="Select your service interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="law-firm">Law Firm Website</SelectItem>
                        <SelectItem value="consulting">Consulting Agency</SelectItem>
                        <SelectItem value="financial">Financial Services</SelectItem>
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                        <SelectItem value="luxury">Luxury Brand</SelectItem>
                        <SelectItem value="other">Other Professional Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {type === 'audit' && (
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-slate-700">
                        <Target className="w-4 h-4 mr-2 text-slate-500" />
                        Website Goals
                      </label>
                      <Textarea
                        placeholder="What are your main goals for your website? (e.g., increase leads, improve conversions, better user experience)"
                        value={formData.goals}
                        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                        rows={4}
                        className="border-2 border-slate-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                      />
                    </div>
                  )}

                  {type === 'calculator' && (
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-slate-700">
                        <DollarSign className="w-4 h-4 mr-2 text-slate-500" />
                        Current Monthly Leads
                      </label>
                      <Input
                        type="text"
                        placeholder="How many leads do you get per month? (optional)"
                        value={formData.currentLeads}
                        onChange={(e) => setFormData({ ...formData, currentLeads: e.target.value })}
                        className="h-12 border-2 border-slate-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full h-16 bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 text-white font-bold text-xl rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200"
                      >
                        <Download className="w-6 h-6 mr-3" />
                        Get My Free {title}
                        <ArrowRight className="w-6 h-6 ml-3" />
                      </Button>
                    </motion.div>
                    <p className="text-center text-sm text-slate-600 mt-3">
                      Click to download instantly - no waiting required!
                    </p>
                  </div>
                </form>

                {/* Trust indicators */}
                <div className="mt-8 text-center">
                  <div className="flex items-center justify-center space-x-6 text-sm text-slate-500 mb-6">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4" />
                      <span>Secure & Private</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Join 2,500+ professionals</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>No spam, ever</span>
                    </div>
                  </div>
                  
                  {/* Fallback Submit Button - Always Visible */}
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <p className="text-sm text-green-800 mb-3 font-medium">
                      Can't see the submit button? Use this one:
                    </p>
                    <Button
                      type="submit"
                      form="lead-magnet-form"
                      className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download {title} Now
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

// Pre-built lead magnet components
export const WebsiteAuditMagnet = ({ className }: { className?: string }) => (
  <LeadMagnet
    type="audit"
    title="Free Website Audit"
    description="Get a comprehensive analysis of your current website with actionable recommendations to improve conversions and user experience."
    icon={<CheckCircle className="w-8 h-8 text-white" />}
    ctaText="Get Free Audit"
    className={className}
  />
);

export const LeadGenerationGuide = ({ className }: { className?: string }) => (
  <LeadMagnet
    type="guide"
    title="Website Conversion Guide"
    description="Download our exclusive 47-page guide with proven strategies to improve your website conversions in 30 days."
    icon={<TrendingUp className="w-8 h-8 text-white" />}
    ctaText="Download Guide"
    className={className}
  />
);

export const ROICalculator = ({ className }: { className?: string }) => (
  <LeadMagnet
    type="calculator"
    title="ROI Calculator"
    description="Calculate exactly how much revenue a professional website will generate for your business."
    icon={<Calculator className="w-8 h-8 text-white" />}
    ctaText="Calculate ROI"
    className={className}
  />
);

export const WebsiteTemplate = ({ className }: { className?: string }) => (
  <LeadMagnet
    type="template"
    title="Professional Template"
    description="Get our premium website template designed specifically for professional service businesses."
    icon={<FileText className="w-8 h-8 text-white" />}
    ctaText="Get Template"
    className={className}
  />
);
