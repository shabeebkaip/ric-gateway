import { BookOpen } from 'lucide-react';
import { BlogCard } from './BlogCard';

interface BlogGridProps {
  posts: any[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-5">
          <BookOpen className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No articles yet</h3>
        <p className="text-muted-foreground text-sm">
          Check back soon — new content is on the way.
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {posts.map((post, index) => (
        <BlogCard key={String(post._id ?? post.slug)} post={post} index={index} />
      ))}
    </div>
  );
}
