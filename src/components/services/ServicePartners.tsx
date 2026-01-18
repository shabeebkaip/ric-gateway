"use client";

import { motion } from "framer-motion";
import { partners } from "@/lib/data";

export function ServicePartners() {
  const servicePartners = partners.filter(
    (partner) => partner.id !== "allwin" && partner.id !== "boston-scientific"
  );

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-light text-slate-900 mb-3">
            Service & Maintenance Partners
          </h2>
          <p className="text-base text-slate-600 max-w-3xl mx-auto">
            We provide comprehensive service and maintenance solutions for all
            leading medical equipment brands, ensuring expert care for your
            critical devices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {servicePartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 relative"
            >
              {partner.tag && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                  {partner.tag}
                </div>
              )}
              <div className="flex items-center justify-center mb-3 h-14">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`max-h-12 w-auto object-contain ${
                    partner.invertColor ? "invert" : ""
                  }`}
                />
              </div>
              <h3 className="text-base font-medium text-slate-900 text-center mb-1">
                {partner.name}
              </h3>
              <p className="text-xs text-slate-600 text-center line-clamp-2">
                {partner.products.join(", ")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
