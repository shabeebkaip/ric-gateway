'use client';

import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Partner {
  name: string;
  slug?: string;
  logo?: string;
  website?: string;
  country?: string;
  invertColor?: boolean;
  tag?: string;
  categories?: string[];
}

interface PartnersSectionProps {
  partners: Partner[];
}

export const PartnersSection = ({ partners }: PartnersSectionProps) => {
  const partnerCount = partners.length;

  // Count unique countries
  const uniqueCountries = new Set(partners.map((p) => p.country)).size;

  return (
    <section
      id="partners"
      className="py-20 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container-padding container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-semibold text-primary/80 uppercase tracking-widest mb-3">
            Global Network
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our Affiliated Partners
          </h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Collaborating with world-leading medical technology companies to
            bring cutting-edge healthcare solutions to Saudi Arabia
          </p>
        </motion.div>

        {/* Partners Grid - Minimalist Design */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative flex items-center justify-center p-6 md:p-8 w-40 md:w-48"
            >
              {/* Tag Badge */}
              {partner.tag && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full z-10">
                  {partner.tag}
                </div>
              )}
              {/* Minimal hover effect - subtle underline */}
              <div className="relative">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className={`w-32  object-contain transition-all duration-300 ease-out
                      ${partner.invertColor ? "invert" : ""}
                      grayscale hover:grayscale-0 opacity-60 hover:opacity-100
                      group-hover:scale-105`}
                    style={{
                      filter: partner.invertColor
                        ? "invert(1) grayscale(1) brightness(0.9)"
                        : "grayscale(1) brightness(0.95)",
                    }}
                    onMouseEnter={(e) => {
                      if (partner.invertColor) {
                        e.currentTarget.style.filter =
                          "invert(1) grayscale(0) brightness(0.9)";
                      } else {
                        e.currentTarget.style.filter =
                          "grayscale(0) brightness(0.95)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (partner.invertColor) {
                        e.currentTarget.style.filter =
                          "invert(1) grayscale(1) brightness(0.9)";
                      } else {
                        e.currentTarget.style.filter =
                          "grayscale(1) brightness(0.95)";
                      }
                    }}
                  />
                ) : (
                  <span className="text-base md:text-lg font-semibold text-foreground/60 group-hover:text-primary transition-colors duration-300">
                    {partner.name}
                  </span>
                )}

                {/* Minimal accent line on hover */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-300 ease-out" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Statistics Badge */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted/30 border border-muted-foreground/10">
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm text-muted-foreground">
              Distributing products from{" "}
              <span className="text-foreground font-semibold">
                {partnerCount} global manufacturers
              </span>{" "}
              with operations across 3 continents
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
