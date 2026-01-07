"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CategoryCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 leading-tight">
              Need Expert Guidance?
            </h2>
            <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
              Our medical equipment specialists are here to help you find the
              perfect solution for your healthcare facility's unique
              requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button
              asChild
              className="rounded-full px-10 py-6 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 text-base"
            >
              <Link href="/contact">
                Schedule Consultation
                <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-10 py-6 border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 text-base font-medium"
            >
              <Link href="/#about">About Our Company</Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-3xl font-light text-slate-900 mb-2">
                500+
              </div>
              <div className="text-sm text-slate-600 font-light">
                Medical Products
              </div>
            </motion.div>
            <motion.div
              className="text-center border-x border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-3xl font-light text-slate-900 mb-2">
                15+
              </div>
              <div className="text-sm text-slate-600 font-light">
                Years Experience
              </div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-3xl font-light text-slate-900 mb-2">
                100+
              </div>
              <div className="text-sm text-slate-600 font-light">
                Healthcare Partners
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
