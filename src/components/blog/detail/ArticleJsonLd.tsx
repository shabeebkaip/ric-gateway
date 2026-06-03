const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ricmedical.com.sa';

interface ArticleJsonLdProps {
  post: any;
  url: string;
}

export function ArticleJsonLd({ post, url }: ArticleJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': url,
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage || undefined,
        url,
        datePublished: new Date(post.publishedAt).toISOString(),
        dateModified: new Date(post.updatedAt).toISOString(),
        author: {
          '@type': 'Person',
          name: post.author?.name ?? 'RIC Medical Team',
          jobTitle: post.author?.role ?? undefined,
        },
        publisher: {
          '@type': 'Organization',
          name: 'RIC – Riyadh International Corporation',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo@2x.png`,
          },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        keywords: Array.isArray(post.tags) ? post.tags.join(', ') : undefined,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'News & Blog',
            item: `${SITE_URL}/blog`,
          },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
