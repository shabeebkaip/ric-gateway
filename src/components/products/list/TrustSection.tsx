"use client";

import { motion } from "framer-motion";

export function TrustSection() {
  const features = [
    { title: "Quality Assured", desc: "ISO certified products" },
    { title: "Expert Support", desc: "Technical assistance" },
    { title: "Fast Delivery", desc: "Nationwide coverage" },
    { title: "Trusted Partner", desc: "Healthcare excellence" },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="grid md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="text-center space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <h4 className="text-sm font-medium text-slate-900">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 font-light">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
