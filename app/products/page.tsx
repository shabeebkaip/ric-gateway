import { AllProductsContent } from "@/components/products/AllProductsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products | RIC Medical Solutions",
  description:
    "Browse our complete range of medical equipment and healthcare solutions from world-leading manufacturers including BASDA, Combat Medical, Potent Medical, and more.",
};

export default function AllProductsPage() {
  return <AllProductsContent />;
}
