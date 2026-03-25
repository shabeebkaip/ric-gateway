'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Package, Mail, Phone, Building2, Calendar, RefreshCw } from 'lucide-react';

interface ContactEnquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

const STATUS_STYLES = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  read: 'bg-slate-100 text-slate-700 border-slate-200',
  replied: 'bg-green-100 text-green-700 border-green-200',
};

export default function ContactEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  async function load() {
    setIsLoading(true);
    const token = localStorage.getItem('admin-token');
    const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
    const res = await fetch('/api/admin/enquiries/contact', { headers }).catch(() => null);
    if (res?.ok) {
      const data = await res.json();
      setEnquiries(data.enquiries ?? []);
    }
    setIsLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: ContactEnquiry['status']) {
    setUpdating(id);
    const token = localStorage.getItem('admin-token');
    await fetch('/api/admin/enquiries/contact', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({ id, status }),
    });
    setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status } : e));
    setUpdating(null);
  }

  const newCount = enquiries.filter(e => e.status === 'new').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contact Enquiries</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Messages submitted via the Contact page
          </p>
        </div>
        <div className="flex items-center gap-3">
          {newCount > 0 && (
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1">
              {newCount} new
            </Badge>
          )}
          <Button variant="outline" size="sm" onClick={load} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <Link
          href="/admin/enquiries/contact"
          className="px-4 py-2 text-sm font-medium border-b-2 border-primary text-primary"
        >
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Contact ({enquiries.length})
        </Link>
        <Link
          href="/admin/enquiries/product"
          className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <Package className="w-4 h-4 inline mr-2" />
          Product Quotations
        </Link>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="p-5 animate-pulse">
              <div className="h-4 w-48 bg-muted rounded mb-3" />
              <div className="h-3 w-full bg-muted rounded mb-2" />
              <div className="h-3 w-2/3 bg-muted rounded" />
            </Card>
          ))}
        </div>
      ) : enquiries.length === 0 ? (
        <Card className="p-12 text-center">
          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No contact enquiries yet.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {enquiries.map(e => (
            <Card key={e._id} className={`p-5 ${e.status === 'new' ? 'border-blue-200 bg-blue-50/30' : ''}`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-slate-900">{e.name}</span>
                    <Badge className={`text-xs border ${STATUS_STYLES[e.status]}`}>
                      {e.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(e.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      <a href={`mailto:${e.email}`} className="hover:underline">{e.email}</a>
                    </span>
                    {e.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {e.phone}
                      </span>
                    )}
                    {e.company && (
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        {e.company}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 bg-white border border-slate-100 rounded-lg p-3 leading-relaxed">
                    {e.message}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {e.status !== 'read' && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={updating === e._id}
                      onClick={() => updateStatus(e._id, 'read')}
                    >
                      Mark Read
                    </Button>
                  )}
                  {e.status !== 'replied' && (
                    <Button
                      size="sm"
                      disabled={updating === e._id}
                      onClick={() => updateStatus(e._id, 'replied')}
                    >
                      Mark Replied
                    </Button>
                  )}
                  {e.status === 'replied' && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={updating === e._id}
                      onClick={() => updateStatus(e._id, 'new')}
                    >
                      Reopen
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
