"use client";

import { useRef, useState } from "react";
import {
  ProductHero,
  ProductVariants,
  ProductInfoCards,
  TechnicalSpecifications,
  ProductCTA,
  ProductImageGallery,
  DynamicProductFields,
} from "./detail";
import { RequestQuoteModal } from "@/components/shared/RequestQuoteModal";
import type { ProductDetailContentProps } from "@/types";

export function ProductDetailContent({
  product,
  category,
}: ProductDetailContentProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const quoteTriggerRef = useRef<HTMLButtonElement | null>(null);
  const openQuote = (trigger: HTMLButtonElement) => {
    quoteTriggerRef.current = trigger;
    setQuoteOpen(true);
  };
  const handleQuoteOpenChange = (open: boolean) => setQuoteOpen(open);
  const handleQuoteCloseAutoFocus = (event: Event) => {
    const trigger = quoteTriggerRef.current;

    if (!trigger) return;

    event.preventDefault();
    trigger.focus();
    quoteTriggerRef.current = null;
  };

  return (
    <div className="min-h-screen bg-white antialiased">
      <ProductHero
        product={product}
        category={category}
        onRequestQuote={openQuote}
      />
      
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
        onRequestQuote={openQuote}
      />

      <RequestQuoteModal
        open={quoteOpen}
        onOpenChange={handleQuoteOpenChange}
        onCloseAutoFocus={handleQuoteCloseAutoFocus}
        productName={product.name}
        productSlug={product.id}
        category={category.slug}
        partnerName={product.brand}
      />
    </div>
  );
}
