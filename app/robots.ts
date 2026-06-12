import type { MetadataRoute } from 'next';
import { readSeo } from '@/lib/seo';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ricmedical.com.sa';

export default async function robots(): Promise<MetadataRoute.Robots> {
  try {
    const seo = await readSeo();

    const baseRules = [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] },
    ];

    const aiRules = seo.robots.blockAIScrapers
      ? [
          { userAgent: 'GPTBot', disallow: ['/'] },
          { userAgent: 'ChatGPT-User', disallow: ['/'] },
          { userAgent: 'CCBot', disallow: ['/'] },
          { userAgent: 'anthropic-ai', disallow: ['/'] },
          { userAgent: 'Claude-Web', disallow: ['/'] },
          { userAgent: 'PerplexityBot', disallow: ['/'] },
        ]
      : [];

    return {
      rules: [...baseRules, ...aiRules],
      sitemap: `${SITE_URL}/sitemap.xml`,
    };
  } catch {
    return {
      rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] }],
      sitemap: `${SITE_URL}/sitemap.xml`,
    };
  }
}
