import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ServiceSections } from "@/components/ServiceSections";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { WhyLunexweb } from "@/components/WhyLunexweb";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { 
  SimpleWebsiteAuditMagnet, 
  SimpleLeadGenerationGuide, 
  SimpleROICalculator, 
  SimpleWebsiteTemplate 
} from "@/components/LeadMagnetSimple";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Navigation />
      <main className="snap-container hide-scrollbar">
        <section id="home" className="snap-start">
          <Hero />
        </section>
        <ServiceSections />
        <section id="why-choose-us" className="snap-start">
          <WhyChooseUsSection />
        </section>
        <section id="about" className="snap-start">
          <WhyLunexweb />
        </section>
        <section id="testimonials" className="snap-start">
          <Testimonials />
        </section>
        
        {/* Lead Magnets Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
                  Free Resources to Get You Started
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Download our proven systems and tools to improve your website conversions immediately. 
                  Join 2,500+ business owners who've already transformed their online presence.
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
        
        <section id="contact" className="snap-start">
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
