"use client";

import { motion } from "framer-motion";
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
            // Render object variants as a table
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    {Object.keys(variants[0] as Record<string, any>).map((key) => (
                      <th
                        key={key}
                        className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider border border-slate-200"
                      >
                        {key.replace(/_/g, " ")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(variants as Record<string, any>[]).map((variant, index) => (
                    <motion.tr
                      key={index}
                      className="hover:bg-slate-50 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      {Object.values(variant).map((value, i) => (
                        <td
                          key={i}
                          className="px-6 py-4 text-sm text-slate-700 border border-slate-200"
                        >
                          {String(value)}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
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
