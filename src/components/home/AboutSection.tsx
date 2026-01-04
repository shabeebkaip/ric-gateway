'use client';

import { motion } from "framer-motion";
import { CheckCircle2, Building2, Users2, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Building2,
    title: `${new Date().getFullYear() - 1985} Years of Trusted Service`,
    description: "Established in 1985, we bring decades of experience in medical equipment distribution and healthcare solutions.",
  },
  {
    icon: Users2,
    title: "International Partnerships",
    description: "Strategic partnerships with 8+ global leaders in medical technology ensure access to world-class equipment.",
  },
  {
    icon: Headphones,
    title: "Comprehensive Support",
    description: "From installation to maintenance, our dedicated team provides complete after-sales support.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-card">
      <div className="container-padding container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              About RIC
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Pioneering Healthcare Excellence in{" "}
              <span className="gradient-text">Saudi Arabia</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Riyadh International Corporation (RIC) has been at the forefront of medical equipment distribution since 1985. We are committed to advancing healthcare through innovative technologies and trusted partnerships.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our mission is to inspire hope and improve quality of life by offering verifiable, effective professional solutions that ensure partner satisfaction. With ISO certification and SFDA approvals, we maintain the highest standards in everything we do.
            </p>

            <div className="space-y-4 mb-8">
              {["ISO Certified Operations", "SFDA Approved Products", "24/7 Technical Support", "Nationwide Coverage"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="p-3">
              Learn More About Us
            </Button>
          </motion.div>

          {/* Right Features */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-card rounded-2xl p-6 hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
