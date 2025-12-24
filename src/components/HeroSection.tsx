import { motion } from "framer-motion";
import { Heart, Activity, Shield, Award, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Clock, value: "39+", label: "Years of Excellence" },
  { icon: Users, value: "8", label: "International Partners" },
  { icon: Shield, value: "100+", label: "Healthcare Facilities" },
  { icon: Award, value: "ISO", label: "Certified Operations" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] gradient-bg-hero overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-lighter/30 rounded-full blur-3xl" />
        
        {/* Medical Cross Pattern */}
        <svg className="absolute top-1/4 right-1/4 w-16 h-16 text-primary/10 animate-pulse-soft" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
        </svg>
        
        {/* ECG Line Animation */}
        <svg className="absolute bottom-1/4 left-1/4 w-48 h-12 text-accent/20" viewBox="0 0 200 50">
          <motion.path
            d="M0 25 L30 25 L40 10 L50 40 L60 15 L70 35 L80 25 L200 25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          />
        </svg>
      </div>

      <div className="container-padding max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-24 lg:pt-32">
          {/* Left Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Heart className="w-4 h-4 animate-heartbeat" />
              <span>Trusted Since 1985</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Transforming Healthcare{" "}
              <span className="gradient-text">Through Innovation</span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Leading provider of advanced medical solutions in Saudi Arabia. Excellence in Medical Technology & Patient Care.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button variant="hero" size="xl">
                Explore Our Solutions
              </Button>
              <Button variant="heroOutline" size="xl">
                Contact Us
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Circle */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse-soft" />
                
                {/* Middle Ring */}
                <div className="absolute inset-4 rounded-full border-2 border-accent/30" />
                
                {/* Inner Circle with Icon */}
                <div className="absolute inset-8 rounded-full bg-card shadow-elevated flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="w-20 h-20 text-primary mx-auto mb-4 animate-pulse-soft" />
                    <p className="text-sm font-medium text-muted-foreground">Advanced Medical</p>
                    <p className="text-lg font-bold text-foreground">Technology</p>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-card shadow-card rounded-xl p-3"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Heart className="w-6 h-6 text-destructive" />
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/4 -right-4 bg-card shadow-card rounded-xl p-3"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Shield className="w-6 h-6 text-accent" />
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-1/4 -left-4 bg-card shadow-card rounded-xl p-3"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  <Award className="w-6 h-6 text-gold" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center hover-lift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
