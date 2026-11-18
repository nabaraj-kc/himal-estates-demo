'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { HotDeals } from '@/components/home/HotDeals';
import { HowItWorks } from '@/components/home/HowItWorks';
import { TrustSection } from '@/components/home/TrustSection';
import { ListPropertyCTA } from '@/components/home/ListPropertyCTA';
import { ChatWidget } from '@/components/chat/ChatWidget';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero with multi-tab search & trust metrics */}
        <Hero />

        {/* 2. Visual Category Tiles */}
        <CategoryGrid />

        {/* 3. Featured Properties Handpicked by Experts */}
        <FeaturedListings />

        {/* 4. Hot Deals & Price Drops */}
        <HotDeals />

        {/* 5. How It Works (3 Steps for Verified Closing) */}
        <HowItWorks />

        {/* 6. Why Himal Estates Beats Social Media Alone */}
        <TrustSection />

        {/* 7. List Your Property Call To Action */}
        <ListPropertyCTA />
      </main>

      <Footer />

      {/* Floating Chat & Call Widget */}
      <ChatWidget />
    </div>
  );
}
