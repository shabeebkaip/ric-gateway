import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { PartnersSection } from "@/components/PartnersSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { VisionMissionSection } from "@/components/VisionMissionSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

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
          <HeroSection />
          <PartnersSection />
          <ServicesSection />
          <AboutSection />
          <VisionMissionSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Index;
