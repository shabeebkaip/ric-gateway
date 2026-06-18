"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Building2,
  FileText,
  Microscope,
  Stethoscope,
  Home,
  Maximize2,
  ArrowLeft,
  MapPin,
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isZoomViewOpen, setIsZoomViewOpen] = useState(false);

  const allImages =
    product.images && product.images.length > 0 ? product.images : [];
  const mainImage = allImages[selectedImageIndex] || null;

  const partnerIdToUse = product.partnerId || product.brand;
  const partner = getPartnerById(partnerIdToUse);

  const breadcrumbs = [
    {
      label: <Home className="w-3.5 h-3.5" />,
      href: "/",
      ariaLabel: "Home",
    },
    {
      label: "Products",
      href: "/products",
      ariaLabel: "Products Overview",
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
        {/* Back Button */}
        <motion.button
          onClick={() => window.history.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 font-medium group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back
        </motion.button>

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
          {!product.show_image_main && allImages.length > 0 && (
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sticky top-40">
                {mainImage ? (
                  <div className="space-y-4">
                    {/* Main Image with Hover Zoom */}
                    <div
                      className="relative aspect-square bg-white rounded-[20px] overflow-hidden shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_1px_2px_-1px_rgba(15,23,42,0.03)] p-12 cursor-pointer group"
                      onMouseEnter={() => setIsImageHovered(true)}
                      onMouseLeave={() => setIsImageHovered(false)}
                      onClick={() => setIsZoomViewOpen(true)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-60"></div>

                      {/* Zoom Icon Indicator */}
                      <motion.div
                        className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: isImageHovered ? 1 : 0,
                          scale: isImageHovered ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Maximize2 className="w-4 h-4 text-slate-700" />
                      </motion.div>

                      {/* Main Image */}
                      <motion.div
                        key={selectedImageIndex}
                        className="absolute inset-0"
                        animate={{ scale: isImageHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <Image
                          src={mainImage}
                          alt={product.imageAlt || product.name}
                          title={product.imageTitle || product.name}
                          fill
                          className="object-contain p-12"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          priority
                        />
                      </motion.div>
                    </div>

                    {/* Gallery Thumbnails */}
                    {allImages.length > 1 && (
                      <div className="grid grid-cols-4 gap-3">
                        {allImages.map((image, index) => (
                          <motion.div
                            key={index}
                            className={`aspect-square bg-white rounded-xl overflow-hidden shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_1px_2px_-1px_rgba(15,23,42,0.03)] cursor-pointer p-2 transition-all duration-200 ${
                              selectedImageIndex === index
                                ? "ring-2 ring-blue-600 shadow-md"
                                : "hover:shadow-md hover:ring-2 hover:ring-slate-300"
                            }`}
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setSelectedImageIndex(index)}
                          >
                            <Image
                              src={image}
                              alt={`${product.name} - ${index + 1}`}
                              fill
                              className="object-contain"
                              sizes="80px"
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </motion.div>
          )}

          {/* Product Information */}
          <motion.div
            className={`space-y-8 ${product.show_image_main || allImages.length === 0 ? "lg:col-span-5" : "lg:col-span-3"}`}
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
                  <div className="relative w-28 h-10 flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={112}
                      height={40}
                      className={`max-w-full max-h-full object-contain ${
                        partner.invertColor ? "invert" : ""
                      }`}
                    />
                  </div>
                ) : (
                  <Building2 className="w-5 h-5" strokeWidth={1.5} />
                )}
              </div>
              <h1 className="text-4xl font-light text-slate-900 leading-tight tracking-tight">
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
                className="rounded-full px-8 py-6 border-2 border-slate-200 hover:border-slate-300 hover:from-blue-600 hover:to-sky-600 transition-all duration-300"
              >
                <a href="tel:+966114654113">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Call Us: +966 11 465 4113 (Ext. 106)
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-8 py-6 border-2 border-slate-200 hover:border-slate-300 transition-all duration-300"
              >
                <a
                  href="https://www.google.com/maps/place/RIYADH+INTERNATIONAL+CORPORATION/@24.7166169,46.680542,17z/data=!3m1!4b1!4m6!3m5!1s0x3e2f03048c8ab6cd:0x37200af5e3ccaffc!8m2!3d24.7166169!4d46.6831169!16s%2Fg%2F1tj6fgpd?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Visit Office
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Zoom Modal */}
        <AnimatePresence>
          {isZoomViewOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomViewOpen(false)}
            >
              <motion.div
                className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsZoomViewOpen(false)}
                  className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-slate-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="flex flex-col h-full">
                  {/* Large Image Display */}
                  <div className="flex-1 flex items-center justify-center p-12 bg-gradient-to-br from-slate-50 to-white">
                    <motion.div
                      key={selectedImageIndex}
                      className="relative w-full h-full"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src={mainImage}
                        alt={product.imageAlt || product.name}
                        fill
                        className="object-contain"
                        sizes="90vw"
                      />
                    </motion.div>
                  </div>

                  {/* Thumbnail Navigation */}
                  {allImages.length > 1 && (
                    <div className="border-t border-slate-200 bg-white p-4">
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {allImages.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 bg-white rounded-lg overflow-hidden border-2 transition-all ${
                              selectedImageIndex === index
                                ? "border-blue-600 shadow-md scale-105"
                                : "border-slate-200 hover:border-slate-400"
                            }`}
                          >
                            <Image
                              src={image}
                              alt={`${product.name} - ${index + 1}`}
                              fill
                              className="object-contain p-1"
                              sizes="80px"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
