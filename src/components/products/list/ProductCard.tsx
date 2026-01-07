"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Package,
  Building2,
  Layers,
  ArrowRight,
  FileText,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPartnerById } from "@/lib/productUtils";
import type { ProductCardProps } from "@/types";

export function ProductCard({ product, category, index }: ProductCardProps) {
  const partnerIdToUse = product.partnerId || product.brand;
  const partner = getPartnerById(partnerIdToUse);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10">
        <Link
          href={`/products/${category.slug}/${product.id}`}
          className="block"
        >
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Image Section - 2 columns */}
            <div className="lg:col-span-2 relative aspect-[4/3] bg-gradient-to-br from-slate-50 to-white">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-blue-50/30"></div>

              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="relative w-full h-full object-contain p-6 lg:p-8 group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Package
                    className="w-20 h-20 text-slate-300"
                    strokeWidth={1.5}
                  />
                </div>
              )}

              {/* Status Badge */}
              {product.is_parent_product && product.variants && (
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="outline"
                    className="rounded-full px-3 py-1.5 text-xs font-medium bg-white/95 backdrop-blur-sm border-slate-200 text-slate-700 shadow-sm"
                  >
                    <Layers className="w-3 h-3 mr-1.5" />
                    {product.variants.length} Variants
                  </Badge>
                </div>
              )}
            </div>

            {/* Content Section - 3 columns */}
            <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Meta */}
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    {partner?.logo ? (
                      <div className="relative w-24  flex items-center justify-center">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className={`max-w-full max-h-full object-contain ${
                            partner.invertColor ? "invert" : ""
                          }`}
                        />
                      </div>
                    ) : (
                      <Building2 className="w-4 h-4" strokeWidth={1.5} />
                    )}
                  </div>
                  <Badge
                    variant="secondary"
                    className="rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {product.product_type}
                  </Badge>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl lg:text-2xl font-medium text-slate-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {product.name}
                  </h3>
                </div>

                {/* Description */}
                {product.description && (
                  <p className="text-sm text-slate-600 font-light leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* Footer CTA */}
        <div className="px-6 lg:px-8 pb-6 flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="h-8 px-3 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <Link href="/contact">
                <FileText className="w-3.5 h-3.5 mr-1.5" />
                Request Quote
              </Link>
            </Button>
            <span className="text-slate-300">•</span>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="h-8 px-3 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <a href="tel:+966114654113">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                Call Us
              </a>
            </Button>
          </div>
          <Link
            href={`/products/${category.slug}/${product.id}`}
            className="flex items-center gap-2 text-blue-600 group-hover:gap-3 transition-all duration-300"
          >
            <span className="text-sm font-medium">Learn More</span>
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
