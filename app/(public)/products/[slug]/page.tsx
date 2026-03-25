import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCachedProducts, getCachedHomeContent } from "@/lib/db/pageData";
import { ProductListContent } from "@/components/products/ProductListContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const homeContent = await getCachedHomeContent();
  const categories = (homeContent.categories as any)?.categories ?? [];
  const category = categories.find((cat: any) => cat.slug === slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} - RIC Medical Equipment`,
    description: category.description,
  };
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const [allProducts, homeContent] = await Promise.all([
    getCachedProducts(),
    getCachedHomeContent(),
  ]);

  const categories = (homeContent.categories as any)?.categories ?? [];
  const allSubcategories = (homeContent.subcategories as any)?.subcategories ?? [];

  const category = categories.find((cat: any) => cat.slug === slug);
  if (!category) notFound();

  const products = (allProducts as any[]).filter(
    (p: any) => p.category === category.id || p.category === slug
  );
  const subcategories = allSubcategories.filter(
    (sub: any) => sub.categoryId === category.id || sub.categoryId === slug
  );

  return <ProductListContent category={category} products={products} subcategories={subcategories} />;
}
