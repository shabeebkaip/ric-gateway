import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ChevronRight, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BLOG_CATEGORY_LABELS } from '@/lib/blogUtils';
import { formatPublishedDate } from '@/lib/blogUtils';

interface ArticleHeaderProps {
  post: any;
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  const categoryLabel =
    BLOG_CATEGORY_LABELS[post.category as keyof typeof BLOG_CATEGORY_LABELS] ??
    post.category;

  return (
    <header className="max-w-4xl">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8 flex-wrap"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <Link href="/blog" className="hover:text-foreground transition-colors">
          News & Blog
        </Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <span className="text-foreground font-medium truncate max-w-[260px]">
          {post.title}
        </span>
      </nav>

      {/* Category badge */}
      <div className="mb-5">
        <Badge className="rounded-full px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-gold/10 to-primary/10 text-primary border border-gold/20">
          {categoryLabel}
        </Badge>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
        {post.title}
      </h1>

      {/* Excerpt */}
      <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
        {post.excerpt}
      </p>

      {/* Author + meta row */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground pb-8 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          {post.author?.avatar ? (
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-border"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center ring-2 ring-border">
              <User className="w-4 h-4 text-primary" />
            </div>
          )}
          <div>
            <p className="font-semibold text-foreground text-sm leading-none">
              {post.author?.name}
            </p>
            {post.author?.role && (
              <p className="text-xs text-muted-foreground mt-0.5">{post.author.role}</p>
            )}
          </div>
        </div>

        <span className="text-border hidden sm:block">·</span>

        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {formatPublishedDate(post.publishedAt)}
        </span>

        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {post.readTime} min read
        </span>
      </div>

      {/* Cover image */}
      {post.coverImage && (
        <div className="relative mt-8 rounded-2xl overflow-hidden aspect-[16/9] shadow-card">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            title={post.coverImageTitle || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>
      )}
    </header>
  );
}
