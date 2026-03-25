'use client';

import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Pencil, Trash2, Users, X } from 'lucide-react';
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
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { fetchPartners(); }, []);

  const fetchPartners = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      const res = await fetch('/api/partners', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPartners((data.partners || []).sort((a: Partner, b: Partner) => a.order - b.order));
      }
    } catch {
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

  const filtered = useMemo(() => {
    if (!search.trim()) return partners;
    const q = search.toLowerCase();
    return partners.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.country?.toLowerCase().includes(q) ||
        p.categories.some((c) => c.toLowerCase().includes(q))
    );
  }, [search, partners]);

  return (
    <div className="space-y-6 pb-10">

      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Partners</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isLoading ? 'Loading…' : `${partners.length} partners`}
          </p>
        </div>
        <Link href="/admin/partners/new">
          <Button className="bg-gradient-to-r from-gold to-primary gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Add Partner
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search partners…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 pr-8 h-9"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* List */}
      {isLoading ? (
        <div className="divide-y divide-border/50 rounded-xl border border-border/60 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 bg-card animate-pulse">
              <div className="w-14 h-10 bg-muted rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3.5 w-32 bg-muted rounded" />
                <div className="h-3 w-20 bg-muted rounded" />
              </div>
              <div className="h-5 w-16 bg-muted rounded-full" />
              <div className="flex gap-2">
                <div className="h-7 w-14 bg-muted rounded-md" />
                <div className="h-7 w-7 bg-muted rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mb-4">
            <Users className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="font-medium mb-1">{search ? 'No results' : 'No partners yet'}</p>
          <p className="text-sm text-muted-foreground mb-5">
            {search ? `Nothing matches "${search}"` : 'Add your first international partner.'}
          </p>
          {!search && (
            <Link href="/admin/partners/new">
              <Button className="bg-gradient-to-r from-gold to-primary gap-2">
                <Plus className="w-4 h-4" /> Add Partner
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-border/60 overflow-hidden">
          {filtered.map((partner, idx) => (
            <div
              key={partner._id}
              className={`flex items-center gap-5 px-5 py-4 hover:bg-muted/40 transition-colors group ${idx !== 0 ? 'border-t border-border/50' : ''}`}
            >
              {/* Logo */}
              <div className="w-16 h-12 rounded-lg bg-white border border-border/60 flex items-center justify-center p-2 flex-shrink-0 overflow-hidden">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                    style={{ filter: partner.isActive === false ? 'grayscale(1) opacity(0.5)' : undefined }}
                  />
                ) : (
                  <Users className="w-5 h-5 text-muted-foreground" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm truncate">{partner.name}</span>
                  {partner.tag && (
                    <Badge variant="outline" className="text-[10px] rounded-full h-4 px-1.5 font-normal flex-shrink-0">
                      {partner.tag}
                    </Badge>
                  )}
                </div>
                {partner.country && (
                  <p className="text-xs text-muted-foreground mt-0.5">{partner.flag} {partner.country}</p>
                )}
              </div>

              {/* Categories */}
              <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
                {partner.categories.filter(Boolean).slice(0, 2).map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs rounded-full capitalize font-normal">
                    {cat.replace(/-/g, ' ')}
                  </Badge>
                ))}
                {partner.categories.filter(Boolean).length > 2 && (
                  <span className="text-xs text-muted-foreground">+{partner.categories.filter(Boolean).length - 2}</span>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full ${partner.isActive !== false ? 'bg-emerald-500' : 'bg-muted-foreground/40'}`} />
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  {partner.isActive !== false ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/admin/partners/${partner.slug}`}>
                  <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs px-3">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(partner.slug, partner.name)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


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
