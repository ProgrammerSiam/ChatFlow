import Navbar from '@/shared/Navbar';
import Footer from '@/shared/Footer';
import HeroSection from '@/sections/HeroSection';
import LiveDemoSection from '@/sections/LiveDemoSection';
import FeatureBentoGrid from '@/sections/FeatureBentoGrid';
import HowItWorksSection from '@/sections/HowItWorksSection';
import TechStackStrip from '@/sections/TechStackStrip';
import CtaSection from '@/sections/CtaSection';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <LiveDemoSection />
        <FeatureBentoGrid />
        <HowItWorksSection />
        <TechStackStrip />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
