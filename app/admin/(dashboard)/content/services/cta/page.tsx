'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CTAButton {
  text: string;
  href: string;
}

interface CTAContent {
  title: string;
  description: string;
  primaryCta: CTAButton;
  secondaryCta: CTAButton;
}

export default function ServicesCTAEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<CTAContent>({
    title: 'Ready to Get Started?',
    description: 'Contact us today to discuss your requirements.',
    primaryCta: { text: 'Request Consultation', href: '/contact' },
    secondaryCta: { text: 'View Products', href: '/products/medical-equipment' },
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=services&section=cta');
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
        body: JSON.stringify({ page: 'services', section: 'cta', content }),
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
            <h1 className="text-2xl font-bold">Call to Action</h1>
            <p className="text-muted-foreground">Services Page → CTA Section</p>
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
            <CardHeader><CardTitle>Main Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={content.description} onChange={(e) => setContent({ ...content, description: e.target.value })} rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Primary CTA Button</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input 
                  value={content.primaryCta.text} 
                  onChange={(e) => setContent({ ...content, primaryCta: { ...content.primaryCta, text: e.target.value } })} 
                />
              </div>
              <div className="space-y-2">
                <Label>Button Link</Label>
                <Input 
                  value={content.primaryCta.href} 
                  onChange={(e) => setContent({ ...content, primaryCta: { ...content.primaryCta, href: e.target.value } })} 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Secondary CTA Button</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input 
                  value={content.secondaryCta.text} 
                  onChange={(e) => setContent({ ...content, secondaryCta: { ...content.secondaryCta, text: e.target.value } })} 
                />
              </div>
              <div className="space-y-2">
                <Label>Button Link</Label>
                <Input 
                  value={content.secondaryCta.href} 
                  onChange={(e) => setContent({ ...content, secondaryCta: { ...content.secondaryCta, href: e.target.value } })} 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden sticky top-6 h-fit">
          <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-center">
              <h2 className="text-xl font-light text-white mb-3">{content.title}</h2>
              <p className="text-sm text-blue-100 mb-6 max-w-md mx-auto">{content.description}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button className="inline-flex items-center px-5 py-2.5 bg-white text-blue-600 rounded-full text-sm font-medium">
                  <Phone className="w-4 h-4 mr-2" />
                  {content.primaryCta.text}
                </button>
                <button className="inline-flex items-center px-5 py-2.5 border border-white/30 text-white rounded-full text-sm font-medium hover:bg-white/10">
                  {content.secondaryCta.text}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
