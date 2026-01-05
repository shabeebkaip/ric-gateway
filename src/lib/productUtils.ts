import { productData } from './product';

export function getProductsByCategory(categorySlug: string) {
  return productData.products.filter(
    (product) => product.category === categorySlug
  );
}

export function getAllCategories() {
  const categories = new Set<string>();
  productData.products.forEach((product) => {
    categories.add(product.category);
  });
  return Array.from(categories);
}

export function getProductById(productId: string) {
  return productData.products.find((product) => product.id === productId);
}
