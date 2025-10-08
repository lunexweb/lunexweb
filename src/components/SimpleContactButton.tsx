import { useState, useEffect } from "react";
import { Phone, Mail, Plus, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export const SimpleContactButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { scrollY } = useScroll();
  
  // Hide button when at top of page, show when scrolled
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const scale = useTransform(scrollY, [0, 100], [0.8, 1]);

  useEffect(() => {
    // Show notification after 5 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handlePhoneClick = () => {
    window.open('tel:+27789992503');
    setIsExpanded(false);
  };

  const handleEmailClick = () => {
    window.open('mailto:info@lunexweb.com');
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    setShowNotification(false); // Hide notification when opened
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <motion.div
        className="flex flex-col items-start space-y-3"
        style={{ opacity, scale }}
        initial={{ opacity: 0, scale: 0.8, x: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Notification Badge */}
        {showNotification && !isExpanded && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            !
          </motion.div>
        )}

        {/* Expanded options */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, y: 10, scale: 0.8, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col space-y-3"
            >
              {/* Email */}
              <motion.div
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <motion.button
                  onClick={handleEmailClick}
                  className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                  aria-label="Send Email"
                  whileHover={{
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)"
                  }}
                >
                  <Mail className="w-5 h-5" />
                  
                  {/* Tooltip */}
                  <motion.div
                    className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Send Email
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-r-4 border-r-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </motion.div>
                </motion.button>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <motion.button
                  onClick={handlePhoneClick}
                  className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                  aria-label="Call Now"
                  whileHover={{
                    boxShadow: "0 10px 25px rgba(34, 197, 94, 0.4)"
                  }}
                >
                  <Phone className="w-5 h-5" />
                  
                  {/* Tooltip */}
                  <motion.div
                    className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Call Now
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-r-4 border-r-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </motion.div>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Plus Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <motion.button
            onClick={toggleExpanded}
            className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            aria-label={isExpanded ? "Close Contact Options" : "Open Contact Options"}
            whileHover={{
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
            }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isExpanded ? (
                <X className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </motion.div>
            
            {/* Tooltip */}
            <motion.div
              className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap"
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? "Close Contact Options" : "Contact Options"}
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-r-4 border-r-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </motion.div>
          </motion.button>

          {/* Pulse animation when notification is active */}
          {showNotification && !isExpanded && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
