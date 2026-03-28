'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import CTASection from '@/components/sections/CTA';
import CustomCursor from '@/components/ui/CustomCursor';

// Robot 3D scene — client-only, no SSR (uses WebGL)
const RobotScene = dynamic(() => import('@/components/canvas/RobotScene'), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Fixed navbar */}
      <Navbar />

      {/* Robot 3D scene — right half of viewport, homepage only */}
      <RobotScene />

      {/* Page content — sits above canvas */}
      <main className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />
        <CTASection />
      </main>
    </>
  );
}
