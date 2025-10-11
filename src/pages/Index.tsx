import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ServiceSections } from "@/components/ServiceSections";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { WhyLunexweb } from "@/components/WhyLunexweb";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TrustSignals } from "@/components/TrustSignals";
import { 
  SimpleWebsiteAuditMagnet, 
  SimpleLeadGenerationGuide, 
  SimpleROICalculator, 
  SimpleWebsiteTemplate 
} from "@/components/LeadMagnetSimple";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth overflow-x-hidden">
      <ScrollProgress />
      <Navigation />
      <main className="hide-scrollbar">
        <section id="home">
          <Hero />
        </section>
        <ServiceSections />
        <section id="why-choose-us">
          <WhyChooseUsSection />
        </section>
        <section id="about">
          <WhyLunexweb />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        
        {/* Trust Signals Section */}
        <TrustSignals />
        
        {/* Lead Magnets Section */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Free Premium Resources
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
                  Get Your Business Online <span className="text-green-600">Faster</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Download our proven systems and tools to improve your website conversions immediately. 
                  Join <span className="font-semibold text-slate-900">2,500+ business owners</span> who've already transformed their online presence.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SimpleWebsiteAuditMagnet />
                <SimpleLeadGenerationGuide />
                <SimpleROICalculator />
                <SimpleWebsiteTemplate />
              </div>
            </div>
          </div>
        </section>
        
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Lunexweb. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
