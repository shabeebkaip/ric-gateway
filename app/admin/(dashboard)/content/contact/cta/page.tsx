'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CTAContent {
  title: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
    icon: string;
  };
  secondaryCta: {
    text: string;
    href: string;
    icon: string;
  };
}

const iconOptions = [
  { value: 'Phone', label: 'Phone', icon: Phone },
  { value: 'Mail', label: 'Email', icon: Mail },
];

const getIconComponent = (iconName: string) => {
  const option = iconOptions.find(o => o.value === iconName);
  return option?.icon || Phone;
};

export default function ContactCTAEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<CTAContent>({
    title: 'Need Immediate Assistance?',
    description: 'Our dedicated team is ready to help you with any inquiries about our medical equipment and healthcare solutions.',
    primaryCta: {
      text: 'Call Now',
      href: 'tel:+966509698043',
      icon: 'Phone',
    },
    secondaryCta: {
      text: 'Email Us',
      href: 'mailto:ricmede@ricmedical.com.sa',
      icon: 'Mail',
    },
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=contact&section=cta');
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
        body: JSON.stringify({ page: 'contact', section: 'cta', content }),
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

  const PrimaryIcon = getIconComponent(content.primaryCta.icon);
  const SecondaryIcon = getIconComponent(content.secondaryCta.icon);

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
            <h1 className="text-2xl font-bold">Contact Page CTA</h1>
            <p className="text-muted-foreground">Contact Page → Quick Info Banner</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/contact" target="_blank">
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
            <CardDescription>Edit the quick info banner at the bottom</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Primary Button</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Icon</Label>
                  <Select 
                    value={content.primaryCta.icon} 
                    onValueChange={(v) => setContent({ ...content, primaryCta: { ...content.primaryCta, icon: v } })}
                  >
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
                  <Label className="text-xs">Text</Label>
                  <Input
                    value={content.primaryCta.text}
                    onChange={(e) => setContent({ ...content, primaryCta: { ...content.primaryCta, text: e.target.value } })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Link</Label>
                  <Input
                    value={content.primaryCta.href}
                    onChange={(e) => setContent({ ...content, primaryCta: { ...content.primaryCta, href: e.target.value } })}
                    placeholder="tel:+966..."
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Secondary Button</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Icon</Label>
                  <Select 
                    value={content.secondaryCta.icon} 
                    onValueChange={(v) => setContent({ ...content, secondaryCta: { ...content.secondaryCta, icon: v } })}
                  >
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
                  <Label className="text-xs">Text</Label>
                  <Input
                    value={content.secondaryCta.text}
                    onChange={(e) => setContent({ ...content, secondaryCta: { ...content.secondaryCta, text: e.target.value } })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Link</Label>
                  <Input
                    value={content.secondaryCta.href}
                    onChange={(e) => setContent({ ...content, secondaryCta: { ...content.secondaryCta, href: e.target.value } })}
                    placeholder="mailto:..."
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
            <div className="bg-gradient-to-r from-primary/10 via-amber-500/5 to-primary/10 p-8">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {content.title}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  {content.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-gradient-to-r from-amber-500 to-primary text-white shadow-lg">
                    <PrimaryIcon className="w-4 h-4 mr-2" />
                    {content.primaryCta.text}
                  </Button>
                  <Button variant="outline" className="border-2 border-primary hover:bg-primary/5">
                    <SecondaryIcon className="w-4 h-4 mr-2" />
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
