'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Eye, Undo, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface PartnersContent {
  sectionTitle: string;
  sectionSubtitle: string;
  ctaText: string;
  ctaLink: string;
}

export default function HomePartnersEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<PartnersContent>({
    sectionSubtitle: 'Our Partners',
    sectionTitle: 'Trusted by World-Leading Brands',
    ctaText: 'View All Partners',
    ctaLink: '/partners',
  });
  const [originalContent, setOriginalContent] = useState<PartnersContent | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content?page=home&section=partners');
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
          section: 'partners',
          content,
        }),
      });

      if (res.ok) {
        toast.success('Partners section saved successfully!');
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
            <h1 className="text-2xl font-bold">Edit Partners Section</h1>
            <p className="text-sm text-muted-foreground">Home Page → Partners Section</p>
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
            <h2 className="text-lg font-semibold mb-4">Section Header</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="sectionSubtitle">Subtitle</Label>
                <Input
                  id="sectionSubtitle"
                  value={content.sectionSubtitle}
                  onChange={(e) => setContent({ ...content, sectionSubtitle: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="sectionTitle">Title</Label>
                <Input
                  id="sectionTitle"
                  value={content.sectionTitle}
                  onChange={(e) => setContent({ ...content, sectionTitle: e.target.value })}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Call to Action</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="ctaText">Button Text</Label>
                <Input
                  id="ctaText"
                  value={content.ctaText}
                  onChange={(e) => setContent({ ...content, ctaText: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="ctaLink">Button Link</Label>
                <Input
                  id="ctaLink"
                  value={content.ctaLink}
                  onChange={(e) => setContent({ ...content, ctaLink: e.target.value })}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <h2 className="text-lg font-semibold mb-2 text-blue-800">💡 Partner Logos</h2>
            <p className="text-sm text-blue-700">
              Partner logos are managed in the <Link href="/admin/partners" className="underline font-medium">Partners</Link> section. 
              The partner logos displayed in this section are automatically pulled from the active partners list.
            </p>
          </Card>
        </div>

        {/* Live Preview */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="text-center">
              <span className="text-gold font-medium text-sm">{content.sectionSubtitle}</span>
              <h2 className="text-2xl font-bold text-white mt-1 mb-8">{content.sectionTitle}</h2>
              
              {/* Placeholder Partner Logos */}
              <div className="flex justify-center gap-8 mb-8 flex-wrap">
                {['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4'].map((name, i) => (
                  <div 
                    key={i} 
                    className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-white/50 text-xs">{name}</span>
                  </div>
                ))}
              </div>

              {content.ctaText && (
                <button className="px-6 py-2 border border-gold text-gold font-semibold rounded-lg text-sm hover:bg-gold/10 transition-colors">
                  {content.ctaText}
                </button>
              )}
            </div>
          </Card>
          <p className="text-xs text-muted-foreground text-center">
            Partner logos are pulled from the Partners management section
          </p>
        </div>
      </div>
    </div>
  );
}
