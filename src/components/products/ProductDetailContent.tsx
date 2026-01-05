'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Building2, FileText, Microscope, Shield, Award, Activity, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
  features?: string[];
  applications?: string[];
  technical_specifications?: any;
  certifications?: string[];
  regulatory?: any;
  distributor?: any;
  key_benefits?: string[];
  system_components?: string[];
  safety_features?: string[];
  clinical_indications?: string[];
  key_features?: string[];
  full_name?: string;
  combinations?: any;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

interface ProductDetailContentProps {
  product: Product;
  category: Category;
}

export function ProductDetailContent({ product, category }: ProductDetailContentProps) {
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : null;
  const galleryImages = product.images && product.images.length > 1 ? product.images.slice(1) : [];

  return (
    <div className="min-h-screen bg-white antialiased">

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
        <div className="container mx-auto px-6 max-w-7xl">
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
                    <Microscope className="w-24 h-24 text-slate-300" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Information */}
            <motion.div
              className="lg:col-span-3 space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-500">
                  <Building2 className="w-5 h-5" strokeWidth={1.5} />
                  <span className="text-sm font-medium tracking-wide uppercase">{product.brand}</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-light text-slate-900 leading-tight tracking-tight">
                  {product.name}
                </h1>
                {product.full_name && product.full_name !== product.name && (
                  <p className="text-xl text-slate-600 font-light">{product.full_name}</p>
                )}
                {product.description && (
                  <p className="text-lg text-slate-600 leading-relaxed font-light max-w-3xl">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Quick Info Grid */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white/90 backdrop-blur-[10px] border border-slate-200/80 rounded-2xl p-6 space-y-2 hover:border-blue-300/30 hover:shadow-[0_8px_16px_-4px_rgba(59,130,246,0.08)] transition-all duration-300">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">Classification</div>
                  <div className="text-base font-medium text-slate-900">{product.product_type}</div>
                </div>
                <div className="bg-white/90 backdrop-blur-[10px] border border-slate-200/80 rounded-2xl p-6 space-y-2 hover:border-blue-300/30 hover:shadow-[0_8px_16px_-4px_rgba(59,130,246,0.08)] transition-all duration-300">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">Category</div>
                  <div className="text-base font-medium text-slate-900">{category.name}</div>
                </div>
                {product.variants && product.variants.length > 0 && (
                  <div className="bg-white/90 backdrop-blur-[10px] border border-slate-200/80 rounded-2xl p-6 space-y-2 hover:border-blue-300/30 hover:shadow-[0_8px_16px_-4px_rgba(59,130,246,0.08)] transition-all duration-300">
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">Variants</div>
                    <div className="text-base font-medium text-slate-900">{product.variants.length} Available</div>
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

      {/* Variants Section */}
      {product.variants && product.variants.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-light text-slate-900 mb-8">Available Configurations</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.variants.map((variant, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/90 backdrop-blur-[10px] border border-slate-200/80 rounded-2xl p-5 hover:bg-slate-50 hover:border-blue-300/30 cursor-pointer transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-medium text-slate-700">{variant}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Clinical Information Grid */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Features */}
            {product.features && product.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="medical-card border-none elevated-shadow h-full">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-blue-100">
                        <Activity className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                      </div>
                      <CardTitle className="text-2xl font-light text-slate-900">Key Features</CardTitle>
                    </div>
                    <p className="text-sm text-slate-500 font-light">Technical capabilities and highlights</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {product.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-slate-700 leading-relaxed font-light">{feature}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-white/90 backdrop-blur-[10px] border-slate-200/80 rounded-2xl hover:border-blue-300/30 hover:shadow-[0_8px_16px_-4px_rgba(59,130,246,0.08)] shadow-[0_4px_6px_-1px_rgba(15,23,42,0.04),0_2px_4px_-2px_rgba(15,23,42,0.04)] transition-all duration-300 h-full">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-sky-100">
                        <Microscope className="w-5 h-5 text-sky-600" strokeWidth={1.5} />
                      </div>
                      <CardTitle className="text-2xl font-light text-slate-900">Clinical Applications</CardTitle>
                    </div>
                    <p className="text-sm text-slate-500 font-light">Recommended uses and procedures</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {product.applications.map((application, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-slate-700 leading-relaxed font-light">{application}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Key Benefits */}
            {product.key_benefits && product.key_benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-white/90 backdrop-blur-[10px] border-slate-200/80 rounded-2xl hover:border-blue-300/30 hover:shadow-[0_8px_16px_-4px_rgba(59,130,246,0.08)] shadow-[0_4px_6px_-1px_rgba(15,23,42,0.04),0_2px_4px_-2px_rgba(15,23,42,0.04)] transition-all duration-300 h-full">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-emerald-100">
                        <Award className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
                      </div>
                      <CardTitle className="text-2xl font-light text-slate-900">Clinical Benefits</CardTitle>
                    </div>
                    <p className="text-sm text-slate-500 font-light">Advantages and outcomes</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {product.key_benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-slate-700 leading-relaxed font-light">{benefit}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Certifications & Regulatory */}
            {((product.certifications && product.certifications.length > 0) || product.regulatory) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-white/90 backdrop-blur-[10px] border-slate-200/80 rounded-2xl hover:border-blue-300/30 hover:shadow-[0_8px_16px_-4px_rgba(59,130,246,0.08)] shadow-[0_4px_6px_-1px_rgba(15,23,42,0.04),0_2px_4px_-2px_rgba(15,23,42,0.04)] transition-all duration-300 h-full">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-violet-100">
                        <Shield className="w-5 h-5 text-violet-600" strokeWidth={1.5} />
                      </div>
                      <CardTitle className="text-2xl font-light text-slate-900">Compliance & Standards</CardTitle>
                    </div>
                    <p className="text-sm text-slate-500 font-light">Certifications and regulatory information</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {product.certifications && product.certifications.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-3">Certifications</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.certifications.map((cert, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="rounded-full px-4 py-1.5 text-xs font-medium border-slate-200 bg-white"
                            >
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {product.regulatory && (
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-3">Regulatory</h4>
                        <div className="space-y-2">
                          {Object.entries(product.regulatory).map(([key, value]) => (
                            <div key={key} className="flex items-start gap-3 text-sm">
                              <span className="font-medium text-slate-600 capitalize min-w-[120px]">
                                {key.replace(/_/g, ' ')}:
                              </span>
                              <span className="text-slate-700 font-light">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      {product.technical_specifications && Object.keys(product.technical_specifications).length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-light text-slate-900 mb-3">Technical Specifications</h2>
              <p className="text-slate-500 font-light mb-10">Detailed technical parameters and measurements</p>
              
              <div className="bg-white/90 backdrop-blur-[10px] border border-slate-200/80 rounded-2xl p-8 shadow-[0_4px_6px_-1px_rgba(15,23,42,0.04),0_2px_4px_-2px_rgba(15,23,42,0.04)] hover:border-blue-300/30 hover:shadow-[0_8px_16px_-4px_rgba(59,130,246,0.08)] transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                  {Object.entries(product.technical_specifications).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      className="flex items-start justify-between gap-6 pb-6 border-b border-slate-100"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                    >
                      <span className="text-sm font-medium text-slate-600 capitalize">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm text-slate-900 font-light text-right">
                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Professional Inquiry Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-light text-slate-900 leading-tight">
                Request Professional Consultation
              </h2>
              <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
                Our medical device specialists are available to provide detailed product information, technical specifications, and pricing for {product.name}.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Button 
                asChild 
                className="rounded-full px-10 py-6 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 text-base font-medium"
              >
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="rounded-full px-10 py-6 border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 text-base font-medium"
              >
                <Link href={`/products/${category.slug}`}>
                  Explore {category.name}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}