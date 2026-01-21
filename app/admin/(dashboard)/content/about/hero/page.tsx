'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AboutHeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
}

export default function AboutHeroEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<AboutHeroContent>({
    badge: 'About RIC',
    title: 'Pioneering',
    titleHighlight: 'Healthcare Excellence',
    description: 'For over four decades, RIC Medical Gateway has been at the forefront of healthcare innovation in Saudi Arabia, building trusted partnerships and delivering excellence in medical equipment distribution.',
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=about&section=hero');
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
        body: JSON.stringify({ page: 'about', section: 'hero', content }),
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
            <h1 className="text-2xl font-bold">About Page Hero</h1>
            <p className="text-muted-foreground">About Page → Hero Section</p>
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
            <CardTitle>Hero Content</CardTitle>
            <CardDescription>Edit the hero section of the About page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="badge">Badge Text</Label>
              <Input
                id="badge"
                value={content.badge}
                onChange={(e) => setContent({ ...content, badge: e.target.value })}
                placeholder="About RIC"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title (First Part)</Label>
              <Input
                id="title"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                placeholder="Pioneering"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="titleHighlight">Title Highlight (Gradient)</Label>
              <Input
                id="titleHighlight"
                value={content.titleHighlight}
                onChange={(e) => setContent({ ...content, titleHighlight: e.target.value })}
                placeholder="Healthcare Excellence"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                placeholder="Description text..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>See how it will look on the website</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#0a1628] text-white p-8">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30">
                  <Heart className="h-3 w-3 mr-1" />
                  {content.badge}
                </Badge>
                
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  {content.title}{' '}
                  <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
                    {content.titleHighlight}
                  </span>
                </h1>
                
                <p className="text-sm text-gray-300 leading-relaxed">
                  {content.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
