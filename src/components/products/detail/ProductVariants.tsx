"use client";

import { motion } from "framer-motion";
import type { ProductVariantsProps } from "@/types";

export function ProductVariants({ variants }: ProductVariantsProps) {
  if (!variants || variants.length === 0) return null;

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {variants.map((variant, index) => (
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
        </motion.div>
      </div>
    </section>
  );
}
