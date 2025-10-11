import { Button } from "@/components/ui/button";
import homeImg3 from "@/assets/home-img-3.webp";

export const WhyLunexweb = () => {
  const benefits = [
    {
      title: "Expert Web Development Team",
      description: "Our professional developers provide the highest quality web development services with extensive expertise in modern technologies, responsive design, and cutting-edge frameworks to deliver exceptional digital solutions."
    },
    {
      title: "Strategic Digital Approach",
      description: "We develop comprehensive web strategies for corporate websites, e-commerce platforms, and custom applications designed to achieve your business objectives and drive measurable growth and success."
    },
    {
      title: "Premium Quality Standards",
      description: "We deliver premium web development services that reflect sophistication, trust, and excellence. Our focus on high-end professional clients ensures exceptional quality, performance, and user experience in every project."
    },
    {
      title: "Comprehensive Digital Solutions",
      description: "We provide excellent, sophisticated and efficient web development services including custom web design, SEO optimization, performance tuning, and ongoing support to enhance your brand presence and drive business success."
    }
  ];

  return (
    <section id="about" className="py-20 bg-card overflow-x-hidden" style={{ maxWidth: '100vw' }}>
      <div className="container mx-auto px-6">
        <div className="space-y-16">
          <div>
            <div className="text-center space-y-6">
              <div className="text-sm text-muted-foreground tracking-widest uppercase">Why Choose Lunexweb</div>
              <h2 className="text-3xl md:text-4xl font-light max-w-4xl mx-auto leading-relaxed">
                Premium Web Development Excellence with Unparalleled Client Service & Results-Driven Digital Solutions
              </h2>
              <div className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                <p>We deliver exceptional web development services with unwavering commitment to client success, innovative technology solutions, and measurable business growth across South Africa.</p>
              </div>
              <div>
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 text-lg px-8 py-6"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact a Professional
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-12">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-light text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            <div 
              className="sticky top-24"
            >
              <div className="relative overflow-hidden rounded-lg group">
                <img 
                  src={homeImg3} 
                  alt="Lunexweb Development Team"
                  className="w-full h-auto rounded-lg transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
