'use client';

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Linkedin, Twitter, Facebook } from "lucide-react";

const quickLinks = [
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Partners", href: "/#partners" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "#" },
];

const services = [
  { label: "Cancer Treatment", href: "#" },
  { label: "Urology Treatment", href: "#" },
  { label: "Medical Imaging", href: "#" },
  { label: "Medical Disposables", href: "#" },
];

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

export const Footer = () => {
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
              Leading provider of advanced medical equipment and healthcare solutions in Saudi Arabia since 1985.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-card/10 flex items-center justify-center hover:bg-primary transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-card/70 group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
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

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-bold text-card mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-card/70 hover:text-primary transition-colors"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-bold text-card mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-card/70">
                  Orouba Street, RIC Complex<br />
                  Riyadh, Kingdom of Saudi Arabia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+966" className="text-card/70 hover:text-primary transition-colors">
                  +966 XX XXX XXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@ric.com.sa" className="text-card/70 hover:text-primary transition-colors">
                  info@ric.com.sa
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-card/70">
                  Sun - Thu: 8AM - 5PM
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-card/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-card/60 text-sm text-center md:text-left">
              Copyright © 2025 Riyadh International Corporation Medical Equipments & Services, Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-card/60 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-card/60 hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
