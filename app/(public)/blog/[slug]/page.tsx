import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCachedBlogPost, getCachedBlogPosts } from '@/lib/db/pageData';
import { readSeo, defaultSeo } from '@/lib/seo';
import { processContentForTOC } from '@/lib/blogUtils';
import { ArticleProgress } from '@/components/blog/detail/ArticleProgress';
import { ArticleHeader } from '@/components/blog/detail/ArticleHeader';
import { ArticleBody } from '@/components/blog/detail/ArticleBody';
import { ArticleTOC } from '@/components/blog/detail/ArticleTOC';
import { ArticleShare } from '@/components/blog/detail/ArticleShare';
import { ArticleAuthor } from '@/components/blog/detail/ArticleAuthor';
import { ArticleCTA } from '@/components/blog/detail/ArticleCTA';
import { RelatedPosts } from '@/components/blog/detail/RelatedPosts';
import { ArticleJsonLd } from '@/components/blog/detail/ArticleJsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ricmedical.com.sa';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post, seo] = await Promise.all([
    getCachedBlogPost(slug),
    readSeo().catch(() => defaultSeo),
  ]);
  if (!post) return { title: 'Article Not Found | RIC Medical' };

  const rawTitle = post.metaTitle || post.title;
  const title = seo.global.titleTemplate?.includes('%s')
    ? seo.global.titleTemplate.replace('%s', rawTitle)
    : rawTitle;
  const description = post.metaDescription || post.excerpt;
  const ogImage = post.coverImage || seo.global.defaultOgImage || undefined;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: rawTitle,
      description,
      type: 'article',
      publishedTime: new Date(post.publishedAt).toISOString(),
      modifiedTime: new Date(post.updatedAt).toISOString(),
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: rawTitle }] : [],
    },
    twitter: {
      card: seo.global.twitterCardType || 'summary_large_image',
      title: rawTitle,
      description,
      ...(seo.global.twitterHandle && { site: `@${seo.global.twitterHandle}` }),
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export async function generateStaticParams() {
  const posts = await getCachedBlogPosts();
  return posts.map((p: any) => ({ slug: p.slug }));
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const [post, allPosts] = await Promise.all([
    getCachedBlogPost(slug),
    getCachedBlogPosts(),
  ]);

  if (!post) notFound();

  const { processedHtml, tocItems } = processContentForTOC(post.content ?? '');
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;

  const relatedPosts = (allPosts as any[])
    .filter(
      (p) =>
        p.slug !== post.slug &&
        (post.relatedPosts?.includes(p.slug) || p.category === post.category)
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <ArticleJsonLd post={post} url={articleUrl} />
      <ArticleProgress />

      <main>
        {/* Header — full width container */}
        <div className="container-padding container mx-auto pt-28 pb-4">
          <ArticleHeader post={post} />
        </div>

        {/* Body — 2-col layout */}
        <div className="container-padding container mx-auto pb-16 mt-10">
          <div className="grid lg:grid-cols-[1fr_288px] gap-12 xl:gap-16 items-start">
            {/* Article content */}
            <div className="min-w-0">
              <ArticleBody html={processedHtml} />
              <ArticleCTA />
              <ArticleAuthor author={post.author} />
            </div>

            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-4">
                <ArticleTOC items={tocItems} />
                <ArticleShare title={post.title} slug={post.slug} />
              </div>
            </aside>
          </div>

          <RelatedPosts posts={relatedPosts} />
        </div>
      </main>
    </div>
  );
}
