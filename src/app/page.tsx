import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import MechanismSection from "@/components/MechanismSection";
import VideoSection from "@/components/VideoSection";
import CompatibilitySection from "@/components/CompatibilitySection";
import ShimmingSection from "@/components/ShimmingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ShopSection from "@/components/ShopSection";
import DealerSection from "@/components/DealerSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <MechanismSection />
        <VideoSection />
        <CompatibilitySection />
        <ShimmingSection />
        <TestimonialsSection />
        <ShopSection />
        <DealerSection />
      </main>
      <Footer />
    </>
  );
}
