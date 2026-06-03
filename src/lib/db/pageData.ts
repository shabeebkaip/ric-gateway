/**
 * Cached server-side data fetchers for public pages.
 *
 * Strategy: unstable_cache with tag-based on-demand revalidation.
 * - Data is cached indefinitely (revalidate: false) — no automatic TTL.
 * - Admin API routes call revalidateTag(tag, 'hours') on mutations, so the
 *   cache is purged immediately and rebuilt on the next request.
 * - .lean() + JSON round-trip ensures plain serializable objects.
 */
import { unstable_cache } from 'next/cache';
import { connectDB } from './connection';
import Partner from './models/Partner';
import Category from './models/Category';
import Content from './models/Content';
import ProductModel from './models/Product';

/** Converts Mongoose lean docs to plain serializable objects */
const toPlain = <T>(data: T): T => JSON.parse(JSON.stringify(data));

// ─── Partners ────────────────────────────────────────────────────────────────

export const getCachedPartners = unstable_cache(
  async () => {
    await connectDB();
    const docs = await Partner.find({ isActive: true })
      .sort({ order: 1, name: 1 })
      .lean();
    return toPlain(docs);
  },
  ['db-partners'],
  { tags: ['partners'], revalidate: false }
);

// ─── Categories ──────────────────────────────────────────────────────────────

export const getCachedCategories = unstable_cache(
  async () => {
    await connectDB();
    const docs = await Category.find({ isActive: true })
      .sort({ order: 1, name: 1 })
      .lean();
    return toPlain(docs);
  },
  ['db-categories'],
  { tags: ['categories'], revalidate: false }
);

// ─── Home page content ───────────────────────────────────────────────────────

export const getCachedHomeContent = unstable_cache(
  async () => {
    await connectDB();
    const contents = await Content.find({ page: 'home', isActive: true }).lean();
    const result: Record<string, unknown> = {};
    for (const c of contents as Array<{ section: string; content: unknown }>) {
      result[c.section] = c.content;
    }
    return toPlain(result);
  },
  ['home-content'],
  { tags: ['home-content'], revalidate: false }
);

// ─── Blog Posts ──────────────────────────────────────────────────────────────

import BlogPostModel from './models/BlogPost';

export const getCachedBlogPosts = unstable_cache(
  async () => {
    await connectDB();
    const docs = await BlogPostModel.find({ isPublished: true })
      .sort({ order: 1, publishedAt: -1 })
      .lean();
    return toPlain(docs) as any[];
  },
  ['db-blog-posts'],
  { tags: ['blog-posts'], revalidate: false }
);

export const getCachedBlogPost = unstable_cache(
  async (slug: string) => {
    await connectDB();
    const doc = await BlogPostModel.findOne({ slug, isPublished: true }).lean();
    return doc ? (toPlain(doc) as any) : null;
  },
  ['db-blog-post'],
  { tags: ['blog-posts'], revalidate: false }
);

export const getCachedFeaturedBlogPost = unstable_cache(
  async () => {
    await connectDB();
    const doc = await BlogPostModel.findOne({ isPublished: true, isFeatured: true })
      .sort({ publishedAt: -1 })
      .lean();
    return doc ? (toPlain(doc) as any) : null;
  },
  ['db-blog-featured'],
  { tags: ['blog-posts'], revalidate: false }
);

// ─── Products ─────────────────────────────────────────────────────────────────

/** Maps a DB Product lean doc to the frontend Product interface shape */
const transformProduct = (doc: any) => ({
  id: doc.slug ?? String(doc._id ?? ''),
  name: doc.title ?? '',
  brand: doc.partner ?? '',
  partnerId: doc.partner ?? '',
  category: doc.category ?? '',
  sub_category: doc.subcategory ?? null,
  product_type: doc.type ?? '',
  description: doc.description ?? '',
  images: doc.images ?? [],
  features: doc.features ?? [],
  technical_specifications: doc.specifications ?? {},
  ...(doc.additionalInfo ?? {}),
});

export const getCachedProducts = unstable_cache(
  async () => {
    await connectDB();
    const docs = await ProductModel.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return (toPlain(docs) as any[]).map(transformProduct);
  },
  ['db-products'],
  { tags: ['products'], revalidate: false }
);

