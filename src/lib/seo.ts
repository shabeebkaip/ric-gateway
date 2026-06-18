import { cache } from 'react';
import { connectDB } from '@/lib/db/connection';
import SeoModel from '@/lib/db/models/Seo';

export interface SEOPageMeta {
  title: string;
  description: string;
  ogImage: string;
  noindex: boolean;
  canonical: string;
  focusKeyword?: string;
  sitemapExcluded?: boolean;
}

export interface SEORedirect {
  id: string;
  from: string;
  to: string;
  code: 301 | 302;
  enabled: boolean;
}

export interface CMSSeo {
  global: {
    titleTemplate: string;
    defaultDescription: string;
    defaultOgImage: string;
    twitterHandle: string;
    twitterCardType: 'summary' | 'summary_large_image';
  };
  pages: {
    home: SEOPageMeta;
    about: SEOPageMeta;
    services: SEOPageMeta;
    products: SEOPageMeta;
    contact: SEOPageMeta;
    blog: SEOPageMeta;
  };
  schema: {
    organization: {
      name: string;
      url: string;
      logo: string;
      description: string;
      sameAs: string[];
    };
    localBusiness: {
      enabled: boolean;
      type: string;
      name: string;
      streetAddress: string;
      city: string;
      region: string;
      country: string;
      postalCode: string;
      phone: string;
      email: string;
    };
  };
  analytics: {
    ga4Id: string;
    gtmId: string;
  };
  robots: {
    customContent: string;
    blockAIScrapers: boolean;
  };
  redirects: SEORedirect[];
}

export const defaultSeo: CMSSeo = {
  global: {
    titleTemplate: '%s | RIC Medical Solutions',
    defaultDescription:
      'Leading provider of advanced medical equipment and healthcare solutions in Saudi Arabia since 1985.',
    defaultOgImage: '',
    twitterHandle: '',
    twitterCardType: 'summary_large_image',
  },
  pages: {
    home:     { title: '', description: '', ogImage: '', noindex: false, canonical: '', focusKeyword: '', sitemapExcluded: false },
    about:    { title: '', description: '', ogImage: '', noindex: false, canonical: '', focusKeyword: '', sitemapExcluded: false },
    services: { title: '', description: '', ogImage: '', noindex: false, canonical: '', focusKeyword: '', sitemapExcluded: false },
    products: { title: '', description: '', ogImage: '', noindex: false, canonical: '', focusKeyword: '', sitemapExcluded: false },
    contact:  { title: '', description: '', ogImage: '', noindex: false, canonical: '', focusKeyword: '', sitemapExcluded: false },
    blog:     { title: '', description: '', ogImage: '', noindex: false, canonical: '', focusKeyword: '', sitemapExcluded: false },
  },
  schema: {
    organization: {
      name: 'Riyadh International Corporation Medical Equipments & Services, Ltd',
      url: 'https://ricmedical.com.sa',
      logo: 'https://ricmedical.com.sa/logo@2x.png',
      description:
        'Leading provider of advanced medical equipment and healthcare solutions in Saudi Arabia since 1985.',
      sameAs: [],
    },
    localBusiness: {
      enabled: true,
      type: 'MedicalBusiness',
      name: 'RIC Medical Solutions',
      streetAddress: 'PM8M+J6X, Oruba Road, As Sulimaniyah',
      city: 'Riyadh',
      region: 'Riyadh Region',
      country: 'SA',
      postalCode: '11411',
      phone: '+966509698043',
      email: 'ricmede@ricmedical.com.sa',
    },
  },
  analytics: { ga4Id: '', gtmId: '' },
  robots: {
    customContent:
      'User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://ricmedical.com.sa/sitemap.xml',
    blockAIScrapers: false,
  },
  redirects: [],
};

const g = global as typeof globalThis & {
  _ricSeo?: { data: CMSSeo; expires: number };
};
const TTL = 30_000;

function deepMerge(base: CMSSeo, override: Partial<CMSSeo>): CMSSeo {
  return JSON.parse(JSON.stringify({ ...base, ...override }));
}

export const readSeo = cache(async (): Promise<CMSSeo> => {
  if (g._ricSeo && Date.now() < g._ricSeo.expires) {
    return g._ricSeo.data;
  }
  try {
    await connectDB();
    const doc = await SeoModel.findOne({ key: 'global' }).lean();
    const merged = doc?.data
      ? deepMerge(defaultSeo, doc.data as Partial<CMSSeo>)
      : defaultSeo;
    g._ricSeo = { data: merged, expires: Date.now() + TTL };
    return merged;
  } catch {
    return defaultSeo;
  }
});

export async function writeSeo(data: CMSSeo): Promise<void> {
  await connectDB();
  await SeoModel.findOneAndUpdate(
    { key: 'global' },
    { key: 'global', data },
    { upsert: true, new: true }
  );
  g._ricSeo = { data, expires: Date.now() + TTL };
}
