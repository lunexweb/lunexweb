import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail } from "lucide-react";

export const ContactSection = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+27789992503";
    const message = "Hello! I'm interested in your web development services. I'm ready to get started - your team is waiting to help me!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneClick = () => {
    window.open('tel:+27789992503');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@lunexweb.com');
  };

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Contact us today and let's build something amazing together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </Button>
            
            <Button
              onClick={handlePhoneClick}
              variant="outline"
              size="lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us
            </Button>
            
            <Button
              onClick={handleEmailClick}
              variant="outline"
              size="lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
