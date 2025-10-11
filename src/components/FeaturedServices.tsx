import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Code, Monitor, Smartphone, Globe, Palette, Zap } from "lucide-react";
import { AnimatedSection, AnimatedText } from "./AnimatedSection";

export const FeaturedServices = () => {
  const services = [
    {
      icon: Code,
      title: "Custom Web Development",
      description: "Bespoke websites built with modern technologies, tailored to your business needs and brand identity.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Monitor,
      title: "Corporate Websites",
      description: "Professional websites for law firms, consulting agencies, and corporate organizations.",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first design ensuring your website looks perfect on all devices and screen sizes.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: Globe,
      title: "E-commerce Solutions",
      description: "Complete online stores and digital platforms for luxury websites and financial services.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <section className="py-20 bg-background overflow-x-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center space-y-6 mb-16">
              <div className="text-sm text-muted-foreground tracking-widest uppercase">Our Services</div>
              <h2 className="text-4xl md:text-5xl font-light">
                Premium Web Development Solutions
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We create sophisticated, modern websites that reflect excellence and trust for high-end professional clients.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.25, 0, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="bg-white border-0 shadow-card hover:shadow-card-hover transition-all duration-300 h-full group overflow-hidden">
                  <CardContent className="p-8 space-y-6 text-center h-full flex flex-col">
                    {/* Icon */}
                    <div className={`w-20 h-20 mx-auto rounded-2xl ${service.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className={`w-10 h-10 ${service.iconColor}`} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    
                    {/* Hover Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 group border-2 hover:bg-gray-50"
                  asChild
                >
                  <Link to="/services">
                    View Our Services
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};