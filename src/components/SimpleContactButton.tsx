import { useState, useEffect } from "react";
import { Phone, Mail, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SimpleContactButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handlePhoneClick = () => {
    window.open('tel:+27789992503');
    setIsExpanded(false); // Close after action
  };

  const handleEmailClick = () => {
    window.open('mailto:info@lunexweb.com');
    setIsExpanded(false); // Close after action
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Enhanced visibility control
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="floating-contact floating-button-container"
      initial={{ scale: 0, opacity: 0, x: -100 }}
      animate={{ 
        scale: isVisible ? 1 : 0, 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : -100 
      }}
      transition={{ 
        delay: 1.2, 
        type: "spring", 
        stiffness: 400,
        damping: 25
      }}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9998,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      }}
    >
      <motion.div className="flex flex-col items-start space-y-3">
        {/* Expanded options */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, y: 20, scale: 0.8, x: -20 }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                damping: 20
              }}
              className="flex flex-col space-y-3"
            >
              {/* Email Button */}
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  onClick={handleEmailClick}
                  className="relative w-14 h-14 rounded-full border-2 border-blue-300 hover:border-blue-400 text-blue-600 hover:text-blue-700 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-blue-500/25"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2)'
                  }}
                  title="Send us an Email"
                >
                  <Mail className="w-6 h-6" />
                  
                  {/* Hover Tooltip */}
                  <motion.div
                    className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 pointer-events-none"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Send Email
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                  </motion.div>
                </button>
              </motion.div>

              {/* Phone Button */}
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  onClick={handlePhoneClick}
                  className="relative w-14 h-14 rounded-full border-2 border-green-300 hover:border-green-400 text-green-600 hover:text-green-700 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-green-500/25"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
                    boxShadow: '0 4px 16px rgba(34, 197, 94, 0.2)'
                  }}
                  title="Call us Now"
                >
                  <Phone className="w-6 h-6" />
                  
                  {/* Hover Tooltip */}
                  <motion.div
                    className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 pointer-events-none"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Call Now
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                  </motion.div>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Plus Button */}
        <motion.div
          whileHover={{ 
            scale: 1.1,
            rotate: 45,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={toggleExpanded}
            className="relative w-14 h-14 rounded-full border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 transition-all duration-300 flex items-center justify-center group floating-button-shadow"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)'
            }}
            title="Contact Options"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Plus className="w-6 h-6" />
            </motion.div>
            
            {/* Hover Tooltip */}
            <motion.div
              className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 pointer-events-none"
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              Contact Options
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
            </motion.div>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
