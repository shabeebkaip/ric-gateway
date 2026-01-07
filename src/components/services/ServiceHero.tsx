"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Wrench, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ServiceHero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Wrench className="w-4 h-4" />
              Professional Service & Maintenance
            </div>
            <h1 className="text-5xl font-light text-slate-900 leading-tight">
              Expert Medical Equipment
              <span className="block text-blue-600 font-normal mt-2">
                Service & Maintenance
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Comprehensive service solutions for all your medical equipment
              needs. From installation to ongoing maintenance, we ensure your
              devices operate at peak performance.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 py-6 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 text-base font-medium"
              >
                <Link href="/contact">
                  <Phone className="w-5 h-5 mr-2" />
                  Request Service
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-10 py-6 border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 text-base font-medium"
              >
                <a href="tel:+966114654113">
                  <Phone className="w-5 h-5 mr-2" />
                  +966 11 465 4113
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-slate-600">
                    Emergency Support
                  </div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-2xl">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    100%
                  </div>
                  <div className="text-sm text-slate-600">Genuine Parts</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-2xl">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    ISO
                  </div>
                  <div className="text-sm text-slate-600">
                    Certified Service
                  </div>
                </div>
                <div className="text-center p-6 bg-orange-50 rounded-2xl">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    All
                  </div>
                  <div className="text-sm text-slate-600">Major Brands</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
