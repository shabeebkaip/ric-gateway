import type { Metadata } from 'next';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '../src/index.css';
import { Providers } from './providers';
import { JsonLd } from '@/components/seo/JsonLd';
import { readSeo } from '@/lib/seo';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'RIC Medical Solutions | Advanced Medical Equipment Saudi Arabia',
  description:
    'Leading provider of advanced medical equipment and healthcare solutions in Saudi Arabia since 1985. Cancer treatment, urology, medical imaging, and disposables.',
  keywords:
    'medical equipment, healthcare solutions, Saudi Arabia, cancer treatment, urology, medical imaging, RIC',
  icons: {
    icon: '/logo@2x.png',
    shortcut: '/logo@2x.png',
    apple: '/logo@2x.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') ?? headersList.get('x-pathname') ?? '';
  const isAdmin = pathname.startsWith('/admin');

  let seo = null;
  if (!isAdmin) {
    seo = await readSeo().catch(() => null);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {seo && (
          <>
            {/* Google Tag Manager */}
            {seo.analytics.gtmId && (
              <script
                dangerouslySetInnerHTML={{
                  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${seo.analytics.gtmId}');`,
                }}
              />
            )}
            {/* GA4 standalone (only when no GTM) */}
            {seo.analytics.ga4Id && !seo.analytics.gtmId && (
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${seo.analytics.ga4Id}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${seo.analytics.ga4Id}');`,
                  }}
                />
              </>
            )}
          </>
        )}
      </head>
      <body>
        {/* GTM noscript */}
        {seo?.analytics.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${seo.analytics.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {seo && <JsonLd seo={seo} />}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
