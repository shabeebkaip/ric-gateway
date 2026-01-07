"use client";

import {
  ProductHero,
  ProductVariants,
  ProductInfoCards,
  TechnicalSpecifications,
  ProductCTA,
} from "./detail";
import type { ProductDetailContentProps } from "@/types";

export function ProductDetailContent({
  product,
  category,
}: ProductDetailContentProps) {
  return (
    <div className="min-h-screen bg-white antialiased">
      <ProductHero product={product} category={category} />
      
      <ProductVariants variants={product.variants || []} />
      
      <ProductInfoCards
        features={product.features}
        applications={product.applications}
        key_benefits={product.key_benefits}
        certifications={product.certifications}
        regulatory={product.regulatory}
      />
      
      <TechnicalSpecifications
        specifications={product.technical_specifications}
      />
      
      <ProductCTA
        productName={product.name}
        categoryName={category.name}
        categorySlug={category.slug}
      />
    </div>
  );
}
