'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  sub_category?: string;
  product_type: string;
  description?: string;
  images?: string[];
  is_parent_product?: boolean;
  variants?: string[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

interface ProductListContentProps {
  category: Category;
  products: Product[];
}

export function ProductListContent({ category, products }: ProductListContentProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container-padding container mx-auto">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              {category.name}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {category.name} <span className="gradient-text">Products</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {category.description}
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Package className="w-4 h-4" />
              <span>{products.length} Products Available</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-background">
        <div className="container-padding container mx-auto">
          {products.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                No Products Found
              </h3>
              <p className="text-muted-foreground mb-6">
                We're currently updating our product catalog for this category.
              </p>
              <Button asChild variant="outline">
                <Link href="/">Return Home</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-12">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={`/products/${category.slug}/${product.id}`}
                    className="block group"
                  >
                    <div className="grid lg:grid-cols-5 gap-8 p-6 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm hover:border-gold/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                      {/* Product Image */}
                      <div className="lg:col-span-2">
                        <div className="relative aspect-[4/3] bg-gradient-to-br from-muted/50 to-background rounded-xl overflow-hidden">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-20 h-20 text-muted-foreground/20" />
                            </div>
                          )}
                          {/* Decorative corner accent */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="lg:col-span-3 flex flex-col justify-between">
                        <div className="space-y-4">
                          {/* Header */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-muted-foreground">{product.brand}</span>
                              {product.is_parent_product && (
                                <>
                                  <span className="text-muted-foreground/50">•</span>
                                  <span className="text-xs text-gold">Multiple Variants Available</span>
                                </>
                              )}
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                              {product.name}
                            </h3>
                            
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5">
                                {product.sub_category || product.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {product.product_type}
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          {product.description && (
                            <p className="text-muted-foreground leading-relaxed line-clamp-3">
                              {product.description}
                            </p>
                          )}

                          {/* Variants Info */}
                          {product.variants && product.variants.length > 0 && (
                            <div className="flex items-center gap-2 pt-2">
                              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/40">
                                <Package className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="text-xs font-medium text-foreground">
                                  {product.variants.length} Configuration{product.variants.length > 1 ? 's' : ''}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between pt-6 mt-6 border-t border-border/40">
                          <span className="text-sm text-muted-foreground">
                            Learn more about specifications and availability
                          </span>
                          <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-300">
                            <span className="text-sm font-semibold">View Details</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-gold/5 to-primary/10">
        <div className="container-padding container mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Need Help Finding the Right Product?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team of experts is ready to assist you in selecting the best medical equipment for your facility.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="hero" size="lg">
                <Link href="/contact">Contact Our Team</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#about">Learn More About RIC</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
