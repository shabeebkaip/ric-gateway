"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Grid3x3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "./ProductCard";
import type { Product, Category, Subcategory, ProductGridProps } from "@/types";

export function ProductGrid({
  products,
  category,
  subcategories,
  hasSubcategories,
  groupedProducts,
  ungroupedProducts,
}: ProductGridProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initialize active tab
  useEffect(() => {
    if (hasSubcategories && groupedProducts) {
      const firstKey = Object.keys(groupedProducts)[0];
      setActiveTab(firstKey);
    }
  }, [hasSubcategories, groupedProducts]);

  // Set up intersection observer for scroll-based active tab
  useEffect(() => {
    if (!hasSubcategories || !groupedProducts) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Filter only intersecting entries
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);
      
      if (intersectingEntries.length === 0) return;

      // Find the entry with the highest intersection ratio among visible sections
      const mostVisible = intersectingEntries.reduce((prev, current) => {
        return current.intersectionRatio > prev.intersectionRatio ? current : prev;
      });

      // Update active tab to the most visible section
      if (mostVisible && mostVisible.intersectionRatio > 0.05) {
        setActiveTab(mostVisible.target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: "-160px 0px -30% 0px",
    });

    // Observe all sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [hasSubcategories, groupedProducts]);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const offset = 180; // Account for sticky headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveTab(sectionId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Sticky Tab Navigation for Subcategories */}
      {hasSubcategories && groupedProducts && (
        <div className="sticky top-24 z-30 bg-white/95 backdrop-blur-md border-y border-slate-200/80 shadow-sm">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="overflow-x-auto hide-scrollbar">
              <div className="flex gap-2 min-w-max py-4">
                {Object.entries(groupedProducts).map(([subcategoryId, { subcategory }]) => (
                  <button
                    key={subcategoryId}
                    onClick={() => scrollToSection(subcategoryId)}
                    className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      activeTab === subcategoryId
                        ? "text-white shadow-lg shadow-blue-500/30"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span className="relative z-10">{subcategory.name}</span>
                    {activeTab === subcategoryId && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-600 rounded-full"
                        transition={{ 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 35,
                          mass: 0.8
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-16">
        {/* Subcategory Sections */}
        {hasSubcategories && groupedProducts && (
          <>
            {Object.entries(groupedProducts).map(
              ([subcategoryId, { subcategory, products: subProducts }], groupIndex) => (
                <motion.div
                  key={subcategoryId}
                  id={subcategoryId}
                  ref={(el) => {
                    sectionRefs.current[subcategoryId] = el;
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                  className="space-y-8 scroll-mt-[200px]"
                >
                  {/* Subcategory Header */}
                  <div className="flex items-start gap-6 pb-6 border-b-2 border-gradient-to-r from-blue-500 via-sky-400 to-transparent">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                      <Grid3x3
                        className="w-7 h-7 text-white"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-medium text-slate-900 mb-2">
                        {subcategory.name}
                      </h2>
                      <p className="text-lg text-slate-600 font-light leading-relaxed max-w-3xl">
                        {subcategory.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge
                          variant="outline"
                          className="rounded-full px-3 py-1 text-xs border-blue-200 text-blue-700 bg-blue-50"
                        >
                          {subProducts.length}{" "}
                          {subProducts.length === 1 ? "Product" : "Products"}
                        </Badge>
                        {subcategory.types && subcategory.types.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-400">•</span>
                            <span className="text-sm text-slate-500 font-light">
                              {subcategory.types.slice(0, 3).join(", ")}
                              {subcategory.types.length > 3 &&
                                ` +${subcategory.types.length - 3} more`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Products in this subcategory */}
                  <div className="space-y-6">
                    {subProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        category={category}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              )
            )}
          </>
        )}

        {/* Ungrouped Products */}
        {ungroupedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {hasSubcategories && (
              <div className="pb-6 border-b-2 border-gradient-to-r from-slate-300 via-slate-200 to-transparent">
                <h2 className="text-2xl font-medium text-slate-900">
                  All Products
                </h2>
              </div>
            )}
            <div className="space-y-6">
              {ungroupedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
