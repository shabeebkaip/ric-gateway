'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BLOG_CATEGORY_LABELS } from '@/lib/blogUtils';
import { formatPublishedDate } from '@/lib/blogUtils';

interface BlogCardProps {
  post: any;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const categoryLabel =
    BLOG_CATEGORY_LABELS[post.category as keyof typeof BLOG_CATEGORY_LABELS] ??
    post.category;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col hover-lift hover:border-gold/30 transition-all duration-300">
          {/* Cover image */}
          <div className="aspect-[16/9] bg-gradient-to-br from-primary-lighter to-muted overflow-hidden flex-shrink-0">
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-primary/20" />
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col flex-1">
            {/* Category + read time */}
            <div className="flex items-center gap-2 mb-3">
              <Badge className="rounded-full px-3 py-1 text-xs font-semibold bg-gradient-to-r from-gold/10 to-primary/10 text-primary border border-gold/20 hover:bg-gradient-to-r">
                {categoryLabel}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {post.readTime} min read
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-foreground mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
              {post.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                {formatPublishedDate(post.publishedAt)}
              </div>
              <span className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all duration-300">
                Read more
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
