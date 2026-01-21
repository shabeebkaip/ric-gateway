'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, Plus, Trash2, Send, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  rows?: number;
}

interface FormContent {
  title: string;
  description: string;
  submitButtonText: string;
  successMessage: {
    title: string;
    description: string;
  };
  fields: FormField[];
}

const fieldTypes = [
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
  { value: 'tel', label: 'Phone' },
  { value: 'textarea', label: 'Text Area' },
];

export default function ContactFormEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<FormContent>({
    title: 'Send Us a Message',
    description: 'Fill out the form below and our team will get back to you as soon as possible.',
    submitButtonText: 'Send Message',
    successMessage: {
      title: 'Message sent successfully!',
      description: "We'll get back to you within 24 hours.",
    },
    fields: [
      { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
      { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true },
      { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+966 XX XXX XXXX', required: false },
      { id: 'company', label: 'Company/Organization', type: 'text', placeholder: 'Your Company Name', required: false },
      { id: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell us about your inquiry...', required: true, rows: 6 },
    ],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=contact&section=form');
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
        body: JSON.stringify({ page: 'contact', section: 'form', content }),
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

  const addField = () => {
    setContent({
      ...content,
      fields: [...content.fields, { id: `field-${Date.now()}`, label: 'New Field', type: 'text', placeholder: '', required: false }],
    });
  };

  const removeField = (id: string) => {
    setContent({ ...content, fields: content.fields.filter(f => f.id !== id) });
  };

  const updateField = (id: string, field: keyof FormField, value: any) => {
    setContent({
      ...content,
      fields: content.fields.map(f => (f.id === id ? { ...f, [field]: value } : f)),
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
            <h1 className="text-2xl font-bold">Contact Form Settings</h1>
            <p className="text-muted-foreground">Contact Page → Form Section</p>
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
          {/* Header Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Form Header</CardTitle>
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
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="submitButtonText">Submit Button Text</Label>
                <Input
                  id="submitButtonText"
                  value={content.submitButtonText}
                  onChange={(e) => setContent({ ...content, submitButtonText: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Success Message */}
          <Card>
            <CardHeader>
              <CardTitle>Success Message</CardTitle>
              <CardDescription>Shown after form submission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={content.successMessage.title}
                  onChange={(e) => setContent({ ...content, successMessage: { ...content.successMessage, title: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={content.successMessage.description}
                  onChange={(e) => setContent({ ...content, successMessage: { ...content.successMessage, description: e.target.value } })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Fields */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Form Fields</CardTitle>
                  <CardDescription>Configure the form fields</CardDescription>
                </div>
                <Button onClick={addField} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Field
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
              {content.fields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Field {index + 1}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeField(field.id)} className="h-8 w-8 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Label</Label>
                        <Input
                          value={field.label}
                          onChange={(e) => updateField(field.id, 'label', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Type</Label>
                        <Select value={field.type} onValueChange={(v) => updateField(field.id, 'type', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fieldTypes.map(t => (
                              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Placeholder</Label>
                      <Input
                        value={field.placeholder}
                        onChange={(e) => updateField(field.id, 'placeholder', e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.required}
                        onCheckedChange={(v) => updateField(field.id, 'required', v)}
                      />
                      <Label className="text-xs">Required field</Label>
                    </div>
                    {field.type === 'textarea' && (
                      <div className="space-y-1">
                        <Label className="text-xs">Rows</Label>
                        <Input
                          type="number"
                          value={field.rows || 4}
                          onChange={(e) => updateField(field.id, 'rows', parseInt(e.target.value))}
                          min={2}
                          max={10}
                        />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Live Preview */}
        <Card className="overflow-hidden sticky top-6 h-fit">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>See how it will look on the website</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="bg-white p-6 border rounded-lg m-4">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{content.title}</h2>
                <p className="text-sm text-gray-600">{content.description}</p>
              </div>
              
              <div className="space-y-4">
                {content.fields.map((field) => (
                  <div key={field.id} className="space-y-1">
                    <Label className="text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        placeholder={field.placeholder}
                        rows={field.rows || 4}
                        className="border-2"
                        disabled
                      />
                    ) : (
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="border-2"
                        disabled
                      />
                    )}
                  </div>
                ))}
                
                <Button className="w-full bg-gradient-to-r from-amber-500 to-primary text-white" disabled>
                  <Send className="h-4 w-4 mr-2" />
                  {content.submitButtonText}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
