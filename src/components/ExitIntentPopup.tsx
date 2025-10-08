import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { X, Clock, TrendingUp, Gift, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('exit-intent-shown');
    if (hasSeenPopup) {
      setHasShown(true);
      return;
    }

    let mouseY = 0;
    const handleMouseLeave = (e: MouseEvent) => {
      mouseY = e.clientY;
      if (mouseY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        localStorage.setItem('exit-intent-shown', 'true');
        
        // Track exit intent
        trackEvent('exit_intent_popup_show', {
          page: window.location.pathname,
          time_on_page: Math.round((Date.now() - window.performance.timing.navigationStart) / 1000)
        });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    trackEvent('exit_intent_popup_submit', {
      user_name: formData.name,
      user_email: formData.email,
      service_interest: formData.service,
      page: window.location.pathname
    });

    toast({
      title: "🎉 Don't Miss Out!",
      description: "Check your email for your exclusive 47-page guide to create a website that converts.",
    });

    // Simulate sending the guide
    setTimeout(() => {
      console.log(`Sending lead generation guide to ${formData.email}`);
    }, 1000);

    setIsVisible(false);
    setFormData({ name: "", email: "", service: "" });
  };

  const handleClose = () => {
    setIsVisible(false);
    trackEvent('exit_intent_popup_close', {
      page: window.location.pathname
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative max-w-md w-full"
          >
            <Card className="bg-white shadow-2xl border-0">
              <CardContent className="p-0">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-lg relative">
                  <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Wait! Don't Leave Empty Handed</h2>
                      <p className="text-green-100 text-sm">Get your free guide before you go</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center space-x-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium mb-3">
                      <Clock className="w-3 h-3" />
                      <span>Limited Time Offer</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-1">Get Our Exclusive Guide:</h3>
                    <p className="text-base font-semibold text-green-600 mb-1">"How to Create a Website That Converts"</p>
                    <p className="text-gray-600 text-xs">
                      Join 2,500+ business owners who've already downloaded this proven system
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center space-x-1 text-xs">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span>Higher Conversions</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <Clock className="w-3 h-3 text-green-600" />
                      <span>30-Day Results</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <Gift className="w-3 h-3 text-green-600" />
                      <span>47 Pages</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <ArrowRight className="w-3 h-3 text-green-600" />
                      <span>Step-by-Step</span>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <Input
                        type="text"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full text-sm py-2"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full text-sm py-2"
                      />
                    </div>
                    <div>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Your Business Type *</option>
                        <option value="law-firm">Law Firm</option>
                        <option value="consulting">Consulting Agency</option>
                        <option value="financial">Financial Services</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="luxury">Luxury Brand</option>
                        <option value="other">Other Professional Service</option>
                      </select>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 text-sm"
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      Get My Free Guide Now
                    </Button>
                  </form>

                  <div className="text-center mt-3">
                    <p className="text-xs text-gray-500">
                      🔒 100% Free • No Spam • Unsubscribe Anytime
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
