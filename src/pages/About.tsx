import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, Users, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { icon: Clock, value: "5+", label: "Years of Excellence" },
    { icon: Users, value: "200+", label: "Websites Delivered" },
    { icon: Award, value: "100%", label: "Client Satisfaction" },
    { icon: Shield, value: "Premium", label: "Quality Standards" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <Navigation />
      
      {/* Page Header */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759871634/benjamin-child-GWe0dlVD9e0-unsplash_yukeab.jpg')"
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 space-y-3 sm:space-y-4 pt-20 sm:pt-24">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 fixed top-20 left-4 z-30 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg sm:relative sm:top-auto sm:left-auto sm:bg-transparent sm:backdrop-blur-none sm:px-0 sm:py-0 sm:rounded-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>
          
          <div className="text-xs sm:text-sm text-white/80 tracking-widest uppercase">About Lunexweb</div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-tight text-white max-w-4xl mx-auto">
            Premium Web Development Excellence
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed px-4">
            Lunexweb delivers exceptional web development services 
            for high-end professional clients in South Africa and internationally, 
            committed to creating sophisticated digital experiences.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-foreground/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-foreground" />
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-light text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light">
                About Lunexweb
              </h2>
              <div className="space-y-6 text-left max-w-3xl mx-auto">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe a website is more than design — it's the digital heartbeat of a business.
                  It's where your story, strategy, and purpose come together to move people to action.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Lunexweb, we don't use templates. Every website we build is custom coded from the ground up — crafted to reflect the soul of your brand and engineered to perform.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We blend design, marketing, and technology into one seamless experience. Every pixel, every word, every interaction is intentional — created to help your business grow, stand out, and be remembered.
                </p>
                <div className="space-y-4 pt-4">
                  <p className="text-lg font-medium text-foreground">
                    Our mission is simple:
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed italic">
                    To build websites that feel alive — websites that think, speak, and sell for you.
                  </p>
                </div>
                <div className="space-y-2 pt-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    This is digital craftsmanship for brands that refuse to be ordinary.
                  </p>
                  <p className="text-lg font-medium text-foreground">
                    This is Lunexweb.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light">
                Why Choose Lunexweb?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're not just web developers—we're your digital partners in growth. 
                Here's what makes us different:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">Premium Quality</h3>
                  <p className="text-muted-foreground">
                    Every website we create is crafted with attention to detail and built to last. 
                    We don't do quick fixes—we build digital foundations that grow with your business.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">Client-Focused Approach</h3>
                  <p className="text-muted-foreground">
                    Before we start coding, we understand your business, your goals, and your customers. 
                    This means every decision we make is designed to help you succeed.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">Modern Technology</h3>
                  <p className="text-muted-foreground">
                    We use the latest web technologies to ensure your website is fast, secure, 
                    and ready for the future. Your investment today will serve you for years to come.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">Proven Results</h3>
                  <p className="text-muted-foreground">
                    We've helped hundreds of businesses establish their digital presence. 
                    Our clients see real results: more leads, better conversions, and stronger brands.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-light">
                Ready to Work Together?
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
                  <Link to="/contact">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                  className="text-lg px-10 py-6"
                asChild
              >
                  <Link to="/packages">View Packages</Link>
              </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;