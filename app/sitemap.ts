import type { MetadataRoute } from 'next';
import { getCachedBlogPosts, getCachedCategories, getCachedProducts } from '@/lib/db/pageData';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ricmedical.com.sa';

const staticRoutes = [
  { path: '/',        priority: 1.0, changeFreq: 'weekly'  as const },
  { path: '/about',   priority: 0.8, changeFreq: 'monthly' as const },
  { path: '/services',priority: 0.8, changeFreq: 'monthly' as const },
  { path: '/products',priority: 0.9, changeFreq: 'weekly'  as const },
  { path: '/contact', priority: 0.7, changeFreq: 'monthly' as const },
  { path: '/blog',    priority: 0.9, changeFreq: 'daily'   as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const statics: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFreq,
    priority: r.priority,
  }));

  let categoryEntries: MetadataRoute.Sitemap = [];
  try {
    const categories = await getCachedCategories();
    categoryEntries = (categories as any[]).map((c) => ({
      url: `${BASE_URL}/products/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch { /* skip */ }

  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const products = await getCachedProducts();
    productEntries = (products as any[]).map((p) => ({
      url: `${BASE_URL}/products/${p.category}/${p.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch { /* skip */ }

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getCachedBlogPosts();
    blogEntries = (posts as any[]).map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: 'weekly' as const,
      priority: p.isFeatured ? 0.9 : 0.7,
    }));
  } catch { /* skip */ }

  return [...statics, ...categoryEntries, ...productEntries, ...blogEntries];
}
