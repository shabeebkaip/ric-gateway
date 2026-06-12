"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  PhoneCall,
  Printer,
  Mail,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { productCategories, contactInfo as staticInfo } from "@/lib/data";
import type { ContactCard } from "@/lib/getContactInfo";

const ICON_MAP: Record<string, LucideIcon> = {
  MapPin,
  Phone,
  PhoneCall,
  Printer,
  Mail,
  Clock,
};

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const FooterClient = ({ contactCards }: { contactCards: ContactCard[] }) => {
  return (
    <footer className="bg-foreground text-card pt-16 pb-8">
      <div className="container-padding container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <img
                src="/logo@2x.png"
                alt="RIC Medical Solutions"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-card/70 mb-6 leading-relaxed">
              Leading provider of advanced medical equipment and healthcare
              solutions in Saudi Arabia since 1985.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-bold text-card mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-card/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Product Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-bold text-card mb-6">
              Our Product Categories
            </h4>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`/products/${category.slug}`}
                    className="text-card/70 hover:text-primary transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact — driven by CMS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-bold text-card mb-6">Contact Us</h4>
            <ul className="space-y-4">
              {contactCards.map((card) => {
                const Icon = ICON_MAP[card.icon] ?? MapPin;
                const content = (
                  <li key={card.id} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-card/70">
                      {card.details.map((detail, i) => (
                        <span key={i} className="block">{detail}</span>
                      ))}
                    </div>
                  </li>
                );

                if (card.link) {
                  return (
                    <a key={card.id} href={card.link} className="hover:text-primary transition-colors">
                      {content}
                    </a>
                  );
                }
                return content;
              })}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-card/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-card/60 text-sm text-center md:text-left">
              Copyright © {new Date().getFullYear()} {staticInfo.companyName}. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
