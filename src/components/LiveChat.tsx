import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LiveChat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+27789992503";
    const message = "Hello! I'm interested in your web development services. I'm ready to get started - your team is waiting to help me!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Enhanced visibility control
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Stop pulse animation after 10 seconds
      setTimeout(() => setShowPulse(false), 10000);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* WhatsApp Button with Enhanced Floating */}
      <motion.div
        className="floating-whatsapp floating-button-container"
        initial={{ scale: 0, opacity: 0, y: 100 }}
        animate={{ 
          scale: isVisible ? 1 : 0, 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : 100 
        }}
        transition={{ 
          delay: 0.8, 
          type: "spring", 
          stiffness: 400,
          damping: 25
        }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)'
        }}
      >
        {/* Pulse Ring Animation */}
        {showPulse && (
          <motion.div
            className="absolute inset-0 rounded-full bg-green-500 opacity-75"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Main Button */}
        <motion.div
          onClick={handleWhatsAppClick}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-600 hover:bg-green-700 floating-button-shadow transition-all duration-300 cursor-pointer flex items-center justify-center group"
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          }}
          title="Chat with us on WhatsApp - We respond instantly!"
        >
          {/* WhatsApp Icon */}
          <motion.svg 
            className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </motion.svg>

          {/* Hover Tooltip */}
          <motion.div
            className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 pointer-events-none"
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            Chat on WhatsApp
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};
