'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Loader2, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface PartnerFormData {
  name: string;
  slug: string;
  logo: string;
  website: string;
  country: string;
  flag: string;
  invertColor: boolean;
  categories: string[];
  subcategories: string[];
  products: string[];
  tag: string;
  order: number;
  isActive: boolean;
}

const defaultForm: PartnerFormData = {
  name: '',
  slug: '',
  logo: '',
  website: '',
  country: '',
  flag: '',
  invertColor: false,
  categories: [],
  subcategories: [],
  products: [],
  tag: '',
  order: 0,
  isActive: true,
};

interface Props {
  initialData?: Partial<PartnerFormData>;
  slug?: string; // if editing
}

interface CategoryOption { id: string; name: string; slug: string; }
interface SubcategoryOption { id: string; name: string; slug: string; categoryId: string; }

export function PartnerForm({ initialData, slug }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<PartnerFormData>({ ...defaultForm, ...initialData });
  const [allCategories, setAllCategories] = useState<CategoryOption[]>([]);
  const [allSubcategories, setAllSubcategories] = useState<SubcategoryOption[]>([]);

  // Tag-style list inputs
  const [productInput, setProductInput] = useState('');

  const isEditing = Boolean(slug);

  useEffect(() => {
    async function loadOptions() {
      try {
        const [catRes, subRes] = await Promise.all([
          fetch('/api/content?page=home&section=categories'),
          fetch('/api/content?page=home&section=subcategories'),
        ]);
        if (catRes.ok) {
          const data = await catRes.json();
          setAllCategories(data.content?.categories ?? []);
        }
        if (subRes.ok) {
          const data = await subRes.json();
          setAllSubcategories(data.content?.subcategories ?? []);
        }
      } catch {
        // non-critical; dropdowns will just be empty
      }
    }
    loadOptions();
  }, []);

  const set = (field: keyof PartnerFormData, value: any) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'name' && !isEditing) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
      return updated;
    });
  };

  const addToList = (
    field: 'categories' | 'subcategories' | 'products',
    value: string,
    clear: () => void
  ) => {
    const trimmed = value.trim();
    if (!trimmed || form[field].includes(trimmed)) return;
    set(field, [...form[field], trimmed]);
    clear();
  };

  const removeFromList = (field: 'categories' | 'subcategories' | 'products', index: number) => {
    set(field, form[field].filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('admin-token');
      const url = isEditing ? `/api/partners/${slug}` : '/api/partners';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Request failed');
      }

      toast.success(isEditing ? 'Partner updated!' : 'Partner created!');
      router.push('/admin/partners');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/partners">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{isEditing ? 'Edit Partner' : 'Add New Partner'}</h1>
          <p className="text-muted-foreground">
            {isEditing ? `Editing: ${form.name}` : 'Create a new international partner'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Basic Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Partner Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="e.g. Medispec"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => set('slug', e.target.value)}
                placeholder="e.g. medispec"
                required
                disabled={isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={form.country}
                onChange={(e) => set('country', e.target.value)}
                placeholder="e.g. USA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flag">Flag Emoji</Label>
              <Input
                id="flag"
                value={form.flag}
                onChange={(e) => set('flag', e.target.value)}
                placeholder="e.g. 🇺🇸"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              value={form.website}
              onChange={(e) => set('website', e.target.value)}
              placeholder="https://example.com"
              type="url"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              value={form.logo}
              onChange={(e) => set('logo', e.target.value)}
              placeholder="/partners/logo.png or https://..."
            />
            {form.logo && (
              <div className="mt-2 h-20 w-40 border rounded-lg flex items-center justify-center p-2 bg-muted">
                <img
                  src={form.logo}
                  alt="Logo preview"
                  className="max-h-full max-w-full object-contain"
                  style={{ filter: form.invertColor ? 'invert(1)' : undefined }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tag">Tag (optional)</Label>
              <Input
                id="tag"
                value={form.tag}
                onChange={(e) => set('tag', e.target.value)}
                placeholder="e.g. Under Registration"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={form.order}
                onChange={(e) => set('order', Number(e.target.value))}
              />
            </div>
          </div>
        </Card>

        {/* Toggles */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Display Settings</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Invert Logo Color</p>
              <p className="text-sm text-muted-foreground">Inverts logo colors on display</p>
            </div>
            <Switch
              checked={form.invertColor}
              onCheckedChange={(v) => set('invertColor', v)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Active</p>
              <p className="text-sm text-muted-foreground">Show this partner on the website</p>
            </div>
            <Switch
              checked={form.isActive}
              onCheckedChange={(v) => set('isActive', v)}
            />
          </div>
        </Card>

        {/* Categories */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          <Select
            onValueChange={(value) => {
              if (!form.categories.includes(value)) {
                set('categories', [...form.categories, value]);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category to add..." />
            </SelectTrigger>
            <SelectContent>
              {allCategories
                .filter((cat) => !form.categories.includes(cat.id))
                .map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2">
            {form.categories.map((catId, i) => {
              const label = allCategories.find((c) => c.id === catId)?.name ?? catId;
              return (
                <Badge key={i} variant="secondary" className="gap-1 text-sm">
                  {label}
                  <button
                    type="button"
                    onClick={() => removeFromList('categories', i)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              );
            })}
          </div>
        </Card>

        {/* Subcategories */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Subcategories</h2>
          {form.categories.length === 0 && (
            <p className="text-sm text-muted-foreground">Select at least one category first.</p>
          )}
          {form.categories.length > 0 && (
            <Select
              onValueChange={(value) => {
                if (!form.subcategories.includes(value)) {
                  set('subcategories', [...form.subcategories, value]);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a subcategory to add..." />
              </SelectTrigger>
              <SelectContent>
                {allSubcategories
                  .filter(
                    (sub) =>
                      form.categories.includes(sub.categoryId) &&
                      !form.subcategories.includes(sub.id)
                  )
                  .map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
          <div className="flex flex-wrap gap-2">
            {form.subcategories.map((subId, i) => {
              const label = allSubcategories.find((s) => s.id === subId)?.name ?? subId;
              return (
                <Badge key={i} variant="secondary" className="gap-1 text-sm">
                  {label}
                  <button
                    type="button"
                    onClick={() => removeFromList('subcategories', i)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              );
            })}
          </div>
        </Card>

        {/* Products */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Product Types</h2>
          <p className="text-sm text-muted-foreground">
            High-level product categories this partner offers.
          </p>
          <div className="flex gap-2">
            <Input
              value={productInput}
              onChange={(e) => setProductInput(e.target.value)}
              placeholder="e.g. Holmium Lasers"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addToList('products', productInput, () => setProductInput(''));
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addToList('products', productInput, () => setProductInput(''))}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.products.map((p, i) => (
              <Badge key={i} variant="outline" className="gap-1 text-sm">
                {p}
                <button
                  type="button"
                  onClick={() => removeFromList('products', i)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </Card>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-gold to-primary"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? 'Save Changes' : 'Create Partner'}
              </>
            )}
          </Button>
          <Link href="/admin/partners">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
