import type { Metadata } from 'next';
import { AboutPageContent } from '@/components/about/AboutPageContent';

export const metadata: Metadata = {
  title: 'About Us - RIC Medical Solutions | Healthcare Excellence Since 1985',
  description: 'Learn about Riyadh International Corporation (RIC), Saudi Arabia\'s trusted medical equipment distributor since 1985. ISO certified, SFDA approved, serving healthcare excellence.',
  keywords: 'about RIC, medical equipment Saudi Arabia, healthcare solutions, ISO certified, SFDA approved, Riyadh International Corporation',
};

export default function AboutPage() {
  return <AboutPageContent />;
}
