"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Package, Grid3x3, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { CategoryHeroProps } from "@/types";

export function CategoryHero({
  category,
  productCount,
  subcategoryCount,
}: CategoryHeroProps) {
  const breadcrumbs = [
    {
      label: <Home className="w-3.5 h-3.5" />,
      href: "/",
      ariaLabel: "Home",
    },
    {
      label: category.name,
      href: null,
    },
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      {/* Decorative blurs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full blur-[80px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-200 rounded-full blur-[80px] opacity-40 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
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
                      <BreadcrumbPage className="text-slate-900 font-medium">
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

        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge
            variant="outline"
            className="mb-6 rounded-full px-5 py-2 text-xs font-medium border-blue-200 text-blue-700 bg-blue-50/80 backdrop-blur-sm"
          >
            {category.name} Collection
          </Badge>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 mb-6 leading-tight tracking-tight">
            {category.name}
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light max-w-3xl mx-auto mb-8">
            {category.description}
          </p>

          <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_1px_2px_-1px_rgba(15,23,42,0.03)]">
              <Package className="w-4 h-4" strokeWidth={1.5} />
              <span className="font-medium">
                {productCount} Products
              </span>
            </div>
            {subcategoryCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_1px_2px_-1px_rgba(15,23,42,0.03)]">
                <Grid3x3 className="w-4 h-4" strokeWidth={1.5} />
                <span className="font-medium">
                  {subcategoryCount} Categories
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
