import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductsByCategory, getSubcategoriesByCategory } from "@/lib/productUtils";
import { productCategories } from "@/lib/data";
import { ProductListContent } from "@/components/products/ProductListContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = productCategories.find((cat) => cat.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} - RIC Medical Equipment`,
    description: category.description,
  };
}

export async function generateStaticParams() {
  return productCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = productCategories.find((cat) => cat.slug === slug);
  const products = getProductsByCategory(slug);
  const subcategories = getSubcategoriesByCategory(slug);

  if (!category) {
    notFound();
  }

  return <ProductListContent category={category} products={products} subcategories={subcategories} />;
}
