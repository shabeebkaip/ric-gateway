'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, Plus, Trash2, MapPin, Phone, Printer, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ContactCard {
  id: string;
  icon: string;
  title: string;
  details: string[];
  link: string | null;
  color: string;
}

interface ContactInfoContent {
  cards: ContactCard[];
}

const iconOptions = [
  { value: 'MapPin', label: 'Location', icon: MapPin },
  { value: 'Phone', label: 'Phone', icon: Phone },
  { value: 'Printer', label: 'Fax', icon: Printer },
  { value: 'Mail', label: 'Email', icon: Mail },
  { value: 'Clock', label: 'Hours', icon: Clock },
];

const colorOptions = [
  { value: 'text-primary', label: 'Primary (Teal)' },
  { value: 'text-gold', label: 'Gold' },
  { value: 'text-accent', label: 'Accent' },
];

const getIconComponent = (iconName: string) => {
  const option = iconOptions.find(o => o.value === iconName);
  return option?.icon || MapPin;
};

export default function ContactInfoEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ContactInfoContent>({
    cards: [
      { id: '1', icon: 'MapPin', title: 'Visit Us', details: ['PM8M+J6X, Oruba Road, As Sulimaniyah, Riyadh 11411, Saudi Arabia'], link: 'https://maps.google.com', color: 'text-primary' },
      { id: '2', icon: 'Phone', title: 'Call Us', details: ['+966 50 969 8043'], link: 'tel:+966509698043', color: 'text-gold' },
      { id: '3', icon: 'Printer', title: 'Fax', details: ['+966 11 463 0135'], link: null, color: 'text-accent' },
      { id: '4', icon: 'Mail', title: 'Email Us', details: ['ricmede@ricmedical.com.sa'], link: 'mailto:ricmede@ricmedical.com.sa', color: 'text-primary' },
      { id: '5', icon: 'Clock', title: 'Working Hours', details: ['Sunday - Thursday', '8:00 AM - 5:00 PM'], link: null, color: 'text-gold' },
    ],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=contact&section=info');
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
        body: JSON.stringify({ page: 'contact', section: 'info', content }),
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

  const addCard = () => {
    setContent({
      cards: [...content.cards, { id: Date.now().toString(), icon: 'Phone', title: 'New Card', details: ['Detail 1'], link: null, color: 'text-primary' }],
    });
  };

  const removeCard = (id: string) => {
    setContent({ cards: content.cards.filter(c => c.id !== id) });
  };

  const updateCard = (id: string, field: keyof ContactCard, value: any) => {
    setContent({
      cards: content.cards.map(c => (c.id === id ? { ...c, [field]: value } : c)),
    });
  };

  const addDetail = (cardId: string) => {
    setContent({
      cards: content.cards.map(c => (c.id === cardId ? { ...c, details: [...c.details, ''] } : c)),
    });
  };

  const updateDetail = (cardId: string, index: number, value: string) => {
    setContent({
      cards: content.cards.map(c => {
        if (c.id === cardId) {
          const newDetails = [...c.details];
          newDetails[index] = value;
          return { ...c, details: newDetails };
        }
        return c;
      }),
    });
  };

  const removeDetail = (cardId: string, index: number) => {
    setContent({
      cards: content.cards.map(c => {
        if (c.id === cardId) {
          return { ...c, details: c.details.filter((_, i) => i !== index) };
        }
        return c;
      }),
    });
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
            <h1 className="text-2xl font-bold">Contact Info Cards</h1>
            <p className="text-muted-foreground">Contact Page → Contact Information</p>
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
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Contact Cards</CardTitle>
                <CardDescription>Edit the contact information cards</CardDescription>
              </div>
              <Button onClick={addCard} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Card
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
            {content.cards.map((card, index) => (
              <Card key={card.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-muted-foreground">Card {index + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => removeCard(card.id)} className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Icon</Label>
                      <Select value={card.icon} onValueChange={(v) => updateCard(card.id, 'icon', v)}>
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
                      <Label className="text-xs">Title</Label>
                      <Input
                        value={card.title}
                        onChange={(e) => updateCard(card.id, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Color</Label>
                      <Select value={card.color} onValueChange={(v) => updateCard(card.id, 'color', v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {colorOptions.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-xs">Link URL (optional)</Label>
                    <Input
                      value={card.link || ''}
                      onChange={(e) => updateCard(card.id, 'link', e.target.value || null)}
                      placeholder="https://... or tel:... or mailto:..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Details</Label>
                      <Button variant="ghost" size="sm" onClick={() => addDetail(card.id)} className="h-6 text-xs">
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                    {card.details.map((detail, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <Input
                          value={detail}
                          onChange={(e) => updateDetail(card.id, i, e.target.value)}
                          className="flex-1 h-8 text-sm"
                        />
                        <Button variant="ghost" size="icon" onClick={() => removeDetail(card.id, i)} className="h-6 w-6 text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>See how it will look on the website</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="bg-white p-6">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {content.cards.map((card) => {
                  const IconComponent = getIconComponent(card.icon);
                  return (
                    <div
                      key={card.id}
                      className="rounded-xl p-4 bg-white border border-gray-200 hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/10 to-primary/10 flex items-center justify-center mb-3">
                        <IconComponent className={`w-5 h-5 ${card.color}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-2">{card.title}</h3>
                      <div className="space-y-0.5">
                        {card.details.map((detail, i) => (
                          <p key={i} className="text-xs text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
