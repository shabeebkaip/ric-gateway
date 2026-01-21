'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface CTAContent {
  title: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
}

export default function AboutCTAEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<CTAContent>({
    title: "Ready to Transform Your Healthcare Facility?",
    description: "Partner with RIC Medical Gateway and experience the difference that 41+ years of healthcare excellence can bring to your organization.",
    primaryCta: {
      text: "Get in Touch",
      href: "/contact"
    },
    secondaryCta: {
      text: "Explore Solutions",
      href: "/products"
    }
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=about&section=cta');
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
        body: JSON.stringify({ page: 'about', section: 'cta', content }),
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
            <h1 className="text-2xl font-bold">About Page CTA</h1>
            <p className="text-muted-foreground">About Page → Call to Action Section</p>
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
            <CardTitle>CTA Content</CardTitle>
            <CardDescription>Edit the call to action section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                placeholder="Ready to Transform Your Healthcare?"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                placeholder="Description text..."
                rows={3}
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Primary CTA Button</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Button Text</Label>
                  <Input
                    value={content.primaryCta.text}
                    onChange={(e) => setContent({ ...content, primaryCta: { ...content.primaryCta, text: e.target.value } })}
                    placeholder="Get in Touch"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Link URL</Label>
                  <Input
                    value={content.primaryCta.href}
                    onChange={(e) => setContent({ ...content, primaryCta: { ...content.primaryCta, href: e.target.value } })}
                    placeholder="/contact"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Secondary CTA Button</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Button Text</Label>
                  <Input
                    value={content.secondaryCta.text}
                    onChange={(e) => setContent({ ...content, secondaryCta: { ...content.secondaryCta, text: e.target.value } })}
                    placeholder="Explore Solutions"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Link URL</Label>
                  <Input
                    value={content.secondaryCta.href}
                    onChange={(e) => setContent({ ...content, secondaryCta: { ...content.secondaryCta, href: e.target.value } })}
                    placeholder="/products"
                  />
                </div>
              </div>
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
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">{content.title}</h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {content.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white px-6"
                    size="lg"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {content.primaryCta.text}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10 px-6"
                    size="lg"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {content.secondaryCta.text}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
