import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogCard } from '../BlogCard';

interface RelatedPostsProps {
  posts: any[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-border/50">
      <div className="flex items-start justify-between mb-10">
        <div>
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-3">
            Keep Reading
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Related <span className="gradient-text">Articles</span>
          </h2>
        </div>
        <Link
          href="/blog"
          className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-300 mt-2"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts.map((post, index) => (
          <BlogCard key={String(post._id ?? post.slug)} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}
