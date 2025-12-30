import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import FeaturedWorkers from '../components/home/FeaturedWorkers';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <FeaturedWorkers />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}