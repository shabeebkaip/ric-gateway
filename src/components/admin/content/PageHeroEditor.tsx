'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Eye, Undo, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ImageUpload } from '@/components/admin/ImageUpload';

interface PageHeroContent {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
}

interface PageHeroEditorProps {
  page: string;
  section: string;
  pageTitle: string;
  pageBreadcrumb: string;
  previewUrl: string;
  defaultContent: PageHeroContent;
}

export default function PageHeroEditorWrapper({ 
  page, 
  section, 
  pageTitle, 
  pageBreadcrumb, 
  previewUrl,
  defaultContent 
}: PageHeroEditorProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<PageHeroContent>(defaultContent);
  const [originalContent, setOriginalContent] = useState<PageHeroContent | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch(`/api/content?page=${page}&section=${section}`);
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
          page,
          section,
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
            <h1 className="text-2xl font-bold">{pageTitle}</h1>
            <p className="text-sm text-muted-foreground">{pageBreadcrumb}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <Button variant="outline" onClick={handleReset}>
              <Undo className="w-4 h-4 mr-2" />
              Revert
            </Button>
          )}
          <Link href={previewUrl} target="_blank">
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
            <h2 className="text-lg font-semibold mb-4">Hero Content</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="subtitle">Subtitle / Badge</Label>
                <Input
                  id="subtitle"
                  value={content.subtitle}
                  onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                  placeholder="Small text above title"
                />
              </div>

              <div>
                <Label htmlFor="title">Main Title</Label>
                <Input
                  id="title"
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                  placeholder="Page headline"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={content.description}
                  onChange={(e) => setContent({ ...content, description: e.target.value })}
                  placeholder="Supporting text"
                  rows={3}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Background Image</h2>
            <ImageUpload
              value={content.backgroundImage ? [content.backgroundImage] : []}
              onChange={(images) => setContent({ ...content, backgroundImage: images[0] || '' })}
              maxFiles={1}
            />
          </Card>
        </div>

        {/* Live Preview */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <Card className="overflow-hidden">
            <div 
              className="relative h-[300px] flex items-center justify-center"
              style={{
                backgroundImage: content.backgroundImage 
                  ? `url(${content.backgroundImage})` 
                  : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10 text-center text-white p-8 max-w-2xl">
                {content.subtitle && (
                  <span className="inline-block px-4 py-1 bg-gold/90 text-black text-xs font-semibold rounded-full mb-4">
                    {content.subtitle}
                  </span>
                )}
                <h1 className="text-3xl font-bold mb-4">
                  {content.title}
                </h1>
                {content.description && (
                  <p className="text-sm text-white/80">
                    {content.description}
                  </p>
                )}
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
