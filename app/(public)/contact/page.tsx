import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-metadata';
import { ContactPageContent } from '@/components/contact/ContactPageContent';
import { getContactInfo } from '@/lib/getContactInfo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('contact');
}

export default async function ContactPage() {
  const contactCards = await getContactInfo();
  return <ContactPageContent contactCards={contactCards} />;
}
