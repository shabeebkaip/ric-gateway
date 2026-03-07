"use client";

import { useState, useMemo } from "react";
import {
  CategoryHero,
  ProductFilters,
  ProductGrid,
  EmptyState,
  CategoryCTA,
  TrustSection,
} from "./list";
import type {
  Product,
  Subcategory,
  ProductListContentProps,
} from "@/types";

type GroupedProducts = Record<
  string,
  { subcategory: Subcategory; products: Product[] }
>;

export function ProductListContent({
  category,
  products,
  subcategories = [],
}: ProductListContentProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique brands from products
  const availableBrands = useMemo(() => {
    const brands = new Set(products.map((p) => p.brand));
    return Array.from(brands).sort();
  }, [products]);

  // Filter products based on selections
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.product_type?.toLowerCase().includes(query)
      );
    }

    // Filter by subcategory
    if (selectedSubcategory) {
      filtered = filtered.filter((p) => p.sub_category === selectedSubcategory);
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    return filtered;
  }, [products, selectedSubcategory, selectedBrands, searchQuery]);

  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedSubcategory(null);
    setSelectedBrands([]);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedSubcategory !== null || selectedBrands.length > 0 || searchQuery.trim() !== "";

  // Group products by subcategory
  const groupedProducts =
    subcategories.length > 0
      ? subcategories.reduce((acc, subcategory) => {
          const subcategoryProducts = filteredProducts.filter(
            (product) => product.sub_category === subcategory.id
          );
          if (subcategoryProducts.length > 0) {
            acc[subcategory.id] = {
              subcategory,
              products: subcategoryProducts,
            };
          }
          return acc;
        }, {} as Record<string, { subcategory: Subcategory; products: Product[] }>)
      : null;

  // Products without subcategories
  const ungroupedProducts = groupedProducts
    ? filteredProducts.filter(
        (product) =>
          !subcategories.some((sub) => sub.id === product.sub_category)
      )
    : filteredProducts;

  const hasSubcategories =
    groupedProducts && Object.keys(groupedProducts).length > 0;

  return (
    <div className="min-h-screen bg-white antialiased">
      <CategoryHero
        category={category}
        productCount={filteredProducts.length}
        subcategoryCount={subcategories.length}
      />

      <ProductFilters
        subcategories={subcategories}
        availableBrands={availableBrands}
        selectedSubcategory={selectedSubcategory}
        selectedBrands={selectedBrands}
        showFilters={showFilters}
        filteredProductCount={filteredProducts.length}
        searchQuery={searchQuery}
        onSubcategoryChange={setSelectedSubcategory}
        onBrandToggle={toggleBrand}
        onClearFilters={clearFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onSearchChange={setSearchQuery}
      />

      {/* Products Section */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          {filteredProducts.length === 0 ? (
            <EmptyState
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearFilters}
            />
          ) : (
            <ProductGrid
              products={filteredProducts}
              category={category}
              subcategories={subcategories}
              hasSubcategories={hasSubcategories}
              groupedProducts={groupedProducts}
              ungroupedProducts={ungroupedProducts}
            />
          )}
        </div>
      </section>

      <CategoryCTA />
      
      <TrustSection />
    </div>
  );
}
