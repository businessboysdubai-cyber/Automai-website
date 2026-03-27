'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import CTASection from '@/components/sections/CTA';
import CustomCursor from '@/components/ui/CustomCursor';

// Load 3D scene only on client side (no SSR)
const Scene = dynamic(() => import('@/components/canvas/Scene'), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Fixed 3D background canvas */}
      <Scene />

      {/* Fixed navbar */}
      <Navbar />

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
