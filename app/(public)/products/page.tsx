import { AllProductsContent } from "@/components/products/AllProductsContent";
import { getCachedProducts, getCachedPartners, getCachedHomeContent } from "@/lib/db/pageData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products | RIC Medical Solutions",
  description:
    "Browse our complete range of medical equipment and healthcare solutions from world-leading manufacturers including BASDA, Combat Medical, Potent Medical, and more.",
};

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
