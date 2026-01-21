'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, Plus, Trash2, Wrench, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Stat {
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
}

interface ServicesHeroContent {
  badge: string;
  badgeIcon: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryCta: { text: string; href: string; icon: string };
  secondaryCta: { text: string; href: string; icon: string };
  stats: Stat[];
}

const colorOptions = [
  { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Blue' },
  { bg: 'bg-green-50', text: 'text-green-600', label: 'Green' },
  { bg: 'bg-purple-50', text: 'text-purple-600', label: 'Purple' },
  { bg: 'bg-orange-50', text: 'text-orange-600', label: 'Orange' },
  { bg: 'bg-red-50', text: 'text-red-600', label: 'Red' },
  { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Amber' },
];

export default function ServicesHeroEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ServicesHeroContent>({
    badge: 'Professional Service & Maintenance',
    badgeIcon: 'Wrench',
    title: 'Expert Medical Equipment',
    titleHighlight: 'Service & Maintenance',
    description: 'Comprehensive service solutions for all your medical equipment needs.',
    primaryCta: { text: 'Request Service', href: '/contact', icon: 'Phone' },
    secondaryCta: { text: '+966 11 465 4113', href: 'tel:+966114654113', icon: 'Phone' },
    stats: [
      { value: '24/7', label: 'Emergency Support', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
      { value: '100%', label: 'Genuine Parts', bgColor: 'bg-green-50', textColor: 'text-green-600' },
      { value: 'ISO', label: 'Certified Service', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
      { value: 'All', label: 'Major Brands', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
    ],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=services&section=hero');
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
        body: JSON.stringify({ page: 'services', section: 'hero', content }),
      });
      router.refresh();
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    const newStats = [...content.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setContent({ ...content, stats: newStats });
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
            <h1 className="text-2xl font-bold">Services Page Hero</h1>
            <p className="text-muted-foreground">Services Page → Hero Section</p>
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
            <CardHeader><CardTitle>Hero Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Badge Text</Label>
                <Input value={content.badge} onChange={(e) => setContent({ ...content, badge: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Title Highlight</Label>
                  <Input value={content.titleHighlight} onChange={(e) => setContent({ ...content, titleHighlight: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={content.description} onChange={(e) => setContent({ ...content, description: e.target.value })} rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>CTA Buttons</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Button Text</Label>
                  <Input value={content.primaryCta.text} onChange={(e) => setContent({ ...content, primaryCta: { ...content.primaryCta, text: e.target.value } })} />
                </div>
                <div className="space-y-2">
                  <Label>Primary Button Link</Label>
                  <Input value={content.primaryCta.href} onChange={(e) => setContent({ ...content, primaryCta: { ...content.primaryCta, href: e.target.value } })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Secondary Button Text</Label>
                  <Input value={content.secondaryCta.text} onChange={(e) => setContent({ ...content, secondaryCta: { ...content.secondaryCta, text: e.target.value } })} />
                </div>
                <div className="space-y-2">
                  <Label>Secondary Button Link</Label>
                  <Input value={content.secondaryCta.href} onChange={(e) => setContent({ ...content, secondaryCta: { ...content.secondaryCta, href: e.target.value } })} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Stats Cards</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {content.stats.map((stat, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 p-3 border rounded-lg">
                  <Input value={stat.value} onChange={(e) => updateStat(index, 'value', e.target.value)} placeholder="Value" />
                  <Input value={stat.label} onChange={(e) => updateStat(index, 'label', e.target.value)} placeholder="Label" className="col-span-3" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden sticky top-6 h-fit">
          <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
                  <Wrench className="w-3 h-3" />{content.badge}
                </div>
                <h1 className="text-2xl font-light text-slate-900">
                  {content.title}<span className="block text-blue-600 font-normal">{content.titleHighlight}</span>
                </h1>
                <p className="text-sm text-slate-600">{content.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-sky-600 text-white text-xs">
                    <Phone className="w-3 h-3 mr-1" />{content.primaryCta.text}
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">{content.secondaryCta.text}</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {content.stats.map((stat, i) => (
                  <div key={i} className={`text-center p-3 rounded-xl ${stat.bgColor}`}>
                    <div className={`text-xl font-bold ${stat.textColor}`}>{stat.value}</div>
                    <div className="text-xs text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
