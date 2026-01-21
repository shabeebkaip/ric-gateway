'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Eye, Undo, Loader2, Plus, Trash2, Eye as EyeIcon, Target, Heart } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const availableIcons = [
  { name: 'Eye', icon: EyeIcon },
  { name: 'Target', icon: Target },
  { name: 'Heart', icon: Heart },
];

const gradientOptions = [
  { value: 'from-primary/10 to-primary/5', label: 'Primary' },
  { value: 'from-accent/10 to-accent/5', label: 'Accent' },
  { value: 'from-gold/10 to-gold/5', label: 'Gold' },
];

const iconColorOptions = [
  { value: 'text-primary', label: 'Primary' },
  { value: 'text-accent', label: 'Accent' },
  { value: 'text-gold', label: 'Gold' },
];

interface ValueCard {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
}

interface VisionMissionContent {
  badge: string;
  title: string;
  description: string;
  values: ValueCard[];
}

const defaultContent: VisionMissionContent = {
  badge: 'Who We Are',
  title: 'Guided by Purpose',
  description: 'Our vision, mission, and values drive everything we do in healthcare excellence.',
  values: [
    {
      icon: 'Eye',
      title: 'Our Vision',
      description: "Keep pace with fast-moving technology for Saudi Arabia's 2030 vision to accomplish excellence in healthy living by offering complete medical solutions.",
      gradient: 'from-primary/10 to-primary/5',
      iconColor: 'text-primary',
    },
    {
      icon: 'Target',
      title: 'Our Mission',
      description: 'Inspire hope and improve quality of life by offering verifiable, effective professional solutions ensuring partner satisfaction.',
      gradient: 'from-accent/10 to-accent/5',
      iconColor: 'text-accent',
    },
    {
      icon: 'Heart',
      title: 'Our Values',
      description: 'Trust, loyalty, and respect — the constant fundamentals of our commitment to excellence in healthcare partnerships.',
      gradient: 'from-gold/10 to-gold/5',
      iconColor: 'text-gold',
    },
  ],
};

export default function VisionMissionEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<VisionMissionContent>(defaultContent);
  const [originalContent, setOriginalContent] = useState<VisionMissionContent | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content?page=home&section=vision-mission');
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
          section: 'vision-mission',
          content,
        }),
      });

      if (res.ok) {
        toast.success('Vision & Mission saved successfully!');
        setOriginalContent(content);
      } else {
        toast.error('Failed to save content');
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

  const updateValue = (index: number, field: keyof ValueCard, value: string) => {
    const newValues = [...content.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setContent({ ...content, values: newValues });
  };

  const addValue = () => {
    setContent({
      ...content,
      values: [
        ...content.values,
        {
          icon: 'Heart',
          title: '',
          description: '',
          gradient: 'from-primary/10 to-primary/5',
          iconColor: 'text-primary',
        },
      ],
    });
  };

  const removeValue = (index: number) => {
    setContent({ ...content, values: content.values.filter((_, i) => i !== index) });
  };

  const getIconComponent = (iconName: string) => {
    const iconItem = availableIcons.find(i => i.name === iconName);
    return iconItem ? iconItem.icon : EyeIcon;
  };

  const hasChanges = JSON.stringify(content) !== JSON.stringify(originalContent);

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
            <h1 className="text-2xl font-bold">Edit Vision & Mission</h1>
            <p className="text-sm text-muted-foreground">Home Page → Vision & Mission Section</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
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
                <Label htmlFor="badge">Badge Text</Label>
                <Input
                  id="badge"
                  value={content.badge}
                  onChange={(e) => setContent({ ...content, badge: e.target.value })}
                  placeholder="e.g., Who We Are"
                />
              </div>

              <div>
                <Label htmlFor="title">Section Title</Label>
                <Input
                  id="title"
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                  placeholder="e.g., Guided by Purpose"
                />
              </div>

              <div>
                <Label htmlFor="description">Section Description</Label>
                <Textarea
                  id="description"
                  value={content.description}
                  onChange={(e) => setContent({ ...content, description: e.target.value })}
                  placeholder="Section description..."
                  rows={2}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Value Cards ({content.values.length})</h2>
              <Button variant="outline" size="sm" onClick={addValue}>
                <Plus className="w-4 h-4 mr-2" />
                Add Card
              </Button>
            </div>
            <div className="space-y-4">
              {content.values.map((value, index) => {
                const IconComponent = getIconComponent(value.icon);
                return (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${value.gradient}`}>
                          <IconComponent className={`w-4 h-4 ${value.iconColor}`} />
                        </div>
                        <span className="font-medium text-sm">{value.title || `Card ${index + 1}`}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeValue(index)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div>
                      <Label className="text-xs">Title</Label>
                      <Input
                        value={value.title}
                        onChange={(e) => updateValue(index, 'title', e.target.value)}
                        placeholder="e.g., Our Vision"
                        className="h-9"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">Icon</Label>
                        <Select
                          value={value.icon}
                          onValueChange={(v) => updateValue(index, 'icon', v)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue />
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
                        <Label className="text-xs">Icon Color</Label>
                        <Select
                          value={value.iconColor}
                          onValueChange={(v) => updateValue(index, 'iconColor', v)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {iconColorOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Gradient</Label>
                        <Select
                          value={value.gradient}
                          onValueChange={(v) => updateValue(index, 'gradient', v)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {gradientOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        value={value.description}
                        onChange={(e) => updateValue(index, 'description', e.target.value)}
                        placeholder="Description..."
                        rows={3}
                        className="text-sm"
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
          <Card className="p-6 bg-slate-50 dark:bg-slate-900">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-medium mb-3">
                {content.badge || 'Who We Are'}
              </span>
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                {content.title || 'Guided by Purpose'}
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {content.description || 'Our vision, mission, and values drive everything we do.'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {content.values.map((value, index) => {
                const IconComponent = getIconComponent(value.icon);
                return (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${value.gradient} p-5 border border-border/50`}
                  >
                    <div className="relative z-10">
                      <div className={`inline-flex p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm mb-4 ${value.iconColor}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      <h3 className="text-base font-bold mb-2">
                        {value.title || 'Title'}
                      </h3>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                        {value.description || 'Description goes here...'}
                      </p>
                    </div>

                    {/* Decorative Element */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/20 dark:bg-slate-800/20 blur-2xl" />
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
