'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Star, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BLOG_CATEGORY_LABELS } from '@/lib/blogUtils';
import { formatPublishedDate } from '@/lib/blogUtils';

interface BlogCardFeaturedProps {
  post: any;
}

export function BlogCardFeatured({ post }: BlogCardFeaturedProps) {
  const categoryLabel =
    BLOG_CATEGORY_LABELS[post.category as keyof typeof BLOG_CATEGORY_LABELS] ??
    post.category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="glass-card rounded-3xl overflow-hidden hover:border-gold/30 transition-all duration-500 hover:shadow-elevated">
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[400px] relative overflow-hidden">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-lighter to-primary/10 flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-primary/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-card/40" />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-gold/15 to-gold/5 border border-gold/30 text-xs font-semibold">
                  <Star className="w-3 h-3 text-gold fill-gold" />
                  <span className="bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent">
                    Featured
                  </span>
                </span>
                <Badge className="rounded-full px-3 py-1 text-xs font-semibold bg-gradient-to-r from-gold/10 to-primary/10 text-primary border border-gold/20">
                  {categoryLabel}
                </Badge>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-5 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatPublishedDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </span>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-fit bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 shadow-lg hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 group/btn"
              >
                Read Article
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
