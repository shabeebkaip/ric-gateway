'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Send, FileText, CheckCircle2 } from 'lucide-react';

interface RequestQuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  productSlug: string;
  category: string;
  partnerName?: string;
}

export function RequestQuoteModal({
  open,
  onOpenChange,
  productName,
  productSlug,
  category,
  partnerName,
}: RequestQuoteModalProps) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiries/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productName,
          productSlug,
          category,
          partnerName,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitted(true);
    } catch (err: any) {
      toast({
        title: 'Something went wrong',
        description: err.message || 'Please try again or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      }, 300);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground">Request Submitted!</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Thank you! Our team will review your request for{' '}
              <span className="font-semibold text-foreground">{productName}</span> and get back
              to you within 24 hours.
            </p>
            <Button
              className="mt-2 bg-gradient-to-r from-gold to-primary"
              onClick={() => handleClose(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-lg leading-tight">Request a Quotation</DialogTitle>
                  <DialogDescription className="text-xs mt-0.5 line-clamp-1">
                    {productName}{partnerName ? ` · ${partnerName}` : ''}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="rq-name">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="rq-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="border-2 focus:border-gold"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rq-company">Company</Label>
                  <Input
                    id="rq-company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Organization"
                    className="border-2 focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="rq-email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="rq-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="border-2 focus:border-gold"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rq-phone">Phone</Label>
                  <Input
                    id="rq-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+966 XX XXX XXXX"
                    className="border-2 focus:border-gold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="rq-message">Additional Notes</Label>
                <Textarea
                  id="rq-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Quantity needed, specific configuration, delivery timeline..."
                  rows={4}
                  className="border-2 focus:border-gold resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 text-white font-semibold h-11"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
