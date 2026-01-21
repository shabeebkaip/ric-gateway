'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Eye, Undo, Loader2, Plus, Trash2, GripVertical, Microscope, Stethoscope, ScanLine, Package, Activity, Settings2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const availableIcons = [
  { name: 'Microscope', icon: Microscope },
  { name: 'Stethoscope', icon: Stethoscope },
  { name: 'ScanLine', icon: ScanLine },
  { name: 'Package', icon: Package },
  { name: 'Activity', icon: Activity },
  { name: 'Settings2', icon: Settings2 },
];

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

interface CategoriesContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  categories: Category[];
}

const defaultContent: CategoriesContent = {
  title: 'Our Product Categories',
  titleHighlight: 'Categories',
  subtitle: 'Comprehensive Medical Solutions',
  description: 'Explore our wide range of medical equipment and solutions designed to meet the diverse needs of healthcare facilities.',
  categories: [
    {
      id: 'cancer-treatment',
      name: 'Cancer Treatment',
      slug: 'cancer-treatment',
      description: 'Advanced oncology equipment and cancer therapy systems',
      icon: 'Microscope',
    },
    {
      id: 'urology',
      name: 'Urology',
      slug: 'urology',
      description: 'Comprehensive urological treatment and diagnostic solutions',
      icon: 'Stethoscope',
    },
  ],
};

export default function HomeCategoriesEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<CategoriesContent>(defaultContent);
  const [originalContent, setOriginalContent] = useState<CategoriesContent | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content?page=home&section=categories');
      if (res.ok) {
        const data = await res.json();
        if (data.content) {
          setContent(data.content);
          setOriginalContent(data.content);
        } else {
          setOriginalContent(content);
        }
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
      setOriginalContent(content);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 'home',
          section: 'categories',
          content,
        }),
      });

      if (res.ok) {
        toast.success('Categories section saved successfully!');
        setOriginalContent(content);
      } else {
        const error = await res.json();
        toast.error(error.message || 'Failed to save content');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (originalContent) {
      setContent(originalContent);
      toast.info('Changes reverted');
    }
  };

  const addCategory = () => {
    const newId = `category-${Date.now()}`;
    setContent({
      ...content,
      categories: [
        ...content.categories,
        { id: newId, name: '', slug: '', description: '', icon: 'Package' },
      ],
    });
  };

  const removeCategory = (index: number) => {
    setContent({
      ...content,
      categories: content.categories.filter((_, i) => i !== index),
    });
  };

  const updateCategory = (index: number, field: keyof Category, value: string) => {
    const newCategories = [...content.categories];
    newCategories[index] = { ...newCategories[index], [field]: value };
    
    // Auto-generate slug from name if editing name
    if (field === 'name') {
      newCategories[index].slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      newCategories[index].id = newCategories[index].slug;
    }
    
    setContent({ ...content, categories: newCategories });
  };

  const hasChanges = JSON.stringify(content) !== JSON.stringify(originalContent);

  const getIconComponent = (iconName: string) => {
    const iconItem = availableIcons.find(i => i.name === iconName);
    return iconItem ? iconItem.icon : Package;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/content">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Edit Product Categories</h1>
            <p className="text-sm text-muted-foreground">Home Page → Product Categories Section</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/categories">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Full Categories Page
            </Button>
          </Link>
          {hasChanges && (
            <Button variant="outline" onClick={handleReset}>
              <Undo className="w-4 h-4 mr-2" />
              Revert
            </Button>
          )}
          <Link href="/" target="_blank">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </Link>
          <Button 
            onClick={handleSave} 
            disabled={saving || !hasChanges}
            className="bg-gradient-to-r from-gold to-primary"
          >
            {saving ? (
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
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor Form */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Section Header</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="subtitle">Badge Text</Label>
                <Input
                  id="subtitle"
                  value={content.subtitle}
                  onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                  placeholder="e.g., Product Categories"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={content.title}
                    onChange={(e) => setContent({ ...content, title: e.target.value })}
                    placeholder="Main heading"
                  />
                </div>
                <div>
                  <Label htmlFor="titleHighlight">Title Highlight</Label>
                  <Input
                    id="titleHighlight"
                    value={content.titleHighlight}
                    onChange={(e) => setContent({ ...content, titleHighlight: e.target.value })}
                    placeholder="Highlighted word"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={content.description}
                  onChange={(e) => setContent({ ...content, description: e.target.value })}
                  placeholder="Section description"
                  rows={3}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Categories ({content.categories.length})</h2>
              <Button variant="outline" size="sm" onClick={addCategory}>
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {content.categories.map((category, index) => {
                const IconComponent = getIconComponent(category.icon);
                return (
                  <div key={category.id || index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">
                          {category.name || `Category ${index + 1}`}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeCategory(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={category.name}
                          onChange={(e) => updateCategory(index, 'name', e.target.value)}
                          placeholder="Category name"
                        />
                      </div>
                      <div>
                        <Label>Icon</Label>
                        <Select
                          value={category.icon}
                          onValueChange={(value) => updateCategory(index, 'icon', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select icon" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableIcons.map((iconItem) => {
                              const Icon = iconItem.icon;
                              return (
                                <SelectItem key={iconItem.name} value={iconItem.name}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" />
                                    <span>{iconItem.name}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Slug</Label>
                      <Input
                        value={category.slug}
                        onChange={(e) => updateCategory(index, 'slug', e.target.value)}
                        placeholder="category-slug"
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        URL: /products/{category.slug || 'category-slug'}
                      </p>
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={category.description}
                        onChange={(e) => updateCategory(index, 'description', e.target.value)}
                        placeholder="Brief description of this category"
                        rows={2}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Live Preview */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <Card className="p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-gold/10 to-primary/10 border border-gold/20 text-sm font-medium mb-4">
                <span className="bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent font-semibold">
                  {content.subtitle || 'Product Categories'}
                </span>
              </span>
              <h2 className="text-2xl font-bold mb-2">
                {content.title || 'Medical Equipment Distribution'}
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {content.description || 'Description goes here'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {content.categories.map((category, index) => {
                const IconComponent = getIconComponent(category.icon);
                const isEven = index % 2 === 0;
                return (
                  <div 
                    key={category.id || index} 
                    className="group relative p-4 rounded-xl border bg-white dark:bg-slate-800 hover:border-gold/30 transition-all duration-300"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      isEven
                        ? 'from-gold/5 via-primary/5 to-transparent'
                        : 'from-gold/5 via-accent/5 to-transparent'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
                    
                    <div className="relative z-10">
                      <div className={`inline-flex p-3 rounded-xl mb-3 ${
                        isEven 
                          ? 'bg-gradient-to-br from-gold/20 to-primary/20' 
                          : 'bg-gradient-to-br from-gold/20 to-accent/20'
                      }`}>
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-sm mb-1">{category.name || 'Category Name'}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {category.description || 'Category description'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
          <p className="text-xs text-muted-foreground text-center">
            Preview is approximate. View live page for exact appearance.
          </p>
        </div>
      </div>
    </div>
  );
}
