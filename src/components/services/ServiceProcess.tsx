"use client";

import { motion } from "framer-motion";

const serviceProcess = [
  {
    step: "01",
    title: "Service Request",
    description:
      "Contact us via phone, email, or online form. Our support team will log your request and gather initial details.",
  },
  {
    step: "02",
    title: "Assessment & Scheduling",
    description:
      "Our technical team assesses the issue and schedules a visit at your convenience. Emergency services available 24/7.",
  },
  {
    step: "03",
    title: "On-Site Service",
    description:
      "Certified technician arrives with necessary tools and parts. Diagnoses issue and performs repair or maintenance.",
  },
  {
    step: "04",
    title: "Quality Check & Documentation",
    description:
      "Complete testing to ensure equipment meets performance standards. Detailed service report provided.",
  },
  {
    step: "05",
    title: "Follow-up Support",
    description:
      "Post-service support to ensure continued operation. Scheduled follow-ups for preventive maintenance.",
  },
];

export function ServiceProcess() {
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
            Our Service Process
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            A streamlined, professional approach to ensure your equipment
            receives the best care with minimal disruption.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {serviceProcess.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-sky-600 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-medium text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
