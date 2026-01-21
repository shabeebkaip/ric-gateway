'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, Plus, Trash2, Award, Building2, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Stat {
  id: string;
  icon: string;
  number: string;
  label: string;
  description: string;
}

interface StatsContent {
  stats: Stat[];
}

const iconOptions = [
  { value: 'Award', label: 'Award', icon: Award },
  { value: 'Building2', label: 'Building', icon: Building2 },
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'Globe', label: 'Globe', icon: Globe },
];

const getIconComponent = (iconName: string) => {
  const option = iconOptions.find(o => o.value === iconName);
  return option?.icon || Award;
};

export default function AboutStatsEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<StatsContent>({
    stats: [
      { id: '1', icon: 'Award', number: '41+', label: 'Years of Excellence', description: 'Decades of trusted healthcare partnerships' },
      { id: '2', icon: 'Building2', number: '500+', label: 'Healthcare Facilities', description: 'Hospitals and clinics served nationwide' },
      { id: '3', icon: 'Users', number: '50+', label: 'Expert Team', description: 'Dedicated healthcare professionals' },
      { id: '4', icon: 'Globe', number: '25+', label: 'Global Partners', description: 'International manufacturer partnerships' },
    ],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=about&section=stats');
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
        body: JSON.stringify({ page: 'about', section: 'stats', content }),
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

  const addStat = () => {
    setContent({
      stats: [
        ...content.stats,
        { id: Date.now().toString(), icon: 'Award', number: '0+', label: 'New Stat', description: 'Description' },
      ],
    });
  };

  const removeStat = (id: string) => {
    setContent({ stats: content.stats.filter(s => s.id !== id) });
  };

  const updateStat = (id: string, field: keyof Stat, value: string) => {
    setContent({
      stats: content.stats.map(s => (s.id === id ? { ...s, [field]: value } : s)),
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
            <h1 className="text-2xl font-bold">About Page Stats</h1>
            <p className="text-muted-foreground">About Page → Stats Section</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Stats Cards</CardTitle>
                <CardDescription>Edit the statistics displayed on the About page</CardDescription>
              </div>
              <Button onClick={addStat} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Stat
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.stats.map((stat, index) => (
              <Card key={stat.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-muted-foreground">Stat {index + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => removeStat(stat.id)} className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Icon</Label>
                      <Select value={stat.icon} onValueChange={(v) => updateStat(stat.id, 'icon', v)}>
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
                      <Label className="text-xs">Number</Label>
                      <Input
                        value={stat.number}
                        onChange={(e) => updateStat(stat.id, 'number', e.target.value)}
                        placeholder="41+"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Label</Label>
                    <Input
                      value={stat.label}
                      onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                      placeholder="Years of Excellence"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Description</Label>
                    <Input
                      value={stat.description}
                      onChange={(e) => updateStat(stat.id, 'description', e.target.value)}
                      placeholder="Short description"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>See how it will look on the website</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#0a1628] text-white p-6">
              <div className="grid grid-cols-2 gap-4">
                {content.stats.map((stat) => {
                  const IconComponent = getIconComponent(stat.icon);
                  return (
                    <div key={stat.id} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mb-3">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="text-2xl font-bold text-primary">{stat.number}</div>
                      <div className="text-sm font-semibold text-white">{stat.label}</div>
                      <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
