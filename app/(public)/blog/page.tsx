import { Star } from 'lucide-react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-metadata';
import { getCachedBlogPosts, getCachedFeaturedBlogPost } from '@/lib/db/pageData';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogCardFeatured } from '@/components/blog/BlogCardFeatured';
import { BlogGrid } from '@/components/blog/BlogGrid';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('blog');
}

export const revalidate = 3600;

export default async function BlogPage() {
  const [posts, featuredPost] = await Promise.all([
    getCachedBlogPosts(),
    getCachedFeaturedBlogPost(),
  ]);

  const regularPosts = featuredPost
    ? posts.filter((p: any) => p.slug !== featuredPost.slug)
    : posts;

  return (
    <div className="min-h-screen bg-background">
      <main>
        <BlogHero totalPosts={posts.length} />

        <div className="section-padding">
          <div className="container-padding container mx-auto space-y-20">
            {/* Featured post */}
            {featuredPost && (
              <section>
                <div className="flex items-center gap-2 mb-7">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/10 to-primary/10 border border-gold/20 text-sm font-medium">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent font-semibold">
                      Featured Article
                    </span>
                  </span>
                </div>
                <BlogCardFeatured post={featuredPost} />
              </section>
            )}

            {/* All posts */}
            <section>
              <div className="mb-10">
                <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                  Latest Articles
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Explore Our <span className="gradient-text">Knowledge Hub</span>
                </h2>
              </div>
              <BlogGrid posts={regularPosts} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
