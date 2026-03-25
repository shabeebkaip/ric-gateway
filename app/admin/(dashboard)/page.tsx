'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  BarChart, Bar, XAxis, YAxis, Cell,
  PieChart, Pie, ResponsiveContainer, Tooltip,
  RadialBarChart, RadialBar, Legend,
} from 'recharts';
import {
  Package, FolderOpen, Users, FileText,
  TrendingUp, ArrowRight, Globe, Activity,
  Layers, Sparkles, BarChart3, PieChartIcon,
} from 'lucide-react';
import Link from 'next/link';

interface ProductDoc {
  _id: string;
  title: string;
  category?: string;
  partner?: string;
  type?: string;
  isActive?: boolean;
  isFeatured?: boolean;
}

interface CategoryDoc {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
}

interface PartnerDoc {
  _id: string;
  name: string;
  slug: string;
  country?: string;
  isActive?: boolean;
}

interface ContentDoc {
  _id: string;
  page: string;
  section: string;
}

interface DashboardData {
  products: ProductDoc[];
  categories: CategoryDoc[];
  partners: PartnerDoc[];
  content: ContentDoc[];
}

const CHART_COLORS = ['#2563eb', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626', '#db2777', '#65a30d'];

const STAT_META = [
  {
    key: 'products' as const,
    label: 'Total Products',
    icon: Package,
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    href: '/admin/products',
  },
  {
    key: 'categories' as const,
    label: 'Categories',
    icon: FolderOpen,
    gradient: 'from-violet-500 to-violet-600',
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    href: '/admin/categories',
  },
  {
    key: 'partners' as const,
    label: 'Partners',
    icon: Users,
    gradient: 'from-cyan-500 to-cyan-600',
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
    href: '/admin/partners',
  },
  {
    key: 'content' as const,
    label: 'Content Sections',
    icon: FileText,
    gradient: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    href: '/admin/content',
  },
] as const;

const QUICK_ACTIONS = [
  { href: '/admin/products', icon: Package, label: 'Products', desc: 'Add & manage products', color: 'hover:border-blue-300 hover:bg-blue-50/60 group-hover:text-blue-600' },
  { href: '/admin/categories', icon: FolderOpen, label: 'Categories', desc: 'Organise categories', color: 'hover:border-violet-300 hover:bg-violet-50/60 group-hover:text-violet-600' },
  { href: '/admin/partners', icon: Users, label: 'Partners', desc: 'Manage partners', color: 'hover:border-cyan-300 hover:bg-cyan-50/60 group-hover:text-cyan-600' },
  { href: '/admin/content', icon: FileText, label: 'Content', desc: 'Edit page content', color: 'hover:border-emerald-300 hover:bg-emerald-50/60 group-hover:text-emerald-600' },
];

function StatCardSkeleton() {
  return (
    <Card className="p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 w-24 bg-muted rounded" />
          <div className="h-8 w-16 bg-muted rounded" />
          <div className="h-3 w-20 bg-muted rounded" />
        </div>
        <div className="w-14 h-14 rounded-2xl bg-muted" />
      </div>
    </Card>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>({ products: [], categories: [], partners: [], content: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch('/api/products', { headers }).then(r => r.json()).catch(() => ({})),
      fetch('/api/categories', { headers }).then(r => r.json()).catch(() => ({})),
      fetch('/api/partners', { headers }).then(r => r.json()).catch(() => ({})),
      fetch('/api/content', { headers }).then(r => r.json()).catch(() => ({})),
    ]).then(([p, c, pa, co]) => {
      setData({
        products: p.products ?? [],
        categories: c.categories ?? [],
        partners: pa.partners ?? [],
        content: co.content ?? [],
      });
    }).finally(() => setIsLoading(false));
  }, []);

  // ── Derived chart data ────────────────────────────────────────────────────

  const productsByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    data.products.forEach(p => {
      const key = p.category || 'Uncategorised';
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [data.products]);

  const productsByType = useMemo(() => {
    const map: Record<string, number> = {};
    data.products.forEach(p => {
      const key = p.type || 'Other';
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [data.products]);

  const productsByPartner = useMemo(() => {
    const map: Record<string, number> = {};
    data.products.forEach(p => {
      const key = p.partner || 'Unknown';
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value, fill: '' }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
      .map((item, i) => ({ ...item, fill: CHART_COLORS[i % CHART_COLORS.length] }));
  }, [data.products]);

  const stats = {
    products: data.products.length,
    categories: data.categories.length,
    partners: data.partners.length,
    content: data.content.length,
  };

  const activeProducts = data.products.filter(p => p.isActive !== false).length;
  const featuredProducts = data.products.filter(p => p.isFeatured).length;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8 pb-10">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Admin Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with RIC Gateway today.</p>
        </div>
        <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1">
          <Activity className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-xs font-medium">Live</span>
        </Badge>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          : STAT_META.map((meta) => {
              const Icon = meta.icon;
              const value = stats[meta.key];
              return (
                <Link href={meta.href} key={meta.key}>
                  <Card className="p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group border-border/60">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground font-medium">{meta.label}</p>
                        <p className="text-4xl font-bold tracking-tight">{value}</p>
                      </div>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                      <ArrowRight className="w-3 h-3" />
                      <span>View all {meta.label.toLowerCase()}</span>
                    </div>
                  </Card>
                </Link>
              );
            })}
      </div>

      {/* Secondary KPIs */}
      {!isLoading && data.products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card className="p-5 border-border/60 bg-gradient-to-br from-blue-50/60 to-blue-100/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeProducts}</p>
                <p className="text-xs text-muted-foreground">Active Products</p>
              </div>
            </div>
          </Card>
          <Card className="p-5 border-border/60 bg-gradient-to-br from-amber-50/60 to-amber-100/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{featuredProducts}</p>
                <p className="text-xs text-muted-foreground">Featured Products</p>
              </div>
            </div>
          </Card>
          <Card className="p-5 border-border/60 bg-gradient-to-br from-violet-50/60 to-violet-100/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{productsByCategory.length}</p>
                <p className="text-xs text-muted-foreground">Active Categories</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Charts Row */}
      {!isLoading && data.products.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Products by Category — Bar Chart (3 cols) */}
          <Card className="lg:col-span-3 p-6 border-border/60">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Products by Category</h3>
                <p className="text-xs text-muted-foreground">{data.products.length} total products across {productsByCategory.length} categories</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={productsByCategory} barSize={28} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                  height={50}
                />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))', radius: 6 }}
                  contentStyle={{ border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="count" name="Products" radius={[6, 6, 0, 0]}>
                  {productsByCategory.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Products by Type — Pie Chart (2 cols) */}
          <Card className="lg:col-span-2 p-6 border-border/60">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <PieChartIcon className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Products by Type</h3>
                <p className="text-xs text-muted-foreground">Distribution across {productsByType.length} types</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={productsByType}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {productsByType.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 space-y-1.5">
              {productsByType.slice(0, 4).map((item, i) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                    <span className="text-muted-foreground truncate max-w-[120px]">{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Partner Distribution + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Products per Partner — Radial (2 cols) */}
        {!isLoading && productsByPartner.length > 0 && (
          <Card className="lg:col-span-2 p-6 border-border/60">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Globe className="w-4 h-4 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Top Partners</h3>
                <p className="text-xs text-muted-foreground">By product count</p>
              </div>
            </div>
            <div className="space-y-3">
              {productsByPartner.map((item, i) => {
                const max = productsByPartner[0].value;
                const pct = Math.round((item.value / max) * 100);
                return (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground truncate max-w-[140px]">{item.name}</span>
                      <span className="text-xs font-semibold">{item.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: item.fill }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Quick Actions (3 cols) */}
        <Card className={`${!isLoading && productsByPartner.length > 0 ? 'lg:col-span-3' : 'lg:col-span-5'} p-6 border-border/60`}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Quick Actions</h3>
              <p className="text-xs text-muted-foreground">Navigate to any section</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map(({ href, icon: Icon, label, desc, color }) => (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-3 p-4 rounded-xl border border-border/60 transition-all duration-200 ${color}`}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{label}</p>
                  <p className="text-xs text-muted-foreground truncate">{desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Partners & Categories Overview */}
      {!isLoading && (data.partners.length > 0 || data.categories.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Partners list */}
          {data.partners.length > 0 && (
            <Card className="p-6 border-border/60">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Partners</h3>
                    <p className="text-xs text-muted-foreground">{data.partners.length} total</p>
                  </div>
                </div>
                <Link href="/admin/partners" className="text-xs text-primary hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-2">
                {data.partners.slice(0, 6).map((p: any) => (
                  <div key={p._id} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                    <div className="flex items-center gap-2.5">
                      {p.logo ? (
                        <img src={p.logo} alt={p.name} className="w-8 h-8 object-contain rounded-md bg-muted p-1" />
                      ) : (
                        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                          <Users className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        {p.country && <p className="text-xs text-muted-foreground">{p.country}</p>}
                      </div>
                    </div>
                    <Badge variant={p.isActive !== false ? 'default' : 'secondary'} className="text-[10px] rounded-full">
                      {p.isActive !== false ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Categories list */}
          {data.categories.length > 0 && (
            <Card className="p-6 border-border/60">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <FolderOpen className="w-4 h-4 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Categories</h3>
                    <p className="text-xs text-muted-foreground">{data.categories.length} total</p>
                  </div>
                </div>
                <Link href="/admin/categories" className="text-xs text-primary hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-2">
                {data.categories.slice(0, 6).map((c: any) => {
                  const productCount = data.products.filter(p => p.category === c.id || p.category === c.slug).length;
                  return (
                    <div key={c._id} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                          <Package className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{c.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{c.slug}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-[10px] rounded-full">
                        {productCount} products
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
