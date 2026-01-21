'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, Plus, Trash2, Users, Shield, Clock, CheckCircle2, Headphones, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseContent {
  title: string;
  description: string;
  features: Feature[];
}

const iconOptions = [
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'Shield', label: 'Shield', icon: Shield },
  { value: 'Clock', label: 'Clock', icon: Clock },
  { value: 'CheckCircle2', label: 'CheckCircle', icon: CheckCircle2 },
  { value: 'Headphones', label: 'Headphones', icon: Headphones },
  { value: 'FileText', label: 'FileText', icon: FileText },
];

const getIconComponent = (iconName: string) => {
  return iconOptions.find(o => o.value === iconName)?.icon || Users;
};

export default function ServicesWhyChooseEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<WhyChooseContent>({
    title: 'Why Choose Our Services',
    description: 'Trusted by healthcare facilities across Saudi Arabia.',
    features: [],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=services&section=why-choose');
      if (response.ok) {
        const data = await response.json();
        if (data.content) setContent(data.content);
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
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: 'services', section: 'why-choose', content }),
      });
      router.refresh();
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => {
    setContent({
      ...content,
      features: [...content.features, { id: Date.now().toString(), icon: 'Users', title: 'New Feature', description: '' }],
    });
  };

  const removeFeature = (id: string) => {
    setContent({ ...content, features: content.features.filter(f => f.id !== id) });
  };

  const updateFeature = (id: string, field: string, value: string) => {
    setContent({
      ...content,
      features: content.features.map(f => (f.id === id ? { ...f, [field]: value } : f)),
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/content"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <div>
            <h1 className="text-2xl font-bold">Why Choose Us</h1>
            <p className="text-muted-foreground">Services Page → Why Choose Us Section</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/services" target="_blank"><Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-2" />Preview</Button></Link>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Section Header</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={content.description} onChange={(e) => setContent({ ...content, description: e.target.value })} rows={2} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Features</CardTitle>
                <Button onClick={addFeature} size="sm" variant="outline"><Plus className="h-4 w-4 mr-1" />Add</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
              {content.features.map((feature, index) => (
                <Card key={feature.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-muted-foreground">Feature {index + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeFeature(feature.id)} className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Icon</Label>
                        <Select value={feature.icon} onValueChange={(v) => updateFeature(feature.id, 'icon', v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {iconOptions.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                <div className="flex items-center gap-2"><opt.icon className="h-4 w-4" />{opt.label}</div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Title</Label>
                        <Input value={feature.title} onChange={(e) => updateFeature(feature.id, 'title', e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Description</Label>
                      <Textarea value={feature.description} onChange={(e) => updateFeature(feature.id, 'description', e.target.value)} rows={2} />
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden sticky top-6 h-fit">
          <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="bg-white p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-light text-slate-900 mb-2">{content.title}</h2>
                <p className="text-sm text-slate-600">{content.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {content.features.slice(0, 4).map((feature) => {
                  const Icon = getIconComponent(feature.icon);
                  return (
                    <div key={feature.id} className="text-center p-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-sm font-medium text-slate-900 mb-1">{feature.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
              {content.features.length > 4 && (
                <p className="text-xs text-center text-muted-foreground mt-4">+{content.features.length - 4} more features</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
