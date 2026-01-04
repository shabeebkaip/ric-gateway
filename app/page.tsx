import { HeroSection } from "@/components/home/HeroSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { VisionMissionSection } from "@/components/VisionMissionSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <PartnersSection />
        <ServicesSection />
        <AboutSection />
        <VisionMissionSection />
        <CTASection />
      </main>
    </div>
  );
}
