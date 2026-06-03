export const BLOG_CATEGORIES = [
  'industry-insights',
  'product-spotlight',
  'clinical-education',
  'company-news',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  'industry-insights': 'Industry Insights',
  'product-spotlight': 'Product Spotlight',
  'clinical-education': 'Clinical Education',
  'company-news': 'Company News',
};

export const BLOG_CATEGORY_COLORS: Record<BlogCategory, string> = {
  'industry-insights': 'text-blue-700 bg-blue-50 border-blue-200',
  'product-spotlight': 'text-amber-700 bg-amber-50 border-amber-200',
  'clinical-education': 'text-emerald-700 bg-emerald-50 border-emerald-200',
  'company-news': 'text-violet-700 bg-violet-50 border-violet-200',
};

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function calculateReadTime(html: string): number {
  const wordCount = html
    .replace(/<[^>]*>/g, '')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Injects id attributes into h2/h3 tags in the HTML string
 * and returns both the processed HTML and the TOC item list.
 */
export function processContentForTOC(html: string): {
  processedHtml: string;
  tocItems: TOCItem[];
} {
  const tocItems: TOCItem[] = [];
  const seenIds = new Set<string>();

  const processedHtml = html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/h[23]>/gi,
    (_, tag: string, attrs: string, inner: string) => {
      const level = parseInt(tag[1], 10) as 2 | 3;
      const plainText = inner.replace(/<[^>]+>/g, '').trim();
      let id = plainText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      if (seenIds.has(id)) {
        let n = 2;
        while (seenIds.has(`${id}-${n}`)) n++;
        id = `${id}-${n}`;
      }
      seenIds.add(id);
      tocItems.push({ id, text: plainText, level });
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
    }
  );

  return { processedHtml, tocItems };
}

export function formatPublishedDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatShortDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
