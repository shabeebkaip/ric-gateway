"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  PhoneCall,
  Microscope,
  Stethoscope,
  ScanLine,
  Package,
  Activity,
  Settings2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { productCategories, partners } from "@/lib/data";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "#", hasDropdown: true },
  { label: "Services", href: "/services" },
  { label: "News & Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const categoryIcons: Record<string, any> = {
  Microscope,
  Stethoscope,
  ScanLine,
  Package,
  Activity,
  Settings2,
  Zap
};

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-nav py-3 shadow-lg shadow-primary/5"
          : "bg-gradient-to-b from-background/80 via-background/40 to-transparent backdrop-blur-sm py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative gradient line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-opacity duration-500 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="container-padding container mx-auto">
        <nav className="flex items-center justify-between relative">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-3 relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <Image
                src="/logo@2x.png"
                alt="RIC Medical Solutions"
                width={200}
                height={80}
                className="h-16 md:h-20 w-auto object-contain relative z-10"
                priority
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 relative">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                className="relative dropdown-container"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() =>
                  item.hasDropdown && setActiveDropdown(item.label)
                }
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              >
                {item.hasDropdown ? (
                  <>
                    <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-gold/5 hover:to-primary/5 relative group">
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Mega Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-white rounded-2xl shadow-2xl border border-gold/10 p-6"
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            {productCategories.map((category) => {
                              const Icon = categoryIcons[category.icon];
                              const categoryPartners = partners.filter((p) =>
                                p.categories.includes(category.id)
                              );

                              return (
                                <Link
                                  key={category.id}
                                  href={`/products/${category.slug}`}
                                  className="group p-4 rounded-xl hover:bg-gradient-to-br hover:from-gold/5 hover:to-primary/5 border border-transparent hover:border-gold/20 transition-all duration-300"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/10 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                      <Icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                        {category.name}
                                      </h3>
                                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                        {category.description}
                                      </p>
                                      <div className="flex items-center gap-1 text-xs text-gold">
                                        <span className="font-medium">
                                          {categoryPartners.length} Suppliers
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                          <div className="pt-4 border-t border-border/50">
                            <Link
                              href="/products"
                              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-gold/10 to-primary/10 hover:from-gold/20 hover:to-primary/20 text-primary font-semibold transition-all duration-300"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <Package className="w-4 h-4" />
                              View All Products
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-gold/5 hover:to-primary/5 relative group"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
                    </span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex flex-col items-start border border-gold/20 rounded-xl overflow-hidden">
              <motion.a
                href="tel:+966509698043"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-gold hover:bg-gold/5 transition-all duration-300 w-full group"
                whileHover={{ scale: 1.02 }}
              >
                <Phone className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                <span className="hidden xl:inline">+966 50 969 8043</span>
                <span className="xl:hidden">Mobile</span>
              </motion.a>
              <div className="w-full h-px bg-gold/20" />
              <motion.a
                href="tel:+966114654113"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-gold hover:bg-gold/5 transition-all duration-300 w-full group"
                whileHover={{ scale: 1.02 }}
              >
                <PhoneCall className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                <span className="hidden xl:inline">+966 11 465 4113 <span className="text-xs opacity-70">(Ext. 106)</span></span>
                <span className="xl:hidden">Landline</span>
              </motion.a>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="hero"
                size="default"
                className="bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 shadow-lg hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
              >
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-gold/10 hover:to-primary/10 transition-all duration-300 border border-transparent hover:border-gold/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </motion.div>
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden mt-4 glass-card rounded-2xl p-4 shadow-2xl border border-gold/10"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.hasDropdown ? (
                    <div className="mb-2">
                      <div className="py-3 px-4 text-foreground/80 font-semibold text-sm">
                        {item.label}
                      </div>
                      <div className="pl-4 space-y-1">
                        {productCategories.map((category) => {
                          const Icon = categoryIcons[category.icon];
                          return (
                            <Link
                              key={category.id}
                              href={`/products/${category.slug}`}
                              className="flex items-center gap-3 py-2 px-4 text-foreground/70 hover:text-primary transition-all duration-300 rounded-lg hover:bg-gradient-to-r hover:from-gold/5 hover:to-primary/5"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-sm">{category.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="block py-3 px-4 text-foreground/80 hover:text-primary transition-all duration-300 font-semibold rounded-lg hover:bg-gradient-to-r hover:from-gold/5 hover:to-primary/5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </motion.div>
              ))}
              <motion.div className="mt-4 pt-4 border-t border-border/50 space-y-2">
                <a
                  href="tel:+966509698043"
                  className="flex items-center gap-2 py-2 px-4 text-sm text-muted-foreground hover:text-gold transition-all duration-300 rounded-lg hover:bg-gold/5"
                >
                  <Phone className="w-4 h-4" />
                  +966 50 969 8043 (Mobile)
                </a>
                <a
                  href="tel:+966114654113"
                  className="flex items-center gap-2 py-2 px-4 text-sm text-muted-foreground hover:text-gold transition-all duration-300 rounded-lg hover:bg-gold/5"
                >
                  <PhoneCall className="w-4 h-4" />
                  +966 11 465 4113 <span className="text-xs opacity-70">(Ext. 106)</span>
                </a>
                <Button
                  asChild
                  variant="hero"
                  size="default"
                  className="w-full bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 shadow-lg"
                >
                  <Link href="/contact">Get a Quote</Link>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};