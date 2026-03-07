"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  Stethoscope,
  ScanLine,
  Package,
  Activity,
  Settings2,
  ArrowRight,
  Zap,
} from "lucide-react";
import { productCategories, partners } from "@/lib/data";
import Link from "next/link";

const categoryIcons: Record<string, any> = {
  Microscope,
  Stethoscope,
  ScanLine,
  Package,
  Activity,
  Settings2,
  Zap 
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export const ProductCategoriesSection = () => {
  return (
    <section id="products" className="section-padding bg-background">
      <div className="container-padding container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-gold/10 to-primary/10 border border-gold/20 text-sm font-medium mb-4">
            <span className="bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent font-semibold">
              Product Categories
            </span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Medical Equipment Distribution
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We distribute world-class medical equipment from leading
            international manufacturers across multiple specialties.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {productCategories.map((category) => {
            const Icon = categoryIcons[category.icon];
            const categoryPartners = partners.filter((p) =>
              p.categories.includes(category.id)
            );
            const isEven = productCategories.indexOf(category) % 2 === 0;

            return (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="block group relative glass-card rounded-2xl p-8 hover-lift cursor-pointer overflow-hidden hover:border-gold/30 transition-all duration-300"
              >
                {/* Background Gradient on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    isEven
                      ? "from-gold/5 via-primary/5 to-primary/0"
                      : "from-gold/5 via-accent/5 to-accent/0"
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div
                    className={`inline-flex p-4 rounded-2xl mb-6 transition-all duration-300 ${
                      isEven
                        ? "bg-gradient-to-br from-gold/10 to-primary/10 text-primary group-hover:from-gold/20 group-hover:to-primary/20"
                        : "bg-gradient-to-br from-gold/10 to-accent/10 text-accent group-hover:from-gold/20 group-hover:to-accent/20"
                    }`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                    {category.name}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex -space-x-2">
                      {categoryPartners.slice(0, 3).map((partner, idx) => (
                        <div
                          key={partner.name}
                          className="w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center overflow-hidden"
                          title={partner.name}
                        >
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {categoryPartners.length}{" "}
                      {categoryPartners.length === 1 ? "Supplier" : "Suppliers"}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 font-medium bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent group-hover:gap-4 transition-all duration-300">
                    View Products
                    <ArrowRight className="w-4 h-4 text-gold" />
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

// Keep old export name for backward compatibility during migration
export const ServicesSection = ProductCategoriesSection;
