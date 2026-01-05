"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, ArrowRight, Building2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export function ProductListContent({
  category,
  products,
}: ProductListContentProps) {
  return (
    <div className="min-h-screen bg-white antialiased">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
        {/* Decorative blurs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full blur-[80px] opacity-40 pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-200 rounded-full blur-[80px] opacity-40 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
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
                <span className="font-medium">{products.length} Products</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          {products.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center">
                <Package className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-3">
                No Products Available
              </h3>
              <p className="text-slate-600 font-light mb-8 max-w-md mx-auto">
                We're currently updating our product catalog for this category. Please check back soon or contact us for assistance.
              </p>
              <Button 
                asChild 
                variant="outline"
                className="rounded-full px-8 py-6 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              >
                <Link href="/">Return Home</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {products.map((product, index) => (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    delay: index * 0.08, 
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="group"
                >
                  <Link 
                    href={`/products/${category.slug}/${product.id}`}
                    className="block"
                  >
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-300 hover:shadow-lg">
                      <div className="grid lg:grid-cols-5 gap-0">
                        {/* Image Section - 2 columns */}
                        <div className="lg:col-span-2 relative aspect-[4/3] lg:aspect-auto bg-gradient-to-br from-slate-50 to-white">
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-blue-50/30"></div>
                          
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="relative w-full h-full object-contain p-10 lg:p-12 group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <Package className="w-20 h-20 text-slate-300" strokeWidth={1.5} />
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
                        <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-between">
                          <div className="space-y-4">
                            {/* Meta */}
                            <div className="flex items-center gap-3 text-sm">
                              <div className="flex items-center gap-2 text-slate-500">
                                <Building2 className="w-4 h-4" strokeWidth={1.5} />
                                <span className="font-medium">{product.brand}</span>
                              </div>
                              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                              <span className="text-slate-400 font-light">
                                {product.sub_category || product.category}
                              </span>
                            </div>

                            {/* Title & Type */}
                            <div>
                              <h3 className="text-2xl lg:text-3xl font-medium text-slate-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight mb-2">
                                {product.name}
                              </h3>
                              <p className="text-sm text-slate-500 font-light uppercase tracking-wider">
                                {product.product_type}
                              </p>
                            </div>

                            {/* Description */}
                            {product.description && (
                              <p className="text-base text-slate-600 font-light leading-relaxed line-clamp-2">
                                {product.description}
                              </p>
                            )}
                          </div>

                          {/* Footer CTA */}
                          <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                            <span className="text-sm text-slate-500 font-light">
                              View complete specifications
                            </span>
                            <div className="flex items-center gap-2 text-blue-600 group-hover:gap-3 transition-all duration-300">
                              <span className="text-sm font-medium">Learn More</span>
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Professional Inquiry Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-light text-slate-900 leading-tight">
                Need Expert Guidance?
              </h2>
              <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
                Our medical equipment specialists are here to help you find the perfect solution for your healthcare facility's unique requirements.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Button 
                asChild 
                className="rounded-full px-10 py-6 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 text-base"
              >
                <Link href="/contact">
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="rounded-full px-10 py-6 border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 text-base font-medium"
              >
                <Link href="/#about">About Our Company</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-3xl font-light text-slate-900 mb-2">500+</div>
                <div className="text-sm text-slate-600 font-light">Medical Products</div>
              </motion.div>
              <motion.div
                className="text-center border-x border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-3xl font-light text-slate-900 mb-2">15+</div>
                <div className="text-sm text-slate-600 font-light">Years Experience</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-3xl font-light text-slate-900 mb-2">100+</div>
                <div className="text-sm text-slate-600 font-light">Healthcare Partners</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { title: "Quality Assured", desc: "ISO certified products" },
              { title: "Expert Support", desc: "Technical assistance" },
              { title: "Fast Delivery", desc: "Nationwide coverage" },
              { title: "Trusted Partner", desc: "Healthcare excellence" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <h4 className="text-sm font-medium text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 font-light">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}