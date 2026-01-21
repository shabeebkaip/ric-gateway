'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface MapContent {
  title: string;
  description: string;
  address: {
    title: string;
    companyName: string;
    street: string;
  };
  phone: {
    title: string;
    number: string;
    link: string;
  };
  embedUrl: string;
  mapHeight: number;
}

export default function ContactMapEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<MapContent>({
    title: 'Visit Our Office',
    description: 'Located in the heart of Riyadh, our facility is easily accessible and equipped with the latest medical technology demonstrations.',
    address: {
      title: 'Address',
      companyName: 'Riyadh International Corporation Medical Equipments & Services, Ltd',
      street: 'Kingdom of Saudi Arabia, Riyadh, Orouba street, RIC Complex',
    },
    phone: {
      title: 'Phone',
      number: '+966 50 969 8043',
      link: 'tel:+966509698043',
    },
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.030488341401!2d46.68054207543805!3d24.716616850998157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03048c8ab6cd%3A0x37200af5e3ccaffc!2sRIYADH%20INTERNATIONAL%20CORPORATION!5e1!3m2!1sen!2ssa!4v1767512862403!5m2!1sen!2ssa',
    mapHeight: 450,
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=contact&section=map');
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
        body: JSON.stringify({ page: 'contact', section: 'map', content }),
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
            <h1 className="text-2xl font-bold">Map Section</h1>
            <p className="text-muted-foreground">Contact Page → Map & Location</p>
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Editor Form */}
        <div className="space-y-6">
          {/* Section Header */}
          <Card>
            <CardHeader>
              <CardTitle>Section Header</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          {/* Address Info */}
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Section Title</Label>
                <Input
                  value={content.address.title}
                  onChange={(e) => setContent({ ...content, address: { ...content.address, title: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  value={content.address.companyName}
                  onChange={(e) => setContent({ ...content, address: { ...content.address, companyName: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <Label>Street Address</Label>
                <Textarea
                  value={content.address.street}
                  onChange={(e) => setContent({ ...content, address: { ...content.address, street: e.target.value } })}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Phone Info */}
          <Card>
            <CardHeader>
              <CardTitle>Phone Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Section Title</Label>
                <Input
                  value={content.phone.title}
                  onChange={(e) => setContent({ ...content, phone: { ...content.phone, title: e.target.value } })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    value={content.phone.number}
                    onChange={(e) => setContent({ ...content, phone: { ...content.phone, number: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Link</Label>
                  <Input
                    value={content.phone.link}
                    onChange={(e) => setContent({ ...content, phone: { ...content.phone, link: e.target.value } })}
                    placeholder="tel:+966509698043"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Google Maps Embed</CardTitle>
              <CardDescription>Paste the embed URL from Google Maps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Embed URL</Label>
                <Textarea
                  value={content.embedUrl}
                  onChange={(e) => setContent({ ...content, embedUrl: e.target.value })}
                  rows={4}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
                <p className="text-xs text-muted-foreground">
                  Go to Google Maps → Share → Embed a map → Copy the src URL from the iframe
                </p>
              </div>
              <div className="space-y-2">
                <Label>Map Height (px)</Label>
                <Input
                  type="number"
                  value={content.mapHeight}
                  onChange={(e) => setContent({ ...content, mapHeight: parseInt(e.target.value) })}
                  min={200}
                  max={800}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
          <Card className="overflow-hidden sticky top-6">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See how it will look on the website</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Info Card Preview */}
              <div className="p-6 bg-white border-b">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{content.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{content.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{content.address.title}</p>
                      <p className="text-xs text-gray-600">{content.address.companyName}</p>
                      <p className="text-xs text-gray-600">{content.address.street}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{content.phone.title}</p>
                      <p className="text-xs text-gray-600 hover:text-primary">{content.phone.number}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Preview */}
              <div className="border-4 border-gray-200 m-4 rounded-xl overflow-hidden">
                {content.embedUrl ? (
                  <iframe
                    src={content.embedUrl}
                    width="100%"
                    height={Math.min(content.mapHeight, 300)}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                    Enter a Google Maps embed URL to preview
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
