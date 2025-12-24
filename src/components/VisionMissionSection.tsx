import { motion } from "framer-motion";
import { Eye, Target, Heart } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Our Vision",
    description: "Keep pace with fast-moving technology for Saudi Arabia's 2030 vision to accomplish excellence in healthy living by offering complete medical solutions.",
    gradient: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Target,
    title: "Our Mission",
    description: "Inspire hope and improve quality of life by offering verifiable, effective professional solutions ensuring partner satisfaction.",
    gradient: "from-accent/10 to-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Trust, loyalty, and respect — the constant fundamentals of our commitment to excellence in healthcare partnerships.",
    gradient: "from-gold/10 to-gold/5",
    iconColor: "text-gold",
  },
];

export const VisionMissionSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-padding max-w-7xl mx-auto">
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
          {values.map((value, index) => (
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
                  <value.icon className="w-8 h-8" />
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
          ))}
        </div>
      </div>
    </section>
  );
};
