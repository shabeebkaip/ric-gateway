'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUpload } from '@/components/admin/ImageUpload';
import {
  ArrowLeft, Save, Package, Tag, Image as ImageIcon,
  Zap, Settings, ChevronRight, Plus, X, Loader2,
  Star, Sparkles, CheckCircle2, Hash, Edit,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { SeoScorePanel } from '@/components/admin/SeoScorePanel';

export default function EditProductPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const [pageLoading, setPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: '',
    subcategory: '',
    partner: '',
    type: '',
    images: [] as string[],
    thumbnail: '',
    imageTitle: '',
    imageAlt: '',
    metaTitle: '',
    metaDescription: '',
    focusKeyword: '',
    isPremium: false,
    isFeatured: false,
    isActive: true,
    features: [] as string[],
    specifications: {} as Record<string, any>,
    technicalData: {} as Record<string, any>,
    additionalInfo: {} as Record<string, any>,
    order: 0,
  });

  const [featureInput, setFeatureInput] = useState('');
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');

  useEffect(() => { fetchAll(); }, [slug]);

  const fetchAll = async () => {
    const token = localStorage.getItem('admin-token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [productRes, categoriesRes, subcategoriesRes, partnersRes] = await Promise.all([
        fetch(`/api/products/${slug}`, { headers }),
        fetch('/api/categories', { headers }),
        fetch('/api/content?page=home&section=subcategories'),
        fetch('/api/partners', { headers }),
      ]);

      const categoriesData = await categoriesRes.json();
      const partnersData = await partnersRes.json();
      setCategories(categoriesData.categories || []);
      setPartners(partnersData.partners || []);

      if (subcategoriesRes.ok) {
        const subData = await subcategoriesRes.json();
        setSubcategories(subData.content?.subcategories || []);
      }

      if (productRes.ok) {
        const productData = await productRes.json();
        const p = productData.product;
        setFormData({
          title: p.title ?? '',
          slug: p.slug ?? '',
          description: p.description ?? '',
          category: p.category ?? '',
          subcategory: p.subcategory ?? '',
          partner: p.partner ?? '',
          type: p.type ?? '',
          images: p.images ?? [],
          thumbnail: p.thumbnail ?? '',
          imageTitle: p.imageTitle ?? '',
          imageAlt: p.imageAlt ?? '',
          metaTitle: p.metaTitle ?? '',
          metaDescription: p.metaDescription ?? '',
          focusKeyword: p.focusKeyword ?? '',
          isPremium: p.isPremium ?? false,
          isFeatured: p.isFeatured ?? false,
          isActive: p.isActive ?? true,
          features: p.features ?? [],
          specifications: p.specifications ?? {},
          technicalData: p.technicalData ?? {},
          additionalInfo: p.additionalInfo ?? {},
          order: p.order ?? 0,
        });
      } else {
        toast.error('Product not found');
        router.push('/admin/products');
      }
    } catch {
      toast.error('Failed to load product data');
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const addSpecification = () => {
    if (specKey && specValue) {
      setFormData(prev => ({ ...prev, specifications: { ...prev.specifications, [specKey]: specValue } }));
      setSpecKey('');
      setSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return { ...prev, specifications: newSpecs };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch(`/api/products/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, thumbnail: formData.images[0] || formData.thumbnail }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to update product');
      }
      toast.success('Product updated successfully');
      if (formData.slug !== slug) {
        router.push(`/admin/products/${formData.slug}`);
      } else {
        router.push('/admin/products');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCategorySubcategories = subcategories.filter(s => s.categoryId === formData.category);

  if (pageLoading) {
    return (
      <div className="space-y-7 pb-16 max-w-4xl animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-muted" />
          <div className="space-y-2">
            <div className="h-6 w-48 bg-muted rounded" />
            <div className="h-4 w-32 bg-muted rounded" />
          </div>
        </div>
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="overflow-hidden border-border/60">
            <div className="h-1 bg-muted" />
            <div className="p-6 space-y-4">
              <div className="h-5 w-36 bg-muted rounded" />
              <div className="h-10 bg-muted rounded" />
              <div className="h-10 bg-muted rounded" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-muted rounded" />
                <div className="h-10 bg-muted rounded" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-7 pb-16 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <Link href="/admin/products" className="hover:text-foreground transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{formData.title || 'Edit Product'}</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/products">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl flex-shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Edit Product</h1>
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Edit className="w-3.5 h-3.5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5 truncate">{formData.title}</p>
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
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-base font-semibold">Basic Information</h2>
            </div>
            <div className="space-y-5">
              <div>
                <Label htmlFor="title" className="text-xs font-medium mb-1.5 block">Product Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={e => handleChange('title', e.target.value)}
                  placeholder="Enter product title"
                  className="h-10"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug" className="text-xs font-medium mb-1.5 block">Slug</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={e => handleChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/(^-|-$)/g, ''))}
                    className="h-10 pl-9 font-mono text-sm"
                    placeholder="product-url-slug"
                  />
                </div>
                <p className="text-xs text-amber-600 mt-1">⚠ Changing the slug will break existing links to this product.</p>
              </div>
              <div>
                <Label htmlFor="description" className="text-xs font-medium mb-1.5 block">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={e => handleChange('description', e.target.value)}
                  placeholder="Enter product description"
                  rows={5}
                  className="resize-none"
                  required
                />
              </div>
            </div>
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
              <h2 className="text-base font-semibold">Classification</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label className="text-xs font-medium mb-1.5 block">Category *</Label>
                <Select value={formData.category} onValueChange={v => handleChange('category', v)}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat._id} value={cat.slug}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block">Subcategory</Label>
                <Select value={formData.subcategory || '__none__'} onValueChange={v => handleChange('subcategory', v === '__none__' ? '' : v)}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">None</SelectItem>
                    {selectedCategorySubcategories.map((sub: any) => (
                      <SelectItem key={sub._id || sub.id} value={sub.id}>{sub.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block">Partner *</Label>
                <Select value={formData.partner} onValueChange={v => handleChange('partner', v)}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select partner" />
                  </SelectTrigger>
                  <SelectContent>
                    {partners.map(p => (
                      <SelectItem key={p._id} value={p.slug}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type" className="text-xs font-medium mb-1.5 block">Product Type</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={e => handleChange('type', e.target.value)}
                  placeholder="e.g., Lithotripsy System"
                  className="h-10"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Images */}
        <Card className="overflow-hidden border-border/60">
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-400" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
              </div>
              <h2 className="text-base font-semibold">Product Images</h2>
            </div>
            <ImageUpload
              value={formData.images}
              onChange={urls => handleChange('images', urls)}
              maxFiles={10}
              folder="products"
            />
            {formData.images.length > 0 && (
              <div className="mt-4 space-y-4">
                <div>
                  <Label className="text-xs font-medium mb-1.5 block">
                    Alt Text <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={formData.imageAlt}
                    onChange={e => handleChange('imageAlt', e.target.value)}
                    placeholder="Describe the images for screen readers and search engines…"
                    className={`h-10 ${formData.images.length > 0 && !formData.imageAlt ? 'border-amber-400 focus-visible:ring-amber-400' : ''}`}
                  />
                  {formData.images.length > 0 && !formData.imageAlt && (
                    <p className="text-xs text-amber-600 mt-1">Alt text is required for image SEO.</p>
                  )}
                </div>
                <div>
                  <Label className="text-xs font-medium mb-1.5 block">
                    Image Title Tag <span className="text-muted-foreground font-normal">(optional — shown on hover)</span>
                  </Label>
                  <Input
                    value={formData.imageTitle}
                    onChange={e => handleChange('imageTitle', e.target.value)}
                    placeholder="Descriptive title for product images…"
                    className="h-10"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Features */}
        <Card className="overflow-hidden border-border/60">
          <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-400" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-amber-600" />
              </div>
              <h2 className="text-base font-semibold">Key Features</h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={featureInput}
                  onChange={e => setFeatureInput(e.target.value)}
                  placeholder="Type a feature and press Enter or click Add"
                  className="h-10"
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
                />
                <Button type="button" onClick={addFeature} variant="outline" className="h-10 px-4 flex-shrink-0">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              {formData.features.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {formData.features.map((feature, index) => (
                    <span key={index} className="inline-flex items-center gap-1.5 text-sm bg-muted rounded-full px-3 py-1.5 border border-border/60">
                      <span>{feature}</span>
                      <button type="button" onClick={() => removeFeature(index)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {formData.features.length === 0 && (
                <p className="text-xs text-muted-foreground italic">No features added yet.</p>
              )}
            </div>
          </div>
        </Card>

        {/* Specifications */}
        <Card className="overflow-hidden border-border/60">
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-cyan-400" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Hash className="w-4 h-4 text-cyan-600" />
              </div>
              <h2 className="text-base font-semibold">Technical Specifications</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
                <div>
                  <Label className="text-xs font-medium mb-1.5 block">Specification name</Label>
                  <Input
                    value={specKey}
                    onChange={e => setSpecKey(e.target.value)}
                    placeholder="e.g., Voltage"
                    className="h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium mb-1.5 block">Value</Label>
                  <Input
                    value={specValue}
                    onChange={e => setSpecValue(e.target.value)}
                    placeholder="e.g., 220V"
                    className="h-10"
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSpecification(); } }}
                  />
                </div>
                <Button type="button" onClick={addSpecification} variant="outline" className="h-10 px-4">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {Object.entries(formData.specifications).length > 0 && (
                <div className="rounded-lg border border-border/60 overflow-hidden">
                  {Object.entries(formData.specifications).map(([key, value], i) => (
                    <div key={key} className={`flex items-center gap-3 px-4 py-2.5 ${i % 2 === 0 ? 'bg-muted/30' : ''}`}>
                      <span className="text-sm font-medium w-44 flex-shrink-0 text-muted-foreground">{key}</span>
                      <span className="text-sm flex-1">{String(value)}</span>
                      <button type="button" onClick={() => removeSpecification(key)} className="text-muted-foreground hover:text-destructive transition-colors ml-2">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {Object.entries(formData.specifications).length === 0 && (
                <p className="text-xs text-muted-foreground italic">No specifications added yet.</p>
              )}
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
              <h2 className="text-base font-semibold">SEO</h2>
            </div>
            <div className="space-y-5">
              <div>
                <Label className="text-xs font-medium mb-1.5 block">
                  Meta Title <span className="text-muted-foreground font-normal">(optional — defaults to product title)</span>
                </Label>
                <Input value={formData.metaTitle} onChange={e => handleChange('metaTitle', e.target.value)} placeholder="Custom page title for search engines…" className="h-10" />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block">
                  Meta Description <span className="text-muted-foreground font-normal">(optional — defaults to description)</span>
                </Label>
                <Textarea value={formData.metaDescription} onChange={e => handleChange('metaDescription', e.target.value)} placeholder="Custom meta description (150–160 chars)…" rows={3} className="resize-none" />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block">
                  Focus Keyword <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Input value={formData.focusKeyword} onChange={e => handleChange('focusKeyword', e.target.value)} placeholder="e.g. lithotripsy system saudi arabia" className="h-10" />
              </div>
            </div>
          </div>
        </Card>

        <SeoScorePanel
          title={formData.title}
          slug={formData.slug}
          description={formData.description}
          metaTitle={formData.metaTitle}
          metaDescription={formData.metaDescription}
          focusKeyword={formData.focusKeyword}
          imageAlt={formData.imageAlt}
        />

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
                { field: 'isPremium', label: 'Premium Product', desc: 'Mark this as a premium offering', icon: Star, color: 'text-violet-600' },
                { field: 'isFeatured', label: 'Featured Product', desc: 'Show in featured sections on the homepage', icon: Sparkles, color: 'text-amber-600' },
                { field: 'isActive', label: 'Active', desc: 'Make product visible on the website', icon: CheckCircle2, color: 'text-emerald-600' },
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
                    checked={formData[field as keyof typeof formData] as boolean}
                    onCheckedChange={checked => handleChange(field, checked)}
                  />
                </div>
              ))}
              <div className="flex items-center justify-between py-3 mt-1">
                <div>
                  <p className="text-sm font-medium">Display Order</p>
                  <p className="text-xs text-muted-foreground">Lower numbers appear first</p>
                </div>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={e => handleChange('order', parseInt(e.target.value) || 0)}
                  placeholder="0"
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
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : (
              <><Save className="w-4 h-4" /> Save Changes</>
            )}
          </Button>
          <Link href="/admin/products">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}


