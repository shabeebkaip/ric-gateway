'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus, Search, Pencil, Trash2, Package,
  Sparkles, Filter, X, TrendingUp, CheckCircle2,
  Star, ArrowRight, LayoutGrid, List, ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Product {
  _id: string;
  title: string;
  slug: string;
  category: string;
  partner: string;
  type?: string;
  thumbnail?: string;
  isPremium: boolean;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
}

type ViewMode = 'grid' | 'list';

function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-muted rounded" />
        <div className="h-3 w-1/2 bg-muted rounded" />
        <div className="h-8 bg-muted rounded" />
      </div>
    </Card>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      const res = await fetch('/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products ?? []);
      }
    } catch { /* handled silently */ }
    finally { setIsLoading(false); }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const token = localStorage.getItem('admin-token');
      const res = await fetch(`/api/products/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success(`${title} deleted`);
        setProducts(prev => prev.filter(p => p.slug !== slug));
      } else throw new Error();
    } catch {
      toast.error('Failed to delete product');
    }
  };

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category).filter(Boolean))).sort();
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = !searchTerm ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.type ?? '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
      const matchStatus = statusFilter === 'all' ||
        (statusFilter === 'active' && p.isActive) ||
        (statusFilter === 'inactive' && !p.isActive) ||
        (statusFilter === 'featured' && p.isFeatured) ||
        (statusFilter === 'premium' && p.isPremium);
      return matchSearch && matchCat && matchStatus;
    });
  }, [products, searchTerm, categoryFilter, statusFilter]);

  const stats = useMemo(() => ({
    total: products.length,
    active: products.filter(p => p.isActive).length,
    featured: products.filter(p => p.isFeatured).length,
    premium: products.filter(p => p.isPremium).length,
  }), [products]);

  const hasFilters = searchTerm || categoryFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="space-y-7 pb-10">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Products</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Product Inventory</h1>
          <p className="text-muted-foreground mt-1">
            {isLoading ? 'Loading...' : `${products.length} total products in your catalogue`}
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-gradient-to-r from-gold to-primary shadow-md hover:shadow-lg transition-shadow gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* KPI strip */}
      {!isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: stats.total, icon: Package, color: 'text-blue-600', bg: 'bg-blue-500/10', onClick: () => setStatusFilter('all') },
            { label: 'Active', value: stats.active, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-500/10', onClick: () => setStatusFilter('active') },
            { label: 'Featured', value: stats.featured, icon: Sparkles, color: 'text-amber-600', bg: 'bg-amber-500/10', onClick: () => setStatusFilter('featured') },
            { label: 'Premium', value: stats.premium, icon: Star, color: 'text-violet-600', bg: 'bg-violet-500/10', onClick: () => setStatusFilter('premium') },
          ].map(({ label, value, icon: Icon, color, bg, onClick }) => (
            <Card
              key={label}
              className="p-4 flex items-center gap-3 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-border/60"
              onClick={onClick}
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <Card className="p-4 border-border/60">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, category, partner or type..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 h-10"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-44 h-10">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 h-10">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center border rounded-lg overflow-hidden h-10 flex-shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 h-full flex items-center transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 h-full flex items-center transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
        {hasFilters && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">
              {filtered.length} of {products.length} products
            </span>
            <button
              onClick={() => { setSearchTerm(''); setCategoryFilter('all'); setStatusFilter('all'); }}
              className="text-xs text-destructive hover:underline flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear filters
            </button>
          </div>
        )}
      </Card>

      {/* Grid view */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : filtered.map(product => (
                <Card key={product._id} className="overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/60">
                  {/* Thumbnail */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-14 h-14 text-slate-300" />
                      </div>
                    )}
                    {/* Status badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isPremium && (
                        <Badge className="text-[10px] bg-violet-600 text-white border-0 rounded-full px-2">Premium</Badge>
                      )}
                      {product.isFeatured && (
                        <Badge className="text-[10px] bg-amber-500 text-white border-0 rounded-full px-2">Featured</Badge>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className={`w-2 h-2 rounded-full ${product.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`} title={product.isActive ? 'Active' : 'Inactive'} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-[10px] rounded-full truncate max-w-[80px]">{product.category}</Badge>
                      {product.type && <span className="text-[10px] text-muted-foreground truncate">{product.type}</span>}
                    </div>
                    <div className="flex items-center gap-1.5 pt-3 border-t border-border/50">
                      <Link href={`/admin/products/${product.slug}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-1.5">
                          <Pencil className="w-3.5 h-3.5" /> Edit
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(product.slug, product.title)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
        </div>
      )}

      {/* List view */}
      {viewMode === 'list' && !isLoading && (
        <Card className="border-border/60 overflow-hidden">
          <div className="divide-y divide-border/50">
            {filtered.map((product, i) => (
              <div key={product._id} className="flex items-center gap-4 p-4 hover:bg-muted/40 transition-colors group">
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden border border-border/40">
                  {product.thumbnail ? (
                    <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain p-1.5" />
                  ) : (
                    <Package className="w-6 h-6 text-slate-300" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">{product.title}</p>
                    {product.isPremium && <Badge className="text-[10px] bg-violet-600 text-white border-0 rounded-full px-1.5 flex-shrink-0">Premium</Badge>}
                    {product.isFeatured && <Badge className="text-[10px] bg-amber-500 text-white border-0 rounded-full px-1.5 flex-shrink-0">Featured</Badge>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="truncate">{product.category}</span>
                    {product.partner && <><span>·</span><span className="truncate">{product.partner}</span></>}
                    {product.type && <><span>·</span><span className="truncate">{product.type}</span></>}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className={`w-1.5 h-1.5 rounded-full ${product.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                  <span className="text-xs text-muted-foreground hidden sm:block">{product.isActive ? 'Active' : 'Inactive'}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/products/${product.slug}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(product.slug, product.title)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Empty state */}
      {!isLoading && filtered.length === 0 && (
        <Card className="p-12 text-center border-border/60 border-dashed">
          <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground text-sm mb-6">
            {hasFilters ? 'Try adjusting your filters or search query.' : 'Get started by adding your first product.'}
          </p>
          {hasFilters ? (
            <Button variant="outline" onClick={() => { setSearchTerm(''); setCategoryFilter('all'); setStatusFilter('all'); }}>
              <X className="w-4 h-4 mr-2" /> Clear Filters
            </Button>
          ) : (
            <Link href="/admin/products/new">
              <Button className="bg-gradient-to-r from-gold to-primary gap-2">
                <Plus className="w-4 h-4" /> Add First Product
              </Button>
            </Link>
          )}
        </Card>
      )}
    </div>
  );
}


interface Product {
  _id: string;
  title: string;
  slug: string;
  category: string;
  partner: string;
  thumbnail?: string;
  isPremium: boolean;
  isActive: boolean;
  createdAt: string;
}
