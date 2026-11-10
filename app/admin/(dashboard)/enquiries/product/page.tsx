'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Package, Mail, Phone, Building2, Calendar, RefreshCw, Tag, AlertCircle } from 'lucide-react';
import { EnquiryDetailSheet, STATUS_STYLES, type Enquiry, type EnquiryStatus } from '@/components/admin/EnquiryDetailSheet';

const API = '/api/admin/enquiries/product';

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('admin-token');
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

export default function ProductEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  async function load() {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await fetch(API, { headers: authHeaders() });
      if (!res.ok) throw new Error(res.status === 401 ? 'Your session has expired. Please log in again.' : `Server error (${res.status})`);
      const data = await res.json();
      setEnquiries(data.enquiries ?? []);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Could not load enquiries');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: EnquiryStatus, silent = false) {
    setUpdating(id);
    try {
      const res = await fetch(API, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ id, status }) });
      if (!res.ok) throw new Error();
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status } : e));
      if (!silent) toast.success(`Marked as ${status}`);
    } catch {
      toast.error('Could not update status. Please try again.');
    } finally {
      setUpdating(null);
    }
  }

  function openEnquiry(e: Enquiry) {
    setSelectedId(e._id);
    if (e.status === 'new') updateStatus(e._id, 'read', true);
  }

  const selected = enquiries.find(e => e._id === selectedId) ?? null;
  const newCount = enquiries.filter(e => e.status === 'new').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Product Quotation Enquiries</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Quotation requests from product pages
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
          className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Contact
        </Link>
        <Link
          href="/admin/enquiries/product"
          className="px-4 py-2 text-sm font-medium border-b-2 border-primary text-primary"
        >
          <Package className="w-4 h-4 inline mr-2" />
          Product Quotations ({enquiries.length})
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
      ) : loadError ? (
        <Card className="p-12 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-slate-700 mb-4">{loadError}</p>
          <Button variant="outline" size="sm" onClick={load}>Try again</Button>
        </Card>
      ) : enquiries.length === 0 ? (
        <Card className="p-12 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No product enquiries yet.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {enquiries.map(e => (
            <Card
              key={e._id}
              onClick={ev => { if (!(ev.target as HTMLElement).closest('a,button')) openEnquiry(e); }}
              className={`p-5 cursor-pointer transition-shadow hover:shadow-md ${e.status === 'new' ? 'border-blue-200 bg-blue-50/30' : ''}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-2">
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

                  {/* Product info */}
                  <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-1.5 font-medium text-slate-800">
                      <Package className="w-3.5 h-3.5 text-blue-500" />
                      {e.productName}
                    </span>
                    {e.partnerName && (
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <Building2 className="w-3.5 h-3.5" />
                        {e.partnerName}
                      </span>
                    )}
                    {e.category && (
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Tag className="w-3.5 h-3.5" />
                        {e.category}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                    <span className="flex items-center gap-1 min-w-0">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <a href={`mailto:${e.email}`} className="hover:underline break-all">{e.email}</a>
                    </span>
                    {e.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        <a href={`tel:${e.phone.replace(/\s/g, '')}`} className="hover:underline">{e.phone}</a>
                      </span>
                    )}
                    {e.company && (
                      <span className="flex items-center gap-1 min-w-0">
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="break-all">{e.company}</span>
                      </span>
                    )}
                  </div>

                  {e.message && (
                    <p className="text-sm text-slate-700 bg-white border border-slate-100 rounded-lg p-3 leading-relaxed break-words line-clamp-3">
                      {e.message}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" onClick={() => openEnquiry(e)}>
                    View
                  </Button>
                  {e.status !== 'replied' ? (
                    <Button
                      size="sm"
                      disabled={updating === e._id}
                      onClick={() => updateStatus(e._id, 'replied')}
                    >
                      Mark Replied
                    </Button>
                  ) : (
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

      <EnquiryDetailSheet
        enquiry={selected}
        onClose={() => setSelectedId(null)}
        onStatusChange={(id, status) => updateStatus(id, status)}
        updating={updating === selectedId}
      />
    </div>
  );
}
