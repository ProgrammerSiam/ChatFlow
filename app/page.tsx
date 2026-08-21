import Navbar from '@/shared/Navbar';
import Footer from '@/shared/Footer';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import IntuitiveChatFeatures from '@/sections/IntuitiveChatFeatures';
import LiveDemoSection from '@/sections/LiveDemoSection';
import HowItWorksSection from '@/sections/HowItWorksSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import FaqSection from '@/sections/FaqSection';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <IntuitiveChatFeatures />
        <LiveDemoSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
