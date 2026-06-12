import type { Metadata } from 'next';
import { ContactPageContent } from '@/components/contact/ContactPageContent';
import { getContactInfo } from '@/lib/getContactInfo';

export const metadata: Metadata = {
  title: 'Contact Us - RIC Medical Solutions | Get in Touch',
  description: 'Contact Riyadh International Corporation for medical equipment and healthcare solutions. Visit us in Riyadh or reach out via phone, email, or our contact form.',
  keywords: 'contact RIC, medical equipment inquiry, Riyadh healthcare, RIC location, medical solutions contact',
};

export default async function ContactPage() {
  const contactCards = await getContactInfo();
  return <ContactPageContent contactCards={contactCards} />;
}
