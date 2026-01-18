"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, ChevronDown, Package, Building2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import { productCategories, productSubcategories, partners } from "@/lib/data";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AllProductsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [selectedPartner, setSelectedPartner] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Get unique product types
  const productTypes = useMemo(() => {
    const types = new Set(products.map((p) => p.product_type));
    return Array.from(types).sort();
  }, []);

  // Get subcategories for selected category
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === "all") return [];
    return productSubcategories.filter(
      (sub) => sub.categoryId === selectedCategory
    );
  }, [selectedCategory]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesSubcategory =
        selectedSubcategory === "all" ||
        product.sub_category === selectedSubcategory;

      const matchesPartner =
        selectedPartner === "all" || product.partnerId === selectedPartner;

      const matchesType =
        selectedType === "all" || product.product_type === selectedType;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubcategory &&
        matchesPartner &&
        matchesType
      );
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    selectedPartner,
    selectedType,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setSelectedPartner("all");
    setSelectedType("all");
  };

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedSubcategory !== "all",
    selectedPartner !== "all",
    selectedType !== "all",
  ].filter(Boolean).length;

  // Reset subcategory when category changes
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubcategory("all");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container-padding container mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-gold/10 to-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
              Product Catalog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              All <span className="gradient-text">Medical Products</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Browse our complete range of {products.length} medical equipment and healthcare solutions
            </p>

            {/* Search Bar */}
            <motion.div
              className="relative max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products, brands, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 border-2 focus:border-gold transition-colors text-base shadow-lg"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-destructive/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-8 bg-background">
        <div className="container-padding container mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Filters */}
                <div className="glass-card rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filters
                    </h3>
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-7 text-xs gap-1"
                      >
                        <X className="w-3 h-3" />
                        Clear
                      </Button>
                    )}
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Category
                    </label>
                    <Select
                      value={selectedCategory}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {productCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subcategory Filter */}
                  {availableSubcategories.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Subcategory
                      </label>
                      <Select
                        value={selectedSubcategory}
                        onValueChange={setSelectedSubcategory}
                      >
                        <SelectTrigger className="border-2">
                          <SelectValue placeholder="All Subcategories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            All Subcategories
                          </SelectItem>
                          {availableSubcategories.map((sub) => (
                            <SelectItem key={sub.id} value={sub.id}>
                              {sub.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Partner Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Manufacturer
                    </label>
                    <Select
                      value={selectedPartner}
                      onValueChange={setSelectedPartner}
                    >
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="All Manufacturers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Manufacturers</SelectItem>
                        {partners.map((partner) => (
                          <SelectItem key={partner.id} value={partner.id}>
                            {partner.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Product Type Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Product Type
                    </label>
                    <Select
                      value={selectedType}
                      onValueChange={setSelectedType}
                    >
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {productTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <div className="glass-card rounded-xl p-4">
                    <h4 className="text-sm font-medium text-foreground mb-3">
                      Active Filters
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory !== "all" && (
                        <Badge
                          variant="secondary"
                          className="gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          onClick={() => handleCategoryChange("all")}
                        >
                          {
                            productCategories.find(
                              (c) => c.id === selectedCategory
                            )?.name
                          }
                          <X className="w-3 h-3" />
                        </Badge>
                      )}
                      {selectedSubcategory !== "all" && (
                        <Badge
                          variant="secondary"
                          className="gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          onClick={() => setSelectedSubcategory("all")}
                        >
                          {
                            productSubcategories.find(
                              (s) => s.id === selectedSubcategory
                            )?.name
                          }
                          <X className="w-3 h-3" />
                        </Badge>
                      )}
                      {selectedPartner !== "all" && (
                        <Badge
                          variant="secondary"
                          className="gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          onClick={() => setSelectedPartner("all")}
                        >
                          {partners.find((p) => p.id === selectedPartner)?.name}
                          <X className="w-3 h-3" />
                        </Badge>
                      )}
                      {selectedType !== "all" && (
                        <Badge
                          variant="secondary"
                          className="gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          onClick={() => setSelectedType("all")}
                        >
                          {selectedType}
                          <X className="w-3 h-3" />
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Results Count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {filteredProducts.length}
                  </span>{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                  {searchQuery && (
                    <>
                      {" "}
                      matching{" "}
                      <span className="font-semibold text-foreground">
                        "{searchQuery}"
                      </span>
                    </>
                  )}
                </p>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => {
                    const category = productCategories.find(
                      (c) => c.id === product.category
                    );
                    const partner = partners.find(
                      (p) => p.id === product.partnerId
                    );

                    return (
                      <motion.article
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className="group"
                      >
                        <Link
                          href={`/products/${category?.slug || product.category}/${product.id}`}
                          className="block glass-card rounded-xl overflow-hidden hover:shadow-xl hover:border-gold/30 transition-all duration-300 h-full"
                        >
                          {/* Image */}
                          <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-white">
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-20 h-20 text-slate-300" />
                              </div>
                            )}
                            {product.is_parent_product && product.variants && (
                              <div className="absolute top-3 right-3">
                                <Badge
                                  variant="secondary"
                                  className="rounded-full text-xs bg-white/95 backdrop-blur-sm"
                                >
                                  {product.variants.length} Variants
                                </Badge>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-5 space-y-3">
                            {/* Partner Logo */}
                            {partner?.logo && (
                              <div className="flex items-center justify-center h-8">
                                <img
                                  src={partner.logo}
                                  alt={partner.name}
                                  className={`max-h-full max-w-[120px] object-contain ${
                                    partner.invertColor ? "invert" : ""
                                  }`}
                                />
                              </div>
                            )}

                            {/* Product Type */}
                            <Badge
                              variant="secondary"
                              className="rounded-full text-xs"
                            >
                              {product.product_type}
                            </Badge>

                            {/* Product Name */}
                            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>

                            {/* Description */}
                            {product.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {product.description}
                              </p>
                            )}

                            {/* View Details */}
                            <div className="flex items-center gap-2 text-primary font-medium text-sm pt-2">
                              View Details
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="glass-card rounded-2xl p-12 max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-br from-gold/10 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      No Products Found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any products matching your criteria. Try
                      adjusting your filters or search query.
                    </p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
