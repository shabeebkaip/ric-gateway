"use client";

import { Filter, X, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Subcategory, ProductFiltersProps } from "@/types";

export function ProductFilters({
  subcategories,
  availableBrands,
  selectedSubcategory,
  selectedBrands,
  showFilters,
  filteredProductCount,
  searchQuery,
  onSubcategoryChange,
  onBrandToggle,
  onClearFilters,
  onToggleFilters,
  onSearchChange,
}: ProductFiltersProps) {
  const hasActiveFilters =
    selectedSubcategory !== null || selectedBrands.length > 0 || searchQuery.trim() !== "";

  if (subcategories.length === 0 && availableBrands.length <= 1) {
    return null;
  }

  return (
    <section className="sticky top-0 z-40 bg-slate-50 border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-6 max-w-7xl py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products by name, brand, or description..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 rounded-full border-2 border-blue-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Mobile Filter Toggle */}
          <button
            onClick={onToggleFilters}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
            {hasActiveFilters && (
              <Badge className="ml-1 bg-blue-500 text-white px-2 py-0.5 text-xs">
                {(selectedSubcategory ? 1 : 0) + selectedBrands.length + (searchQuery.trim() ? 1 : 0)}
              </Badge>
            )}
          </button>

          {/* Desktop Filters */}
          <div
            className={`${
              showFilters ? "flex" : "hidden lg:flex"
            } flex-1 flex-wrap items-center gap-3 max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:right-0 max-lg:bg-white max-lg:border-b max-lg:border-slate-200 max-lg:p-6 max-lg:shadow-lg`}
          >
            {/* Subcategory Filter */}
            {subcategories.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-slate-600">
                  Category:
                </span>
                <button
                  onClick={() => onSubcategoryChange(null)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedSubcategory === null
                      ? "bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  All
                </button>
                {subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() =>
                      onSubcategoryChange(
                        sub.id === selectedSubcategory ? null : sub.id
                      )
                    }
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedSubcategory === sub.id
                        ? "bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}

            {/* Brand Filter */}
            {availableBrands.length > 1 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-slate-600">
                  Brand:
                </span>
                {availableBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => onBrandToggle(brand)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedBrands.includes(brand)
                        ? "bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium"
            >
              <X className="w-4 h-4" />
              <span className="max-lg:hidden">Clear</span>
            </button>
          )}
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500">Active filters:</span>
            {searchQuery.trim() && (
              <Badge
                variant="outline"
                className="rounded-full px-2 py-1 text-xs"
              >
                Search: {searchQuery}
              </Badge>
            )}
            {selectedSubcategory && (
              <Badge
                variant="outline"
                className="rounded-full px-2 py-1 text-xs"
              >
                {subcategories.find((s) => s.id === selectedSubcategory)?.name}
              </Badge>
            )}
            {selectedBrands.map((brand) => (
              <Badge
                key={brand}
                variant="outline"
                className="rounded-full px-2 py-1 text-xs"
              >
                {brand}
              </Badge>
            ))}
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-blue-600">
              {filteredProductCount} result
              {filteredProductCount !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
