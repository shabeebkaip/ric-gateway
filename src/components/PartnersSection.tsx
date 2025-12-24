import { motion } from "framer-motion";

const partners = [
  "Boston Scientific",
  "BASDA",
  "Combat Medical",
  "Dornier MedTech",
  "SurgicEye",
  "Surgimedik",
  "Wikkon",
  "Medica",
];

export const PartnersSection = () => {
  return (
    <section id="partners" className="py-12 bg-card border-y border-border/50">
      <div className="container-padding max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by Leading Healthcare Institutions
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 py-4 bg-background rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
              >
                <span className="text-lg font-semibold text-muted-foreground whitespace-nowrap">
                  {partner}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
