"use client";

import { motion } from "framer-motion";
import { Activity, Microscope, Award, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ProductInfoCardsProps } from "@/types";

export function ProductInfoCards({
  features,
  applications,
  key_benefits,
  certifications,
  regulatory,
}: ProductInfoCardsProps) {
  const hasContent =
    (features && features.length > 0) ||
    (applications && applications.length > 0) ||
    (key_benefits && key_benefits.length > 0) ||
    (certifications && certifications.length > 0) ||
    regulatory;

  if (!hasContent) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Features */}
          {features && features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="medical-card border-none elevated-shadow h-full">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-blue-100">
                      <Activity
                        className="w-5 h-5 text-blue-600"
                        strokeWidth={1.5}
                      />
                    </div>
                    <CardTitle className="text-2xl font-light text-slate-900">
                      Key Features
                    </CardTitle>
                  </div>
                  <p className="text-sm text-slate-500 font-light">
                    Technical capabilities and highlights
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-slate-700 leading-relaxed font-light">
                          {feature}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Applications */}
          {applications && applications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/90 backdrop-blur-[10px] border-slate-200/80 rounded-2xl hover:border-blue-300/30 hover:shadow-[0_8px_16px_-4px_rgba(59,130,246,0.08)] shadow-[0_4px_6px_-1px_rgba(15,23,42,0.04),0_2px_4px_-2px_rgba(15,23,42,0.04)] transition-all duration-300 h-full">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-sky-100">
                      <Microscope
                        className="w-5 h-5 text-sky-600"
                        strokeWidth={1.5}
                      />
                    </div>
                    <CardTitle className="text-2xl font-light text-slate-900">
                      Clinical Applications
                    </CardTitle>
                  </div>
                  <p className="text-sm text-slate-500 font-light">
                    Recommended uses and procedures
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.map((application, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-slate-700 leading-relaxed font-light">
                          {application}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Key Benefits */}
          {key_benefits && key_benefits.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/90 backdrop-blur-[10px] border-slate-200/80 rounded-2xl hover:border-blue-300/30 hover:shadow-[0_8px_16px_-4px_rgba(59,130,246,0.08)] shadow-[0_4px_6px_-1px_rgba(15,23,42,0.04),0_2px_4px_-2px_rgba(15,23,42,0.04)] transition-all duration-300 h-full">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-emerald-100">
                      <Award
                        className="w-5 h-5 text-emerald-600"
                        strokeWidth={1.5}
                      />
                    </div>
                    <CardTitle className="text-2xl font-light text-slate-900">
                      Clinical Benefits
                    </CardTitle>
                  </div>
                  <p className="text-sm text-slate-500 font-light">
                    Advantages and outcomes
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {key_benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-slate-700 leading-relaxed font-light">
                          {benefit}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Certifications & Regulatory */}
          {((certifications && certifications.length > 0) || regulatory) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/90 backdrop-blur-[10px] border-slate-200/80 rounded-2xl hover:border-blue-300/30 hover:shadow-[0_8px_16px_-4px_rgba(59,130,246,0.08)] shadow-[0_4px_6px_-1px_rgba(15,23,42,0.04),0_2px_4px_-2px_rgba(15,23,42,0.04)] transition-all duration-300 h-full">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-violet-100">
                      <Shield
                        className="w-5 h-5 text-violet-600"
                        strokeWidth={1.5}
                      />
                    </div>
                    <CardTitle className="text-2xl font-light text-slate-900">
                      Compliance & Standards
                    </CardTitle>
                  </div>
                  <p className="text-sm text-slate-500 font-light">
                    Certifications and regulatory information
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {certifications && certifications.length > 0 && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-3">
                        Certifications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {certifications.map((cert, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="rounded-full px-4 py-1.5 text-xs font-medium border-slate-200 bg-white"
                          >
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {regulatory && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-3">
                        Regulatory
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(regulatory).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-start gap-3 text-sm"
                          >
                            <span className="font-medium text-slate-600 capitalize min-w-[120px]">
                              {key.replace(/_/g, " ")}:
                            </span>
                            <span className="text-slate-700 font-light">
                              {String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
