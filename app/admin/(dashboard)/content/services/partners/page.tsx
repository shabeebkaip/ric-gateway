'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface PartnersContent {
  title: string;
  description: string;
  showTags: boolean;
  excludePartners: string[];
}

export default function ServicesPartnersEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<PartnersContent>({
    title: 'Service & Maintenance Partners',
    description: 'We provide comprehensive service and maintenance solutions for all leading medical equipment brands, ensuring expert care for your critical devices.',
    showTags: true,
    excludePartners: ['allwin', 'boston-scientific'],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=services&section=partners');
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
        body: JSON.stringify({ page: 'services', section: 'partners', content }),
      });
      router.refresh();
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
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
            <h1 className="text-2xl font-bold">Services Partners</h1>
            <p className="text-muted-foreground">Services Page → Partners Section</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/services" target="_blank"><Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-2" />Preview</Button></Link>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Section Content</CardTitle>
            <CardDescription>Partners are loaded from data.ts. Edit the section header here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={content.description} onChange={(e) => setContent({ ...content, description: e.target.value })} rows={3} />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Switch checked={content.showTags} onCheckedChange={(v) => setContent({ ...content, showTags: v })} />
              <Label>Show Partner Tags</Label>
            </div>
            <div className="space-y-2">
              <Label>Exclude Partners (comma separated IDs)</Label>
              <Input 
                value={content.excludePartners.join(', ')} 
                onChange={(e) => setContent({ ...content, excludePartners: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} 
                placeholder="allwin, boston-scientific"
              />
              <p className="text-xs text-muted-foreground">Partner IDs to exclude from the services page display</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="bg-white p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-light text-slate-900 mb-2">{content.title}</h2>
                <p className="text-sm text-slate-600">{content.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['Dornier', 'Storz', 'Wikkon', 'Rigicon'].map((name, i) => (
                  <div key={i} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-3 text-center">
                    <div className="h-8 bg-slate-100 rounded mb-2" />
                    <p className="text-sm font-medium text-slate-900">{name}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4">
                Partner logos and details are loaded from data.ts
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
