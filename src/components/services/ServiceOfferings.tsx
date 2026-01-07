"use client";

import { motion } from "framer-motion";
import { Settings, Wrench, Zap, Award, CheckCircle2 } from "lucide-react";

const serviceCategories = [
  {
    icon: Settings,
    title: "Preventive Maintenance",
    description:
      "Scheduled maintenance programs to ensure optimal equipment performance and longevity. Regular inspections, calibrations, and part replacements to prevent unexpected downtime.",
    features: [
      "Scheduled equipment inspections",
      "Performance calibration",
      "Preventive part replacement",
      "Detailed maintenance reports",
    ],
  },
  {
    icon: Wrench,
    title: "Corrective Maintenance",
    description:
      "Expert repair services for all medical equipment. Our certified technicians diagnose and resolve issues quickly to minimize disruption to your operations.",
    features: [
      "24/7 emergency support",
      "Rapid fault diagnosis",
      "Genuine spare parts",
      "Quality assurance testing",
    ],
  },
  {
    icon: Zap,
    title: "Installation & Commissioning",
    description:
      "Professional installation and setup services ensuring your equipment is configured correctly from day one. Complete training for your staff included.",
    features: [
      "Site assessment & preparation",
      "Equipment installation",
      "System configuration",
      "Staff training programs",
    ],
  },
  {
    icon: Award,
    title: "Equipment Upgrades",
    description:
      "Keep your medical equipment current with the latest software updates, hardware upgrades, and performance enhancements.",
    features: [
      "Software updates",
      "Hardware modernization",
      "Performance optimization",
      "Compliance certification",
    ],
  },
];

export function ServiceOfferings() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-light text-slate-900 mb-4">
            Our Service Offerings
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive maintenance and support services designed to keep your
            medical equipment running at optimal performance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {serviceCategories.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium text-slate-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
