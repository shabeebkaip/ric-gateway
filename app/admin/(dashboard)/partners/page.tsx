'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Globe, Users } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Partner {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  country?: string;
  flag?: string;
  categories: string[];
  tag?: string;
  isActive: boolean;
  order: number;
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filtered, setFiltered] = useState<Partner[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    if (search.trim()) {
      setFiltered(
        partners.filter(
          (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.country?.toLowerCase().includes(search.toLowerCase()) ||
            p.categories.some((c) => c.toLowerCase().includes(search.toLowerCase()))
        )
      );
    } else {
      setFiltered(partners);
    }
  }, [search, partners]);

  const fetchPartners = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      const res = await fetch('/api/partners', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const sorted = (data.partners || []).sort((a: Partner, b: Partner) => a.order - b.order);
        setPartners(sorted);
        setFiltered(sorted);
      }
    } catch (error) {
      toast.error('Failed to fetch partners');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Delete "${name}"? This action cannot be undone.`)) return;
    try {
      const token = localStorage.getItem('admin-token');
      const res = await fetch(`/api/partners/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success(`${name} deleted`);
        fetchPartners();
      } else {
        toast.error('Failed to delete partner');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Partners</h1>
          <p className="text-muted-foreground mt-1">
            Manage international partners ({filtered.length} partners)
          </p>
        </div>
        <Link href="/admin/partners/new">
          <Button className="bg-gradient-to-r from-gold to-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Partner
          </Button>
        </Link>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, country, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((partner) => (
          <Card key={partner._id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Logo area */}
            <div className="h-36 bg-muted flex items-center justify-center p-6">
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                  style={{ filter: partner.isActive ? undefined : 'grayscale(100%)' }}
                />
              ) : (
                <Users className="w-12 h-12 text-muted-foreground" />
              )}
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{partner.name}</h3>
                  {partner.country && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                      {partner.flag} {partner.country}
                    </p>
                  )}
                </div>
                {partner.tag && (
                  <Badge variant="outline" className="text-xs shrink-0">
                    {partner.tag}
                  </Badge>
                )}
              </div>

              {partner.categories.filter(Boolean).length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {partner.categories.filter(Boolean).map((cat) => (
                    <Badge key={cat} variant="secondary" className="text-xs capitalize">
                      {cat.replace(/-/g, ' ')}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <Link href={`/admin/partners/${partner.slug}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(partner.slug, partner.name)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No partners found</h3>
          <p className="text-muted-foreground mb-4">
            {search ? 'Try a different search term' : 'Get started by adding your first partner'}
          </p>
          {!search && (
            <Link href="/admin/partners/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Partner
              </Button>
            </Link>
          )}
        </Card>
      )}
    </div>
  );
}
