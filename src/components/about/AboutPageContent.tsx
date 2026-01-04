'use client';

import { motion } from "framer-motion";
import { CheckCircle2, Award, TrendingUp, Shield, Heart, Eye, Target, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { companyStats, companyFeatures, companyValues } from "@/lib/data";

const iconMap: Record<string, any> = {
  Award,
  Shield,
  Headphones,
  TrendingUp,
  Eye,
  Target,
  Heart,
};

const stats = [
  {
    number: `${new Date().getFullYear() - companyStats.yearsFounded}+`,
    label: "Years of Excellence",
    description: `Since ${companyStats.yearsFounded}`,
  },
  {
    number: `${companyStats.partnersCount}+`,
    label: "Global Partners",
    description: "Worldwide manufacturers",
  },
  {
    number: companyStats.categoriesCount.toString(),
    label: "Product Categories",
    description: "Specialized solutions",
  },
  {
    number: companyStats.support,
    label: "Support",
    description: "Technical assistance",
  },
];

export const AboutPageContent = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container-padding container mx-auto">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-gold/10 to-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
              About RIC
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Pioneering <span className="gradient-text">Healthcare Excellence</span>
              <br />Since 1985
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Riyadh International Corporation (RIC) has been at the forefront of medical equipment distribution in Saudi Arabia for over four decades, bringing world-class healthcare solutions to medical facilities nationwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container-padding container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 glass-card rounded-2xl"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container-padding container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Four Decades of Trusted Healthcare Solutions
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Since our establishment in 1985, RIC has been dedicated to advancing healthcare in Saudi Arabia through innovative medical equipment and trusted partnerships with global manufacturers.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We distribute world-class medical equipment across four specialized categories: Cancer Treatment, Urology, Medical Imaging, and Disposables. Our partnerships with leading international manufacturers ensure that healthcare facilities across Saudi Arabia have access to cutting-edge technology.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                With ISO certification and SFDA approval for all our products, we maintain the highest standards in quality, safety, and reliability. Our dedicated team provides comprehensive support from installation to ongoing maintenance, ensuring optimal performance of medical equipment.
              </p>

              <div className="space-y-3">
                {["ISO Certified Operations", "SFDA Approved Products", "24/7 Technical Support", "Nationwide Coverage"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {companyFeatures.map((feature, index) => {
                const Icon = iconMap[feature.icon];
                return (
                  <motion.div
                    key={feature.title}
                    className="glass-card rounded-2xl p-6 hover-lift border border-border/50 hover:border-gold/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/10 to-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-20 bg-background">
        <div className="container-padding container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium mb-4">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Guided by Purpose
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our vision, mission, and values drive everything we do in healthcare excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => {
              const Icon = iconMap[value.icon];
              return (
                <motion.div
                  key={value.title}
                  className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${value.gradient} p-8 border border-border/50`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="relative z-10">
                    <div className={`inline-flex p-4 rounded-2xl bg-card shadow-soft mb-6 ${value.iconColor}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {value.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-card/30 blur-3xl" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-gold/5 to-primary/10">
        <div className="container-padding container mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Partner with RIC for Healthcare Excellence
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Discover how our medical equipment solutions can enhance your healthcare facility. Get in touch with our team today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                variant="hero" 
                size="lg"
                className="bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3"
              >
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-2 border-primary hover:bg-primary/5 px-6 py-3"
              >
                <Link href="/#products">
                  View Products
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
