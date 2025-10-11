import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Star, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const Packages = () => {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth overflow-x-hidden">
      <Navigation />
      
      {/* Page Header */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759870170/coinstash-australia-51UkMs38ixg-unsplash_qi4u0k.jpg')"
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
          
          <div className="text-xs sm:text-sm text-white/80 tracking-widest uppercase">Investment in Excellence</div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-tight text-white max-w-4xl mx-auto">
            Your Website is an Investment
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed px-4">
            Before we quote, we first understand your business. We believe that a website is not just a cost—it's a strategic investment in your future growth. Every project we deliver is crafted to generate measurable returns, attract premium clients, and establish your digital presence as a competitive advantage.
          </p>
        </div>
      </section>

      {/* Packages Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              
              {/* Starter Package */}
              <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Starter</h3>
                    <p className="text-muted-foreground mt-2">Essential digital presence</p>
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    R3,500
                    <span className="text-lg font-normal text-muted-foreground"> to R14,999</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Custom quote based on your specific needs
                  </div>
                </div>
                
                <ul className="space-y-4 mt-8 flex-grow">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Perfect for small businesses starting online</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Build professional credibility instantly</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Attract local customers and build trust</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Generate leads while you sleep</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Fast launch to start growing quickly</span>
                  </li>
                </ul>
                
                <Button className="w-full mt-8" variant="outline">
                  Contact a Professional
                </Button>
              </div>

              {/* Premium Package */}
              <div className="bg-card border-2 border-green-500 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 relative flex flex-col">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
                
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Star className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Premium</h3>
                    <p className="text-muted-foreground mt-2">Strategic growth platform</p>
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    R15,000
                    <span className="text-lg font-normal text-muted-foreground"> to R59,999</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Tailored solution for your business goals
                  </div>
                </div>
                
                <ul className="space-y-4 mt-8 flex-grow">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Ideal for growing businesses scaling up</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Outperform competitors in your industry</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Convert 3x more visitors into clients</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Scale your business operations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Data-driven growth insights</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Strategic delivery timeline</span>
                  </li>
                </ul>
                
                <Button className="w-full mt-8 text-white" style={{ backgroundColor: '#22C55E' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#16A34A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#22C55E'}>
                  Contact a Professional
                </Button>
              </div>

              {/* Luxury Package */}
              <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Crown className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Luxury</h3>
                    <p className="text-muted-foreground mt-2">Complete digital transformation</p>
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    R60,000
                    <span className="text-lg font-normal text-muted-foreground">+</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Enterprise-grade solutions
                  </div>
                </div>
                
                <ul className="space-y-4 mt-8 flex-grow">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Perfect for premium enterprises</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Dominate your market completely</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Generate multiple revenue streams</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Automate your entire business process</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">White-glove service & support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">Premium delivery experience</span>
                  </li>
                </ul>
                
                <Button className="w-full mt-8" variant="outline">
                  Contact a Professional
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 sm:py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-tight">
                  How This Investment Will Benefit You and Your Business
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed px-2">
                  Your website is not just a cost - it's an investment that makes you money. Here's how it helps your business:
                </p>
              </div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 text-left">
              <div className="space-y-6">
                <div className="space-y-3 p-4 sm:p-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">You Make More Money</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    A good website brings you 3-5 times more money in the first year. Our clients get 150% more customers and 200% more sales.
                  </p>
                </div>
                <div className="space-y-3 p-4 sm:p-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">Better Customers Pay More</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    When your website looks professional, rich customers will pay you 2-3 times more money. This directly increases your profits.
                  </p>
                </div>
                <div className="space-y-3 p-4 sm:p-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">Beat Your Competition</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    While your competitors have bad websites, you will look like the best choice. Customers will pick you over them.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3 p-4 sm:p-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">Save Time and Work Less</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Our websites do the work for you. You save 20+ hours every month and can focus on making money instead of paperwork.
                  </p>
                </div>
                <div className="space-y-3 p-4 sm:p-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">We Help You Forever</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    We don't just build your website and leave. We keep helping you grow your business and make your website better over time.
                  </p>
                </div>
                <div className="space-y-3 p-4 sm:p-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">We Work With Your Budget</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Whether you have R5,000 or R100,000, we create the best website for your money. We make sure you get the most value.
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
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Don't let your competitors get ahead. Every day you wait is a day they're capturing your potential clients. 
                Let's create a digital presence that positions you as the premium choice in your industry.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Get Your Custom Quote Today</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide personalized quotes based on your specific budget and requirements. 
                Whether you have R5,000 or R100,000 to invest, we'll create the best possible solution 
                that maximizes your ROI and positions your business for growth.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 py-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-foreground">Free</div>
                  <div className="text-sm text-muted-foreground">Consultation & Strategy</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-foreground">Custom</div>
                  <div className="text-sm text-muted-foreground">Quote Based on Your Budget</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-foreground">Instant</div>
                  <div className="text-sm text-muted-foreground">Response - Our Team is Waiting</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-white text-lg px-10 py-6"
                  style={{ backgroundColor: '#22C55E' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#16A34A'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#22C55E'}
                  asChild
                >
                  <Link to="/contact">Get My Custom Quote</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6"
                  asChild
                >
                  <Link to="/services">See Our Portfolio</Link>
                </Button>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Limited Availability:</strong> We only take on 8 new clients per month to ensure quality and attention to detail.
              </p>
              <p className="text-sm text-muted-foreground">
                Join the premium brands that trust Lunexweb for their digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center text-muted-foreground space-y-2">
          <p>© {new Date().getFullYear()} Lunexweb. All rights reserved.</p>
          <p className="text-sm">
            Coded by{" "}
            <a 
              href="https://www.lunexweb.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors underline"
            >
              Lunexweb
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Packages;
