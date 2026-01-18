"use client";

import { motion } from "framer-motion";
import { Shield, Headphones, Truck, Award } from "lucide-react";

export function TrustSection() {
  const features = [
    { 
      title: "Quality Assured", 
      desc: "ISO certified products",
      icon: Shield,
      color: "blue"
    },
    { 
      title: "Expert Support", 
      desc: "Technical assistance",
      icon: Headphones,
      color: "emerald"
    },
    { 
      title: "Fast Delivery", 
      desc: "Nationwide coverage",
      icon: Truck,
      color: "violet"
    },
    { 
      title: "Trusted Partner", 
      desc: "Healthcare excellence",
      icon: Award,
      color: "amber"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50/30 to-white border-t border-slate-100 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Card */}
                <div className="relative bg-white rounded-2xl p-6 text-center space-y-3 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 h-full">
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                  
                  {/* Icon container with enhanced styling */}
                  <div className="relative mx-auto w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                    <div className="absolute inset-0 rounded-xl bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
                    <Icon className="w-7 h-7 text-blue-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Content */}
                  <div className="relative space-y-2">
                    <h4 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Optional: Trust badge or additional info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm text-slate-500 font-medium inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Trusted by healthcare professionals nationwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}