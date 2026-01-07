"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EmptyStateProps } from "@/types";

export function EmptyState({
  hasActiveFilters,
  onClearFilters,
}: EmptyStateProps) {
  return (
    <motion.div
      className="text-center py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center">
        <Filter className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-light text-slate-900 mb-3">
        {hasActiveFilters
          ? "No Products Match Your Filters"
          : "No Products Available"}
      </h3>
      <p className="text-slate-600 font-light mb-8 max-w-md mx-auto">
        {hasActiveFilters
          ? "Try adjusting your filters to see more products."
          : "We're currently updating our product catalog for this category. Please check back soon or contact us for assistance."}
      </p>
      {hasActiveFilters ? (
        <Button
          onClick={onClearFilters}
          variant="outline"
          className="rounded-full px-8 py-6 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
        >
          Clear All Filters
        </Button>
      ) : (
        <Button
          asChild
          variant="outline"
          className="rounded-full px-8 py-6 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
        >
          <Link href="/">Return Home</Link>
        </Button>
      )}
    </motion.div>
  );
}
