import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { WhatsAppFloat } from '@/components/shared/WhatsAppFloat';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
