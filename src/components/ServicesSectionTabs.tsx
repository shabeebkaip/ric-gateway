import { motion, AnimatePresence } from "framer-motion";
import { Microscope, Stethoscope, ScanLine, Package, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Microscope,
    title: "Cancer Treatment",
    description: "Advanced oncology equipment and technologies including radiation therapy, chemotherapy administration systems, and diagnostic imaging solutions.",
    color: "primary",
    features: [
      "Radiation Therapy Systems",
      "Chemotherapy Administration",
      "Oncology Diagnostic Imaging",
      "Patient Monitoring Systems",
    ],
    gradient: "from-gold via-primary to-accent",
  },
  {
    icon: Stethoscope,
    title: "Urology Treatment",
    description: "Cutting-edge urological technologies featuring lithotripsy systems, endoscopy equipment, laser technologies, and diagnostic tools.",
    color: "accent",
    features: [
      "Lithotripsy Systems",
      "Endoscopy Equipment",
      "Laser Technologies",
      "Diagnostic Tools",
    ],
    gradient: "from-accent via-primary to-gold",
  },
  {
    icon: ScanLine,
    title: "Medical Imaging",
    description: "State-of-the-art diagnostic imaging systems including CT scanners, MRI systems, ultrasound equipment, and PACS solutions.",
    color: "primary",
    features: [
      "CT Scanners",
      "MRI Systems",
      "Ultrasound Equipment",
      "PACS Solutions",
    ],
    gradient: "from-primary via-gold to-accent",
  },
  {
    icon: Package,
    title: "Medical Disposables",
    description: "Quality medical consumables and supplies including surgical disposables, infection control products, and laboratory consumables.",
    color: "accent",
    features: [
      "Surgical Disposables",
      "Infection Control Products",
      "Laboratory Consumables",
      "Medical Supplies",
    ],
    gradient: "from-gold via-accent to-primary",
  },
];

export const ServicesSectionTabs = () => {
  const [activeService, setActiveService] = useState(0);

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-padding container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/10 to-primary/10 border border-gold/20 mb-4">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">
              What We Offer
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Comprehensive <span className="bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">Healthcare Solutions</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Delivering excellence across multiple specialties with state-of-the-art medical equipment
          </p>
        </motion.div>

        {/* Service Tabs Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {services.map((service, index) => (
            <button
              key={service.title}
              onClick={() => setActiveService(index)}
              className={`group flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                activeService === index
                  ? "bg-gradient-to-r from-gold to-primary text-white shadow-lg scale-105"
                  : "bg-card border border-border hover:border-gold/30 hover:shadow-md"
              }`}
            >
              <service.icon className={`w-5 h-5 ${activeService === index ? "text-white" : "text-primary"}`} />
              <span className={`font-semibold ${activeService === index ? "text-white" : "text-foreground"}`}>
                {service.title}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Active Service Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            {(() => {
              const ActiveIcon = services[activeService].icon;
              const activeServiceData = services[activeService];
              
              return (
                <Card className="p-8 md:p-12 border-2 hover:border-gold/30 transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left: Icon and Info */}
                    <div>
                      <div className={`inline-flex p-6 rounded-3xl mb-6 bg-gradient-to-br ${
                        activeServiceData.color === "primary"
                          ? "from-gold/20 to-primary/20"
                          : "from-gold/20 to-accent/20"
                      }`}>
                        <ActiveIcon className="w-16 h-16 text-primary" />
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {activeServiceData.title}
                      </h3>

                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {activeServiceData.description}
                      </p>

                      <Button className="bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 text-white shadow-lg">
                        Request Information
                      </Button>
                    </div>

                    {/* Right: Features List */}
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-foreground mb-6">Key Features</h4>
                      {activeServiceData.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-gold/5 to-primary/5 hover:from-gold/10 hover:to-primary/10 transition-all duration-300"
                        >
                          <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                          <span className="text-foreground font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Gradient */}
                  <div className={`absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br ${activeServiceData.gradient} opacity-5 rounded-full blur-3xl pointer-events-none`} />
                </Card>
              );
            })()}
          </motion.div>
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {[
            { value: "4", label: "Specialties" },
            { value: "100+", label: "Equipment Types" },
            { value: "24/7", label: "Support" },
            { value: "ISO", label: "Certified" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-card border border-border hover:border-gold/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
