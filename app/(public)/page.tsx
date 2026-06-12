import { HeroSection } from "@/components/home/HeroSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ServicesSection } from "@/components/home/ProductCategoriesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { VisionMissionSection } from "@/components/home/VisionMissionSection";
import { CTASection } from "@/components/home/CTASection";
import {
  getCachedPartners,
  getCachedCategories,
  getCachedHomeContent,
} from "@/lib/db/pageData";
import { getContactInfo } from "@/lib/getContactInfo";

export default async function Home() {
  const [partners, categories, homeContent, contactCards] = await Promise.all([
    getCachedPartners(),
    getCachedCategories(),
    getCachedHomeContent(),
    getContactInfo(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection
          content={homeContent.hero as any}
          partnerCount={partners.length}
        />
        <PartnersSection partners={partners as any} />
        <ServicesSection categories={categories as any} partners={partners as any} />
        <AboutSection content={homeContent.about as any} />
        <VisionMissionSection content={homeContent["vision-mission"] as any} />
        <CTASection contactCards={contactCards} />
      </main>
    </div>
  );
}
