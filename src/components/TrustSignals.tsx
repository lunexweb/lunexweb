import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Clock, Star, Zap, Globe } from 'lucide-react';

export const TrustSignals = () => {
  const signals = [
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "2,500+ Happy Clients",
      description: "Trusted by businesses across South Africa"
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: "Fast Response",
      description: "Quick turnaround times and efficient project delivery"
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Fast Turnaround",
      description: "Professional websites delivered in 4-8 weeks"
    },
    {
      icon: <Globe className="w-6 h-6 text-green-600" />,
      title: "SEO Optimized",
      description: "Built to rank high on Google and drive organic traffic"
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      title: "5-Star Rated",
      description: "Consistently rated 5 stars by our clients"
    }
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-slate-900 mb-4">
              Why Businesses Choose <span className="text-green-600">Lunexweb</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We've built our reputation on delivering exceptional results and outstanding customer service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signals.map((signal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:bg-slate-50 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {signal.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{signal.title}</h3>
                <p className="text-slate-600 text-sm">{signal.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Client Logos Section */}
          <div className="mt-16 text-center">
            <p className="text-sm text-slate-500 mb-8">Trusted by leading businesses across South Africa</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-slate-400">Law Firms</div>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="text-2xl font-bold text-slate-400">Consulting Agencies</div>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="text-2xl font-bold text-slate-400">Financial Services</div>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="text-2xl font-bold text-slate-400">Real Estate</div>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="text-2xl font-bold text-slate-400">Luxury Websites</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
