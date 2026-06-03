'use client';

import { useState, useEffect } from 'react';
import { Share2, Link2, MessageCircle, Linkedin, Check } from 'lucide-react';

interface ArticleShareProps {
  title: string;
  slug: string;
}

export function ArticleShare({ title, slug }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(`${window.location.origin}/blog/${slug}`);
  }, [slug]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        <Share2 className="w-3.5 h-3.5" />
        Share this article
      </p>
      <div className="flex flex-col gap-1">
        <button
          onClick={copyLink}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 text-left"
        >
          {copied ? (
            <Check className="w-4 h-4 text-accent flex-shrink-0" />
          ) : (
            <Link2 className="w-4 h-4 flex-shrink-0" />
          )}
          {copied ? 'Link copied!' : 'Copy link'}
        </button>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-green-600 hover:bg-green-50 transition-all duration-200"
        >
          <MessageCircle className="w-4 h-4 flex-shrink-0" />
          Share on WhatsApp
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
        >
          <Linkedin className="w-4 h-4 flex-shrink-0" />
          Share on LinkedIn
        </a>
      </div>
    </div>
  );
}
