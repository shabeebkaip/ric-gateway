import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-metadata';
import { ServicesPageContent } from '@/components/services/ServicesPageContent';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('services');
}

export default function ServicesPage() {
  return <ServicesPageContent />;
}
