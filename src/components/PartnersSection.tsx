import { motion } from "framer-motion";

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
    name:"Excite Medical",
    country:"USA",
    flag:"🇺🇸",
    logo: exciteMedicalLogo,
    website:"https://excitemedical.com/"

  }
];

export const PartnersSection = () => {
  const partnerCount = partners.length;
  
  // Automatically determine grid layout based on number of partners
  const getGridClass = () => {
    if (partnerCount <= 3) {
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    } else if (partnerCount <= 4) {
      return "grid-cols-2 md:grid-cols-4";
    } else if (partnerCount <= 6) {
      return "grid-cols-2 md:grid-cols-3";
    } else if (partnerCount <= 8) {
      return "grid-cols-2 md:grid-cols-4";
    } else if (partnerCount <= 9) {
      return "grid-cols-2 md:grid-cols-3 lg:grid-cols-3";
    } else if (partnerCount <= 12) {
      return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    } else {
      return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
    }
  };

  // Count unique countries
  const uniqueCountries = new Set(partners.map(p => p.country)).size;

  return (
    <section
      id="partners"
      className="py-20 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container-padding container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Global Network
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Our Affiliated Partners
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Collaborating with world-leading medical technology companies to
            bring cutting-edge healthcare solutions to Saudi Arabia
          </p>
        </motion.div>

        <div className={`grid ${getGridClass()} gap-6`}>
          {partners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl border border-border/50 p-6 hover:border-gold/30 hover:shadow-card transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center gap-4">
                {/* Logo Container */}
                <div className="w-full h-20 flex items-center justify-center bg-background rounded-xl p-4">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-lg font-bold text-primary">
                      {partner.name}
                    </span>
                  )}
                </div>

                {/* Partner Info */}
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {partner.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-lg">{partner.flag}</span>
                    <span className="text-sm text-muted-foreground">
                      {partner.country}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.a>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            Trusted partnerships spanning{" "}
            <span className="text-primary font-semibold">{uniqueCountries} countries</span>{" "}
            across 3 continents
          </p>
        </motion.div>
      </div>
    </section>
  );
};
