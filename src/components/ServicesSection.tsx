'use client';

import { motion } from "framer-motion";
import { Microscope, Stethoscope, ScanLine, Package, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Microscope,
    title: "Cancer Treatment",
    description: "Advanced oncology equipment and technologies including radiation therapy, chemotherapy administration systems, and diagnostic imaging solutions.",
    color: "primary",
  },
  {
    icon: Stethoscope,
    title: "Urology Treatment",
    description: "Cutting-edge urological technologies featuring lithotripsy systems, endoscopy equipment, laser technologies, and diagnostic tools.",
    color: "accent",
  },
  {
    icon: ScanLine,
    title: "Medical Imaging",
    description: "State-of-the-art diagnostic imaging systems including CT scanners, MRI systems, ultrasound equipment, and PACS solutions.",
    color: "primary",
  },
  {
    icon: Package,
    title: "Medical Disposables",
    description: "Quality medical consumables and supplies including surgical disposables, infection control products, and laboratory consumables.",
    color: "accent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-padding container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-gold/10 to-primary/10 border border-gold/20 text-sm font-medium mb-4">
            <span className="bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent font-semibold">Our Services</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Comprehensive Medical Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From advanced diagnostics to surgical equipment, we provide complete healthcare solutions for modern medical facilities.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="group relative glass-card rounded-2xl p-8 hover-lift cursor-pointer overflow-hidden hover:border-gold/30 transition-all duration-300"
              variants={itemVariants}
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                service.color === "primary" 
                  ? "from-gold/5 via-primary/5 to-primary/0" 
                  : "from-gold/5 via-accent/5 to-accent/0"
              } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-2xl mb-6 transition-all duration-300 ${
                  service.color === "primary" 
                    ? "bg-gradient-to-br from-gold/10 to-primary/10 text-primary group-hover:from-gold/20 group-hover:to-primary/20" 
                    : "bg-gradient-to-br from-gold/10 to-accent/10 text-accent group-hover:from-gold/20 group-hover:to-accent/20"
                }`}>
                  <service.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <a
                  href="#"
                  className="inline-flex items-center gap-2 font-medium bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent group-hover:gap-4 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 text-gold" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
