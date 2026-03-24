'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PartnerForm } from '@/components/admin/PartnerForm';
import { Loader2 } from 'lucide-react';

export default function EditPartnerPage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const token = localStorage.getItem('admin-token');
        const res = await fetch(`/api/partners/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Partner not found');
        const json = await res.json();
        setData(json.partner);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPartner();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-2">
        <p className="text-lg font-semibold text-red-600">Partner not found</p>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <PartnerForm
      slug={slug}
      initialData={{
        name: data.name,
        slug: data.slug,
        logo: data.logo,
        website: data.website ?? '',
        country: data.country ?? '',
        flag: data.flag ?? '',
        invertColor: data.invertColor ?? false,
        categories: data.categories ?? [],
        subcategories: data.subcategories ?? [],
        products: data.products ?? [],
        tag: data.tag ?? '',
        order: data.order ?? 0,
        isActive: data.isActive ?? true,
      }}
    />
  );
}
