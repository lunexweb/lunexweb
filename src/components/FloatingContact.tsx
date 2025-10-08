import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingContact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsVisible(scrollTop > 300); // Show after scrolling 300px
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePhoneClick = () => {
    window.open('tel:+27789992503');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@lunexweb.com');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 left-6 z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="flex flex-col items-start space-y-3"
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
                  {/* Email */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-12 h-12 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800 p-0"
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
                      variant="ghost"
                      className="w-12 h-12 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800 p-0"
                      onClick={handlePhoneClick}
                      title="Call Now"
                    >
                      <Phone className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main + Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="ghost"
                className="w-14 h-14 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800 p-0"
                onClick={toggleExpanded}
              >
                {isExpanded ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Plus className="w-6 h-6" />
                )}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
