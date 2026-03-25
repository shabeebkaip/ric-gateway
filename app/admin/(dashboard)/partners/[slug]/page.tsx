'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PartnerForm } from '@/components/admin/PartnerForm';
import { Loader2, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
      <div className="space-y-6 max-w-3xl pb-10 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-muted rounded-md" />
          <div className="space-y-1.5">
            <div className="h-3 w-24 bg-muted rounded" />
            <div className="h-6 w-40 bg-muted rounded" />
          </div>
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-36 bg-muted rounded-xl" />
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-3xl">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">Partner not found</p>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
          </div>
          <Link href="/admin/partners">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Partners
            </Button>
          </Link>
        </div>
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
