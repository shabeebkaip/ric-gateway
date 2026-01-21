'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Step {
  id: string;
  step: string;
  title: string;
  description: string;
}

interface ProcessContent {
  title: string;
  description: string;
  steps: Step[];
}

export default function ServicesProcessEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ProcessContent>({
    title: 'Our Service Process',
    description: 'From consultation to ongoing support.',
    steps: [],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content?page=services&section=process');
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
        body: JSON.stringify({ page: 'services', section: 'process', content }),
      });
      router.refresh();
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  const addStep = () => {
    const stepNumber = (content.steps.length + 1).toString().padStart(2, '0');
    setContent({
      ...content,
      steps: [...content.steps, { id: Date.now().toString(), step: stepNumber, title: 'New Step', description: '' }],
    });
  };

  const removeStep = (id: string) => {
    const filtered = content.steps.filter(s => s.id !== id);
    // Re-number steps
    const renumbered = filtered.map((s, i) => ({ ...s, step: (i + 1).toString().padStart(2, '0') }));
    setContent({ ...content, steps: renumbered });
  };

  const updateStep = (id: string, field: string, value: string) => {
    setContent({
      ...content,
      steps: content.steps.map(s => (s.id === id ? { ...s, [field]: value } : s)),
    });
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
            <h1 className="text-2xl font-bold">Service Process</h1>
            <p className="text-muted-foreground">Services Page → Process Section</p>
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
            <CardHeader><CardTitle>Section Header</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={content.description} onChange={(e) => setContent({ ...content, description: e.target.value })} rows={2} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Process Steps</CardTitle>
                <Button onClick={addStep} size="sm" variant="outline"><Plus className="h-4 w-4 mr-1" />Add Step</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
              {content.steps.map((step, index) => (
                <Card key={step.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold">{step.step}</span>
                      <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeStep(step.id)} className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Title</Label>
                      <Input value={step.title} onChange={(e) => updateStep(step.id, 'title', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Description</Label>
                      <Textarea value={step.description} onChange={(e) => updateStep(step.id, 'description', e.target.value)} rows={2} />
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden sticky top-6 h-fit">
          <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="bg-slate-50 p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-light text-slate-900 mb-2">{content.title}</h2>
                <p className="text-sm text-slate-600">{content.description}</p>
              </div>
              <div className="space-y-4">
                {content.steps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {step.step}
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-sm font-medium text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-xs text-slate-600">{step.description}</p>
                    </div>
                    {index < content.steps.length - 1 && (
                      <div className="absolute left-[1.25rem] mt-10 w-0.5 h-4 bg-blue-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
