'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Eye, Undo, Loader2, Phone, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface CTAContent {
  sectionTitle: string;
  sectionSubtitle: string;
  heading: string;
  description: string;
  phone: string;
  email: string;
  whatsapp: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  backgroundColor: string;
}

export default function CTASectionEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<CTAContent>({
    sectionSubtitle: 'Get In Touch',
    sectionTitle: 'Ready to Transform Your Healthcare Facility?',
    heading: 'Contact Us Today',
    description: 'Our team of experts is ready to help you find the perfect medical equipment solutions for your facility. Get in touch with us for a personalized consultation.',
    phone: '+966 12 345 6789',
    email: 'info@ricmedical.com.sa',
    whatsapp: '+966 12 345 6789',
    ctaButtonText: 'Request a Quote',
    ctaButtonLink: '/contact',
    backgroundColor: 'gradient',
  });
  const [originalContent, setOriginalContent] = useState<CTAContent | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content?page=home&section=cta');
      if (res.ok) {
        const data = await res.json();
        if (data.content) {
          setContent(data.content);
          setOriginalContent(data.content);
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
          section: 'cta',
          content,
        }),
      });

      if (res.ok) {
        toast.success('CTA section saved successfully!');
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
            <h1 className="text-2xl font-bold">Edit Contact CTA</h1>
            <p className="text-sm text-muted-foreground">Home Page → Contact CTA Section</p>
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
            <h2 className="text-lg font-semibold mb-4">Text Content</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="sectionSubtitle">Subtitle / Badge</Label>
                <Input
                  id="sectionSubtitle"
                  value={content.sectionSubtitle}
                  onChange={(e) => setContent({ ...content, sectionSubtitle: e.target.value })}
                  placeholder="e.g., Get In Touch"
                />
              </div>

              <div>
                <Label htmlFor="sectionTitle">Main Headline</Label>
                <Textarea
                  id="sectionTitle"
                  value={content.sectionTitle}
                  onChange={(e) => setContent({ ...content, sectionTitle: e.target.value })}
                  placeholder="Main CTA headline"
                  rows={2}
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
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={content.phone}
                    onChange={(e) => setContent({ ...content, phone: e.target.value })}
                    placeholder="+966 12 345 6789"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    value={content.email}
                    onChange={(e) => setContent({ ...content, email: e.target.value })}
                    placeholder="info@example.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="whatsapp"
                    value={content.whatsapp}
                    onChange={(e) => setContent({ ...content, whatsapp: e.target.value })}
                    placeholder="+966 12 345 6789"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Call to Action Button</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="ctaButtonText">Button Text</Label>
                <Input
                  id="ctaButtonText"
                  value={content.ctaButtonText}
                  onChange={(e) => setContent({ ...content, ctaButtonText: e.target.value })}
                  placeholder="e.g., Request a Quote"
                />
              </div>

              <div>
                <Label htmlFor="ctaButtonLink">Button Link</Label>
                <Input
                  id="ctaButtonLink"
                  value={content.ctaButtonLink}
                  onChange={(e) => setContent({ ...content, ctaButtonLink: e.target.value })}
                  placeholder="e.g., /contact"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Live Preview */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-primary via-primary/90 to-gold/80 p-8 text-white">
              <div className="text-center max-w-xl mx-auto">
                <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                  {content.sectionSubtitle}
                </span>
                <h2 className="text-2xl font-bold mb-4">
                  {content.sectionTitle}
                </h2>
                <p className="text-sm text-white/80 mb-6">
                  {content.description}
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
                  {content.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{content.phone}</span>
                    </div>
                  )}
                  {content.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{content.email}</span>
                    </div>
                  )}
                </div>

                {content.ctaButtonText && (
                  <button className="px-6 py-3 bg-white text-primary font-semibold rounded-lg text-sm hover:bg-white/90 transition-colors">
                    {content.ctaButtonText}
                  </button>
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
