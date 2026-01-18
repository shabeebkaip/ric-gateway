import type { Metadata } from 'next';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '../src/index.css';
import { Providers } from './providers';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { WhatsAppFloat } from '@/components/shared/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'RIC - Riyadh International Corporation | Medical Equipment & Healthcare Solutions',
  description: 'Leading provider of advanced medical equipment and healthcare solutions in Saudi Arabia since 1985. Cancer treatment, urology, medical imaging, and disposables.',
  keywords: 'medical equipment, healthcare solutions, Saudi Arabia, cancer treatment, urology, medical imaging, RIC',
  icons: {
    icon: '/logo@2x.png',
    shortcut: '/logo@2x.png',
    apple: '/logo@2x.png',
  },
  openGraph: {
    title: 'RIC - Riyadh International Corporation | Medical Equipment & Healthcare Solutions',
    description: 'Leading provider of advanced medical equipment and healthcare solutions in Saudi Arabia since 1985.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navigation />
          {children}
          <Footer />
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
