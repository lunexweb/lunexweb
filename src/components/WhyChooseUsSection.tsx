import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedText } from "./AnimatedSection";
import { Shield, Zap, Target, Award, Users, TrendingUp } from "lucide-react";

export const WhyChooseUsSection = () => {
  const values = [
    {
      icon: Shield,
      title: "Premium Quality",
      description: "We deliver exceptional web solutions that reflect your brand's excellence and professional standards.",
      color: "bg-blue-500"
    },
    {
      icon: Zap,
      title: "Performance Focused",
      description: "High-performing websites optimized for speed, SEO, and conversion to drive your business growth.",
      color: "bg-green-500"
    },
    {
      icon: Target,
      title: "Industry Specialized",
      description: "Deep expertise in law firms, consulting, financial services, real estate, and luxury brands.",
      color: "bg-purple-500"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Track record of successful projects that exceed client expectations and deliver measurable ROI.",
      color: "bg-orange-500"
    },
    {
      icon: Users,
      title: "Client Partnership",
      description: "Long-term partnerships focused on your success with dedicated support and strategic guidance.",
      color: "bg-red-500"
    },
    {
      icon: TrendingUp,
      title: "Growth Driven",
      description: "Data-driven strategies and continuous optimization to maximize your digital presence and growth.",
      color: "bg-indigo-500"
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-slate-900 text-white overflow-x-hidden" style={{ maxWidth: '100vw' }}>
      <div className="container mx-auto px-6">
        <div className="space-y-16">
          <AnimatedSection>
            <div className="text-center space-y-6">
              <div className="text-sm text-slate-400 tracking-widest uppercase">Why Choose Lunexweb</div>
              <AnimatedText className="text-4xl md:text-5xl font-light text-white">
                <h2>Premium Web Development Excellence & Strategic Digital Partnerships</h2>
              </AnimatedText>
              <div className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                <p>Delivering exceptional web development services with proven results for law firms, consulting agencies, financial services, real estate companies, and luxury brands across South Africa.</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800 border border-slate-700 shadow-xl hover:shadow-2xl hover:bg-slate-750 transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center space-y-6 h-full flex flex-col">
                    <div className={`w-16 h-16 mx-auto ${value.color} text-white rounded-full flex items-center justify-center`}>
                      <value.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg sm:text-xl font-medium text-white leading-tight">{value.title}</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed flex-grow">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Commitment Section */}
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center space-y-6 pt-8">
              <h3 className="text-xl sm:text-2xl font-light text-white leading-tight">Our Commitment to Web Development Excellence</h3>
              <div className="space-y-4">
                <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
                  We deliver premium web development solutions that reflect your brand's excellence and drive measurable business growth. 
                  Our specialized approach in custom web design, responsive development, and digital strategy ensures that every project exceeds expectations while maintaining the highest standards of quality and performance.
                </p>
                <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
                  From initial web strategy and design consultation to ongoing SEO optimization and digital marketing, we partner with you to achieve your digital goals and establish a strong online presence that converts visitors into clients and drives revenue growth.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
