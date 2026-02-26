import React from 'react';
import Header from './Header';
import Hero from './Hero';
import WheelSection from './WheelSection';
import HowItWorks from './HowItWorks';
import CategoryShowcase from './CategoryShowcase';
import LibraryPreview from './LibraryPreview';
import Footer from './Footer';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16 md:pt-20">
        <Hero />
        <HowItWorks />
        <WheelSection />
        <CategoryShowcase />
        <LibraryPreview />
      </main>
      <Footer />
    </div>
  );
}
