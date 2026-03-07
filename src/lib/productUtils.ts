import { productSubcategories, partners,  } from "./data";
import { products } from "./products";
import type { Subcategory } from "@/types";

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.category === categorySlug);
}

export function getProductsBySubcategory(subcategoryId: string) {
  return products.filter((product) => product.sub_category === subcategoryId);
}

export function getProductsByCategoryAndSubcategory(
  categorySlug: string,
  subcategorySlug: string,
) {
  // Find the subcategory ID that matches the category and subcategory slug
  const subcategory = productSubcategories.find(
    (sub) => sub.categoryId === categorySlug && sub.slug === subcategorySlug,
  );

  if (!subcategory) {
    return [];
  }

  return products.filter((product) => product.sub_category === subcategory.id);
}

export function getSubcategoriesByCategory(categoryId: string): Subcategory[] {
  return productSubcategories.filter(
    (subcategory) => subcategory.categoryId === categoryId,
  );
}

export function getSubcategoryById(subcategoryId: string) {
  return productSubcategories.find(
    (subcategory) => subcategory.id === subcategoryId,
  );
}

export function getAllCategories() {
  const categories = new Set<string>();
  products.forEach((product) => {
    categories.add(product.category);
  });
  return Array.from(categories);
}

export function getAllSubcategories(categorySlug: string) {
  const subcategories = new Set<string>();
  products
    .filter((product) => product.category === categorySlug)
    .forEach((product) => {
      subcategories.add(product.sub_category);
    });
  return Array.from(subcategories);
}

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId);
}

// Partner-related utility functions
export function getPartnersByCategory(categoryId: string) {
  return partners.filter((partner) => partner.categories.includes(categoryId));
}

export function getPartnerById(partnerId: string) {
  return partners.find((partner) => partner.id === partnerId);
}

export function getProductsByPartner(partnerId: string) {
  return products.filter(
    (product) => product.partnerId === partnerId,
  );
}

export function getPartnerForProduct(productId: string) {
  const product = getProductById(productId);
  if (!product?.partnerId) return null;
  return getPartnerById(product.partnerId);
}
