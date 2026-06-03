'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUpload } from '@/components/admin/ImageUpload';
import {
  ArrowLeft,
  Save,
  BookOpen,
  Tag,
  Image as ImageIcon,
  Settings,
  ChevronRight,
  Plus,
  X,
  Loader2,
  Star,
  CheckCircle2,
  Hash,
  FileText,
  User,
  Eye,
  Pencil,
} from 'lucide-react';
import { toast } from 'sonner';
import { BLOG_CATEGORIES, BLOG_CATEGORY_LABELS, generateSlug } from '@/lib/blogUtils';

interface FormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: { name: string; role: string; avatar: string };
  isFeatured: boolean;
  isPublished: boolean;
  metaTitle: string;
  metaDescription: string;
  order: number;
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [contentMode, setContentMode] = useState<'write' | 'preview'>('write');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: '',
    tags: [],
    author: { name: 'RIC Medical Team', role: 'Medical Equipment Specialist', avatar: '' },
    isFeatured: false,
    isPublished: false,
    metaTitle: '',
    metaDescription: '',
    order: 0,
  });

  const handleChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'title' && !formData.slug) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(value as string) }));
    }
  };

  const handleAuthorChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, author: { ...prev.author, [field]: value } }));
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) { toast.error('Please select a category'); return; }
    setIsLoading(true);
    try {
      const token = localStorage.getItem('admin-token');
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create post');
      }
      toast.success('Post created successfully');
      router.push('/admin/blog');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-7 pb-16 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <Link href="/admin/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">New Post</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/blog">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">New Blog Post</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Write and publish a new article</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="overflow-hidden border-border/60">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-400" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-base font-semibold">Basic Information</h2>
            </div>
            <div className="space-y-5">
              <div>
                <Label htmlFor="title" className="text-xs font-medium mb-1.5 block">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. Advances in Radiation Oncology in Saudi Arabia"
                  className="h-10"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug" className="text-xs font-medium mb-1.5 block">
                  Slug <span className="text-muted-foreground font-normal">(auto-generated)</span>
                </Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    placeholder="article-slug"
                    className="h-10 pl-9 font-mono text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="excerpt" className="text-xs font-medium mb-1.5 block">
                  Excerpt * <span className="text-muted-foreground font-normal">({formData.excerpt.length}/320 chars — used as meta description)</span>
                </Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
                  placeholder="A concise summary of the article (150–320 characters)..."
                  rows={3}
                  maxLength={320}
                  className="resize-none"
                  required
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Content */}
        <Card className="overflow-hidden border-border/60">
          <div className="h-1 bg-gradient-to-r from-indigo-500 to-indigo-400" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-indigo-600" />
                </div>
                <h2 className="text-base font-semibold">Content (HTML) *</h2>
              </div>
              <div className="flex items-center rounded-lg border border-border overflow-hidden">
                <button
                  type="button"
                  onClick={() => setContentMode('write')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${contentMode === 'write' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
                >
                  <Pencil className="w-3 h-3" /> Write
                </button>
                <button
                  type="button"
                  onClick={() => setContentMode('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${contentMode === 'preview' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
                >
                  <Eye className="w-3 h-3" /> Preview
                </button>
              </div>
            </div>

            {contentMode === 'write' ? (
              <>
                <Textarea
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  placeholder={`<h2>Introduction</h2>\n<p>Your article content here. Use HTML tags for formatting.</p>\n\n<h2>Section Title</h2>\n<p>More content...</p>`}
                  rows={24}
                  className="font-mono text-sm resize-y"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Write HTML content. Use &lt;h2&gt; and &lt;h3&gt; for headings (they will appear in the Table of Contents automatically).
                </p>
              </>
            ) : (
              <div
                className="min-h-[480px] p-6 border rounded-xl bg-background overflow-auto
                  prose prose-slate max-w-none
                  prose-headings:font-sans prose-headings:font-bold prose-headings:text-foreground
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-a:text-primary prose-strong:text-foreground"
                dangerouslySetInnerHTML={{
                  __html: formData.content || '<p class="text-muted-foreground italic">Nothing to preview yet. Switch to Write to add content.</p>',
                }}
              />
            )}
          </div>
        </Card>

        {/* Cover Image */}
        <Card className="overflow-hidden border-border/60">
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-400" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
              </div>
              <h2 className="text-base font-semibold">Cover Image</h2>
            </div>
            <ImageUpload
              value={formData.coverImage ? [formData.coverImage] : []}
              onChange={(urls) => handleChange('coverImage', urls[0] ?? '')}
              maxFiles={1}
              folder="blog"
            />
          </div>
        </Card>

        {/* Classification */}
        <Card className="overflow-hidden border-border/60">
          <div className="h-1 bg-gradient-to-r from-violet-500 to-violet-400" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <Tag className="w-4 h-4 text-violet-600" />
              </div>
              <h2 className="text-base font-semibold">Category & Tags</h2>
            </div>
            <div className="space-y-5">
              <div>
                <Label className="text-xs font-medium mb-1.5 block">Category *</Label>
                <Select value={formData.category} onValueChange={(v) => handleChange('category', v)}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOG_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {BLOG_CATEGORY_LABELS[cat]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="e.g. oncology, medical-imaging"
                    className="h-10"
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                  />
                  <Button type="button" onClick={addTag} variant="outline" className="h-10 px-4 flex-shrink-0">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 text-sm bg-muted rounded-full px-3 py-1.5 border border-border/60"
                      >
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Author */}
        <Card className="overflow-hidden border-border/60">
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-cyan-400" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <User className="w-4 h-4 text-cyan-600" />
              </div>
              <h2 className="text-base font-semibold">Author</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label className="text-xs font-medium mb-1.5 block">Author Name *</Label>
                <Input
                  value={formData.author.name}
                  onChange={(e) => handleAuthorChange('name', e.target.value)}
                  placeholder="e.g. Dr. Ahmed Al-Rashidi"
                  className="h-10"
                  required
                />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block">Role / Title</Label>
                <Input
                  value={formData.author.role}
                  onChange={(e) => handleAuthorChange('role', e.target.value)}
                  placeholder="e.g. Medical Equipment Specialist"
                  className="h-10"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* SEO */}
        <Card className="overflow-hidden border-border/60">
          <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-400" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Hash className="w-4 h-4 text-orange-600" />
              </div>
              <h2 className="text-base font-semibold">SEO Overrides</h2>
            </div>
            <div className="space-y-5">
              <div>
                <Label className="text-xs font-medium mb-1.5 block">
                  Meta Title <span className="text-muted-foreground font-normal">(optional — defaults to article title)</span>
                </Label>
                <Input
                  value={formData.metaTitle}
                  onChange={(e) => handleChange('metaTitle', e.target.value)}
                  placeholder="Custom page title for search engines..."
                  className="h-10"
                />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block">
                  Meta Description <span className="text-muted-foreground font-normal">(optional — defaults to excerpt)</span>
                </Label>
                <Textarea
                  value={formData.metaDescription}
                  onChange={(e) => handleChange('metaDescription', e.target.value)}
                  placeholder="Custom meta description for search engines (150–160 chars)..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <Card className="overflow-hidden border-border/60">
          <div className="h-1 bg-gradient-to-r from-rose-500 to-rose-400" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                <Settings className="w-4 h-4 text-rose-600" />
              </div>
              <h2 className="text-base font-semibold">Settings</h2>
            </div>
            <div className="space-y-1">
              {[
                { field: 'isPublished', label: 'Published', desc: 'Make this article visible on the blog', icon: CheckCircle2, color: 'text-emerald-600' },
                { field: 'isFeatured', label: 'Featured', desc: 'Pin this article at the top of the blog listing', icon: Star, color: 'text-amber-600' },
              ].map(({ field, label, desc, icon: Icon, color }) => (
                <div key={field} className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData[field as 'isPublished' | 'isFeatured']}
                    onCheckedChange={(checked) => handleChange(field, checked)}
                  />
                </div>
              ))}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">Display Order</p>
                  <p className="text-xs text-muted-foreground">Lower numbers appear first</p>
                </div>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
                  className="w-24 h-9 text-center"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Action bar */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-gold to-primary shadow-md hover:shadow-lg transition-shadow gap-2"
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</>
            ) : (
              <><Save className="w-4 h-4" /> {formData.isPublished ? 'Publish Post' : 'Save Draft'}</>
            )}
          </Button>
          <Link href="/admin/blog">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
