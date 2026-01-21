'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Eye, Undo, Loader2, Plus, Trash2, CheckCircle2, Building2, Users2, Headphones, Shield, Award, Clock } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const availableIcons = [
  { name: 'Building2', icon: Building2 },
  { name: 'Users2', icon: Users2 },
  { name: 'Headphones', icon: Headphones },
  { name: 'Shield', icon: Shield },
  { name: 'Award', icon: Award },
  { name: 'Clock', icon: Clock },
];

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface AboutContent {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  secondaryDescription: string;
  ctaText: string;
  ctaLink: string;
  highlights: string[];
  features: Feature[];
}

const defaultContent: AboutContent = {
  badge: 'About RIC',
  title: 'Pioneering Healthcare Excellence in',
  titleHighlight: 'Saudi Arabia',
  description: 'Riyadh International Corporation (RIC) has been at the forefront of medical equipment distribution since 1985. We are committed to advancing healthcare through innovative technologies and trusted partnerships.',
  secondaryDescription: 'Our mission is to inspire hope and improve quality of life by offering verifiable, effective professional solutions that ensure partner satisfaction. With ISO certification and SFDA approvals, we maintain the highest standards in everything we do.',
  ctaText: 'Learn More About Us',
  ctaLink: '/about',
  highlights: [
    'ISO Certified Operations',
    'SFDA Approved Products',
    '24/7 Technical Support',
    'Nationwide Coverage',
  ],
  features: [
    {
      icon: 'Building2',
      title: '41 Years of Trusted Service',
      description: 'Established in 1985, we bring decades of experience in medical equipment distribution and healthcare solutions.',
    },
    {
      icon: 'Users2',
      title: 'International Partnerships',
      description: 'Strategic partnerships with 12+ global leaders in medical technology ensure access to world-class equipment.',
    },
    {
      icon: 'Headphones',
      title: 'Comprehensive Support',
      description: 'From installation to maintenance, our dedicated team provides complete after-sales support.',
    },
  ],
};

export default function AboutSectionEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<AboutContent>(defaultContent);
  const [originalContent, setOriginalContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content?page=home&section=about');
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
          section: 'about',
          content,
        }),
      });

      if (res.ok) {
        toast.success('About section saved successfully!');
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

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...content.highlights];
    newHighlights[index] = value;
    setContent({ ...content, highlights: newHighlights });
  };

  const addHighlight = () => {
    setContent({ ...content, highlights: [...content.highlights, ''] });
  };

  const removeHighlight = (index: number) => {
    setContent({ ...content, highlights: content.highlights.filter((_, i) => i !== index) });
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...content.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setContent({ ...content, features: newFeatures });
  };

  const addFeature = () => {
    setContent({
      ...content,
      features: [...content.features, { icon: 'Building2', title: '', description: '' }],
    });
  };

  const removeFeature = (index: number) => {
    setContent({ ...content, features: content.features.filter((_, i) => i !== index) });
  };

  const getIconComponent = (iconName: string) => {
    const iconItem = availableIcons.find(i => i.name === iconName);
    return iconItem ? iconItem.icon : Building2;
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
            <h1 className="text-2xl font-bold">Edit About Section</h1>
            <p className="text-sm text-muted-foreground">Home Page → About Section</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <Button variant="outline" onClick={handleReset}>
              <Undo className="w-4 h-4 mr-2" />
              Revert
            </Button>
          )}
          <Link href="/#about" target="_blank">
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
                  placeholder="e.g., About RIC"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={content.title}
                    onChange={(e) => setContent({ ...content, title: e.target.value })}
                    placeholder="Main title"
                  />
                </div>
                <div>
                  <Label htmlFor="titleHighlight">Title Highlight</Label>
                  <Input
                    id="titleHighlight"
                    value={content.titleHighlight}
                    onChange={(e) => setContent({ ...content, titleHighlight: e.target.value })}
                    placeholder="Highlighted text"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Content</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Primary Description</Label>
                <Textarea
                  id="description"
                  value={content.description}
                  onChange={(e) => setContent({ ...content, description: e.target.value })}
                  placeholder="Main description paragraph..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="secondaryDescription">Secondary Description</Label>
                <Textarea
                  id="secondaryDescription"
                  value={content.secondaryDescription}
                  onChange={(e) => setContent({ ...content, secondaryDescription: e.target.value })}
                  placeholder="Additional description paragraph..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ctaText">CTA Button Text</Label>
                  <Input
                    id="ctaText"
                    value={content.ctaText}
                    onChange={(e) => setContent({ ...content, ctaText: e.target.value })}
                    placeholder="e.g., Learn More"
                  />
                </div>
                <div>
                  <Label htmlFor="ctaLink">CTA Button Link</Label>
                  <Input
                    id="ctaLink"
                    value={content.ctaLink}
                    onChange={(e) => setContent({ ...content, ctaLink: e.target.value })}
                    placeholder="e.g., /about"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Highlights (Checkmarks)</h2>
              <Button variant="outline" size="sm" onClick={addHighlight}>
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
            <div className="space-y-3">
              {content.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <Input
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      placeholder={`Highlight ${index + 1}`}
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeHighlight(index)}
                    className="shrink-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Feature Cards</h2>
              <Button variant="outline" size="sm" onClick={addFeature}>
                <Plus className="w-4 h-4 mr-2" />
                Add Feature
              </Button>
            </div>
            <div className="space-y-4">
              {content.features.map((feature, index) => {
                const IconComponent = getIconComponent(feature.icon);
                return (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-sm">{feature.title || `Feature ${index + 1}`}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeFeature(index)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Title</Label>
                        <Input
                          value={feature.title}
                          onChange={(e) => updateFeature(index, 'title', e.target.value)}
                          placeholder="Feature title"
                          className="h-9"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Icon</Label>
                        <Select
                          value={feature.icon}
                          onValueChange={(value) => updateFeature(index, 'icon', value)}
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
                    </div>

                    <div>
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        value={feature.description}
                        onChange={(e) => updateFeature(index, 'description', e.target.value)}
                        placeholder="Feature description"
                        rows={2}
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
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Content */}
              <div>
                <span className="inline-block px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium mb-3">
                  {content.badge || 'About RIC'}
                </span>
                <h2 className="text-xl md:text-2xl font-bold mb-4 leading-tight">
                  {content.title || 'Pioneering Healthcare Excellence in'}{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {content.titleHighlight || 'Saudi Arabia'}
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {content.description || 'Description goes here...'}
                </p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {content.secondaryDescription || 'Secondary description goes here...'}
                </p>

                <div className="space-y-2 mb-4">
                  {content.highlights.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                {content.ctaText && (
                  <button className="px-4 py-2 bg-gradient-to-r from-gold to-amber-600 text-black font-semibold rounded-lg text-sm">
                    {content.ctaText}
                  </button>
                )}
              </div>

              {/* Right Features */}
              <div className="space-y-3">
                {content.features.map((feature, index) => {
                  const IconComponent = getIconComponent(feature.icon);
                  return (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold mb-1">
                            {feature.title || 'Feature Title'}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {feature.description || 'Feature description'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
