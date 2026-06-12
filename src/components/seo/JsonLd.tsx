import type { CMSSeo } from '@/lib/seo';

interface JsonLdProps {
  seo: CMSSeo;
  breadcrumbs?: Array<{ name: string; url: string }>;
  article?: {
    headline: string;
    description: string;
    image?: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    url: string;
  };
}

export function JsonLd({ seo, breadcrumbs, article }: JsonLdProps) {
  const schemas: object[] = [];

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seo.schema.organization.name,
    url: seo.schema.organization.url,
    logo: seo.schema.organization.logo,
    description: seo.schema.organization.description,
    sameAs: seo.schema.organization.sameAs.filter(Boolean),
  });

  if (seo.schema.localBusiness.enabled) {
    const lb = seo.schema.localBusiness;
    schemas.push({
      '@context': 'https://schema.org',
      '@type': lb.type || 'MedicalBusiness',
      name: lb.name,
      telephone: lb.phone,
      email: lb.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: lb.streetAddress,
        addressLocality: lb.city,
        addressRegion: lb.region,
        postalCode: lb.postalCode,
        addressCountry: lb.country,
      },
    });
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    });
  }

  if (article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.headline,
      description: article.description,
      image: article.image,
      author: { '@type': 'Person', name: article.author },
      publisher: {
        '@type': 'Organization',
        name: seo.schema.organization.name,
        logo: { '@type': 'ImageObject', url: seo.schema.organization.logo },
      },
      datePublished: article.datePublished,
      dateModified: article.dateModified ?? article.datePublished,
      url: article.url,
    });
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
