'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, Plus, Trash2, Sparkles, Eye as EyeIcon, Rocket, Heart, Target, Shield, Lightbulb, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ValueCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  items: string[];
  gradient: string;
}

interface ValuesContent {
  badge: string;
  title: string;
  description: string;
  values: ValueCard[];
}

const iconOptions = [
  { value: 'Eye', label: 'Vision (Eye)', icon: EyeIcon },
  { value: 'Rocket', label: 'Mission (Rocket)', icon: Rocket },
  { value: 'Heart', label: 'Values (Heart)', icon: Heart },
  { value: 'Target', label: 'Target', icon: Target },
  { value: 'Shield', label: 'Shield', icon: Shield },
  { value: 'Lightbulb', label: 'Lightbulb', icon: Lightbulb },
  { value: 'Users', label: 'Users', icon: Users },
];

const gradientOptions = [
  { value: 'from-primary/20 to-cyan-500/20', label: 'Primary to Cyan' },
  { value: 'from-emerald-500/20 to-primary/20', label: 'Emerald to Primary' },
  { value: 'from-amber-500/20 to-orange-500/20', label: 'Amber to Orange' },
  { value: 'from-blue-500/20 to-purple-500/20', label: 'Blue to Purple' },
  { value: 'from-rose-500/20 to-pink-500/20', label: 'Rose to Pink' },
];

const getIconComponent = (iconName: string) => {
  const option = iconOptions.find(o => o.value === iconName);
  return option?.icon || EyeIcon;
};

export default function AboutValuesEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ValuesContent>({
    badge: 'Who We Are',
    title: 'Guided by Purpose',
    description: 'Our vision, mission, and values define who we are and guide every decision we make in serving healthcare.',
    values: [
      {
        id: '1',
        icon: 'Eye',
        title: 'Our Vision',
        description: 'To be the most trusted healthcare solutions partner in the Middle East, transforming patient care through innovation and excellence.',
        items: ['Leading healthcare innovation', 'Trusted regional partner', 'Excellence in patient care'],
        gradient: 'from-primary/20 to-cyan-500/20',
      },
      {
        id: '2',
        icon: 'Rocket',
        title: 'Our Mission',
        description: 'Empowering healthcare providers with world-class medical equipment and unwavering support to deliver exceptional patient outcomes.',
        items: ['Deliver premium equipment', 'Provide expert support', 'Ensure patient outcomes'],
        gradient: 'from-emerald-500/20 to-primary/20',
      },
      {
        id: '3',
        icon: 'Heart',
        title: 'Our Values',
        description: 'Integrity, Excellence, and Partnership form the foundation of everything we do, driving us to exceed expectations every day.',
        items: ['Unwavering integrity', 'Pursuit of excellence', 'Strong partnerships'],
        gradient: 'from-amber-500/20 to-orange-500/20',
      },
    ],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=about&section=values');
      if (response.ok) {
        const data = await response.json();
        if (data.content) {
          setContent(data.content);
        }
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: 'about', section: 'values', content }),
      });
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  const addValue = () => {
    setContent({
      ...content,
      values: [
        ...content.values,
        {
          id: Date.now().toString(),
          icon: 'Eye',
          title: 'New Value',
          description: 'Description here',
          items: ['Item 1', 'Item 2', 'Item 3'],
          gradient: 'from-primary/20 to-cyan-500/20',
        },
      ],
    });
  };

  const removeValue = (id: string) => {
    setContent({ ...content, values: content.values.filter(v => v.id !== id) });
  };

  const updateValue = (id: string, field: keyof ValueCard, value: any) => {
    setContent({
      ...content,
      values: content.values.map(v => (v.id === id ? { ...v, [field]: value } : v)),
    });
  };

  const updateValueItem = (valueId: string, index: number, text: string) => {
    setContent({
      ...content,
      values: content.values.map(v => {
        if (v.id === valueId) {
          const newItems = [...v.items];
          newItems[index] = text;
          return { ...v, items: newItems };
        }
        return v;
      }),
    });
  };

  const addValueItem = (valueId: string) => {
    setContent({
      ...content,
      values: content.values.map(v => {
        if (v.id === valueId) {
          return { ...v, items: [...v.items, 'New item'] };
        }
        return v;
      }),
    });
  };

  const removeValueItem = (valueId: string, index: number) => {
    setContent({
      ...content,
      values: content.values.map(v => {
        if (v.id === valueId) {
          return { ...v, items: v.items.filter((_, i) => i !== index) };
        }
        return v;
      }),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">About Page Values</h1>
            <p className="text-muted-foreground">About Page → Vision, Mission & Values Section</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/about" target="_blank">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </Link>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Editor Form */}
        <div className="space-y-6">
          {/* Section Header */}
          <Card>
            <CardHeader>
              <CardTitle>Section Header</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="badge">Badge</Label>
                <Input
                  id="badge"
                  value={content.badge}
                  onChange={(e) => setContent({ ...content, badge: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={content.description}
                  onChange={(e) => setContent({ ...content, description: e.target.value })}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Value Cards */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Value Cards</CardTitle>
                <Button onClick={addValue} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Card
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.values.map((value, vIndex) => (
                <Card key={value.id} className="p-4 border-2">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm font-bold text-muted-foreground">Card {vIndex + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeValue(value.id)} className="h-8 w-8 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Icon</Label>
                        <Select value={value.icon} onValueChange={(v) => updateValue(value.id, 'icon', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {iconOptions.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                <div className="flex items-center gap-2">
                                  <opt.icon className="h-4 w-4" />
                                  {opt.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Gradient</Label>
                        <Select value={value.gradient} onValueChange={(v) => updateValue(value.id, 'gradient', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {gradientOptions.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Title</Label>
                      <Input
                        value={value.title}
                        onChange={(e) => updateValue(value.id, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        value={value.description}
                        onChange={(e) => updateValue(value.id, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Items</Label>
                        <Button variant="ghost" size="sm" onClick={() => addValueItem(value.id)} className="h-6 text-xs">
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {value.items.map((item, iIndex) => (
                          <div key={iIndex} className="flex gap-2 items-center">
                            <span className="text-primary text-sm">•</span>
                            <Input
                              value={item}
                              onChange={(e) => updateValueItem(value.id, iIndex, e.target.value)}
                              className="flex-1 h-8 text-sm"
                            />
                            <Button variant="ghost" size="icon" onClick={() => removeValueItem(value.id, iIndex)} className="h-6 w-6 text-destructive">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Live Preview */}
        <div className="space-y-4">
          <Card className="overflow-hidden sticky top-6">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See how it will look on the website</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 space-y-6">
                {/* Header */}
                <div className="text-center">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {content.badge}
                  </Badge>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">{content.title}</h2>
                  <p className="text-sm text-gray-600 mt-2">{content.description}</p>
                </div>

                {/* Cards */}
                <div className="space-y-4">
                  {content.values.map((value) => {
                    const IconComponent = getIconComponent(value.icon);
                    return (
                      <div key={value.id} className={`p-4 rounded-xl bg-gradient-to-br ${value.gradient} border border-white/20`}>
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-white/50">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{value.title}</h3>
                            <p className="text-xs text-gray-600 mt-1">{value.description}</p>
                            <div className="mt-3 space-y-1">
                              {value.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                                  <span className="text-primary">•</span>
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
