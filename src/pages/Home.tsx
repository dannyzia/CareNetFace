import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import Stats from '@/sections/Stats';
import ValueProposition from '@/sections/ValueProposition';
import TargetAudience from '@/sections/TargetAudience';
import Testimonials from '@/sections/Testimonials';
import TrustSafety from '@/sections/TrustSafety';
import FooterCTA from '@/sections/FooterCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ValueProposition />
        <TargetAudience />
        <Testimonials />
        <TrustSafety />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
}
