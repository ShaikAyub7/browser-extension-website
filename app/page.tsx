import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import InstallSection from "@/components/InstallSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <HeroSection />

        {/* ── Ad: Below hero (leaderboard 728×90 or responsive) ── */}
        <div className="max-w-4xl mx-auto px-6 py-4">
          {/* <AdSlot
            slot="1234567890"
            format="horizontal"
            style={{ minHeight: 90, width: "100%" }}
          /> */}
        </div>

        {/* ── Features ── */}
        <FeaturesSection />

        {/* ── Ad: Mid-page rectangle ── */}
        <div className="max-w-lg mx-auto px-6 py-4">
          {/* <AdSlot
            slot="0987654321"
            format="rectangle"
            style={{ minHeight: 250 }}
          /> */}
        </div>

        {/* ── How It Works ── */}
        <HowItWorks />

        {/* ── Stats ── */}
        <StatsSection />

        {/* ── Ad: Between stats and testimonials ── */}
        <div className="max-w-4xl mx-auto px-6 py-4">
          {/* <AdSlot
            slot="1122334455"
            format="horizontal"
            style={{ minHeight: 90, width: "100%" }}
          /> */}
        </div>

        {/* ── Testimonials ── */}
        <TestimonialsSection />

        {/* ── FAQ ── */}
        <FAQSection />

        {/* ── Ad: Above CTA ── */}
        <div className="max-w-lg mx-auto px-6 py-4">
          {/* <AdSlot
            slot="5544332211"
            format="rectangle"
            style={{ minHeight: 250 }}
          /> */}
        </div>

        {/* ── Install / CTA ── */}
        <InstallSection />
      </main>

      <Footer />
    </>
  );
}
