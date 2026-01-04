'use client';

import { motion } from "framer-motion";
import { ExternalLink, Globe2, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

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
    specialty: "Medical Equipment",
  },
  {
    name: "Boston Scientific",
    country: "USA",
    flag: "🇺🇸",
    logo: bostonScientificLogo,
    website:
      "https://www.bostonscientific.com/en-US/patients-caregivers/device-support/penile-implants.html",
    specialty: "Medical Devices",
  },
  {
    name: "Combat Medical Ltd",
    country: "United Kingdom",
    flag: "🇬🇧",
    logo: combatMedicalLogo,
    website: "https://combatcancer.com/",
    specialty: "Cancer Treatment",
  },
  {
    name: "Dornier MedTech",
    country: "Germany",
    flag: "🇩🇪",
    logo: dornierMedtechLogo,
    website: "https://www.dornier.com/",
    specialty: "Medical Technology",
  },
  {
    name: "SurgicEye GmbH",
    country: "Germany",
    flag: "🇩🇪",
    logo: surgiceyeLogo,
    website: "https://www.surgiceye.com/",
    specialty: "Surgical Solutions",
  },
  {
    name: "Surgimedik",
    country: "India",
    flag: "🇮🇳",
    logo: null,
    website:
      "http://www.surgimedik.com/CategoryList.aspx?CID=lcQ27c5wWmg%3d&CType=&SEOType=FNdLXzsYmVM%253d",
    specialty: "Surgical Equipment",
  },
  {
    name: "Wikkon",
    country: "China",
    flag: "🇨🇳",
    logo: wikkonLogo,
    website: "https://www.eswl.com/about-us/",
    specialty: "Medical Devices",
  },
  {
    name: "Medica",
    country: "UAE",
    flag: "🇦🇪",
    logo: medicaLogo,
    website: "https://medicagroup.com/",
    specialty: "Healthcare Solutions",
  },
  {
    name: "Excite Medical",
    country: "USA",
    flag: "🇺🇸",
    logo: exciteMedicalLogo,
    website: "https://excitemedical.com/",
    specialty: "Medical Technology",
  },
];

export const PartnersSectionCarousel = () => {
  const uniqueCountries = new Set(partners.map((p) => p.country)).size;

  return (
    <section id="partners" className="py-24 relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-padding container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/10 to-primary/10 border border-gold/20 mb-4">
            <Globe2 className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">
              Global Network
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by Leading <span className="bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">Medical Brands</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Partnering with world-renowned companies to deliver exceptional healthcare solutions
          </p>
        </motion.div>

        {/* Featured Partners Grid - Large Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {partners.slice(0, 6).map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-gold/30 relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Logo */}
                  <div className="flex-1 flex items-center justify-center mb-6 min-h-[120px]">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="max-h-24 max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-2xl font-bold text-primary">{partner.name}</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {partner.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{partner.flag}</span>
                        <span className="text-muted-foreground">{partner.country}</span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {partner.specialty}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.a>
          ))}
        </div>

        {/* Remaining Partners - Compact Grid */}
        {partners.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {partners.slice(6).map((partner, index) => (
              <motion.a
                key={partner.name}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:border-gold/30 aspect-square flex flex-col items-center justify-center gap-2">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-12 max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-sm font-bold text-primary text-center">{partner.name}</div>
                  )}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{partner.flag}</span>
                    <span className="truncate">{partner.country}</span>
                  </div>
                </Card>
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Stats Bar */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8 pt-12 border-t border-border/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-gold" />
              <p className="text-4xl font-bold bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">
                {partners.length}
              </p>
            </div>
            <p className="text-sm text-muted-foreground font-medium">Global Partners</p>
          </div>
          
          <div className="w-px h-16 bg-border" />
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe2 className="w-5 h-5 text-primary" />
              <p className="text-4xl font-bold bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">
                {uniqueCountries}
              </p>
            </div>
            <p className="text-sm text-muted-foreground font-medium">Countries</p>
          </div>
          
          <div className="w-px h-16 bg-border" />
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-accent" />
              <p className="text-4xl font-bold bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">
                3
              </p>
            </div>
            <p className="text-sm text-muted-foreground font-medium">Continents</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
