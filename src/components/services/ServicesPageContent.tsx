"use client";

import {
  ServiceHero,
  ServicePartners,
  ServiceOfferings,
  WhyChooseUs,
  ServiceProcess,
  ServiceCTA,
} from "./index";

export function ServicesPageContent() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <ServiceHero />
      <ServicePartners />
      <ServiceOfferings />
      <WhyChooseUs />
      <ServiceProcess />
      <ServiceCTA />
    </div>
  );
}
