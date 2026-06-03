'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TOCItem } from '@/lib/blogUtils';

interface ArticleTOCProps {
  items: TOCItem[];
}

export function ArticleTOC({ items }: ArticleTOCProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-80px 0% -60% 0%', threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        <List className="w-3.5 h-3.5" />
        In this article
      </p>
      <nav>
        <ul className="space-y-1.5">
          {items.map(({ id, text, level }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={cn(
                  'block w-full text-left text-sm leading-snug transition-all duration-200 py-0.5 rounded',
                  level === 3 && 'pl-4',
                  activeId === id
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
