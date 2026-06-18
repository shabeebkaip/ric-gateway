"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ProductVariantsProps } from "@/types";

export function ProductVariants({ variants }: ProductVariantsProps) {
  if (!variants || variants.length === 0) return null;

  // Check if variants are objects or strings
  const isObjectVariants = typeof variants[0] === "object";

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-light text-slate-900 mb-8">
            Available Configurations
          </h2>
          
          {isObjectVariants ? (
            // Render object variants with images
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(variants as Record<string, any>[]).map((variant, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {variant.image && (
                    <div className="aspect-square bg-slate-50 p-4">
                      <Image
                        src={variant.image}
                        alt={variant.tip_type || `Configuration ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {variant.tip_type}
                    </h3>
                    {variant.variant_codes && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Variant Codes
                        </p>
                        <p className="text-sm text-slate-700">
                          {Array.isArray(variant.variant_codes) 
                            ? variant.variant_codes.join(', ') 
                            : variant.variant_codes}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Render string variants as cards
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(variants as string[]).map((variant, index) => (
                <motion.div
                  key={index}
                  className="bg-white/90 backdrop-blur-[10px] border border-slate-200/80 rounded-2xl p-5 hover:bg-slate-50 hover:border-blue-300/30 cursor-pointer transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-slate-700">
                      {variant}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
