import { AllProductsContent } from "@/components/products/AllProductsContent";
import { getCachedProducts, getCachedPartners, getCachedHomeContent } from "@/lib/db/pageData";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('products');
}

export default async function AllProductsPage() {
  const [rawProducts, rawPartners, homeContent] = await Promise.all([
    getCachedProducts(),
    getCachedPartners(),
    getCachedHomeContent(),
  ]);

  const categories = (homeContent.categories as any)?.categories ?? [];
  const subcategories = (homeContent.subcategories as any)?.subcategories ?? [];
  const partners = (rawPartners as any[]).map((p: any) => ({
    id: p.slug,
    name: p.name,
    logo: p.logo,
    invertColor: p.invertColor,
  }));

  return (
    <AllProductsContent
      products={rawProducts as any}
      categories={categories}
      subcategories={subcategories}
      partners={partners}
    />
  );
}
