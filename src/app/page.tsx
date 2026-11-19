'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomeTopBar } from '@/components/home/HomeTopBar';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { HotDeals } from '@/components/home/HotDeals';
import { CategoryGrid } from '@/components/home/CategoryGrid';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* 1. Compact Sticky Top Header with Search */}
      <Navbar />

      {/* 2. Top Horizontal Scrollable Filter Bar (All, For Rent, For Sale, Land, Businesses) */}
      <HomeTopBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <main className="flex-1">
        {/* 3. Featured / Trending Properties (Dense 2-col mobile / 4-col desktop grid) */}
        <FeaturedListings filter={activeFilter} />

        {/* 4. Hot Deals / Latest Uploads (Dense 2-col mobile / 4-col desktop grid) */}
        <HotDeals filter={activeFilter} />

        {/* 5. Categories BELOW Properties (Flat, compact icon-and-label grid) */}
        <CategoryGrid />
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
