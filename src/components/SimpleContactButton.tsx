import { useState } from "react";
import { Phone, Mail, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SimpleContactButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div className="absolute bottom-6 left-6 z-40">
      <motion.div
        className="flex flex-col items-start space-y-3"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 300 }}
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
                <button
                  onClick={handleEmailClick}
                  className="w-12 h-12 rounded-full border-2 border-blue-300 hover:border-blue-400 text-blue-600 hover:text-blue-700 transition-all duration-200 flex items-center justify-center"
                  title="Send Email"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  onClick={handlePhoneClick}
                  className="w-12 h-12 rounded-full border-2 border-green-300 hover:border-green-400 text-green-600 hover:text-green-700 transition-all duration-200 flex items-center justify-center"
                  title="Call Now"
                >
                  <Phone className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Plus Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={toggleExpanded}
            className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 transition-all duration-200 flex items-center justify-center"
            title="Contact Options"
          >
            <Plus className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
