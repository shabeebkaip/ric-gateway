"use client";

import { motion } from "framer-motion";
import type { TechnicalSpecificationsProps } from "@/types";

export function TechnicalSpecifications({
  specifications,
}: TechnicalSpecificationsProps) {
  if (!specifications || Object.keys(specifications).length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-light text-slate-900 mb-3">
            Technical Specifications
          </h2>
          <p className="text-slate-500 font-light mb-10">
            Detailed technical parameters and measurements
          </p>

          <div className="bg-white/90 backdrop-blur-[10px] border border-slate-200/80 rounded-2xl p-8 shadow-[0_4px_6px_-1px_rgba(15,23,42,0.04),0_2px_4px_-2px_rgba(15,23,42,0.04)] hover:border-blue-300/30 hover:shadow-[0_8px_16px_-4px_rgba(59,130,246,0.08)] transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {Object.entries(specifications).map(([key, value], index) => (
                <motion.div
                  key={key}
                  className="flex items-start justify-between gap-6 pb-6 border-b border-slate-100"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <span className="text-sm font-medium text-slate-600 capitalize">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="text-sm text-slate-900 font-light text-right">
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : String(value)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
