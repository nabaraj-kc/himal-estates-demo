'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listing/ListingCard';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { getListings, getFavoriteIds } from '@/lib/storage';
import { Listing } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, Search, ArrowRight, Trash2 } from 'lucide-react';

export default function SavedPropertiesPage() {
  const { isNepali } = useLanguage();
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSaved = () => {
    const favIds = getFavoriteIds();
    const all = getListings();
    const matched = all.filter((l) => favIds.includes(l.id));
    setSavedListings(matched);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSaved();
    window.addEventListener('himal_favorites_changed', loadSaved);
    return () => window.removeEventListener('himal_favorites_changed', loadSaved);
  }, []);

  const handleClearAll = () => {
    if (confirm('Clear all saved properties?')) {
      localStorage.setItem('himal_estates_favorites_v1', JSON.stringify([]));
      window.dispatchEvent(new CustomEvent('himal_favorites_changed', { detail: [] }));
      setSavedListings([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
              <Heart className="w-3.5 h-3.5 fill-rose-600" />
              <span>{isNepali ? 'तपाईंको संग्रह' : 'Saved Collection'}</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
              {isNepali ? 'सुरक्षित गरिएका सम्पत्तिहरू' : 'Saved Properties'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {savedListings.length}{' '}
              {isNepali ? 'सम्पत्तिहरू सुरक्षित छन्' : 'properties saved in this browser'}
            </p>
          </div>

          {savedListings.length > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-2xl bg-white p-4 border border-slate-200 animate-pulse space-y-3">
                  <div className="aspect-[16/10] bg-slate-200 rounded-xl"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : savedListings.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                {isNepali ? 'अहिलेसम्म कुनै सम्पत्ति सुरक्षित छैन' : 'No Saved Properties Yet'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                {isNepali
                  ? 'सूची ब्राउज गर्दा मनपर्ने सम्पत्तिको मुटु आइकन थिचेर सुरक्षित गर्नुहोस्।'
                  : 'Click the heart icon on any listing card to bookmark it for fast comparison and viewing later.'}
              </p>
              <Link
                href="/listings"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 transition-all shadow-sm"
              >
                <span>{isNepali ? 'सम्पत्तिहरू हेर्नुहोस्' : 'Explore Properties'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {savedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
