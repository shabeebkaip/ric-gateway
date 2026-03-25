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

export default async function Home() {
  // All three queries run in parallel — DB is hit only on cache miss.
  const [partners, categories, homeContent] = await Promise.all([
    getCachedPartners(),
    getCachedCategories(),
    getCachedHomeContent(),
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
        <CTASection />
      </main>
    </div>
  );
}
