'use client';

import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import CTASection from '@/components/sections/CTA';
import CustomCursor from '@/components/ui/CustomCursor';

export default function HomePage() {
  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Fixed navbar */}
      <Navbar />

      {/* Page content */}
      <main className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />
        <CTASection />
      </main>
    </>
  );
}
