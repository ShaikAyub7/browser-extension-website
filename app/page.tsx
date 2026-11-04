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
import Marquee from "@/components/Marquee";
import TimeCalculator from "@/components/TimeCalculator";
import Manifesto from "@/components/Manifesto";
import DayTimeline from "@/components/DayTimeline";
import BigWordmark from "@/components/BigWordmark";
import Footer from "@/components/Footer";
import ChangelogStrip from "@/components/Changelogstrip";
import ScrollUtilities from "@/components/Scrollutilities";
import NewsletterSection from "@/components/Newslettersection";
import FocusCommandCenter from "@/components/FocusCommandCenter";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <Marquee />
        <Manifesto />
        <FeaturesSection />
        <TimeCalculator />
        <DayTimeline />
        <FocusCommandCenter />
        <LiveDemo />
        <ChangelogStrip />
        <HowItWorks />
        <StatsSection />
        <ProductivityQuiz />
        <TestimonialsSection />
        <TipsSection />
        <FAQSection />
        <InstallSection />
        <ScrollUtilities />
        <NewsletterSection />
      </main>
      <Footer />
      <BigWordmark />
    </>
  );
}
