'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Building2, Package, CheckCircle2, Info, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="container-padding container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/products/${category.slug}`} className="hover:text-primary transition-colors">
              {category.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </motion.div>

          <Button asChild variant="outline" size="sm" className="mb-6">
            <Link href={`/products/${category.slug}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {category.name}
            </Link>
          </Button>
        </div>
      </section>

      {/* Product Header */}
      <section className="py-8 bg-background">
        <div className="container-padding container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {mainImage ? (
                <div className="space-y-4">
                  <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden border border-border/50">
                    <img
                      src={mainImage}
                      alt={product.name}
                      className="w-full h-full object-contain p-8"
                    />
                  </div>
                  {galleryImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-4">
                      {galleryImages.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-muted rounded-lg overflow-hidden border border-border/50 cursor-pointer hover:border-primary/50 transition-colors"
                        >
                          <img
                            src={image}
                            alt={`${product.name} - ${index + 2}`}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex items-center justify-center border border-border/50">
                  <Package className="w-24 h-24 text-muted-foreground/30" />
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="outline">{product.sub_category || product.category}</Badge>
                  {product.is_parent_product && (
                    <Badge variant="secondary">Multiple Variants</Badge>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                {product.full_name && (
                  <p className="text-lg text-muted-foreground mb-4">{product.full_name}</p>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-5 h-5" />
                  <span className="text-lg font-medium">{product.brand}</span>
                </div>
              </div>

              <Separator />

              {product.description && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Product Type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{product.product_type}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{category.name}</p>
                  </CardContent>
                </Card>
              </div>

              {product.variants && product.variants.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Available Variants</CardTitle>
                    <CardDescription>{product.variants.length} options available</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.slice(0, 6).map((variant, index) => (
                        <Badge key={index} variant="secondary">
                          {variant}
                        </Badge>
                      ))}
                      {product.variants.length > 6 && (
                        <Badge variant="outline">+{product.variants.length - 6} more</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild variant="hero" size="lg" className="flex-1">
                  <Link href="/contact">Request Quote</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+966114654113">Call Us</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="py-20 bg-muted/30">
        <div className="container-padding container mx-auto">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {product.features && <TabsTrigger value="features">Features</TabsTrigger>}
              {product.applications && <TabsTrigger value="applications">Applications</TabsTrigger>}
              {product.technical_specifications && <TabsTrigger value="specifications">Specifications</TabsTrigger>}
              <TabsTrigger value="details">Additional Details</TabsTrigger>
            </TabsList>

            {product.features && (
              <TabsContent value="features">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                    <CardDescription>Product highlights and capabilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {product.applications && (
              <TabsContent value="applications">
                <Card>
                  <CardHeader>
                    <CardTitle>Applications</CardTitle>
                    <CardDescription>Recommended uses and procedures</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.applications.map((application, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground">{application}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {product.technical_specifications && (
              <TabsContent value="specifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                    <CardDescription>Detailed technical information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(product.technical_specifications).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-3 gap-4 py-2 border-b border-border/50 last:border-0">
                          <span className="font-medium text-foreground capitalize">
                            {key.replace(/_/g, ' ')}
                          </span>
                          <span className="col-span-2 text-muted-foreground">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="details">
              <div className="space-y-6">
                {product.key_benefits && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {product.key_benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {product.certifications && product.certifications.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {product.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {product.regulatory && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Regulatory Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(product.regulatory).map(([key, value]) => (
                          <div key={key} className="flex items-start gap-3">
                            <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <div>
                              <span className="font-medium capitalize">{key.replace(/_/g, ' ')}: </span>
                              <span className="text-muted-foreground">{String(value)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
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
              Interested in {product.name}?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact our team for detailed specifications, pricing, and availability.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="hero" size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/products/${category.slug}`}>View More {category.name}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
