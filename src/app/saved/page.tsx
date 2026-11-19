'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listing/ListingCard';
import { getFavoriteIds, getListings } from '@/lib/storage';
import { Listing } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, Trash2, ArrowRight } from 'lucide-react';

export default function SavedPage() {
  const { isNepali } = useLanguage();
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const favIds = getFavoriteIds();
    const all = getListings();
    const matching = all.filter((l) => favIds.includes(l.id));
    setSavedListings(matching);
    setIsLoading(false);
  }, []);

  const handleClearAll = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('himal_favorites');
      setSavedListings([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E5E5] gap-4">
          <div>
            <h1 className="font-extrabold text-2xl text-[#0F0F0F] tracking-tight">
              {isNepali ? 'सुरक्षित गरिएका सम्पत्तिहरू' : 'Saved Properties'}
            </h1>
            <p className="text-xs text-[#71717A] mt-1">
              {savedListings.length}{' '}
              {isNepali ? 'सम्पत्तिहरू सुरक्षित छन्' : 'properties bookmarked'}
            </p>
          </div>

          {savedListings.length > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E5E5] text-[#71717A] hover:text-[#0F0F0F] hover:bg-[#F5F5F7] text-xs font-semibold transition-colors self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="rounded-xl bg-white p-3 border border-[#E5E5E5] animate-pulse space-y-3">
                  <div className="aspect-[16/10] bg-[#F5F5F7] rounded-lg"></div>
                  <div className="h-4 bg-[#F5F5F7] rounded w-2/3"></div>
                  <div className="h-3 bg-[#F5F5F7] rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : savedListings.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-[#E5E5E5] max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#F5F5F7] text-[#0F0F0F] mx-auto flex items-center justify-center mb-3">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-[#0F0F0F]">
                {isNepali ? 'अहिलेसम्म कुनै सम्पत्ति सुरक्षित छैन' : 'No Saved Properties Yet'}
              </h3>
              <p className="text-xs text-[#71717A] mt-1.5 leading-relaxed">
                {isNepali
                  ? 'सूची ब्राउज गर्दा मनपर्ने सम्पत्तिको मुटु आइकन थिचेर सुरक्षित गर्नुहोस्।'
                  : 'Click the heart icon on any listing card to bookmark it for fast comparison and viewing later.'}
              </p>
              <Link
                href="/listings"
                className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F0F0F] text-white text-xs font-semibold hover:bg-[#27272A] transition-all"
              >
                <span>{isNepali ? 'सम्पत्तिहरू हेर्नुहोस्' : 'Explore Properties'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {savedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
