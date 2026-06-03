'use client';

import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Lightbulb } from 'lucide-react';

interface BlogHeroProps {
  totalPosts: number;
}

export function BlogHero({ totalPosts }: BlogHeroProps) {
  return (
    <section className="relative gradient-bg-hero overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '-3s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-lighter/20 rounded-full blur-3xl" />
      </div>

      <div className="container-padding container mx-auto relative z-10 pt-32 pb-20">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/10 to-primary/10 border border-gold/20 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <BookOpen className="w-4 h-4 text-gold" />
            <span className="bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent font-semibold">
              Knowledge Hub
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            News, Articles &{' '}
            <span className="gradient-text">Expert Knowledge</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Stay at the forefront of medical technology, industry trends, and
            clinical best practices — backed by RIC&apos;s 40+ years of
            healthcare expertise.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { icon: BookOpen, value: String(totalPosts), label: 'Articles Published' },
              { icon: Lightbulb, value: '4', label: 'Topic Categories' },
              { icon: TrendingUp, value: '40+', label: 'Years of Expertise' },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="glass-card rounded-2xl px-6 py-4 flex items-center gap-3 hover-lift"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/10 to-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground leading-none">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
