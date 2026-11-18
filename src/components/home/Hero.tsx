'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  Search,
  MapPin,
  Home,
  Building2,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export function Hero() {
  const router = useRouter();
  const { t, isNepali } = useLanguage();

  const [activeTab, setActiveTab] = useState<'all' | 'rent' | 'sale' | 'business'>('all');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('all');
  const [budget, setBudget] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (activeTab !== 'all') {
      if (activeTab === 'business') {
        params.set('category', 'business');
      } else {
        params.set('type', activeTab);
      }
    }

    if (category !== 'all') {
      params.set('category', category);
    }

    if (location.trim()) {
      params.set('location', location.trim());
    }

    if (budget !== 'all') {
      params.set('budget', budget);
    }

    router.push(`/listings?${params.toString()}`);
  };

  const quickSearches = [
    { label: isNepali ? 'झम्सिखेल ३ बीएचके' : 'Jhamsikhel 3BHK', query: 'location=Jhamsikhel&category=apartment' },
    { label: isNepali ? 'इमाडोल ४ आना जग्गा' : 'Imadol 4 Aana Land', query: 'location=Imadol&category=land' },
    { label: isNepali ? 'बानेश्वर फ्ल्याट' : 'Baneshwor Flat', query: 'location=Baneshwor&type=rent' },
    { label: isNepali ? 'पोखरा लेकसाइड भिल्ला' : 'Pokhara Lakeside', query: 'location=Pokhara' },
    { label: isNepali ? 'न्यूरोड सटर' : 'New Road Shop', query: 'location=New Road&category=shop' },
  ];

  return (
    <section className="relative w-full pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden bg-gradient-to-b from-teal-50/70 via-slate-50/50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800">
      {/* Decorative Himalayan Contour Background Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06] flex items-end justify-center">
        <svg viewBox="0 0 1440 400" fill="none" className="w-full h-auto">
          <path d="M0 320L180 200L360 280L540 140L720 240L900 110L1080 220L1260 160L1440 260V400H0V320Z" fill="currentColor" />
          <path d="M0 360L240 280L480 340L720 220L960 300L1200 240L1440 320V400H0V360Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs sm:text-sm font-semibold shadow-sm">
            <Sparkles className="w-4 h-4 text-orange-600 animate-spin-slow" />
            <span>
              {isNepali
                ? 'नेपालको विश्वसनीय सम्पत्ति तथा व्यवसाय बजार • १००% प्रमाणित सूचीहरू'
                : "Nepal's Curated Property & Business Marketplace • 100% Verified"}
            </span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            {isNepali ? (
              <>
                आफ्नो सपनाको <span className="text-teal-700 dark:text-teal-400">घर, जमिन</span> वा{' '}
                <span className="text-orange-600">व्यवसाय</span> खोज्नुहोस्
              </>
            ) : (
              <>
                Find a place that <span className="text-teal-700 dark:text-teal-400">feels like home</span> in Nepal
              </>
            )}
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            {isNepali
              ? 'काठमाडौं, ललितपुर, भक्तपुर र पोखरामा कोठा, फ्ल्याट, घर, आना/रोपनी घडेरी तथा चलिरहेका व्यवसायहरू — सबै एकै ठाउँमा।'
              : 'Rooms & flats for rent, houses and land for sale, hotels, and running businesses. Every listing inspected and verified by our local team.'}
          </p>
        </div>

        {/* Search Engine Card */}
        <div className="max-w-4xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: isNepali ? 'सबै खोज्नुहोस्' : 'All Listings' },
              { id: 'rent', label: isNepali ? 'भाडामा (Rent)' : 'For Rent' },
              { id: 'sale', label: isNepali ? 'बिक्रीमा (Sale)' : 'For Sale' },
              { id: 'business', label: isNepali ? 'चलिरहेको व्यवसाय' : 'Businesses' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Inputs Form */}
          <form onSubmit={handleSearch} className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* Location Input */}
            <div className="sm:col-span-4 relative">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                {isNepali ? 'स्थान / शहर' : 'Location / Area'}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-600" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={isNepali ? 'जस्तै: Jhamsikhel, Baneshwor...' : 'e.g. Jhamsikhel, Sanepa...'}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="sm:col-span-3 relative">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                {isNepali ? 'सम्पत्ति प्रकार' : 'Property Type'}
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-600 appearance-none"
                >
                  <option value="all">{isNepali ? 'सबै प्रकार' : 'All Types'}</option>
                  <option value="apartment">{isNepali ? 'फ्ल्याट तथा अपार्टमेन्ट' : 'Flats & Apartments'}</option>
                  <option value="house">{isNepali ? 'घर तथा बंगला' : 'Houses & Villas'}</option>
                  <option value="land">{isNepali ? 'जमिन तथा घडेरी (आना)' : 'Land & Plots'}</option>
                  <option value="shop">{isNepali ? 'पसल तथा सटर' : 'Shops & Shutters'}</option>
                  <option value="hotel">{isNepali ? 'होटल तथा रिसोर्ट' : 'Hotels & Lodges'}</option>
                  <option value="business">{isNepali ? 'चलिरहेको व्यवसाय' : 'Running Businesses'}</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ▼
                </div>
              </div>
            </div>

            {/* Budget Range */}
            <div className="sm:col-span-3 relative">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                {isNepali ? 'बजेट सीमा' : 'Budget Range'}
              </label>
              <div className="relative">
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-600 appearance-none"
                >
                  <option value="all">{isNepali ? 'कुनै पनि बजेट' : 'Any Budget'}</option>
                  <option value="under-30k">{isNepali ? 'रु ३०,००० मुनि (भाडा)' : 'Under NPR 30k'}</option>
                  <option value="30k-80k">{isNepali ? 'रु ३०,००० - ८०,०००' : 'NPR 30k - 80k'}</option>
                  <option value="80k-200k">{isNepali ? 'रु ८०,००० - २ लाख' : 'NPR 80k - 2 Lakh'}</option>
                  <option value="under-3cr">{isNepali ? 'रु ३ करोड मुनि (बिक्री)' : 'Under NPR 3 Crore'}</option>
                  <option value="3cr-plus">{isNepali ? 'रु ३ करोड माथि' : 'NPR 3 Crore+'}</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ▼
                </div>
              </div>
            </div>

            {/* Search Submit Button */}
            <div className="sm:col-span-2 sm:self-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm shadow-md shadow-teal-700/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>{isNepali ? 'खोज्नुहोस्' : 'Search'}</span>
              </button>
            </div>
          </form>

          {/* Quick Search Chips */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 font-medium">{isNepali ? 'लोकप्रिय खोज:' : 'Popular:'}</span>
            {quickSearches.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => router.push(`/listings?${chip.query}`)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-slate-700 transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Trust Metrics Bar */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 text-center">
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-teal-800 dark:text-teal-400">
              1,250+
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              {isNepali ? 'प्रमाणित सक्रिय सूचीहरू' : 'Verified Active Listings'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 text-center">
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-orange-600">
              15 min
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              {isNepali ? 'औसत प्रतिक्रिया समय' : 'Avg Agent Response'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 text-center">
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              NPR 48 Cr+
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              {isNepali ? 'सम्पन्न कारोबार मूल्य' : 'Deals Facilitated'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 text-center">
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-600">
              100%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              {isNepali ? 'लालपुर्जा र स्थलगत जाँच' : 'Lalpurja Inspection'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
