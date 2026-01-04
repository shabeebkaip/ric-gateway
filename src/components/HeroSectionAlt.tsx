'use client';

import { motion } from "framer-motion";
import { Heart, Activity, Shield, Award, Users, Clock, ArrowRight, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { icon: Clock, value: "39+", label: "Years of Excellence" },
  { icon: Users, value: "8", label: "International Partners" },
  { icon: Shield, value: "100+", label: "Healthcare Facilities" },
  { icon: Award, value: "ISO", label: "Certified Operations" },
];

const features = [
  "Advanced Medical Equipment",
  "24/7 Technical Support",
  "ISO Certified Quality",
  "International Standards",
];

export const HeroSectionAlt = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-gold/10">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating Orbs */}
      <motion.div 
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-gold/20 to-primary/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container-padding container mx-auto relative z-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Trust Badge */}
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-gradient-to-r from-gold/90 to-primary text-white border-0 px-4 py-2 text-sm flex items-center gap-2">
                <Star className="w-4 h-4 fill-current" />
                Trusted Since 1985
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-foreground">Excellence in</span>
              <br />
              <span className="bg-gradient-to-r from-gold via-primary to-accent bg-clip-text text-transparent">
                Medical Technology
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Pioneering healthcare solutions across Saudi Arabia with cutting-edge medical equipment and unwavering commitment to patient care excellence.
            </motion.p>

            {/* Features List */}
            <motion.div
              className="grid sm:grid-cols-2 gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-sm text-foreground font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 text-white shadow-lg hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 group"
              >
                Explore Solutions
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/30 hover:border-gold hover:bg-gold/5 transition-all duration-300"
              >
                Schedule Consultation
              </Button>
            </motion.div>

            {/* Mini Stats */}
            <motion.div
              className="flex items-center gap-8 mt-12 pt-8 border-t border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">39+</p>
                <p className="text-xs text-muted-foreground">Years Excellence</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">100+</p>
                <p className="text-xs text-muted-foreground">Healthcare Partners</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">ISO</p>
                <p className="text-xs text-muted-foreground">Certified</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual - Modern Card Grid */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative grid grid-cols-2 gap-4">
              {/* Large Feature Card */}
              <motion.div
                className="col-span-2 bg-gradient-to-br from-card to-primary/5 rounded-3xl p-8 border-2 border-gold/20 shadow-2xl relative overflow-hidden group"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <Activity className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Advanced Diagnostics</h3>
                  <p className="text-muted-foreground">State-of-the-art medical imaging and diagnostic equipment</p>
                </div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
              </motion.div>

              {/* Small Cards */}
              <motion.div
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg hover:border-gold/30 transition-all duration-300 hover:shadow-xl group"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center mb-4 group-hover:from-gold/30 group-hover:to-primary/30 transition-all">
                  <Heart className="w-6 h-6 text-gold" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Patient Care</h4>
                <p className="text-sm text-muted-foreground">Excellence first</p>
              </motion.div>

              <motion.div
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg hover:border-gold/30 transition-all duration-300 hover:shadow-xl group"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Quality Assured</h4>
                <p className="text-sm text-muted-foreground">ISO certified</p>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -top-6 -right-6 bg-gradient-to-br from-gold to-primary text-white rounded-2xl px-6 py-3 shadow-xl"
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  y: [0, -5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <div>
                    <p className="text-xs font-medium opacity-90">Certified</p>
                    <p className="text-sm font-bold">Excellence</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-gold/5 to-primary/5 rounded-full blur-3xl" />
            </div>

            {/* Floating Icons */}
            <motion.div
              className="absolute -left-4 top-1/4 bg-card shadow-lg rounded-xl p-3 border border-gold/20"
              animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Users className="w-6 h-6 text-primary" />
            </motion.div>

            <motion.div
              className="absolute -right-4 bottom-1/4 bg-card shadow-lg rounded-xl p-3 border border-gold/20"
              animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Clock className="w-6 h-6 text-gold" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="hsl(var(--background))"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
};
