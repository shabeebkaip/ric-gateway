import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Import partner logos
import basdaLogo from "@/assets/partners/basda.png";
import bostonScientificLogo from "@/assets/partners/boston-scientific.png";
import combatMedicalLogo from "@/assets/partners/combat-medical.png";
import dornierMedtechLogo from "@/assets/partners/dornier-medtech.png";
import surgiceyeLogo from "@/assets/partners/surgiceye.png";
import wikkonLogo from "@/assets/partners/wikkon.png";
import medicaLogo from "@/assets/partners/Website-Logo.svg";
import exciteMedicalLogo from "@/assets/partners/excite.png";

const partners = [
  {
    name: "BASDA",
    country: "China",
    flag: "🇨🇳",
    logo: basdaLogo,
    website: "https://www.basdamri.com/",
  },
  {
    name: "Boston Scientific",
    country: "USA",
    flag: "🇺🇸",
    logo: bostonScientificLogo,
    website:
      "https://www.bostonscientific.com/en-US/patients-caregivers/device-support/penile-implants.html",
  },
  {
    name: "Combat Medical Ltd",
    country: "United Kingdom",
    flag: "🇬🇧",
    logo: combatMedicalLogo,
    website: "https://combatcancer.com/",
  },
  {
    name: "Dornier MedTech",
    country: "Germany",
    flag: "🇩🇪",
    logo: dornierMedtechLogo,
    website: "https://www.dornier.com/",
  },
  {
    name: "SurgicEye GmbH",
    country: "Germany",
    flag: "🇩🇪",
    logo: surgiceyeLogo,
    website: "https://www.surgiceye.com/",
  },
  {
    name: "Surgimedik",
    country: "India",
    flag: "🇮🇳",
    logo: null,
    website:
      "http://www.surgimedik.com/CategoryList.aspx?CID=lcQ27c5wWmg%3d&CType=&SEOType=FNdLXzsYmVM%253d",
  },
  {
    name: "Wikkon",
    country: "China",
    flag: "🇨🇳",
    logo: wikkonLogo,
    website: "https://www.eswl.com/about-us/",
  },
  {
    name: "Medica",
    country: "UAE",
    flag: "🇦🇪",
    logo: medicaLogo,
    website: "https://medicagroup.com/",
  },
  {
    name: "Excite Medical",
    country: "USA",
    flag: "🇺🇸",
    logo: exciteMedicalLogo,
    website: "https://excitemedical.com/",
  },
];

export const PartnersSectionMinimal = () => {
  const uniqueCountries = new Set(partners.map((p) => p.country)).size;

  return (
    <section id="partners" className="py-20 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container-padding container mx-auto relative z-10">
        {/* Centered Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/5 border border-gold/20 mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold text-gold">Trusted Worldwide</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Partnering with </span>
            <span className="bg-gradient-to-r from-gold via-primary to-accent bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Collaborating with {partners.length} world-class medical technology companies across {uniqueCountries} countries
          </p>
        </motion.div>

        {/* Logo Wall - Clean Grid */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 bg-border/30 p-1 rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {partners.map((partner, index) => (
              <motion.a
                key={partner.name}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-card aspect-square flex items-center justify-center p-6 hover:bg-gradient-to-br hover:from-gold/5 hover:to-primary/5 transition-all duration-300"
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter grayscale group-hover:grayscale-0"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-base font-bold text-primary/70 group-hover:text-primary transition-colors">
                      {partner.name}
                    </div>
                  </div>
                )}

                {/* Hover overlay with country info */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                  <p className="text-white font-semibold text-sm mb-1">{partner.name}</p>
                  <div className="flex items-center gap-1 text-white/80 text-xs">
                    <span className="text-base">{partner.flag}</span>
                    <span>{partner.country}</span>
                  </div>
                </div>

                {/* Golden border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 transition-colors duration-300 pointer-events-none" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom Stats - Minimal */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-muted/50 border border-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gold to-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                Building the future of healthcare together
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
