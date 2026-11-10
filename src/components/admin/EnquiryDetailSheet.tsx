'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Building2, Calendar, Package, Tag, Reply } from 'lucide-react';

export type EnquiryStatus = 'new' | 'read' | 'replied';

export interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt?: string;
  // Product quotation only
  productName?: string;
  productSlug?: string;
  category?: string;
  partnerName?: string;
}

export const STATUS_STYLES: Record<EnquiryStatus, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  read: 'bg-slate-100 text-slate-700 border-slate-200',
  replied: 'bg-green-100 text-green-700 border-green-200',
};

interface Props {
  enquiry: Enquiry | null;
  onClose: () => void;
  onStatusChange: (id: string, status: EnquiryStatus) => void;
  updating: boolean;
}

function Row({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <Icon className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm text-slate-900 break-words">{children}</div>
      </div>
    </div>
  );
}

export function EnquiryDetailSheet({ enquiry: e, onClose, onStatusChange, updating }: Props) {
  const replySubject = e
    ? encodeURIComponent(e.productName ? `Re: Quotation request – ${e.productName}` : 'Re: Your enquiry to RIC')
    : '';

  return (
    <Sheet open={!!e} onOpenChange={open => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        {e && (
          <div className="space-y-6">
            <SheetHeader className="text-left space-y-2">
              <div className="flex items-center gap-2 flex-wrap pr-6">
                <SheetTitle className="text-xl">{e.name}</SheetTitle>
                <Badge className={`text-xs border ${STATUS_STYLES[e.status]}`}>{e.status}</Badge>
              </div>
              <SheetDescription className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Received {new Date(e.createdAt).toLocaleString()}
              </SheetDescription>
            </SheetHeader>

            {e.productName && (
              <div className="rounded-lg border bg-slate-50 p-4 space-y-3">
                <Row icon={Package} label="Product">
                  <span className="font-medium">{e.productName}</span>
                  {e.productSlug && <span className="block text-xs text-muted-foreground">ID: {e.productSlug}</span>}
                </Row>
                {e.partnerName && <Row icon={Building2} label="Brand / Partner">{e.partnerName}</Row>}
                {e.category && <Row icon={Tag} label="Category">{e.category}</Row>}
              </div>
            )}

            <div className="space-y-3">
              <Row icon={Mail} label="Email">
                <a href={`mailto:${e.email}`} className="hover:underline">{e.email}</a>
              </Row>
              {e.phone && (
                <Row icon={Phone} label="Phone">
                  <a href={`tel:${e.phone.replace(/\s/g, '')}`} className="hover:underline">{e.phone}</a>
                </Row>
              )}
              {e.company && <Row icon={Building2} label="Company">{e.company}</Row>}
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1.5">Message</div>
              <p className="text-sm text-slate-800 bg-white border rounded-lg p-4 leading-relaxed whitespace-pre-wrap break-words">
                {e.message?.trim() || <span className="italic text-muted-foreground">No message provided.</span>}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <Button asChild size="sm">
                <a href={`mailto:${e.email}?subject=${replySubject}`}>
                  <Reply className="w-4 h-4 mr-2" />
                  Reply by email
                </a>
              </Button>
              {e.status !== 'replied' && (
                <Button size="sm" variant="outline" disabled={updating} onClick={() => onStatusChange(e._id, 'replied')}>
                  Mark Replied
                </Button>
              )}
              {e.status !== 'new' && (
                <Button size="sm" variant="outline" disabled={updating} onClick={() => onStatusChange(e._id, 'new')}>
                  Mark Unread
                </Button>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
