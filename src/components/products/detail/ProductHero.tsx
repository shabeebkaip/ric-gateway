"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import {
  Building2,
  FileText,
  Microscope,
  Stethoscope,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPartnerById } from "@/lib/productUtils";
import type { ProductHeroProps } from "@/types";

export function ProductHero({ product, category }: ProductHeroProps) {
  const mainImage =
    product.images && product.images.length > 0 ? product.images[0] : null;
  const galleryImages =
    product.images && product.images.length > 1 ? product.images.slice(1) : [];

  const partnerIdToUse = product.partnerId || product.brand;
  const partner = getPartnerById(partnerIdToUse);

  const breadcrumbs = [
    {
      label: <Home className="w-3.5 h-3.5" />,
      href: "/",
      ariaLabel: "Home",
    },
    {
      label: category.name,
      href: `/products/${category.slug}`,
    },
    {
      label: product.name,
      href: null,
    },
  ];

  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Breadcrumbs */}
        <motion.nav
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Breadcrumb"
        >
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink asChild>
                        <Link
                          href={item.href}
                          className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors font-medium"
                          aria-label={item.ariaLabel}
                        >
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-slate-900 font-medium max-w-[200px] md:max-w-none truncate">
                        {item.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </motion.nav>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Product Showcase */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-40">
              {mainImage ? (
                <div className="space-y-4">
                  <div className="relative aspect-square bg-white rounded-[20px] overflow-hidden shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_1px_2px_-1px_rgba(15,23,42,0.03)] p-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-60"></div>
                    <img
                      src={mainImage}
                      alt={product.name}
                      className="relative w-full h-full object-contain"
                    />
                  </div>
                  {galleryImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-3">
                      {galleryImages.slice(0, 4).map((image, index) => (
                        <motion.div
                          key={index}
                          className="aspect-square bg-white rounded-xl overflow-hidden shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_1px_2px_-1px_rgba(15,23,42,0.03)] cursor-pointer hover:shadow-md transition-shadow p-2"
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <img
                            src={image}
                            alt={`${product.name} - ${index + 2}`}
                            className="w-full h-full object-contain"
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-square bg-white rounded-[20px] flex items-center justify-center shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_1px_2px_-1px_rgba(15,23,42,0.03)]">
                  <Microscope
                    className="w-24 h-24 text-slate-300"
                    strokeWidth={1.5}
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Information */}
          <motion.div
            className="lg:col-span-3 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-500">
                {partner?.logo ? (
                  <div className="relative w-28  flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className={`max-w-full max-h-full object-contain ${
                        partner.invertColor ? "invert" : ""
                      }`}
                    />
                  </div>
                ) : (
                  <Building2 className="w-5 h-5" strokeWidth={1.5} />
                )}
              </div>
              <h1 className="text-4xl  font-light text-slate-900 leading-tight tracking-tight">
                {product.name}
              </h1>
              {product.full_name && product.full_name !== product.name && (
                <p className="text-md text-slate-600 font-light">
                  {product.full_name}
                </p>
              )}
              {product.description && (
                <p className="text-slate-600 leading-relaxed font-light max-w-3xl">
                  {product.description}
                </p>
              )}
            </div>

            {/* Quick Info Grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white/90 backdrop-blur-[10px] border border-slate-200/80 rounded-2xl p-6 space-y-2 hover:border-blue-300/30 hover:shadow-[0_8px_16px_-4px_rgba(59,130,246,0.08)] transition-all duration-300">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
                  Classification
                </div>
                <div className="text-base font-medium text-slate-900">
                  {product.product_type}
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-[10px] border border-slate-200/80 rounded-2xl p-6 space-y-2 hover:border-blue-300/30 hover:shadow-[0_8px_16px_-4px_rgba(59,130,246,0.08)] transition-all duration-300">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
                  Category
                </div>
                <div className="text-base font-medium text-slate-900">
                  {category.name}
                </div>
              </div>
              {product.variants && product.variants.length > 0 && (
                <div className="bg-white/90 backdrop-blur-[10px] border border-slate-200/80 rounded-2xl p-6 space-y-2 hover:border-blue-300/30 hover:shadow-[0_8px_16px_-4px_rgba(59,130,246,0.08)] transition-all duration-300">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
                    Variants
                  </div>
                  <div className="text-base font-medium text-slate-900">
                    {product.variants.length} Available
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                asChild
                className="rounded-full px-8 py-6 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white shadow-lg shadow-blue-500/30 transition-all duration-300"
              >
                <Link href="/contact">
                  <FileText className="w-4 h-4 mr-2" />
                  Request for Quotation
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-8 py-6 border-2 border-slate-200 hover:border-slate-300 hover:from-blue-600 hover:to-sky-600  transition-all duration-300"
              >
                <a href="tel:+966114654113">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Call Us: +966 11 465 4113
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
