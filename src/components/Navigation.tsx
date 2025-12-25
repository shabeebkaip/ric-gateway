import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// For smooth scroll
import React from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  // {
  //   label: "Services",
  //   href: "#services",
  //   dropdown: [
  //     { label: "Cancer Treatment", href: "#cancer" },
  //     { label: "Urology Treatment", href: "#urology" },
  //     { label: "Medical Imaging", href: "#imaging" },
  //     { label: "Disposables", href: "#disposables" },
  //   ],
  // },
  { label: "Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
];

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

  // Scroll to contact section
  const handleQuoteClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

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
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-opacity duration-500 ${
        isScrolled ? "opacity-100" : "opacity-0"
      }`} />
      
      <div className="container-padding container mx-auto">
        <nav className="flex items-center justify-between relative">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3 relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <img 
                src="/logo@2x.png" 
                alt="RIC Medical Solutions" 
                className="h-12 w-auto object-contain relative z-10"
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 relative">
            {/* {navItems.map((item, index) => (
              ...existing code for nav items and dropdown...
            ))} */}
            {navItems.filter(item => item.label !== "Services").map((item, index) => (
              <motion.div
                key={item.label}
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-gold/5 hover:to-primary/5 relative group"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
                  </span>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.a 
              href="tel:+966" 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-gold transition-all duration-300 rounded-lg hover:bg-gold/5 group"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>Call Us</span>
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="hero" 
                size="default"
                className="bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 shadow-lg hover:shadow-xl hover:shadow-gold/20 transition-all duration-300"
                onClick={handleQuoteClick}
              >
                Get a Quote
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
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden mt-4 glass-card rounded-2xl p-4 shadow-2xl border border-gold/10"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.filter(item => item.label !== "Services").map((item, index) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <a
                  href={item.href}
                  className="block py-3 px-4 text-foreground/80 hover:text-primary transition-all duration-300 font-semibold rounded-lg hover:bg-gradient-to-r hover:from-gold/5 hover:to-primary/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </motion.div>
            ))}
            <motion.a className="mt-4 pt-4 border-t border-border/50" href="contact">
              <Button 
                variant="hero" 
                size="default" 
                className="w-full bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 shadow-lg"
                onClick={handleQuoteClick}
              >
                Get a Quote
              </Button>
            </motion.a>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};
