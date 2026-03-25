"use client";

import {
  ProductHero,
  ProductVariants,
  ProductInfoCards,
  TechnicalSpecifications,
  ProductCTA,
  ProductImageGallery,
  DynamicProductFields,
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

      {/* Dynamic fields - displays all remaining product data */}
      <DynamicProductFields product={product} />

      {/* Display images in full width after technical specifications when show_image_main is true */}
      {product.show_image_main && product.images && product.images.length > 0 && (
        <ProductImageGallery images={product.images} productName={product.name} />
      )}
      
      <ProductCTA
        productName={product.name}
        categoryName={category.name}
        categorySlug={category.slug}
        productSlug={product.id}
        partnerName={product.brand}
      />
    </div>
  );
}
