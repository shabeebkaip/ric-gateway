"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ServiceCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-sky-600">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-light text-white mb-6">
            Need Service or Maintenance?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our expert team is ready to help. Contact us today for immediate
            assistance or to schedule a service visit.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 py-6 bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 text-base font-medium"
            >
              <Link href="/contact">
                <Mail className="w-5 h-5 mr-2" />
                Request Service
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-10 py-6 border-2 border-white text-white hover:bg-white/10 hover:border-white/90 transition-all duration-300 text-base font-medium backdrop-blur-sm"
            >
              <a href="tel:+966114654113">
                <Phone className="w-5 h-5 mr-2" />
                +966 11 465 4113 (Ext. 106)
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-10 py-6 border-2 border-white text-white hover:bg-white/10 hover:border-white/90 transition-all duration-300 text-base font-medium backdrop-blur-sm"
            >
              <a
                href="https://www.google.com/maps/place/RIYADH+INTERNATIONAL+CORPORATION/@24.7166169,46.680542,17z/data=!3m1!4b1!4m6!3m5!1s0x3e2f03048c8ab6cd:0x37200af5e3ccaffc!8m2!3d24.7166169!4d46.6831169!16s%2Fg%2F1tj6fgpd?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Visit Office
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
