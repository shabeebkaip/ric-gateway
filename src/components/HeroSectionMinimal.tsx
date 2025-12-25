import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  { icon: Globe, text: "Global Partnerships", color: "from-primary to-accent" },
  { icon: Zap, text: "Rapid Deployment", color: "from-gold to-primary" },
  { icon: TrendingUp, text: "Proven Results", color: "from-accent to-primary" },
];

export const HeroSectionMinimal = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-background via-background to-muted/20 overflow-hidden">
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--border)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Subtle Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-gold/10 via-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/10 via-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="container-padding container mx-auto relative z-10 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Top Badge */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-gold/30 bg-gold/5 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">
                Trusted Healthcare Partner Since 1985
              </span>
            </div>
          </motion.div>

          {/* Main Heading - Centered */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6">
              <span className="text-foreground">Advancing</span>
              <br />
              <span className="bg-gradient-to-r from-gold via-primary to-accent bg-clip-text text-transparent inline-block">
                Healthcare Excellence
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Delivering world-class medical solutions to transform patient care across Saudi Arabia
            </p>
          </motion.div>

          {/* Highlights */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} p-2 flex items-center justify-center`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 text-white shadow-xl hover:shadow-2xl hover:shadow-gold/30 transition-all duration-500 text-base px-8 py-6 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 hover:border-gold/50 hover:bg-gold/5 text-base px-8 py-6 transition-all duration-300"
            >
              Our Solutions
            </Button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: "39+", label: "Years of Excellence", gradient: "from-gold to-primary" },
                { value: "8", label: "Global Partners", gradient: "from-primary to-accent" },
                { value: "100+", label: "Healthcare Facilities", gradient: "from-accent to-primary" },
                { value: "ISO", label: "Certified Quality", gradient: "from-gold to-accent" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 hover:border-gold/30 hover:bg-card transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-1/4 left-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-primary/20 backdrop-blur-sm border border-gold/20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/20"
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
