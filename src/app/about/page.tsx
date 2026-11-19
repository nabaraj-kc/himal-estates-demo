'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { brand } from '@/config/brand';
import { ShieldCheck, TrendingUp, Users } from 'lucide-react';

export default function AboutPage() {
  const { isNepali } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white w-full max-w-full overflow-x-hidden">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 min-w-0">
        {/* Hero Section */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="font-extrabold text-2xl sm:text-4xl text-[#0F0F0F] tracking-tight">
            {isNepali ? 'हाम्रो कथा' : 'About Himal Estates'}
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#71717A] leading-relaxed">
            {isNepali
              ? 'हामी प्रत्येक सूचीको स्थलगत निरीक्षण र लालपुर्जा प्रमाणिकरण गरेर वास्तविक खरीददारहरूसँग जोड्दछौं।'
              : "Nepal's trusted real estate & business marketplace. We physically verify properties, check title deeds, and connect serious buyers with owners."}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
            <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] flex items-center justify-center mb-4 border border-[#E5E5E5]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0F0F0F] mb-1.5">
              100% Verified Listings
            </h3>
            <p className="text-xs text-[#71717A] leading-relaxed">
              Every house, flat, land parcel, and running business is physically visited. We verify boundary lines, road access, and legal ownership before listing.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
            <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] flex items-center justify-center mb-4 border border-[#E5E5E5]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0F0F0F] mb-1.5">
              Transparent Middleman Rate
            </h3>
            <p className="text-xs text-[#71717A] leading-relaxed">
              No hidden broker fees or inflated prices. We operate on a standard, fair 2% transaction commission upon successful deal completion at the land registry.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
            <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] flex items-center justify-center mb-4 border border-[#E5E5E5]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0F0F0F] mb-1.5">
              Market Outreach
            </h3>
            <p className="text-xs text-[#71717A] leading-relaxed">
              With thousands of verified buyers and tenants, we package listings into professional flyers and high-conversion listings.
            </p>
          </div>
        </div>

        {/* Agency Leadership & Headquarters */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E5E5] max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-[#0F0F0F] text-white font-bold text-2xl flex items-center justify-center flex-shrink-0">
            HE
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h2 className="font-bold text-lg text-[#0F0F0F]">
              Himal Estates Advisory Team
            </h2>
            <p className="text-xs text-[#71717A] leading-relaxed">
              Operating out of Kathmandu Valley, covering Lalitpur (Jhamsikhel, Sanepa, Imadol), Kathmandu (Baneshwor, Lazimpat, Budhanilkantha), Bhaktapur, and Pokhara.
            </p>
            <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-medium text-[#71717A]">
              <span>Office: {brand.address}</span>
              <span>•</span>
              <span>Phone: {brand.phone}</span>
              <span>•</span>
              <span>Email: {brand.email}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
