import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/productUtils";
import { productCategories } from "@/lib/data";
import { ProductDetailContent } from "@/components/products/ProductDetailContent";

interface PageProps {
  params: Promise<{
    slug: string;
    productId: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = getProductById(productId);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - ${product.brand} | RIC Medical Equipment`,
    description: product.description || `${product.product_type} by ${product.brand}`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug, productId } = await params;
  const product = getProductById(productId);
  const category = productCategories.find((cat) => cat.slug === slug);

  if (!product || !category) {
    notFound();
  }

  return <ProductDetailContent product={product} category={category} />;
}
