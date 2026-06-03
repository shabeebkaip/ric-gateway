'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
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
  Plus,
  Search,
  Pencil,
  Trash2,
  BookOpen,
  X,
  CheckCircle2,
  Star,
  FileText,
  Clock,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';
import { BLOG_CATEGORY_LABELS } from '@/lib/blogUtils';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: string;
  readTime: number;
  author: { name: string };
  createdAt: string;
}

function PostSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-muted flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 bg-muted rounded" />
        <div className="h-3 w-1/2 bg-muted rounded" />
      </div>
    </div>
  );
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      const res = await fetch('/api/blog?all=true', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts ?? []);
      }
    } catch { /* silent */ }
    finally { setIsLoading(false); }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const token = localStorage.getItem('admin-token');
      const res = await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success(`"${title}" deleted`);
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
      } else throw new Error();
    } catch {
      toast.error('Failed to delete post');
    }
  };

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchSearch =
        !searchTerm ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.author?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'published' && p.isPublished) ||
        (statusFilter === 'draft' && !p.isPublished) ||
        (statusFilter === 'featured' && p.isFeatured);
      return matchSearch && matchCat && matchStatus;
    });
  }, [posts, searchTerm, categoryFilter, statusFilter]);

  const stats = useMemo(() => ({
    total: posts.length,
    published: posts.filter((p) => p.isPublished).length,
    drafts: posts.filter((p) => !p.isPublished).length,
    featured: posts.filter((p) => p.isFeatured).length,
  }), [posts]);

  const hasFilters = searchTerm || categoryFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="space-y-7 pb-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Blog</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">
            {isLoading ? 'Loading...' : `${posts.length} total articles`}
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-gradient-to-r from-gold to-primary shadow-md hover:shadow-lg transition-shadow gap-2">
            <Plus className="w-4 h-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* KPI strip */}
      {!isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: stats.total, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-500/10', filter: 'all' },
            { label: 'Published', value: stats.published, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-500/10', filter: 'published' },
            { label: 'Drafts', value: stats.drafts, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-500/10', filter: 'draft' },
            { label: 'Featured', value: stats.featured, icon: Star, color: 'text-violet-600', bg: 'bg-violet-500/10', filter: 'featured' },
          ].map(({ label, value, icon: Icon, color, bg, filter }) => (
            <Card
              key={label}
              className="p-4 flex items-center gap-3 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-border/60"
              onClick={() => setStatusFilter(filter)}
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
              placeholder="Search by title, category or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48 h-10">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {Object.entries(BLOG_CATEGORY_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 h-10">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {hasFilters && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {filtered.length} of {posts.length} posts
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

      {/* Post list */}
      <Card className="border-border/60 overflow-hidden">
        {isLoading ? (
          <div className="divide-y divide-border/50">
            {Array.from({ length: 5 }).map((_, i) => <PostSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center border-dashed">
            <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground text-sm mb-6">
              {hasFilters
                ? 'Try adjusting your filters.'
                : 'Get started by writing your first article.'}
            </p>
            {!hasFilters && (
              <Link href="/admin/blog/new">
                <Button className="bg-gradient-to-r from-gold to-primary gap-2">
                  <Plus className="w-4 h-4" /> Write First Post
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {filtered.map((post) => {
              const categoryLabel =
                BLOG_CATEGORY_LABELS[post.category as keyof typeof BLOG_CATEGORY_LABELS] ??
                post.category;
              return (
                <div
                  key={post._id}
                  className="flex items-center gap-4 p-4 hover:bg-muted/40 transition-colors group"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                        {post.title}
                      </p>
                      {post.isFeatured && (
                        <Badge className="text-[10px] bg-amber-500 text-white border-0 rounded-full px-1.5 flex-shrink-0">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      <span>{categoryLabel}</span>
                      <span>·</span>
                      <span>{post.author?.name}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min
                      </span>
                      {post.publishedAt && (
                        <>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status dot */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${post.isPublished ? 'bg-emerald-500' : 'bg-amber-400'}`}
                    />
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {post.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground">
                        View
                      </Button>
                    </Link>
                    <Link href={`/admin/blog/${post.slug}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(post.slug, post.title)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
