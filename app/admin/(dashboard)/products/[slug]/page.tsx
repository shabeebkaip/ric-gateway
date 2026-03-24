'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

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

  useEffect(() => {
    fetchAll();
  }, [slug]);

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
    } catch (error) {
      toast.error('Failed to load product data');
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const addSpecification = () => {
    if (specKey && specValue) {
      setFormData((prev) => ({
        ...prev,
        specifications: { ...prev.specifications, [specKey]: specValue },
      }));
      setSpecKey('');
      setSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    setFormData((prev) => {
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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          thumbnail: formData.images[0] || formData.thumbnail,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to update product');
      }

      toast.success('Product updated successfully');
      router.push('/admin/products');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCategorySubcategories = subcategories.filter(
    (s) => s.categoryId === formData.category
  );

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground">{formData.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter product title"
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                disabled
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">Slug cannot be changed after creation</p>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Enter product description"
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
                <select
                  id="subcategory"
                  value={formData.subcategory}
                  onChange={(e) => handleChange('subcategory', e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="">Select subcategory</option>
                  {selectedCategorySubcategories.map((sub: any) => (
                    <option key={sub._id || sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="partner">Partner *</Label>
                <select
                  id="partner"
                  value={formData.partner}
                  onChange={(e) => handleChange('partner', e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  required
                >
                  <option value="">Select partner</option>
                  {partners.map((p) => (
                    <option key={p._id} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="type">Product Type</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  placeholder="e.g., Lithotripsy System"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Images */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Product Images</h2>
          <ImageUpload
            value={formData.images}
            onChange={(urls) => handleChange('images', urls)}
            maxFiles={10}
            folder="products"
          />
        </Card>

        {/* Features */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add a feature"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addFeature();
                  }
                }}
              />
              <Button type="button" onClick={addFeature} variant="outline">
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                  <span className="flex-1 text-sm">{feature}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Specifications */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={specKey}
                onChange={(e) => setSpecKey(e.target.value)}
                placeholder="Spec name (e.g. Voltage)"
              />
              <div className="flex gap-2">
                <Input
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  placeholder="Value (e.g. 220V)"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSpecification();
                    }
                  }}
                />
                <Button type="button" onClick={addSpecification} variant="outline">
                  Add
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 p-3 border rounded-lg">
                  <span className="font-medium text-sm min-w-[140px]">{key}:</span>
                  <span className="flex-1 text-sm">{String(value)}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpecification(key)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Product Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Premium Product</Label>
                <p className="text-sm text-muted-foreground">Mark as premium product</p>
              </div>
              <Switch
                checked={formData.isPremium}
                onCheckedChange={(v) => handleChange('isPremium', v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Featured Product</Label>
                <p className="text-sm text-muted-foreground">Show in featured section</p>
              </div>
              <Switch
                checked={formData.isFeatured}
                onCheckedChange={(v) => handleChange('isFeatured', v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Active</Label>
                <p className="text-sm text-muted-foreground">Make product visible on website</p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(v) => handleChange('isActive', v)}
              />
            </div>
            <div>
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="w-40"
              />
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
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
                Save Changes
              </>
            )}
          </Button>
          <Link href="/admin/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
