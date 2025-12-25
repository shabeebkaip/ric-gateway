import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
// Alternative Hero Section Designs - Uncomment to use:
// import { HeroSectionAlt } from "@/components/HeroSectionAlt";
// import { HeroSectionMinimal } from "@/components/HeroSectionMinimal";
import { PartnersSection } from "@/components/PartnersSection";
// Alternative Partners Section Designs - Uncomment to use:
// import { PartnersSectionCarousel } from "@/components/PartnersSectionCarousel";
// import { PartnersSectionMinimal } from "@/components/PartnersSectionMinimal";
import { ServicesSection } from "@/components/ServicesSection";
// Alternative Services Section Designs - Uncomment to use:
// import { ServicesSectionTabs } from "@/components/ServicesSectionTabs";
// import { ServicesSectionMinimal } from "@/components/ServicesSectionMinimal";
import { AboutSection } from "@/components/AboutSection";
import { VisionMissionSection } from "@/components/VisionMissionSection";
import { CTASection } from "@/components/CTASection";
// Alternative Contact Section Designs - Uncomment to use:
// import { CTASectionSplit } from "@/components/CTASectionSplit";
// import { CTASectionCentered } from "@/components/CTASectionCentered";
import { Footer } from "@/components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { HeroSectionAlt } from "@/components/HeroSectionAlt";
import { HeroSectionMinimal } from "@/components/HeroSectionMinimal";
import { PartnersSectionMinimal } from "@/components/PartnersSectionMinimal";
import { PartnersSectionCarousel } from "@/components/PartnersSectionCarousel";
import { ServicesSectionTabs } from "@/components/ServicesSectionTabs";
import { ServicesSectionMinimal } from "@/components/ServicesSectionMinimal";
import { CTASectionSplit } from "@/components/CTASectionSplit";
import { CTASectionCentered } from "@/components/CTASectionCentered";

const Index = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>RIC - Riyadh International Corporation | Medical Equipment & Healthcare Solutions</title>
        <meta name="description" content="Leading provider of advanced medical equipment and healthcare solutions in Saudi Arabia since 1985. Cancer treatment, urology, medical imaging, and disposables." />
        <meta name="keywords" content="medical equipment, healthcare solutions, Saudi Arabia, cancer treatment, urology, medical imaging, RIC" />
        <meta property="og:title" content="RIC - Riyadh International Corporation | Medical Equipment & Healthcare Solutions" />
        <meta property="og:description" content="Leading provider of advanced medical equipment and healthcare solutions in Saudi Arabia since 1985." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://ric.com.sa" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          {/* Original Hero - Current design with circular animation */}
          <HeroSection />
          
          {/* Alternative Option 1: Modern Card Grid Layout 
              Uncomment below and comment out HeroSection above to use */}
          {/* <HeroSectionAlt /> */}
          
          {/* Alternative Option 2: Minimal Centered Design 
              Uncomment below and comment out HeroSection above to use */}
          {/* <HeroSectionMinimal /> */}
          
          {/* Original Partners - Card grid with hover effects */}
          <PartnersSection />
          
          {/* Alternative Option 1: Carousel Style with Featured Partners 
              Uncomment below and comment out PartnersSection above to use */}
          {/* <PartnersSectionCarousel /> */}
          
          {/* Alternative Option 2: Minimal Logo Wall 
              Uncomment below and comment out PartnersSection above to use */}
          {/* <PartnersSectionMinimal /> */}
          
          {/* Original Services - 2x2 Card Grid */}
          <ServicesSection />
          
          {/* Alternative Option 1: Interactive Tabs with Features 
              Uncomment below and comment out ServicesSection above to use */}
          {/* <ServicesSectionTabs /> */}
          
          {/* Alternative Option 2: Horizontal Timeline Layout 
              Uncomment below and comment out ServicesSection above to use */}
          {/* <ServicesSectionMinimal /> */}
          
          <AboutSection />
          <VisionMissionSection />
          
          {/* Original Contact - Form with sidebar cards */}
          <CTASection />
          
          {/* Alternative Option 1: Split Screen with Gradient 
              Uncomment below and comment out CTASection above to use */}
          {/* <CTASectionSplit /> */}
          
          {/* Alternative Option 2: Centered Form with Contact Cards 
              Uncomment below and comment out CTASection above to use */}
            {/* <CTASectionCentered /> */}
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Index;
