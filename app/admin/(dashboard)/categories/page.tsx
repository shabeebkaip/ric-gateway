'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Save, Loader2, Plus, Trash2, Pencil,
  Microscope, Stethoscope, ScanLine, Package, Activity, Settings2, Zap,
  FolderOpen, Layers
} from 'lucide-react';
import { toast } from 'sonner';

const availableIcons = [
  { name: 'Microscope', icon: Microscope },
  { name: 'Stethoscope', icon: Stethoscope },
  { name: 'ScanLine', icon: ScanLine },
  { name: 'Package', icon: Package },
  { name: 'Activity', icon: Activity },
  { name: 'Settings2', icon: Settings2 },
  { name: 'Zap', icon: Zap },
];

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  types: string[];
}

interface CategoriesContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  categories: Category[];
}

interface SubcategoriesContent {
  subcategories: Subcategory[];
}

const EMPTY_CATEGORY: Category = { id: '', name: '', slug: '', description: '', icon: 'Package' };
const EMPTY_SUBCATEGORY: Subcategory = { id: '', name: '', slug: '', categoryId: '', description: '', types: [] };

export default function CategoriesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [originalCategories, setOriginalCategories] = useState<Category[]>([]);
  const [originalSubcategories, setOriginalSubcategories] = useState<Subcategory[]>([]);

  // Modal state
  const [categoryModal, setCategoryModal] = useState<{ open: boolean; editIndex: number | null; data: Category }>({
    open: false, editIndex: null, data: { ...EMPTY_CATEGORY },
  });
  const [subcategoryModal, setSubcategoryModal] = useState<{ open: boolean; editIndex: number | null; data: Subcategory }>({
    open: false, editIndex: null, data: { ...EMPTY_SUBCATEGORY },
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      // Fetch categories
      const catRes = await fetch('/api/content?page=home&section=categories');
      if (catRes.ok) {
        const catData = await catRes.json();
        if (catData.content?.categories) {
          setCategories(catData.content.categories);
          setOriginalCategories(catData.content.categories);
        }
      }

      // Fetch subcategories
      const subRes = await fetch('/api/content?page=home&section=subcategories');
      if (subRes.ok) {
        const subData = await subRes.json();
        if (subData.content?.subcategories) {
          setSubcategories(subData.content.subcategories);
          setOriginalSubcategories(subData.content.subcategories);
        }
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategories = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 'home',
          section: 'categories',
          content: {
            title: 'Our Product Categories',
            titleHighlight: 'Categories',
            subtitle: 'Comprehensive Medical Solutions',
            description: 'Explore our wide range of medical equipment and solutions.',
            categories,
          },
        }),
      });

      if (res.ok) {
        toast.success('Categories saved successfully!');
        setOriginalCategories(categories);
      } else {
        toast.error('Failed to save categories');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSubcategories = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 'home',
          section: 'subcategories',
          content: { subcategories },
        }),
      });

      if (res.ok) {
        toast.success('Subcategories saved successfully!');
        setOriginalSubcategories(subcategories);
      } else {
        toast.error('Failed to save subcategories');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  // Category CRUD
  const openAddCategory = () => {
    setCategoryModal({ open: true, editIndex: null, data: { ...EMPTY_CATEGORY } });
  };

  const openEditCategory = (index: number) => {
    setCategoryModal({ open: true, editIndex: index, data: { ...categories[index] } });
  };

  const updateCategoryDraft = (field: keyof Category, value: string) => {
    setCategoryModal((prev) => {
      const updated = { ...prev.data, [field]: value };
      if (field === 'name') {
        const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        updated.slug = slug;
        if (!prev.data.id || prev.editIndex === null) updated.id = slug;
      }
      return { ...prev, data: updated };
    });
  };

  const saveCategoryModal = () => {
    const draft = categoryModal.data;
    if (!draft.name.trim()) { toast.error('Category name is required'); return; }
    if (categoryModal.editIndex !== null) {
      const updated = [...categories];
      updated[categoryModal.editIndex] = draft;
      setCategories(updated);
    } else {
      setCategories([...categories, { ...draft, id: draft.id || `category-${Date.now()}` }]);
    }
    setCategoryModal({ open: false, editIndex: null, data: { ...EMPTY_CATEGORY } });
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  // Subcategory CRUD
  const openAddSubcategory = (defaultCategoryId?: string) => {
    setSubcategoryModal({
      open: true,
      editIndex: null,
      data: { ...EMPTY_SUBCATEGORY, categoryId: defaultCategoryId ?? categories[0]?.id ?? '' },
    });
  };

  const openEditSubcategory = (index: number) => {
    setSubcategoryModal({ open: true, editIndex: index, data: { ...subcategories[index] } });
  };

  const updateSubcategoryDraft = (field: keyof Subcategory, value: string | string[]) => {
    setSubcategoryModal((prev) => {
      const updated = { ...prev.data, [field]: value };
      if (field === 'name' && typeof value === 'string') {
        const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        updated.slug = slug;
        if (!prev.data.id || prev.editIndex === null) {
          updated.id = `${updated.categoryId}-${slug}`;
        }
      }
      if (field === 'categoryId' && typeof value === 'string') {
        updated.id = `${value}-${updated.slug}`;
      }
      return { ...prev, data: updated };
    });
  };

  const saveSubcategoryModal = () => {
    const draft = subcategoryModal.data;
    if (!draft.name.trim()) { toast.error('Subcategory name is required'); return; }
    if (!draft.categoryId) { toast.error('Please select a parent category'); return; }
    if (subcategoryModal.editIndex !== null) {
      const updated = [...subcategories];
      updated[subcategoryModal.editIndex] = draft;
      setSubcategories(updated);
    } else {
      setSubcategories([...subcategories, { ...draft, id: draft.id || `subcategory-${Date.now()}` }]);
    }
    setSubcategoryModal({ open: false, editIndex: null, data: { ...EMPTY_SUBCATEGORY } });
  };

  const removeSubcategory = (index: number) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  const getIconComponent = (iconName: string) => {
    const iconItem = availableIcons.find(i => i.name === iconName);
    return iconItem ? iconItem.icon : Package;
  };

  const getCategoryName = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat?.name || 'Unknown';
  };

  const hasCategoryChanges = JSON.stringify(categories) !== JSON.stringify(originalCategories);
  const hasSubcategoryChanges = JSON.stringify(subcategories) !== JSON.stringify(originalSubcategories);

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
      <div>
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <p className="text-sm text-muted-foreground">Manage product categories and subcategories</p>
      </div>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4" />
            Categories ({categories.length})
          </TabsTrigger>
          <TabsTrigger value="subcategories" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Subcategories ({subcategories.length})
          </TabsTrigger>
        </TabsList>

        {/* ── Categories Tab ─────────────────────────────────── */}
        <TabsContent value="categories" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Product Categories</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={openAddCategory}>
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
              <Button 
                onClick={handleSaveCategories} 
                disabled={saving || !hasCategoryChanges}
                size="sm"
                className="bg-gradient-to-r from-gold to-primary"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Categories
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => {
              const IconComponent = getIconComponent(category.icon);
              return (
                <Card key={category.id || index} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-sm truncate max-w-[150px]">
                        {category.name || 'Unnamed Category'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEditCategory(index)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeCategory(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {category.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{category.description}</p>
                  )}

                  <div className="pt-2 border-t flex items-center justify-between">
                    <p className="text-xs text-muted-foreground font-mono">{category.slug}</p>
                    <p className="text-xs text-muted-foreground">
                      {subcategories.filter(s => s.categoryId === category.id).length} subcategories
                    </p>
                  </div>
                </Card>
              );
            })}

            {categories.length === 0 && (
              <div className="col-span-full">
                <Card className="p-8 text-center">
                  <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No Categories</h3>
                  <p className="text-sm text-muted-foreground mb-4">Add your first product category.</p>
                  <Button variant="outline" onClick={openAddCategory}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Category
                  </Button>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        {/* ── Subcategories Tab ───────────────────────────────── */}
        <TabsContent value="subcategories" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Product Subcategories</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => openAddSubcategory()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Subcategory
              </Button>
              <Button 
                onClick={handleSaveSubcategories} 
                disabled={saving || !hasSubcategoryChanges}
                size="sm"
                className="bg-gradient-to-r from-gold to-primary"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Subcategories
              </Button>
            </div>
          </div>

          {categories.map((category) => {
            const catSubs = subcategories.filter(s => s.categoryId === category.id);
            if (catSubs.length === 0) return null;
            const IconComponent = getIconComponent(category.icon);
            return (
              <Card key={category.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <span className="text-xs text-muted-foreground">({catSubs.length} subcategories)</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => openAddSubcategory(category.id)}>
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {catSubs.map((sub) => {
                    const subIndex = subcategories.findIndex(s => s.id === sub.id);
                    return (
                      <div key={sub.id} className="p-3 border rounded-lg space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{sub.name}</span>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditSubcategory(subIndex)}>
                              <Pencil className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeSubcategory(subIndex)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        {sub.description && <p className="text-xs text-muted-foreground line-clamp-1">{sub.description}</p>}
                        {sub.types?.length > 0 && (
                          <p className="text-xs text-muted-foreground font-mono">{sub.types.join(', ')}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}

          {/* Orphan subcategories */}
          {subcategories.filter(s => !categories.find(c => c.id === s.categoryId)).length > 0 && (
            <Card className="p-4 border-yellow-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-yellow-100">
                  <Package className="w-4 h-4 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-yellow-600">Unassigned Subcategories</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {subcategories.filter(s => !categories.find(c => c.id === s.categoryId)).map((sub) => {
                  const subIndex = subcategories.findIndex(s => s.id === sub.id);
                  return (
                    <div key={sub.id} className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{sub.name}</span>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditSubcategory(subIndex)}>
                            <Pencil className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeSubcategory(subIndex)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {subcategories.length === 0 && (
            <Card className="p-8 text-center">
              <Layers className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No Subcategories</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add subcategories to organize products within each category.
              </p>
              <Button variant="outline" onClick={() => openAddSubcategory()}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Subcategory
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* ── Category Modal ──────────────────────────────────── */}
      <Dialog open={categoryModal.open} onOpenChange={(open) => !open && setCategoryModal(p => ({ ...p, open: false }))}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{categoryModal.editIndex !== null ? 'Edit Category' : 'Add Category'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                value={categoryModal.data.name}
                onChange={(e) => updateCategoryDraft('name', e.target.value)}
                placeholder="Category name"
                autoFocus
              />
            </div>

            <div className="space-y-1">
              <Label>Icon</Label>
              <Select
                value={categoryModal.data.icon}
                onValueChange={(v) => updateCategoryDraft('icon', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select icon">
                    {categoryModal.data.icon && (() => {
                      const IconC = getIconComponent(categoryModal.data.icon);
                      return (
                        <div className="flex items-center gap-2">
                          <IconC className="w-4 h-4" />
                          <span>{categoryModal.data.icon}</span>
                        </div>
                      );
                    })()}
                  </SelectValue>
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

            <div className="space-y-1">
              <Label>Slug</Label>
              <Input
                value={categoryModal.data.slug}
                onChange={(e) => updateCategoryDraft('slug', e.target.value)}
                placeholder="category-slug"
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                value={categoryModal.data.description}
                onChange={(e) => updateCategoryDraft('description', e.target.value)}
                placeholder="Brief description"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryModal(p => ({ ...p, open: false }))}>
              Cancel
            </Button>
            <Button onClick={saveCategoryModal}>
              {categoryModal.editIndex !== null ? 'Save Changes' : 'Add Category'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Subcategory Modal ───────────────────────────────── */}
      <Dialog open={subcategoryModal.open} onOpenChange={(open) => !open && setSubcategoryModal(p => ({ ...p, open: false }))}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{subcategoryModal.editIndex !== null ? 'Edit Subcategory' : 'Add Subcategory'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                value={subcategoryModal.data.name}
                onChange={(e) => updateSubcategoryDraft('name', e.target.value)}
                placeholder="Subcategory name"
                autoFocus
              />
            </div>

            <div className="space-y-1">
              <Label>Parent Category</Label>
              <Select
                value={subcategoryModal.data.categoryId}
                onValueChange={(v) => updateSubcategoryDraft('categoryId', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Slug</Label>
              <Input
                value={subcategoryModal.data.slug}
                onChange={(e) => updateSubcategoryDraft('slug', e.target.value)}
                placeholder="subcategory-slug"
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                value={subcategoryModal.data.description}
                onChange={(e) => updateSubcategoryDraft('description', e.target.value)}
                placeholder="Brief description"
                rows={3}
              />
            </div>

            <div className="space-y-1">
              <Label>Types <span className="text-muted-foreground text-xs">(comma-separated)</span></Label>
              <Input
                value={subcategoryModal.data.types?.join(', ') || ''}
                onChange={(e) =>
                  updateSubcategoryDraft('types', e.target.value.split(',').map(t => t.trim()).filter(Boolean))
                }
                placeholder="Type 1, Type 2, Type 3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSubcategoryModal(p => ({ ...p, open: false }))}>
              Cancel
            </Button>
            <Button onClick={saveSubcategoryModal}>
              {subcategoryModal.editIndex !== null ? 'Save Changes' : 'Add Subcategory'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
