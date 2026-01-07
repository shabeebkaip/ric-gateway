"use client";

import { motion } from "framer-motion";
import {
  Users,
  Shield,
  Clock,
  CheckCircle2,
  Headphones,
  FileText,
} from "lucide-react";

const whyChooseUs = [
  {
    icon: Users,
    title: "Certified Technicians",
    description:
      "Our team consists of factory-trained and certified technicians with extensive experience in medical equipment service and maintenance.",
  },
  {
    icon: Shield,
    title: "Authorized Service Provider",
    description:
      "Official service partner for Dornier MedTech, Wikkon, and authorized to service all major medical equipment brands.",
  },
  {
    icon: Clock,
    title: "Rapid Response Time",
    description:
      "We understand the critical nature of medical equipment. Our team provides quick response times to minimize downtime.",
  },
  {
    icon: CheckCircle2,
    title: "Genuine Parts Guarantee",
    description:
      "All replacement parts are genuine OEM components, ensuring reliability, safety, and warranty compliance.",
  },
  {
    icon: Headphones,
    title: "Comprehensive Support",
    description:
      "From installation to end-of-life, we provide complete lifecycle support including training, maintenance, and technical assistance.",
  },
  {
    icon: FileText,
    title: "SFDA Compliant",
    description:
      "All our service procedures meet Saudi FDA standards and international quality management requirements.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-light text-slate-900 mb-4">
            Why Choose Our Services
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Trusted by healthcare facilities across Saudi Arabia for reliable,
            professional medical equipment service and maintenance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
