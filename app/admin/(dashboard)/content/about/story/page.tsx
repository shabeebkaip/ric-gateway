'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, Plus, Trash2, Sparkles, CheckCircle, Shield, Heart, Zap, Award, Users, Building, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Highlight {
  id: string;
  text: string;
}

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface StoryContent {
  badge: string;
  title: string;
  paragraphs: string[];
  highlights: Highlight[];
  features: Feature[];
}

const iconOptions = [
  { value: 'Shield', label: 'Shield', icon: Shield },
  { value: 'Heart', label: 'Heart', icon: Heart },
  { value: 'Zap', label: 'Zap', icon: Zap },
  { value: 'Award', label: 'Award', icon: Award },
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'Building', label: 'Building', icon: Building },
  { value: 'Star', label: 'Star', icon: Star },
  { value: 'CheckCircle', label: 'CheckCircle', icon: CheckCircle },
];

const getIconComponent = (iconName: string) => {
  const option = iconOptions.find(o => o.value === iconName);
  return option?.icon || Shield;
};

export default function AboutStoryEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<StoryContent>({
    badge: 'Our Story',
    title: 'Building Trust Through Excellence',
    paragraphs: [
      'Since 1983, RIC Medical Gateway has been a cornerstone of healthcare excellence in Saudi Arabia. Our journey began with a simple yet powerful vision: to bridge the gap between world-class medical technology and the healthcare institutions that need them most.',
      'Over four decades, we have grown from a local distributor to a comprehensive healthcare solutions provider, serving hundreds of hospitals, clinics, and medical facilities across the Kingdom.'
    ],
    highlights: [
      { id: '1', text: 'Trusted by 500+ healthcare facilities' },
      { id: '2', text: '41+ years of industry experience' },
      { id: '3', text: '25+ global manufacturer partnerships' },
    ],
    features: [
      { id: '1', icon: 'Shield', title: 'Quality First', description: 'Uncompromising commitment to product quality and safety standards' },
      { id: '2', icon: 'Heart', title: 'Patient Care', description: 'Every solution designed with patient outcomes in mind' },
      { id: '3', icon: 'Zap', title: 'Innovation', description: 'Continuously bringing the latest medical technologies to the region' },
      { id: '4', icon: 'Award', title: 'Excellence', description: 'Recognized leader in healthcare equipment distribution' },
    ],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=about&section=story');
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
        body: JSON.stringify({ page: 'about', section: 'story', content }),
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

  // Paragraph handlers
  const addParagraph = () => {
    setContent({ ...content, paragraphs: [...content.paragraphs, ''] });
  };

  const removeParagraph = (index: number) => {
    setContent({ ...content, paragraphs: content.paragraphs.filter((_, i) => i !== index) });
  };

  const updateParagraph = (index: number, value: string) => {
    const updated = [...content.paragraphs];
    updated[index] = value;
    setContent({ ...content, paragraphs: updated });
  };

  // Highlight handlers
  const addHighlight = () => {
    setContent({
      ...content,
      highlights: [...content.highlights, { id: Date.now().toString(), text: 'New highlight' }],
    });
  };

  const removeHighlight = (id: string) => {
    setContent({ ...content, highlights: content.highlights.filter(h => h.id !== id) });
  };

  const updateHighlight = (id: string, text: string) => {
    setContent({
      ...content,
      highlights: content.highlights.map(h => (h.id === id ? { ...h, text } : h)),
    });
  };

  // Feature handlers
  const addFeature = () => {
    setContent({
      ...content,
      features: [...content.features, { id: Date.now().toString(), icon: 'Shield', title: 'New Feature', description: 'Description' }],
    });
  };

  const removeFeature = (id: string) => {
    setContent({ ...content, features: content.features.filter(f => f.id !== id) });
  };

  const updateFeature = (id: string, field: keyof Feature, value: string) => {
    setContent({
      ...content,
      features: content.features.map(f => (f.id === id ? { ...f, [field]: value } : f)),
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
            <h1 className="text-2xl font-bold">About Page Story</h1>
            <p className="text-muted-foreground">About Page → Our Story Section</p>
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
          {/* Header Section */}
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
            </CardContent>
          </Card>

          {/* Paragraphs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Paragraphs</CardTitle>
                <Button onClick={addParagraph} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.paragraphs.map((para, index) => (
                <div key={index} className="relative">
                  <Label className="text-xs text-muted-foreground mb-1 block">Paragraph {index + 1}</Label>
                  <div className="flex gap-2">
                    <Textarea
                      value={para}
                      onChange={(e) => updateParagraph(index, e.target.value)}
                      rows={3}
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeParagraph(index)} className="h-8 w-8 text-destructive shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Highlights */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Highlights</CardTitle>
                <Button onClick={addHighlight} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {content.highlights.map((h, index) => (
                <div key={h.id} className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  <Input
                    value={h.text}
                    onChange={(e) => updateHighlight(h.id, e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeHighlight(h.id)} className="h-8 w-8 text-destructive shrink-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Features</CardTitle>
                <Button onClick={addFeature} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.features.map((f, index) => (
                <Card key={f.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-muted-foreground">Feature {index + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeFeature(f.id)} className="h-6 w-6 text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Icon</Label>
                        <Select value={f.icon} onValueChange={(v) => updateFeature(f.id, 'icon', v)}>
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
                        <Label className="text-xs">Title</Label>
                        <Input
                          value={f.title}
                          onChange={(e) => updateFeature(f.id, 'title', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Description</Label>
                      <Input
                        value={f.description}
                        onChange={(e) => updateFeature(f.id, 'description', e.target.value)}
                      />
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
              <div className="bg-white p-6 space-y-6">
                {/* Badge & Title */}
                <div>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {content.badge}
                  </Badge>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">{content.title}</h2>
                </div>

                {/* Paragraphs */}
                <div className="space-y-4">
                  {content.paragraphs.map((para, i) => (
                    <p key={i} className="text-sm text-gray-600 leading-relaxed">{para}</p>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  {content.highlights.map((h) => (
                    <div key={h.id} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-gray-700">{h.text}</span>
                    </div>
                  ))}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  {content.features.map((f) => {
                    const IconComponent = getIconComponent(f.icon);
                    return (
                      <div key={f.id} className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">{f.title}</h4>
                          <p className="text-xs text-gray-500">{f.description}</p>
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
