'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
  FolderOpen, Layers, ChevronRight, AlertTriangle,
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
      <div className="space-y-7 pb-10 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 w-56 bg-muted rounded" />
          <div className="h-4 w-44 bg-muted rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-sm">
          <div className="h-20 bg-muted rounded-xl" />
          <div className="h-20 bg-muted rounded-xl" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7 pb-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FolderOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Content</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Categories</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-1">Organise products into categories and subcategories</p>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Categories', value: categories.length, icon: FolderOpen, color: 'text-violet-600', bg: 'bg-violet-500/10' },
          { label: 'Subcategories', value: subcategories.length, icon: Layers, color: 'text-cyan-600', bg: 'bg-cyan-500/10' },
          { label: 'Unsaved (Cat)', value: hasCategoryChanges ? '●' : '—', icon: Save, color: hasCategoryChanges ? 'text-amber-600' : 'text-muted-foreground', bg: hasCategoryChanges ? 'bg-amber-500/10' : 'bg-muted' },
          { label: 'Unsaved (Sub)', value: hasSubcategoryChanges ? '●' : '—', icon: Save, color: hasSubcategoryChanges ? 'text-amber-600' : 'text-muted-foreground', bg: hasSubcategoryChanges ? 'bg-amber-500/10' : 'bg-muted' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="p-4 flex items-center gap-3 border-border/60">
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

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList className="h-10 p-1 bg-muted/60 rounded-xl">
          <TabsTrigger value="categories" className="rounded-lg data-[state=active]:shadow-sm gap-2">
            <FolderOpen className="w-4 h-4" />
            Categories
            <Badge variant="secondary" className="rounded-full text-[10px] px-1.5 py-0 h-4">{categories.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="subcategories" className="rounded-lg data-[state=active]:shadow-sm gap-2">
            <Layers className="w-4 h-4" />
            Subcategories
            <Badge variant="secondary" className="rounded-full text-[10px] px-1.5 py-0 h-4">{subcategories.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* ── Categories Tab ─────────────────────────────────── */}
        <TabsContent value="categories" className="space-y-5 mt-0">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {categories.length} {categories.length === 1 ? 'category' : 'categories'} configured
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={openAddCategory} className="gap-1.5">
                <Plus className="w-4 h-4" /> Add Category
              </Button>
              <Button
                onClick={handleSaveCategories}
                disabled={saving || !hasCategoryChanges}
                size="sm"
                className="bg-gradient-to-r from-gold to-primary shadow-sm gap-1.5"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => {
              const IconComponent = getIconComponent(category.icon);
              const subCount = subcategories.filter(s => s.categoryId === category.id).length;
              return (
                <Card key={category.id || index} className="overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-border/60 group">
                  <div className="h-1 bg-gradient-to-r from-violet-500 to-violet-400" />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-violet-600" />
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => openEditCategory(index)}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeCategory(index)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>

                    <h3 className="font-semibold text-sm leading-snug mb-1 group-hover:text-primary transition-colors">
                      {category.name || 'Unnamed Category'}
                    </h3>
                    {category.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{category.description}</p>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <code className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{category.slug}</code>
                      <Badge variant="secondary" className="text-[10px] rounded-full">
                        {subCount} {subCount === 1 ? 'sub' : 'subs'}
                      </Badge>
                    </div>
                  </div>
                </Card>
              );
            })}

            {categories.length === 0 && (
              <div className="col-span-full">
                <Card className="p-12 text-center border-dashed border-border/60">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FolderOpen className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">No Categories Yet</h3>
                  <p className="text-sm text-muted-foreground mb-5">Add your first product category to get started.</p>
                  <Button onClick={openAddCategory} className="bg-gradient-to-r from-gold to-primary gap-2">
                    <Plus className="w-4 h-4" /> Add First Category
                  </Button>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        {/* ── Subcategories Tab ───────────────────────────────── */}
        <TabsContent value="subcategories" className="space-y-5 mt-0">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {subcategories.length} {subcategories.length === 1 ? 'subcategory' : 'subcategories'} across {categories.length} categories
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => openAddSubcategory()} className="gap-1.5">
                <Plus className="w-4 h-4" /> Add Subcategory
              </Button>
              <Button
                onClick={handleSaveSubcategories}
                disabled={saving || !hasSubcategoryChanges}
                size="sm"
                className="bg-gradient-to-r from-gold to-primary shadow-sm gap-1.5"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {categories.map((category) => {
              const catSubs = subcategories.filter(s => s.categoryId === category.id);
              if (catSubs.length === 0) return null;
              const IconComponent = getIconComponent(category.icon);
              return (
                <Card key={category.id} className="overflow-hidden border-border/60">
                  <div className="h-1 bg-gradient-to-r from-cyan-500 to-cyan-400" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-cyan-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{category.name}</h3>
                          <p className="text-xs text-muted-foreground">{catSubs.length} subcategories</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => openAddSubcategory(category.id)} className="h-7 text-xs gap-1">
                        <Plus className="w-3 h-3" /> Add
                      </Button>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {catSubs.map((sub) => {
                        const subIndex = subcategories.findIndex(s => s.id === sub.id);
                        return (
                          <div key={sub.id} className="group/sub flex items-start justify-between p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/50 transition-colors">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-xs leading-snug truncate">{sub.name}</p>
                              {sub.description && (
                                <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{sub.description}</p>
                              )}
                              {sub.types?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1.5">
                                  {sub.types.slice(0, 3).map(t => (
                                    <span key={t} className="text-[9px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{t}</span>
                                  ))}
                                  {sub.types.length > 3 && (
                                    <span className="text-[9px] text-muted-foreground">+{sub.types.length - 3}</span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-0.5 ml-2 flex-shrink-0 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => openEditSubcategory(subIndex)}>
                                <Pencil className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeSubcategory(subIndex)}>
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              );
            })}

            {/* Orphan subcategories */}
            {subcategories.filter(s => !categories.find(c => c.id === s.categoryId)).length > 0 && (
              <Card className="overflow-hidden border-amber-200/60">
                <div className="h-1 bg-amber-400" />
                <div className="p-4">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-amber-700">Unassigned Subcategories</h3>
                      <p className="text-xs text-muted-foreground">These subcategories have no parent category</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {subcategories.filter(s => !categories.find(c => c.id === s.categoryId)).map((sub) => {
                      const subIndex = subcategories.findIndex(s => s.id === sub.id);
                      return (
                        <div key={sub.id} className="group/sub flex items-center justify-between p-3 rounded-lg border border-amber-200/60 bg-amber-50/40">
                          <p className="font-medium text-xs">{sub.name}</p>
                          <div className="flex items-center gap-0.5 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => openEditSubcategory(subIndex)}>
                              <Pencil className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeSubcategory(subIndex)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            )}

            {subcategories.length === 0 && (
              <Card className="p-12 text-center border-dashed border-border/60">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">No Subcategories Yet</h3>
                <p className="text-sm text-muted-foreground mb-5">Add subcategories to organise products within each category.</p>
                <Button onClick={() => openAddSubcategory()} className="bg-gradient-to-r from-gold to-primary gap-2">
                  <Plus className="w-4 h-4" /> Add First Subcategory
                </Button>
              </Card>
            )}
          </div>
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
