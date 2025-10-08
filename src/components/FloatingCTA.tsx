import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsVisible(scrollTop > 300); // Show after scrolling 300px
      setShowScrollTop(scrollTop > 500); // Show scroll to top after 500px
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePhoneClick = () => {
    trackEvent('floating_phone_click', {
      page: window.location.pathname,
      scroll_position: window.pageYOffset
    });
    window.open('tel:+27789992503');
  };

  const handleWhatsAppClick = () => {
    trackEvent('floating_whatsapp_click', {
      page: window.location.pathname,
      scroll_position: window.pageYOffset
    });
    const message = `Hi! I'm interested in premium web development services. Can you help me create a professional website?`;
    const whatsappUrl = `https://wa.me/27789992503?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailClick = () => {
    trackEvent('floating_email_click', {
      page: window.location.pathname,
      scroll_position: window.pageYOffset
    });
    window.open('mailto:info@lunexweb.com');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('scroll_to_top_click', {
      page: window.location.pathname
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    trackEvent('floating_cta_toggle', {
      expanded: !isExpanded,
      page: window.location.pathname
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="flex flex-col items-end space-y-3"
          >
            {/* Expanded options */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="flex flex-col space-y-2"
                >
                  {/* WhatsApp */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      size="sm"
                      className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
                      onClick={handleWhatsAppClick}
                      title="Chat on WhatsApp"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </Button>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      size="sm"
                      className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                      onClick={handleEmailClick}
                      title="Send Email"
                    >
                      <Mail className="w-5 h-5" />
                    </Button>
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      size="sm"
                      className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                      onClick={handlePhoneClick}
                      title="Call Now"
                    >
                      <Phone className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scroll to top button */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      size="sm"
                      className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 text-white shadow-lg"
                      onClick={handleScrollToTop}
                      title="Scroll to Top"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-xl font-semibold text-sm"
                onClick={toggleExpanded}
              >
                <span className="hidden sm:inline">Get Quote</span>
                <span className="sm:hidden">?</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
