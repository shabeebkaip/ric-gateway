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
  Save, Loader2, Plus, Trash2, GripVertical, 
  Microscope, Stethoscope, ScanLine, Package, Activity, Settings2,
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

export default function CategoriesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [originalCategories, setOriginalCategories] = useState<Category[]>([]);
  const [originalSubcategories, setOriginalSubcategories] = useState<Subcategory[]>([]);

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
  const addCategory = () => {
    const newId = `category-${Date.now()}`;
    setCategories([
      ...categories,
      { id: newId, name: '', slug: '', description: '', icon: 'Package' },
    ]);
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const updateCategory = (index: number, field: keyof Category, value: string) => {
    const newCategories = [...categories];
    newCategories[index] = { ...newCategories[index], [field]: value };
    
    if (field === 'name') {
      newCategories[index].slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      newCategories[index].id = newCategories[index].slug;
    }
    
    setCategories(newCategories);
  };

  // Subcategory CRUD
  const addSubcategory = () => {
    const newId = `subcategory-${Date.now()}`;
    setSubcategories([
      ...subcategories,
      { id: newId, name: '', slug: '', categoryId: categories[0]?.id || '', description: '', types: [] },
    ]);
  };

  const removeSubcategory = (index: number) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  const updateSubcategory = (index: number, field: keyof Subcategory, value: string | string[]) => {
    const newSubcategories = [...subcategories];
    newSubcategories[index] = { ...newSubcategories[index], [field]: value };
    
    if (field === 'name' && typeof value === 'string') {
      newSubcategories[index].slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      newSubcategories[index].id = `${newSubcategories[index].categoryId}-${newSubcategories[index].slug}`;
    }
    
    setSubcategories(newSubcategories);
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

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Product Categories</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={addCategory}>
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
              <Button 
                onClick={handleSaveCategories} 
                disabled={saving || !hasCategoryChanges}
                size="sm"
                className="bg-gradient-to-r from-gold to-primary"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
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
                        {category.name || 'New Category'}
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

                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs">Name</Label>
                      <Input
                        value={category.name}
                        onChange={(e) => updateCategory(index, 'name', e.target.value)}
                        placeholder="Category name"
                        className="h-9"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Icon</Label>
                      <Select
                        value={category.icon}
                        onValueChange={(value) => updateCategory(index, 'icon', value)}
                      >
                        <SelectTrigger className="h-9">
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

                    <div>
                      <Label className="text-xs">Slug</Label>
                      <Input
                        value={category.slug}
                        onChange={(e) => updateCategory(index, 'slug', e.target.value)}
                        placeholder="category-slug"
                        className="h-9 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        value={category.description}
                        onChange={(e) => updateCategory(index, 'description', e.target.value)}
                        placeholder="Brief description"
                        rows={2}
                        className="text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      {subcategories.filter(s => s.categoryId === category.id).length} subcategories
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Subcategories Tab */}
        <TabsContent value="subcategories" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Product Subcategories</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={addSubcategory}>
                <Plus className="w-4 h-4 mr-2" />
                Add Subcategory
              </Button>
              <Button 
                onClick={handleSaveSubcategories} 
                disabled={saving || !hasSubcategoryChanges}
                size="sm"
                className="bg-gradient-to-r from-gold to-primary"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Subcategories
              </Button>
            </div>
          </div>

          {/* Group subcategories by parent category */}
          {categories.map((category) => {
            const categorySubcategories = subcategories.filter(s => s.categoryId === category.id);
            if (categorySubcategories.length === 0) return null;

            const IconComponent = getIconComponent(category.icon);
            
            return (
              <Card key={category.id} className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    ({categorySubcategories.length} subcategories)
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {categorySubcategories.map((subcategory) => {
                    const subIndex = subcategories.findIndex(s => s.id === subcategory.id);
                    return (
                      <div key={subcategory.id} className="p-3 border rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {subcategory.name || 'New Subcategory'}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => removeSubcategory(subIndex)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-xs">Name</Label>
                            <Input
                              value={subcategory.name}
                              onChange={(e) => updateSubcategory(subIndex, 'name', e.target.value)}
                              placeholder="Subcategory name"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Parent Category</Label>
                            <Select
                              value={subcategory.categoryId}
                              onValueChange={(value) => updateSubcategory(subIndex, 'categoryId', value)}
                            >
                              <SelectTrigger className="h-8 text-sm">
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
                        </div>

                        <div>
                          <Label className="text-xs">Description</Label>
                          <Textarea
                            value={subcategory.description}
                            onChange={(e) => updateSubcategory(subIndex, 'description', e.target.value)}
                            placeholder="Brief description"
                            rows={2}
                            className="text-sm"
                          />
                        </div>

                        <div>
                          <Label className="text-xs">Types (comma-separated)</Label>
                          <Input
                            value={subcategory.types?.join(', ') || ''}
                            onChange={(e) => updateSubcategory(subIndex, 'types', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                            placeholder="Type 1, Type 2, Type 3"
                            className="h-8 text-sm"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}

          {/* Orphan subcategories (no parent or parent not found) */}
          {subcategories.filter(s => !categories.find(c => c.id === s.categoryId)).length > 0 && (
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-yellow-100">
                  <Package className="w-4 h-4 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-yellow-600">Unassigned Subcategories</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {subcategories.filter(s => !categories.find(c => c.id === s.categoryId)).map((subcategory) => {
                  const subIndex = subcategories.findIndex(s => s.id === subcategory.id);
                  return (
                    <div key={subcategory.id} className="p-3 border border-yellow-200 rounded-lg space-y-2 bg-yellow-50">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {subcategory.name || 'New Subcategory'}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => removeSubcategory(subIndex)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Name</Label>
                          <Input
                            value={subcategory.name}
                            onChange={(e) => updateSubcategory(subIndex, 'name', e.target.value)}
                            placeholder="Subcategory name"
                            className="h-8 text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Parent Category</Label>
                          <Select
                            value={subcategory.categoryId}
                            onValueChange={(value) => updateSubcategory(subIndex, 'categoryId', value)}
                          >
                            <SelectTrigger className="h-8 text-sm">
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
                      </div>

                      <div>
                        <Label className="text-xs">Description</Label>
                        <Textarea
                          value={subcategory.description}
                          onChange={(e) => updateSubcategory(subIndex, 'description', e.target.value)}
                          placeholder="Brief description"
                          rows={2}
                          className="text-sm"
                        />
                      </div>

                      <div>
                        <Label className="text-xs">Types (comma-separated)</Label>
                        <Input
                          value={subcategory.types?.join(', ') || ''}
                          onChange={(e) => updateSubcategory(subIndex, 'types', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                          placeholder="Type 1, Type 2, Type 3"
                          className="h-8 text-sm"
                        />
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
              <Button variant="outline" onClick={addSubcategory}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Subcategory
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
