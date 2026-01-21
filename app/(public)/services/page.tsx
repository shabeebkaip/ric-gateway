import { Metadata } from "next";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";

export const metadata: Metadata = {
  title: "Medical Equipment Service & Maintenance | RIC Gateway",
  description:
    "Comprehensive service and maintenance solutions for medical equipment. Authorized service provider for Dornier MedTech, Wikkon, and all major medical device brands.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
