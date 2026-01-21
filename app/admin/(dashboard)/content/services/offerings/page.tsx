'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, Plus, Trash2, Settings, Wrench, Zap, Award, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ServiceOffering {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface OfferingsContent {
  title: string;
  description: string;
  services: ServiceOffering[];
}

const iconOptions = [
  { value: 'Settings', label: 'Settings', icon: Settings },
  { value: 'Wrench', label: 'Wrench', icon: Wrench },
  { value: 'Zap', label: 'Zap', icon: Zap },
  { value: 'Award', label: 'Award', icon: Award },
];

const getIconComponent = (iconName: string) => {
  return iconOptions.find(o => o.value === iconName)?.icon || Settings;
};

export default function ServicesOfferingsEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<OfferingsContent>({
    title: 'Our Service Offerings',
    description: 'Comprehensive maintenance and support services designed to keep your medical equipment running at optimal performance.',
    services: [],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=services&section=offerings');
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
        body: JSON.stringify({ page: 'services', section: 'offerings', content }),
      });
      router.refresh();
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  const addService = () => {
    setContent({
      ...content,
      services: [...content.services, { id: Date.now().toString(), icon: 'Settings', title: 'New Service', description: '', features: ['Feature 1'] }],
    });
  };

  const removeService = (id: string) => {
    setContent({ ...content, services: content.services.filter(s => s.id !== id) });
  };

  const updateService = (id: string, field: string, value: any) => {
    setContent({
      ...content,
      services: content.services.map(s => (s.id === id ? { ...s, [field]: value } : s)),
    });
  };

  const addFeature = (serviceId: string) => {
    setContent({
      ...content,
      services: content.services.map(s => (s.id === serviceId ? { ...s, features: [...s.features, ''] } : s)),
    });
  };

  const updateFeature = (serviceId: string, index: number, value: string) => {
    setContent({
      ...content,
      services: content.services.map(s => {
        if (s.id === serviceId) {
          const newFeatures = [...s.features];
          newFeatures[index] = value;
          return { ...s, features: newFeatures };
        }
        return s;
      }),
    });
  };

  const removeFeature = (serviceId: string, index: number) => {
    setContent({
      ...content,
      services: content.services.map(s => {
        if (s.id === serviceId) {
          return { ...s, features: s.features.filter((_, i) => i !== index) };
        }
        return s;
      }),
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
            <h1 className="text-2xl font-bold">Service Offerings</h1>
            <p className="text-muted-foreground">Services Page → Offerings Section</p>
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
                <CardTitle>Service Categories</CardTitle>
                <Button onClick={addService} size="sm" variant="outline"><Plus className="h-4 w-4 mr-1" />Add</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
              {content.services.map((service, index) => (
                <Card key={service.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-muted-foreground">Service {index + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeService(service.id)} className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Icon</Label>
                        <Select value={service.icon} onValueChange={(v) => updateService(service.id, 'icon', v)}>
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
                        <Input value={service.title} onChange={(e) => updateService(service.id, 'title', e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Description</Label>
                      <Textarea value={service.description} onChange={(e) => updateService(service.id, 'description', e.target.value)} rows={2} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Features</Label>
                        <Button variant="ghost" size="sm" onClick={() => addFeature(service.id)} className="h-6 text-xs"><Plus className="h-3 w-3 mr-1" />Add</Button>
                      </div>
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <CheckCircle2 className="h-3 w-3 text-green-600 shrink-0" />
                          <Input value={feature} onChange={(e) => updateFeature(service.id, i, e.target.value)} className="flex-1 h-8 text-sm" />
                          <Button variant="ghost" size="icon" onClick={() => removeFeature(service.id, i)} className="h-6 w-6 text-destructive"><Trash2 className="h-3 w-3" /></Button>
                        </div>
                      ))}
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
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-light text-slate-900 mb-2">{content.title}</h2>
                <p className="text-sm text-slate-600">{content.description}</p>
              </div>
              <div className="space-y-4">
                {content.services.slice(0, 2).map((service) => {
                  const Icon = getIconComponent(service.icon);
                  return (
                    <div key={service.id} className="bg-white rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg"><Icon className="w-4 h-4 text-blue-600" /></div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-slate-900 mb-1">{service.title}</h3>
                          <p className="text-xs text-slate-600 mb-2 line-clamp-2">{service.description}</p>
                          <ul className="space-y-1">
                            {service.features.slice(0, 2).map((f, i) => (
                              <li key={i} className="flex items-center gap-1 text-xs text-slate-700">
                                <CheckCircle2 className="w-3 h-3 text-green-600" />{f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {content.services.length > 2 && (
                  <p className="text-xs text-center text-muted-foreground">+{content.services.length - 2} more services</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
