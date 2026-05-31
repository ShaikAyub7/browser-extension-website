import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import LiveDemo from "@/components/LiveDemo";
import HowItWorks from "@/components/HowItWorks";
import StatsSection from "@/components/StatsSection";
import ProductivityQuiz from "@/components/ProductivityQuiz";
import TestimonialsSection from "@/components/TestimonialsSection";
import TipsSection from "@/components/TipsSection";
import FAQSection from "@/components/FAQSection";
import InstallSection from "@/components/InstallSection";
import Footer from "@/components/Footer";
import ChangelogStrip from "@/components/Changelogstrip";
import ScrollUtilities from "@/components/Scrollutilities";
import AnnouncementBanner from "@/components/Announcementbanner";
import NewsletterSection from "@/components/Newslettersection";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        {/* <AnnouncementBanner/> */}
        <FeaturesSection />
        <LiveDemo />
        <ChangelogStrip/>
        <HowItWorks />
        <StatsSection />
        <ProductivityQuiz />
        <TestimonialsSection />
        <TipsSection />
        <FAQSection />
        <InstallSection />
        <ScrollUtilities/>
        <NewsletterSection/>
      </main>
      <Footer />
    </>
  );
}
