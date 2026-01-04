import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { PartnersSection } from "@/components/PartnersSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { VisionMissionSection } from "@/components/VisionMissionSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <PartnersSection />
        <ServicesSection />
        <AboutSection />
        <VisionMissionSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
