"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ProductCTAProps } from "@/types";

export function ProductCTA({
  productName,
  categoryName,
  categorySlug,
}: ProductCTAProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 leading-tight">
              Request Professional Consultation
            </h2>
            <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
              Our medical device specialists are available to provide detailed
              product information, technical specifications, and pricing for{" "}
              {productName}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button
              asChild
              className="rounded-full px-10 py-6 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 text-base font-medium"
            >
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-10 py-6 border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 text-base font-medium"
            >
              <Link href={`/products/${categorySlug}`}>
                Explore {categoryName}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
