'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Eye, Undo, Loader2, Plus, Trash2, Clock, Users, Shield, Award } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface StatItem {
  icon: string;
  value: string;
  label: string;
}

interface HeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  stats: StatItem[];
}

const defaultContent: HeroContent = {
  badge: 'Trusted Since 1985',
  title: 'Transforming Healthcare',
  titleHighlight: 'Through Innovation',
  description: 'Leading provider of advanced medical solutions in Saudi Arabia. Excellence in Medical Technology & Patient Care.',
  ctaText: 'Explore Our Solutions',
  ctaLink: '/products',
  secondaryCtaText: 'Contact Us',
  secondaryCtaLink: '/contact',
  stats: [
    { icon: 'clock', value: '41', label: 'Years of Excellence' },
    { icon: 'users', value: '12', label: 'International Partners' },
    { icon: 'shield', value: '100+', label: 'Healthcare Facilities' },
    { icon: 'award', value: 'ISO', label: 'Certified Operations' },
  ],
};

const iconOptions = [
  { value: 'clock', label: 'Clock', icon: <Clock className="w-5 h-5" /> },
  { value: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
  { value: 'shield', label: 'Shield', icon: <Shield className="w-5 h-5" /> },
  { value: 'award', label: 'Award', icon: <Award className="w-5 h-5" /> },
];

export default function HomeHeroEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<HeroContent>(defaultContent);
  const [originalContent, setOriginalContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content?page=home&section=hero');
      if (res.ok) {
        const data = await res.json();
        if (data.content) {
          setContent(data.content);
          setOriginalContent(data.content);
        } else {
          setOriginalContent(defaultContent);
        }
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
      setOriginalContent(defaultContent);
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
          section: 'hero',
          content,
        }),
      });

      if (res.ok) {
        toast.success('Hero section saved successfully!');
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

  const updateStat = (index: number, field: keyof StatItem, value: string) => {
    const newStats = [...content.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setContent({ ...content, stats: newStats });
  };

  const addStat = () => {
    setContent({
      ...content,
      stats: [...content.stats, { icon: 'clock', value: '', label: '' }],
    });
  };

  const removeStat = (index: number) => {
    setContent({
      ...content,
      stats: content.stats.filter((_, i) => i !== index),
    });
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      clock: <Clock className="w-6 h-6" />,
      users: <Users className="w-6 h-6" />,
      shield: <Shield className="w-6 h-6" />,
      award: <Award className="w-6 h-6" />,
    };
    return iconMap[iconName] || <Clock className="w-6 h-6" />;
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
            <h1 className="text-2xl font-bold">Edit Hero Section</h1>
            <p className="text-sm text-muted-foreground">Home Page → Hero Section</p>
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
            <h2 className="text-lg font-semibold mb-4">Badge & Headlines</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="badge">Badge Text</Label>
                <Input
                  id="badge"
                  value={content.badge}
                  onChange={(e) => setContent({ ...content, badge: e.target.value })}
                  placeholder="e.g., Trusted Since 1985"
                />
              </div>

              <div>
                <Label htmlFor="title">Main Title</Label>
                <Input
                  id="title"
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                  placeholder="e.g., Transforming Healthcare"
                />
              </div>

              <div>
                <Label htmlFor="titleHighlight">Title Highlight (Gradient Text)</Label>
                <Input
                  id="titleHighlight"
                  value={content.titleHighlight}
                  onChange={(e) => setContent({ ...content, titleHighlight: e.target.value })}
                  placeholder="e.g., Through Innovation"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={content.description}
                  onChange={(e) => setContent({ ...content, description: e.target.value })}
                  placeholder="Supporting description text"
                  rows={3}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Call to Action Buttons</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ctaText">Primary Button Text</Label>
                  <Input
                    id="ctaText"
                    value={content.ctaText}
                    onChange={(e) => setContent({ ...content, ctaText: e.target.value })}
                    placeholder="e.g., Explore Our Solutions"
                  />
                </div>
                <div>
                  <Label htmlFor="ctaLink">Primary Button Link</Label>
                  <Input
                    id="ctaLink"
                    value={content.ctaLink}
                    onChange={(e) => setContent({ ...content, ctaLink: e.target.value })}
                    placeholder="e.g., /products"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="secondaryCtaText">Secondary Button Text</Label>
                  <Input
                    id="secondaryCtaText"
                    value={content.secondaryCtaText}
                    onChange={(e) => setContent({ ...content, secondaryCtaText: e.target.value })}
                    placeholder="e.g., Contact Us"
                  />
                </div>
                <div>
                  <Label htmlFor="secondaryCtaLink">Secondary Button Link</Label>
                  <Input
                    id="secondaryCtaLink"
                    value={content.secondaryCtaLink}
                    onChange={(e) => setContent({ ...content, secondaryCtaLink: e.target.value })}
                    placeholder="e.g., /contact"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Statistics</h2>
              <Button variant="outline" size="sm" onClick={addStat}>
                <Plus className="w-4 h-4 mr-2" />
                Add Stat
              </Button>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {content.stats.map((stat, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Stat {index + 1}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeStat(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div>
                    <Label>Icon</Label>
                    <div className="flex gap-2 mt-1">
                      {iconOptions.map((opt) => (
                        <Button
                          key={opt.value}
                          variant={stat.icon === opt.value ? 'default' : 'outline'}
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => updateStat(index, 'icon', opt.value)}
                          title={opt.label}
                        >
                          {opt.icon}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Value</Label>
                      <Input
                        value={stat.value}
                        onChange={(e) => updateStat(index, 'value', e.target.value)}
                        placeholder="e.g., 41"
                      />
                    </div>
                    <div>
                      <Label>Label</Label>
                      <Input
                        value={stat.label}
                        onChange={(e) => updateStat(index, 'label', e.target.value)}
                        placeholder="e.g., Years of Excellence"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Live Preview */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <Card className="overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/50">
            <div className="p-8">
              {/* Badge */}
              {content.badge && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/10 to-primary/10 border border-gold/20 text-sm font-medium mb-4">
                  <span className="text-gold">♥</span>
                  <span className="bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent font-semibold">
                    {content.badge}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
                {content.title}{' '}
                <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                  {content.titleHighlight}
                </span>
              </h1>

              {/* Description */}
              <p className="text-gray-600 mb-6 max-w-md">
                {content.description}
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mb-8">
                {content.ctaText && (
                  <button className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary text-white font-semibold rounded-lg text-sm shadow-lg">
                    {content.ctaText}
                  </button>
                )}
                {content.secondaryCtaText && (
                  <button className="px-5 py-2.5 border-2 border-primary/30 text-primary font-semibold rounded-lg text-sm">
                    {content.secondaryCtaText}
                  </button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-white/50 border-t">
              {content.stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm border">
                  <div className="text-primary mb-2 flex justify-center">
                    {getIconComponent(stat.icon)}
                  </div>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
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
