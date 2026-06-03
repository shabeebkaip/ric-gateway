import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ArticleCTA() {
  return (
    <div className="glass-card rounded-2xl p-8 border border-gold/20 bg-gradient-to-br from-gold/5 to-primary/5 my-12">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-2">
            Looking for advanced medical equipment for your facility?
          </h3>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            RIC has been supplying Saudi hospitals and healthcare facilities with
            cutting-edge medical solutions since 1985. Our team of specialists will
            help you find the right equipment for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              variant="hero"
              size="default"
              className="bg-gradient-to-r from-gold to-primary hover:from-gold/90 hover:to-primary/90 shadow-md hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 w-fit"
            >
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="heroOutline"
              size="default"
              className="w-fit hover:border-gold/50 hover:text-gold transition-all duration-300"
            >
              <Link href="/products">Browse Our Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
