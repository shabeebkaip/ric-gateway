import type { Metadata } from 'next';
import { readSeo, defaultSeo } from './seo';
import type { CMSSeo } from './seo';

type PageKey = keyof CMSSeo['pages'];

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ricmedical.com.sa';
const SITE_NAME = 'RIC Medical Solutions';

const FALLBACK_TITLES: Record<PageKey, string> = {
  home:     'RIC Medical Solutions | Advanced Medical Equipment Saudi Arabia',
  about:    'About Us | RIC Medical Solutions',
  services: 'Our Services | RIC Medical Solutions',
  products: 'Medical Equipment & Products | RIC Medical Solutions',
  contact:  'Contact Us | RIC Medical Solutions',
  blog:     'Healthcare Insights & News | RIC Medical Solutions',
};

const FALLBACK_DESCRIPTIONS: Record<PageKey, string> = {
  home:     'Leading provider of advanced medical equipment and healthcare solutions in Saudi Arabia since 1985. Cancer treatment, urology, medical imaging, and disposables.',
  about:    'Learn about Riyadh International Corporation — Saudi Arabia\'s trusted medical equipment provider since 1985.',
  services: 'Comprehensive medical equipment services including installation, maintenance, and technical support across Saudi Arabia.',
  products: 'Explore our wide range of advanced medical equipment for cancer treatment, urology, medical imaging, and disposables.',
  contact:  'Get in touch with RIC Medical Solutions. Visit our Riyadh office or contact us for medical equipment enquiries.',
  blog:     'Stay informed with the latest insights on medical technology, healthcare solutions, and industry news from RIC Medical.',
};

const PAGE_PATHS: Record<PageKey, string> = {
  home:     '/',
  about:    '/about',
  services: '/services',
  products: '/products',
  contact:  '/contact',
  blog:     '/blog',
};

export async function buildPageMetadata(pageKey: PageKey): Promise<Metadata> {
  const seo = await readSeo().catch(() => defaultSeo);
  const page = seo.pages[pageKey];
  const global = seo.global;

  const rawTitle = page.title?.trim();
  const title = rawTitle
    ? (global.titleTemplate?.includes('%s')
        ? global.titleTemplate.replace('%s', rawTitle)
        : rawTitle)
    : FALLBACK_TITLES[pageKey];

  const description =
    page.description?.trim() ||
    global.defaultDescription?.trim() ||
    FALLBACK_DESCRIPTIONS[pageKey];

  const ogImage =
    page.ogImage?.trim() || global.defaultOgImage?.trim() || undefined;

  const canonicalUrl =
    page.canonical?.trim() || `${BASE_URL}${PAGE_PATHS[pageKey]}`;

  return {
    title,
    description,
    ...(page.noindex && { robots: { index: false, follow: false } }),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: global.twitterCardType || 'summary_large_image',
      title,
      description,
      ...(global.twitterHandle && { site: `@${global.twitterHandle}` }),
      ...(ogImage && { images: [ogImage] }),
    },
  };
}
