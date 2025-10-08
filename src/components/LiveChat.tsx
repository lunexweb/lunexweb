import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const LiveChat = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+27789992503"; // Remove spaces and format for WhatsApp
    const message = "Hello! I'm interested in your web development services. Can you help me?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 300 }}
      >
        <Button
          onClick={handleWhatsAppClick}
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
          title="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </motion.div>
    </>
  );
};
