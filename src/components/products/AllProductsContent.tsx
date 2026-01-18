"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, ChevronDown, Package, Building2, ArrowRight, Sparkles } from "lucide-react";
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
      {/* Hero Section - Enhanced with better spacing and visual hierarchy */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 via-primary/3 to-background relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>
        
        <div className="container-padding container mx-auto relative">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold/10 to-primary/10 text-primary font-semibold rounded-full text-sm mb-6 border border-primary/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Sparkles className="w-4 h-4" />
              Product Catalog
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              All <span className="gradient-text">Medical Products</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Browse our complete range of <span className="font-semibold text-foreground">{products.length}</span> medical equipment and healthcare solutions
            </p>

            {/* Enhanced Search Bar with better shadow and focus states */}
            <motion.div
              className="relative max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Search products, brands, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-14 border-2 focus:border-gold transition-all text-base shadow-lg hover:shadow-xl focus:shadow-2xl rounded-xl"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-destructive/10 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Sidebar - Enhanced spacing */}
      <section className="py-12 bg-background">
        <div className="container-padding container mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters - Enhanced with better visual separation */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Filters Card - Enhanced with subtle shadow */}
                <motion.div 
                  className="glass-card rounded-2xl p-6 space-y-5 shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-border/50">
                    <h3 className="font-semibold text-foreground flex items-center gap-2 text-lg">
                      <Filter className="w-5 h-5 text-primary" />
                      Filters
                    </h3>
                    <AnimatePresence>
                      {activeFiltersCount > 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="h-8 text-xs gap-1.5 hover:bg-destructive/10 hover:text-destructive rounded-lg"
                          >
                            <X className="w-3.5 h-3.5" />
                            Clear All
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-2.5">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Category
                    </label>
                    <Select
                      value={selectedCategory}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger className="border-2 hover:border-primary/30 transition-colors rounded-lg h-11">
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
                  <AnimatePresence>
                    {availableSubcategories.length > 0 && (
                      <motion.div
                        className="space-y-2.5"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          Subcategory
                        </label>
                        <Select
                          value={selectedSubcategory}
                          onValueChange={setSelectedSubcategory}
                        >
                          <SelectTrigger className="border-2 hover:border-primary/30 transition-colors rounded-lg h-11">
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
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Partner Filter */}
                  <div className="space-y-2.5">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Manufacturer
                    </label>
                    <Select
                      value={selectedPartner}
                      onValueChange={setSelectedPartner}
                    >
                      <SelectTrigger className="border-2 hover:border-primary/30 transition-colors rounded-lg h-11">
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
                  <div className="space-y-2.5">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Product Type
                    </label>
                    <Select
                      value={selectedType}
                      onValueChange={setSelectedType}
                    >
                      <SelectTrigger className="border-2 hover:border-primary/30 transition-colors rounded-lg h-11">
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
                </motion.div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Active Filters - Top of products list */}
              <AnimatePresence>
                {activeFiltersCount > 0 && (
                  <motion.div
                    className="mb-6 border-l-4 border-primary/60"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-gradient-to-r from-primary/5 via-gold/5 to-transparent rounded-r-xl p-5 pr-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Filter className="w-4 h-4 text-primary" />
                          </div>
                          <h4 className="text-base font-semibold text-foreground">
                            Active Filters
                          </h4>
                          <Badge 
                            variant="secondary" 
                            className="rounded-full h-6 min-w-6 px-2 flex items-center justify-center text-xs font-bold bg-primary/10 text-primary border-0"
                          >
                            {activeFiltersCount}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="h-8 text-xs gap-1.5 hover:bg-destructive/10 hover:text-destructive rounded-lg font-medium"
                        >
                          <X className="w-3.5 h-3.5" />
                          Clear All
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        <AnimatePresence>
                          {selectedCategory !== "all" && (
                            <motion.div
                              key="filter-category"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge
                                variant="secondary"
                                className="gap-2 pl-3.5 pr-2 py-2 cursor-pointer bg-white hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 rounded-lg border border-primary/20 hover:border-destructive shadow-sm group"
                                onClick={() => handleCategoryChange("all")}
                              >
                                <span className="text-sm font-medium">
                                  {
                                    productCategories.find(
                                      (c) => c.id === selectedCategory
                                    )?.name
                                  }
                                </span>
                                <div className="w-5 h-5 rounded-md flex items-center justify-center bg-primary/10 group-hover:bg-destructive-foreground/20 transition-colors">
                                  <X className="w-3 h-3" />
                                </div>
                              </Badge>
                            </motion.div>
                          )}
                          {selectedSubcategory !== "all" && (
                            <motion.div
                              key="filter-subcategory"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge
                                variant="secondary"
                                className="gap-2 pl-3.5 pr-2 py-2 cursor-pointer bg-white hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 rounded-lg border border-primary/20 hover:border-destructive shadow-sm group"
                                onClick={() => setSelectedSubcategory("all")}
                              >
                                <span className="text-sm font-medium">
                                  {
                                    productSubcategories.find(
                                      (s) => s.id === selectedSubcategory
                                    )?.name
                                  }
                                </span>
                                <div className="w-5 h-5 rounded-md flex items-center justify-center bg-primary/10 group-hover:bg-destructive-foreground/20 transition-colors">
                                  <X className="w-3 h-3" />
                                </div>
                              </Badge>
                            </motion.div>
                          )}
                          {selectedPartner !== "all" && (
                            <motion.div
                              key="filter-partner"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge
                                variant="secondary"
                                className="gap-2 pl-3.5 pr-2 py-2 cursor-pointer bg-white hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 rounded-lg border border-primary/20 hover:border-destructive shadow-sm group"
                                onClick={() => setSelectedPartner("all")}
                              >
                                <span className="text-sm font-medium">
                                  {partners.find((p) => p.id === selectedPartner)?.name}
                                </span>
                                <div className="w-5 h-5 rounded-md flex items-center justify-center bg-primary/10 group-hover:bg-destructive-foreground/20 transition-colors">
                                  <X className="w-3 h-3" />
                                </div>
                              </Badge>
                            </motion.div>
                          )}
                          {selectedType !== "all" && (
                            <motion.div
                              key="filter-type"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge
                                variant="secondary"
                                className="gap-2 pl-3.5 pr-2 py-2 cursor-pointer bg-white hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 rounded-lg border border-primary/20 hover:border-destructive shadow-sm group"
                                onClick={() => setSelectedType("all")}
                              >
                                <span className="text-sm font-medium">{selectedType}</span>
                                <div className="w-5 h-5 rounded-md flex items-center justify-center bg-primary/10 group-hover:bg-destructive-foreground/20 transition-colors">
                                  <X className="w-3 h-3" />
                                </div>
                              </Badge>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results Count - Enhanced typography */}
              <div className="mb-8 flex items-center justify-between">
                <p className="text-muted-foreground text-base">
                  <span className="font-semibold text-foreground text-lg">
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

              {/* Products Grid - Enhanced cards */}
              {filteredProducts.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
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
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ 
                            delay: index * 0.03, 
                            duration: 0.4,
                            layout: { duration: 0.3 }
                          }}
                          className="group"
                        >
                          <Link
                            href={`/products/${category?.slug || product.category}/${product.id}`}
                            className="block glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:border-gold/30 transition-all duration-300 h-full"
                          >
                            {/* Image - Enhanced with better overlay */}
                            <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-white overflow-hidden">
                              {product.images && product.images.length > 0 ? (
                                <>
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                                  />
                                  {/* Subtle gradient overlay on hover */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </>
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="w-20 h-20 text-slate-300" />
                                </div>
                              )}
                              {product.is_parent_product && product.variants && (
                                <div className="absolute top-4 right-4">
                                  <Badge
                                    variant="secondary"
                                    className="rounded-full text-xs bg-white/95 backdrop-blur-sm shadow-lg border border-border/50"
                                  >
                                    {product.variants.length} Variants
                                  </Badge>
                                </div>
                              )}
                            </div>

                            {/* Content - Enhanced spacing and typography */}
                            <div className="p-6 space-y-3.5">
                              {/* Partner Logo */}
                              {partner?.logo && (
                                <div className="flex items-center justify-center h-8 mb-1">
                                  <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className={`max-h-full max-w-[120px] object-contain transition-opacity group-hover:opacity-80 ${
                                      partner.invertColor ? "invert" : ""
                                    }`}
                                  />
                                </div>
                              )}

                              {/* Product Type */}
                              <Badge
                                variant="secondary"
                                className="rounded-full text-xs font-medium"
                              >
                                {product.product_type}
                              </Badge>

                              {/* Product Name - Enhanced with better line height */}
                              <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug min-h-[2.5rem]">
                                {product.name}
                              </h3>

                              {/* Description - Enhanced readability */}
                              {product.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                  {product.description}
                                </p>
                              )}

                              {/* View Details - Enhanced with better visual feedback */}
                              <div className="flex items-center gap-2 text-primary font-medium text-sm pt-3 border-t border-border/50 group-hover:gap-3 transition-all">
                                View Details
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                              </div>
                            </div>
                          </Link>
                        </motion.article>
                      );
                    })}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="glass-card rounded-2xl p-12 max-w-md mx-auto shadow-lg">
                    <motion.div 
                      className="w-24 h-24 bg-gradient-to-br from-gold/10 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Search className="w-12 h-12 text-muted-foreground" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      No Products Found
                    </h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      We couldn't find any products matching your criteria. Try
                      adjusting your filters or search query.
                    </p>
                    <Button onClick={clearFilters} variant="outline" className="gap-2 h-11 px-6 rounded-lg hover:shadow-md transition-shadow">
                      <X className="w-4 h-4" />
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