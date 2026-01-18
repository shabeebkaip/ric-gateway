"use client";

import { motion } from "framer-motion";
import { Settings, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TechnicalSpecificationsProps } from "@/types";

export function TechnicalSpecifications({
  specifications,
}: TechnicalSpecificationsProps) {
  if (!specifications || Object.keys(specifications).length === 0) return null;

  const formatKey = (key: string): string => {
    return key
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderValue = (value: any): JSX.Element => {
    // Handle null/undefined
    if (value === null || value === undefined || value === "") {
      return <span className="text-slate-400 italic text-sm">Not specified</span>;
    }

    // Handle arrays
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="text-slate-400 italic text-sm">None</span>;
      }
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((item, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="bg-blue-50 text-blue-700 border-blue-200 font-normal text-xs px-3 py-1"
            >
              {String(item)}
            </Badge>
          ))}
        </div>
      );
    }

    // Handle objects
    if (typeof value === "object") {
      return (
        <div className="space-y-2 bg-slate-50 rounded-lg p-3 border border-slate-200">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey} className="flex items-start gap-3 text-sm">
              <ChevronRight className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <span className="font-medium text-slate-600">{formatKey(subKey)}: </span>
                <span className="text-slate-800">
                  {Array.isArray(subValue)
                    ? subValue.join(", ")
                    : String(subValue)}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Handle booleans
    if (typeof value === "boolean") {
      return (
        <Badge
          variant={value ? "default" : "secondary"}
          className="font-normal text-xs"
        >
          {value ? "Yes" : "No"}
        </Badge>
      );
    }

    // Handle numbers and strings
    return (
      <span className="text-slate-900 font-medium text-sm">
        {String(value)}
      </span>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-blue-100">
              <Settings className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl lg:text-4xl font-light text-slate-900">
              Technical Specifications
            </h2>
          </div>
          <p className="text-slate-600 mb-10 max-w-2xl">
            Detailed technical parameters and measurements
          </p>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="divide-y divide-slate-100">
              {Object.entries(specifications).map(([key, value], index) => (
                <motion.div
                  key={key}
                  className="grid md:grid-cols-5 gap-4 p-6 hover:bg-slate-50/50 transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="md:col-span-2">
                    <dt className="text-sm font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      {formatKey(key)}
                    </dt>
                  </div>
                  <div className="md:col-span-3">
                    <dd className="flex items-start">{renderValue(value)}</dd>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
