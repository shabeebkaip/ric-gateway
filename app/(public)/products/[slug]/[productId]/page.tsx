import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCachedProducts, getCachedHomeContent, getCachedPartners } from "@/lib/db/pageData";
import { ProductDetailContent } from "@/components/products/ProductDetailContent";

interface PageProps {
  params: Promise<{
    slug: string;
    productId: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = await params;
  const [allProducts, rawPartners] = await Promise.all([
    getCachedProducts(),
    getCachedPartners(),
  ]);
  const product = (allProducts as any[]).find((p: any) => p.id === productId);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const partner = (rawPartners as any[]).find((p: any) => p.slug === product.partnerId);
  const brandName = partner?.name || product.brand;

  return {
    title: `${product.name} - ${brandName} | RIC Medical Equipment`,
    description: product.description || `${product.product_type} by ${brandName}`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug, productId } = await params;

  const [allProducts, homeContent] = await Promise.all([
    getCachedProducts(),
    getCachedHomeContent(),
  ]);

  const product = (allProducts as any[]).find((p: any) => p.id === productId);
  const categories = (homeContent.categories as any)?.categories ?? [];
  const category = categories.find((cat: any) => cat.slug === slug);

  if (!product || !category) notFound();

  return <ProductDetailContent product={product} category={category} />;
}
