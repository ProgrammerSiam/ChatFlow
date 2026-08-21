import Navbar from '@/shared/Navbar';
import Footer from '@/shared/Footer';
import HeroSection from '@/sections/HeroSection';
import IntuitiveChatFeatures from '@/sections/IntuitiveChatFeatures';
import LiveDemoSection from '@/sections/LiveDemoSection';
import HowItWorksSection from '@/sections/HowItWorksSection';
import FaqSection from '@/sections/FaqSection';
import CallToActionSection from '@/sections/CallToActionSection';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <IntuitiveChatFeatures />
        <LiveDemoSection />
        <HowItWorksSection />
        <FaqSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
