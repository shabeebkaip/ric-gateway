'use client';

import { motion } from "framer-motion";
import { Microscope, Stethoscope, ScanLine, Package, ArrowRight, Zap } from "lucide-react";

const services = [
  {
    icon: Microscope,
    title: "Cancer Treatment",
    description: "Advanced oncology equipment and technologies including radiation therapy, chemotherapy administration systems, and diagnostic imaging solutions.",
    number: "01",
    stats: { devices: "50+", facilities: "40+" },
  },
  {
    icon: Stethoscope,
    title: "Urology Treatment",
    description: "Cutting-edge urological technologies featuring lithotripsy systems, endoscopy equipment, laser technologies, and diagnostic tools.",
    number: "02",
    stats: { devices: "30+", facilities: "35+" },
  },
  {
    icon: ScanLine,
    title: "Medical Imaging",
    description: "State-of-the-art diagnostic imaging systems including CT scanners, MRI systems, ultrasound equipment, and PACS solutions.",
    number: "03",
    stats: { devices: "60+", facilities: "50+" },
  },
  {
    icon: Package,
    title: "Medical Disposables",
    description: "Quality medical consumables and supplies including surgical disposables, infection control products, and laboratory consumables.",
    number: "04",
    stats: { products: "200+", facilities: "80+" },
  },
];

export const ServicesSectionMinimal = () => {
  return (
    <section id="services" className="section-padding bg-background relative overflow-hidden">
      {/* Minimal Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container-padding container mx-auto relative z-10">
        {/* Header - Centered */}
        <motion.div
          className="text-center mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/5 border border-gold/20 mb-6">
            <Zap className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold text-gold">Our Expertise</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Medical Solutions </span>
            <br />
            <span className="bg-gradient-to-r from-gold via-primary to-accent bg-clip-text text-transparent">
              That Matter
            </span>
          </h2>

          <p className="text-xl text-muted-foreground">
            Four core specialties, endless possibilities for better healthcare
          </p>
        </motion.div>

        {/* Services - Horizontal Layout */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="relative">
                {/* Service Card */}
                <div className="grid md:grid-cols-12 gap-6 items-center p-6 md:p-8 rounded-2xl border-2 border-border hover:border-gold/30 bg-card transition-all duration-500 hover:shadow-xl">
                  {/* Number Badge */}
                  <div className="md:col-span-1 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/10 to-primary/10 flex items-center justify-center group-hover:from-gold/20 group-hover:to-primary/20 transition-all duration-300">
                      <span className="text-2xl font-bold bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">
                        {service.number}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="md:col-span-2 flex items-center justify-center md:justify-start">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/10 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <service.icon className="w-10 h-10 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-6 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Stats & CTA */}
                  <div className="md:col-span-3 flex flex-col items-center md:items-end gap-4">
                    <div className="flex gap-6 text-center">
                      {Object.entries(service.stats).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-2xl font-bold bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">
                            {value}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">{key}</p>
                        </div>
                      ))}
                    </div>
                    
                    <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold transition-colors group/btn">
                      Explore
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Connector Line */}
                {index < services.length - 1 && (
                  <div className="hidden md:flex justify-center py-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-gold/50 to-primary/50" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-gold/5 via-primary/5 to-accent/5 border border-gold/20">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Need a Custom Solution?
              </h3>
              <p className="text-muted-foreground">
                Let's discuss how we can meet your specific healthcare needs
              </p>
            </div>
            <button className="whitespace-nowrap px-8 py-4 rounded-xl bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
