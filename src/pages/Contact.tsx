import { Navigation } from "@/components/Navigation";
import { ContactSection } from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth overflow-x-hidden">
      <Navigation />
      
      {/* Page Header */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759870800/roberto-nickson-NVHDSYqBZCE-unsplash_yuavfj.jpg')"
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 space-y-3 sm:space-y-4 pt-20 sm:pt-24 w-full overflow-hidden">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 fixed top-20 left-4 z-30 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg sm:relative sm:top-auto sm:left-auto sm:bg-transparent sm:backdrop-blur-none sm:px-0 sm:py-0 sm:rounded-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>
          
          <div className="text-xs sm:text-sm text-white/80 tracking-widest uppercase">Get in Touch</div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-tight text-white max-w-4xl mx-auto">
            Contact Lunexweb
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed px-4">
            Ready to transform your digital presence? Our professional team is here 
            to create a premium website that reflects your brand's excellence. 
            Contact us today for a consultation.
          </p>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Phone</h3>
                <a href="tel:+27789992503" className="text-muted-foreground hover:text-foreground transition-colors underline hover:no-underline cursor-pointer">+27 78 999 2503</a>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Email</h3>
                <a href="mailto:info@lunexweb.com" className="text-muted-foreground hover:text-foreground transition-colors underline hover:no-underline cursor-pointer">info@lunexweb.com</a>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Address</h3>
                <p className="text-muted-foreground text-sm">
                  Kempton Park<br />
                  Johannesburg, South Africa
                </p>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Office Hours</h3>
                <p className="text-muted-foreground text-sm">
                  Mon-Fri: 8:00 AM - 5:00 PM<br />
                  <span className="text-red-500">Closed: Weekends & Public Holidays</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Let's create something exceptional together. Every great business deserves 
                a website that reflects their excellence and drives real results.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Start Your Project Today</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ready to transform your digital presence? Let's discuss your project 
                and create a custom solution that perfectly fits your business goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-white text-lg px-10 py-6"
                  style={{ backgroundColor: '#22C55E' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#16A34A'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#22C55E'}
                  asChild
                >
                  <Link to="/services">View Our Services</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6"
                  asChild
                >
                  <Link to="/about">Learn About Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;