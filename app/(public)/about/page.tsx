import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-metadata';
import { AboutPageContent } from '@/components/about/AboutPageContent';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('about');
}

export default function AboutPage() {
  return <AboutPageContent />;
}
